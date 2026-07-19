"use client";

import { useEffect, useRef } from "react";

/**
 * Global ambient backdrop — a slow-moving WebGL topographic shader, recolored
 * to the site's established purple/fuchsia/indigo glow palette (see the
 * per-section glow blobs in why-website-section.tsx, services-section.tsx,
 * process-section.tsx, sitzey-story-and-work.tsx, and contact-main.tsx) and
 * dimmed/slowed way down from the source effect so it reads as texture
 * behind copy, not a foreground visual.
 *
 * Mounted once in layout.tsx, fixed behind everything at -z-10. The hero's
 * own opaque Spline scene paints over it for the hero's own viewport height,
 * so it only becomes visible once a section stops painting solid black on
 * top of it — which is exactly the "everything but the hero" split.
 */
export function ProceduralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        float depth = 1.0 / (uv.y + 1.15);
        vec2 gridUv = vec2(uv.x * depth, depth + u_time * 0.045);

        float n = noise(gridUv * 3.5);
        float ripples = sin(gridUv.y * 18.0 + n * 8.0 + u_time * 0.15);

        float topoLine = smoothstep(0.06, 0.0, abs(ripples));

        // Site palette: near-black base, indigo-500 / fuchsia-500 accents —
        // matches the bg-indigo-500/25 and bg-fuchsia-500/15 glow blobs used
        // throughout the rest of the site instead of the source's blue/violet.
        vec3 baseColor = vec3(0.0, 0.0, 0.0);
        vec3 accentColor = vec3(0.388, 0.4, 0.945);
        vec3 neonColor = vec3(0.851, 0.275, 0.937);

        vec3 finalColor = mix(baseColor, accentColor, n * 0.2);
        finalColor += topoLine * neonColor * depth * 0.14;

        float fade = smoothstep(0.1, -1.0, uv.y);
        finalColor *= (1.0 - length(uv) * 0.5) * (1.0 - fade);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!program || !vs || !fs) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttrib = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc = gl.getUniformLocation(program, "u_resolution");

    const resize = () => {
      const { innerWidth: width, innerHeight: height } = window;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = (time: number) => {
      resize();
      gl.uniform1f(timeLoc, time * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let paused = document.hidden;
    let animationFrameId = 0;

    if (reducedMotion) {
      draw(0);
    } else {
      const render = (time: number) => {
        if (!paused) draw(time);
        animationFrameId = requestAnimationFrame(render);
      };
      animationFrameId = requestAnimationFrame(render);
    }

    const handleVisibility = () => {
      paused = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-black" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="block h-full w-full touch-none"
        style={{ filter: "contrast(1.05) brightness(0.75)" }}
      />
    </div>
  );
}
