import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Delaunay } from 'd3-delaunay';

// Define types inline since ../types doesn't exist
type Point = [number, number];
type Point3D = [number, number, number];

interface GlobeProps {
    width: number;
    height: number;
}

const Globe: React.FC<GlobeProps> = ({ width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current || !d3) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        // Handle high-DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.scale(dpr, dpr);

        const projection = d3.geoOrthographic()
            .scale(height / 2.2)
            .translate([width / 2, height / 2])
            .clipAngle(90);

        const points3D: Point3D[] = [];
        const n = 5;
        for (let j = 0; j < n; j++) {
            const lat = (j / n) * 180 - 90;
            for (let i = 0; i < n * 2; i++) {
                const lon = (i / (n * 2)) * 360 - 180;
                points3D.push([lon, lat, 0]);
            }
        }
        // Add some random points for density
        for (let i = 0; i < 40; i++) {
            points3D.push([Math.random() * 360 - 180, Math.random() * 180 - 90, 0]);
        }

        let isVisible = false;
        let timer: d3.Timer | null = null;

        const render = (elapsed: number) => {
            context.clearRect(0, 0, width, height);

            projection.rotate([elapsed * 0.02, -10]);

            const projectedPoints: Point[] = [];
            points3D.forEach(p => {
                const projected = projection([p[0], p[1]]);
                if (projected) {
                    projectedPoints.push(projected as Point);
                }
            });

            if (projectedPoints.length < 3) return;

            const delaunay = Delaunay.from(projectedPoints);
            const { triangles } = delaunay;

            const radius = projection.scale();
            const lengthThreshold = radius * 0.6;

            context.strokeStyle = "rgba(255, 255, 255, 0.5)";
            context.lineWidth = 0.8;
            context.beginPath();

            for (let i = 0; i < triangles.length; i += 3) {
                const p1 = projectedPoints[triangles[i]];
                const p2 = projectedPoints[triangles[i + 1]];
                const p3 = projectedPoints[triangles[i + 2]];

                if (p1 && p2 && p3) {
                    const dist12 = Math.hypot(p1[0] - p2[0], p1[1] - p2[1]);
                    const dist23 = Math.hypot(p2[0] - p3[0], p2[1] - p3[1]);
                    const dist31 = Math.hypot(p3[0] - p1[0], p3[1] - p1[1]);

                    if (dist12 < lengthThreshold) {
                        context.moveTo(p1[0], p1[1]);
                        context.lineTo(p2[0], p2[1]);
                    }
                    if (dist23 < lengthThreshold) {
                        context.moveTo(p2[0], p2[1]);
                        context.lineTo(p3[0], p3[1]);
                    }
                    if (dist31 < lengthThreshold) {
                        context.moveTo(p3[0], p3[1]);
                        context.lineTo(p1[0], p1[1]);
                    }
                }
            }
            context.stroke();

            context.fillStyle = "white";
            context.beginPath();
            projectedPoints.forEach(p => {
                context.moveTo(p[0] + 2.5, p[1]);
                context.arc(p[0], p[1], 2.5, 0, 2 * Math.PI);
            });
            context.fill();
        };

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            isVisible = entry.isIntersecting;

            if (isVisible) {
                if (!timer) {
                    // Start timer, but maintain consistency with elapsed time? 
                    // d3.timer passes elapsed time since start of *that* timer.
                    // To act continuous, we might need a persistent state, but simple restart is okay for this visual.
                    timer = d3.timer(render);
                }
            } else {
                if (timer) {
                    timer.stop();
                    timer = null;
                }
            }
        }, { threshold: 0 });

        observer.observe(canvas);

        return () => {
            if (timer) timer.stop();
            observer.disconnect();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, height]);


    return (
        <canvas ref={canvasRef} style={{ width, height }} />
    );
};

export default Globe;