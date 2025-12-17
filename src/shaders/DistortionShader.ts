// Custom GLSL shaders for liquid distortion effect
export const vertexShader = `
  uniform float uTime;
  uniform float uVelocity;
  uniform float uDistortionIntensity;
  
  varying vec2 vUv;
  varying float vDistortion;
  
  void main() {
    vUv = uv;
    
    vec3 pos = position;
    
    // Velocity-based curvature effect
    float curvature = sin(uv.y * 3.14159) * uVelocity * uDistortionIntensity;
    pos.z += curvature * 50.0;
    
    // Skew/shear effect based on velocity
    pos.x += uv.y * uVelocity * uDistortionIntensity * 30.0;
    
    vDistortion = abs(uVelocity);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uVelocity;
  uniform float uRGBShift;
  
  varying vec2 vUv;
  varying float vDistortion;
  
  void main() {
    // RGB Chromatic Aberration
    float shift = uRGBShift * vDistortion;
    
    // Sample each color channel with offset
    float r = texture2D(uTexture, vUv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, vUv).g;
    float b = texture2D(uTexture, vUv - vec2(shift, 0.0)).b;
    
    vec3 color = vec3(r, g, b);
    
    // Edge darkening for depth
    float vignette = 1.0 - length(vUv - 0.5) * 0.3;
    color *= vignette;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;
