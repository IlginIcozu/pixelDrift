#ifdef GL_ES
precision highp float;  
#endif
uniform vec2 resolution;
uniform sampler2D pg;
uniform sampler2D pg2;
uniform sampler2D img;
uniform float ak;
uniform float dirX;
uniform float dirY;
uniform float pgC;
uniform float dur;
uniform float onOff;
uniform float celCol;
uniform float contC;
uniform float satOn;

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    uv.y = 1. - uv.y;

    vec2 offset;
    vec2 pgCol;
 
    if(pgC == 1.){
     offset = vec2(texture2D(pg2, uv).r * ak) * vec2(1./resolution.x, 1./resolution.y);
     pgCol = vec2(texture2D(pg, uv) );
    }else if(pgC == 2.){
     offset = vec2(texture2D(pg, uv).r * ak) * vec2(1./resolution.x, 1./resolution.y);
     pgCol = vec2(texture2D(pg2, uv) ) ;
    }else if(pgC == 3.){
     offset = vec2(texture2D(pg2, uv).r * ak) * vec2(1./resolution.x, 1./resolution.y);
     pgCol = vec2(texture2D(pg2, uv) - texture2D(pg, uv));
    }

    if(pgCol.x < .1) offset.x *= -1.;
    else offset.x *= dirX;
    
    if(pgCol.y < .1) offset.y *= -1.;
    else  offset.y *= dirY;

    vec3 c = texture2D(img, uv+offset).rgb;

    if(dur == 1.0){
    if(onOff == 0.){
    c += texture2D(img, uv+offset).rgb;
    c -= texture2D(img, uv-offset).rgb;
    }
    }

    if(celCol > 0.65){
      if(c.r + c.g + c.b < .1) c = vec3(0.0);
    }else if(celCol > 0.45){
      if(c.r + c.g + c.b < .1) c = vec3(0.0);
      else if(c.r + c.g + c.b < 0.2) c = vec3(200., 127., 0.)/255.;//Yellow
    }else if(celCol > 0.15){
      if(c.r + c.g + c.b < .1) c = vec3(0.0);
      else if(c.r + c.g + c.b < 0.2) c = vec3(10., 127., 255.)/255.;//Blue
    }else{
      if(c.r + c.g + c.b < .1) c = vec3(0.0);
      else if(c.r + c.g + c.b < 0.2) c = vec3(36., 120., 36.)/255.;//Green
    }

    if(dur == 1.0){
    if(onOff == 1.){
    c += texture2D(img, uv+offset).rgb;
    c -= texture2D(img, uv-offset).rgb;
    }
    }

    if(satOn == 1.0){
    vec3 hsv = rgb2hsv(c.rgb);
    hsv.y *= 1.01;
    c.rgb = hsv2rgb(hsv);
    }

    if(contC < 0.45){
    c.rgb = ((c.rgb - vec3(0.5)) * 1.05 + vec3(0.5));
    }
    gl_FragColor = vec4(c, 1.);
  }
