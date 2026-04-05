"use client";

import type { FC } from "react";
import { useRef, useEffect, useState } from "react";

export interface PatternShaderProps {
  gridSpacing?: number;
  animationSpeed?: number;
  rotationSpeed?: number;
  paletteA?: [number, number, number];
  paletteB?: [number, number, number];
  paletteC?: [number, number, number];
  paletteD?: [number, number, number];
  className?: string;
  ariaLabel?: string;
}

const vsSource = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fsSource = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_grid;
uniform float u_animSpeed;
uniform float u_rotSpeed;
uniform vec3  u_palA;
uniform vec3  u_palB;
uniform vec3  u_palC;
uniform vec3  u_palD;

mat2 rotate2d(float angle) {
  float c = cos(angle), s = sin(angle);
  return mat2(c, -s, s, c);
}

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float mapScene(vec2 p) {
  vec2 pr = mod(p, u_grid) - u_grid * 0.5;
  float box = sdBox(pr, vec2(0.1));
  return sin(box * 20.0 + u_time * u_animSpeed) * 0.5 + 0.5;
}

void main() {
  vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;
  uv = rotate2d(u_time * u_rotSpeed) * uv;

  float sceneVal = mapScene(uv);
  float ct = length(uv) + u_time * 0.2;

  vec3 color = palette(ct, u_palA, u_palB, u_palC, u_palD);
  vec3 finalColor = mix(color, vec3(0.0), sceneVal * 0.7);
  finalColor *= 1.0 - dot(uv, uv) * 0.5;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const PatternShader: FC<PatternShaderProps> = ({
  gridSpacing     = 0.5,
  animationSpeed  = 2.0,
  rotationSpeed   = 0.1,
  paletteA        = [0.5, 0.5, 0.5],
  paletteB        = [0.5, 0.5, 0.5],
  paletteC        = [1.0, 1.0, 0.5],
  paletteD        = [0.8, 0.9, 0.3],
  className       = "",
  ariaLabel       = "Procedural interference pattern shader",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const frameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl2") as WebGL2RenderingContext)
      || (canvas.getContext("webgl") as WebGLRenderingContext);
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

    const posLoc   = gl.getAttribLocation(program, "a_position");
    const resLoc   = gl.getUniformLocation(program, "u_resolution")!;
    const timeLoc  = gl.getUniformLocation(program, "u_time")!;
    const gridLoc  = gl.getUniformLocation(program, "u_grid")!;
    const animLoc  = gl.getUniformLocation(program, "u_animSpeed")!;
    const rotLoc   = gl.getUniformLocation(program, "u_rotSpeed")!;
    const palALoc  = gl.getUniformLocation(program, "u_palA")!;
    const palBLoc  = gl.getUniformLocation(program, "u_palB")!;
    const palCLoc  = gl.getUniformLocation(program, "u_palC")!;
    const palDLoc  = gl.getUniformLocation(program, "u_palD")!;

    const quad = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.clientWidth  * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    const render = (t: number) => {
      if (error) return;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.enableVertexAttribArray(posLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, t * 0.001);
      gl.uniform1f(gridLoc, gridSpacing);
      gl.uniform1f(animLoc, animationSpeed);
      gl.uniform1f(rotLoc, rotationSpeed);
      gl.uniform3fv(palALoc, paletteA);
      gl.uniform3fv(palBLoc, paletteB);
      gl.uniform3fv(palCLoc, paletteC);
      gl.uniform3fv(palDLoc, paletteD);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameId.current = requestAnimationFrame(render);
    };
    frameId.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId.current!);
      window.removeEventListener("resize", resize);
    };
  }, [
    gridSpacing,
    animationSpeed,
    rotationSpeed,
    paletteA,
    paletteB,
    paletteC,
    paletteD,
    error,
  ]);

  return (
    <div
      role="region"
      aria-label={ariaLabel}
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

export default PatternShader;
