import { useEffect, useRef } from "react";

type Point3 = [number, number, number];
type Face = [number, number, number];
type Edge = [number, number];

const SIZE = 400;
const RADIUS = 155;

/** A deterministic shared-vertex icosphere: no random points or external renderer. */
function createWireframe(): { vertices: Point3[]; edges: Edge[] } {
  const golden = (1 + Math.sqrt(5)) / 2;
  const normalize = ([x, y, z]: Point3): Point3 => {
    const length = Math.hypot(x, y, z);
    return [x / length, y / length, z / length];
  };
  const vertices: Point3[] = [
    [-1, golden, 0],
    [1, golden, 0],
    [-1, -golden, 0],
    [1, -golden, 0],
    [0, -1, golden],
    [0, 1, golden],
    [0, -1, -golden],
    [0, 1, -golden],
    [golden, 0, -1],
    [golden, 0, 1],
    [-golden, 0, -1],
    [-golden, 0, 1],
  ].map((point) => normalize(point as Point3));
  let faces: Face[] = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1],
  ];

  for (let level = 0; level < 2; level += 1) {
    const midpoints = new Map<string, number>();
    const midpoint = (a: number, b: number): number => {
      const key = a < b ? `${a}:${b}` : `${b}:${a}`;
      const existing = midpoints.get(key);
      if (existing !== undefined) return existing;
      const left = vertices[a];
      const right = vertices[b];
      const index =
        vertices.push(
          normalize([
            (left[0] + right[0]) / 2,
            (left[1] + right[1]) / 2,
            (left[2] + right[2]) / 2,
          ]),
        ) - 1;
      midpoints.set(key, index);
      return index;
    };
    const subdivided: Face[] = [];
    for (const [a, b, c] of faces) {
      const ab = midpoint(a, b);
      const bc = midpoint(b, c);
      const ca = midpoint(c, a);
      subdivided.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    faces = subdivided;
  }

  const unique = new Map<string, Edge>();
  for (const [a, b, c] of faces) {
    for (const [left, right] of [
      [a, b],
      [b, c],
      [c, a],
    ]) {
      const start = Math.min(left, right);
      const end = Math.max(left, right);
      unique.set(`${start}:${end}`, [start, end]);
    }
  }
  return { vertices, edges: [...unique.values()] };
}

export default function KineticGlobe({ moving }: { moving: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const movingRef = useRef(moving);
  const synchronizeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    movingRef.current = moving;
    synchronizeRef.current?.();
  }, [moving]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const { vertices, edges } = createWireframe();
    const projected = new Float32Array(vertices.length * 3);
    const buckets: Edge[][] = Array.from({ length: 6 }, () => []);
    const colors = [
      "rgba(244,241,232,.07)",
      "rgba(244,241,232,.12)",
      "rgba(244,241,232,.19)",
      "rgba(230,255,87,.28)",
      "rgba(230,255,87,.43)",
      "rgba(230,255,87,.64)",
    ];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;
    let frame = 0;
    let running = false;
    let elapsed = 0;
    let lastTime: number | null = null;
    let scrollPhase = window.scrollY * 0.001;
    let disposed = false;

    const draw = () => {
      if (disposed) return;
      const yaw = 0.38 + elapsed * 0.00018 + scrollPhase;
      const tilt = -0.25 + Math.sin(elapsed * 0.00006) * 0.1;
      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);

      context.clearRect(0, 0, SIZE, SIZE);
      for (let index = 0; index < vertices.length; index += 1) {
        const [x, y, z] = vertices[index];
        const turnedX = x * cosYaw + z * sinYaw;
        const turnedZ = z * cosYaw - x * sinYaw;
        const tiltedY = y * cosTilt - turnedZ * sinTilt;
        const tiltedZ = y * sinTilt + turnedZ * cosTilt;
        // Orthographic projection preserves the 155-unit sphere/orbit alignment.
        projected[index * 3] = SIZE / 2 + turnedX * RADIUS;
        projected[index * 3 + 1] = SIZE / 2 + tiltedY * RADIUS;
        projected[index * 3 + 2] = tiltedZ;
      }

      for (const bucket of buckets) bucket.length = 0;
      for (const edge of edges) {
        const depth =
          (projected[edge[0] * 3 + 2] + projected[edge[1] * 3 + 2]) / 2;
        const bucket = Math.max(0, Math.min(5, Math.floor((depth + 1) * 3)));
        buckets[bucket].push(edge);
      }
      context.lineWidth = 0.75;
      context.lineCap = "round";
      // Six stroke batches give front/back depth without 480 individual strokes.
      for (let index = 0; index < buckets.length; index += 1) {
        context.beginPath();
        context.strokeStyle = colors[index];
        for (const [a, b] of buckets[index]) {
          context.moveTo(projected[a * 3], projected[a * 3 + 1]);
          context.lineTo(projected[b * 3], projected[b * 3 + 1]);
        }
        context.stroke();
      }
    };

    const tick = (now: number) => {
      frame = 0;
      if (!running || disposed) return;
      if (lastTime !== null) elapsed += Math.min(now - lastTime, 64);
      lastTime = now;
      scrollPhase = window.scrollY * 0.001;
      draw();
      frame = window.requestAnimationFrame(tick);
    };

    const synchronize = () => {
      const shouldRun =
        movingRef.current &&
        !reducedMotion.matches &&
        !document.hidden &&
        inView;
      if (shouldRun && !running) {
        running = true;
        lastTime = null;
        frame = window.requestAnimationFrame(tick);
      } else if (!shouldRun && running) {
        running = false;
        window.cancelAnimationFrame(frame);
        frame = 0;
        lastTime = null;
      }
      draw();
    };
    synchronizeRef.current = synchronize;

    const resize = () => {
      // Size/layout is read only on resize, never in the animation loop.
      const bounds = canvas.getBoundingClientRect();
      const density = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round((bounds.width || SIZE) * density));
      const height = Math.max(1, Math.round((bounds.height || SIZE) * density));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      context.setTransform(width / SIZE, 0, 0, height / SIZE, 0, 0);
      draw();
    };
    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(canvas);
    const visibilityObserver =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              inView = entries[0]?.isIntersecting ?? true;
              synchronize();
            },
            { threshold: 0 },
          )
        : null;
    visibilityObserver?.observe(canvas);
    document.addEventListener("visibilitychange", synchronize);
    reducedMotion.addEventListener("change", synchronize);
    window.addEventListener("resize", resize, { passive: true });
    resize();
    synchronize();

    return () => {
      disposed = true;
      running = false;
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      document.removeEventListener("visibilitychange", synchronize);
      reducedMotion.removeEventListener("change", synchronize);
      window.removeEventListener("resize", resize);
      synchronizeRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="kinetic-globe-canvas"
      width={SIZE}
      height={SIZE}
      aria-hidden="true"
    />
  );
}
