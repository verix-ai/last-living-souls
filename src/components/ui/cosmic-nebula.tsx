"use client";

import type { FC } from "react";
import { useRef, useEffect, useState } from "react";

export interface CosmicNebulaProps {
  /** Overall animation speed multiplier */
  speed?: number;
  /** Intensity of the nebula glow (0–1) */
  intensity?: number;
  /** Optional CSS class for container */
  className?: string;
}

const vsSource = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fsSource = `
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform vec2  u_mouse;
uniform float u_speed;
uniform float u_intensity;

// --- Noise helpers ---
// Hash without sin (better precision on some GPUs)
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Fractal Brownian Motion — 6 octaves for rich detail
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8); // domain rotation to reduce axis bias
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

// Warped FBM for swirling nebula shapes
float warpedFbm(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + 0.15 * t),
    fbm(p + vec2(5.2, 1.3) + 0.12 * t)
  );
  vec2 r = vec2(
    fbm(p + 4.0 * q + vec2(1.7, 9.2) + 0.13 * t),
    fbm(p + 4.0 * q + vec2(8.3, 2.8) + 0.16 * t)
  );
  return fbm(p + 4.0 * r);
}

// Iq palette: a + b * cos(2pi * (c*t + d))
vec3 palette(float t) {
  // Warm-to-cool: deep blue -> purple -> magenta -> orange -> gold
  vec3 a = vec3(0.5, 0.4, 0.6);
  vec3 b = vec3(0.5, 0.4, 0.4);
  vec3 c = vec3(1.0, 0.7, 0.4);
  vec3 d = vec3(0.00, 0.15, 0.60);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float t = u_time * u_speed;

  // Subtle mouse influence — shifts the nebula origin
  vec2 mouse = (u_mouse / u_resolution - 0.5) * 0.3;
  uv += mouse;

  // Slow global rotation for that drifting cosmic feel
  float angle = t * 0.05;
  float ca = cos(angle), sa = sin(angle);
  uv = mat2(ca, -sa, sa, ca) * uv;

  // Layer 1: primary nebula structure
  float n1 = warpedFbm(uv * 1.2, t);

  // Layer 2: secondary detail at different scale/speed
  float n2 = warpedFbm(uv * 2.5 + 3.0, t * 0.7);

  // Layer 3: fine dust
  float n3 = fbm(uv * 6.0 + t * 0.1);

  // Combine layers
  float nebula = n1 * 0.6 + n2 * 0.3 + n3 * 0.1;

  // Color mapping — use nebula value + radial distance for palette index
  float dist = length(uv);
  float colorIdx = nebula * 1.5 + dist * 0.3 - t * 0.05;

  vec3 col = palette(colorIdx);

  // Boost contrast and saturation
  col = pow(col, vec3(0.9));
  col *= nebula * u_intensity * 1.8;

  // Add subtle star-like sparkles
  float stars = pow(hash(floor(uv * 200.0)), 20.0);
  col += stars * 0.4;

  // Soft vignette
  float vig = 1.0 - dot(uv * 0.4, uv * 0.4);
  vig = clamp(vig, 0.0, 1.0);
  col *= vig;

  // Keep a dark, rich base so content remains readable
  col = max(col, vec3(0.02, 0.01, 0.04));

  gl_FragColor = vec4(col, 1.0);
}
`;

const CosmicNebula: FC<CosmicNebulaProps> = ({
  speed = 0.4,
  intensity = 1.0,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const frameId = useRef<number>(0);
  const mouseRef = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl2") as WebGL2RenderingContext) ||
      (canvas.getContext("webgl") as WebGLRenderingContext);
    if (!gl) {
      setError("WebGL not supported in this browser.");
      return;
    }

    const compileShader = (type: GLenum, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        setError("Shader compile failed. See console.");
        return null;
      }
      return sh;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      setError("Program link failed. See console.");
      return;
    }

    const posLoc = gl.getAttribLocation(program, "a_position");
    const resLoc = gl.getUniformLocation(program, "u_resolution")!;
    const timeLoc = gl.getUniformLocation(program, "u_time")!;
    const mouseLoc = gl.getUniformLocation(program, "u_mouse")!;
    const speedLoc = gl.getUniformLocation(program, "u_speed")!;
    const intensityLoc = gl.getUniformLocation(program, "u_intensity")!;

    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = [e.clientX * (window.devicePixelRatio || 1), e.clientY * (window.devicePixelRatio || 1)];
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    resize();

    const render = (t: number) => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.enableVertexAttribArray(posLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, t * 0.001);
      gl.uniform2f(mouseLoc, mouseRef.current[0], mouseRef.current[1]);
      gl.uniform1f(speedLoc, speed);
      gl.uniform1f(intensityLoc, intensity);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameId.current = requestAnimationFrame(render);
    };
    frameId.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [speed, intensity, error]);

  return (
    <div
      role="region"
      aria-label="Cosmic nebula background"
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      {error && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white font-mono p-4">
          {error}
        </div>
      )}
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default CosmicNebula;
