import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Delaunay } from 'd3-delaunay';
import type { Point, Point3D } from '../types';

interface GlobeProps {
    width: number;
    height: number;
}

const Globe: React.FC<GlobeProps> = ({ width, height }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current || !d3) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous renders

        const projection = d3.geoOrthographic()
            .scale(height / 2.2) // Scaled down the globe
            .translate([width / 2, height / 2])
            .clipAngle(90);

        const points3D: Point3D[] = [];
        const n = 5; // Reduced from 20 for performance
        for (let j = 0; j < n; j++) {
            const lat = (j / n) * 180 - 90;
            for (let i = 0; i < n * 2; i++) {
                const lon = (i / (n * 2)) * 360 - 180;
                points3D.push([lon, lat, 0]);
            }
        }
        // Add some random points for density
        for(let i=0; i<40; i++) { // Reduced from 100 for performance
            points3D.push([Math.random() * 360 - 180, Math.random() * 180 - 90, 0]);
        }


        const linkGroup = svg.append("g").attr("class", "links");
        const nodeGroup = svg.append("g").attr("class", "nodes");

        const timer = d3.timer((elapsed) => {
            projection.rotate([elapsed * 0.02, -10]);

            const projectedPoints: Point[] = [];

            points3D.forEach(p => {
                const projected = projection([p[0], p[1]]);
                if (projected) {
                    projectedPoints.push(projected);
                }
            });

            if (projectedPoints.length < 3) return;

            const delaunay = Delaunay.from(projectedPoints);
            const { triangles } = delaunay;
            
            const links = [];
            // A threshold to filter out long lines that cut across the globe's interior
            const radius = projection.scale();
            const lengthThreshold = radius * 0.6; 

            for (let i = 0; i < triangles.length; i += 3) {
                const p1 = projectedPoints[triangles[i]];
                const p2 = projectedPoints[triangles[i + 1]];
                const p3 = projectedPoints[triangles[i + 2]];
                
                if (p1 && p2 && p3) {
                    const dist12 = Math.hypot(p1[0] - p2[0], p1[1] - p2[1]);
                    const dist23 = Math.hypot(p2[0] - p3[0], p2[1] - p3[1]);
                    const dist31 = Math.hypot(p3[0] - p1[0], p3[1] - p1[1]);
                    
                    if (dist12 < lengthThreshold) links.push([p1, p2]);
                    if (dist23 < lengthThreshold) links.push([p2, p3]);
                    if (dist31 < lengthThreshold) links.push([p3, p1]);
                }
            }

            linkGroup.selectAll("line")
                .data(links)
                .join("line")
                .attr("x1", d => d[0][0])
                .attr("y1", d => d[0][1])
                .attr("x2", d => d[1][0])
                .attr("y2", d => d[1][1])
                .attr("stroke", "white")
                .attr("stroke-width", 0.8) // Made lines thicker
                .attr("opacity", 0.5);

            nodeGroup.selectAll("circle")
                .data(projectedPoints)
                .join("circle")
                .attr("cx", d => d[0])
                .attr("cy", d => d[1])
                .attr("r", 2.5) // Made dots thicker
                .attr("fill", "white");
        });

        return () => timer.stop();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, height]);


    return (
        <svg ref={svgRef} width={width} height={height}></svg>
    );
};

export default Globe;