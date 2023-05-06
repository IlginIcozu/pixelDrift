
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
  uniform float dirX1;
  uniform float dirY1;
  uniform float pgC;
  uniform float dur;
  uniform float time;
  uniform float aniC;
  uniform float timeM;
  uniform float onOff;
  uniform float celCol;
  uniform float satC;
  uniform float contC;
  uniform float colC;

uniform vec3 palette[8];
uniform int paletteSize;

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
    float ani;

    // if(aniC > .45){
       ani = 1.0;
    // }else if(aniC > .30){
    //    ani = tan(time/timeM);
    // }else if(aniC > .15){
    //   ani = sin(time/timeM);
    // }else{
    //   ani = fract(time/timeM);
    // }



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



    // if(pgCol.x < .1) offset.x *= dirX1* sin(time/200.0);
    // else if(pgCol.x < .9) offset.x *= dirX;
    
    // if(pgCol.y < .1) offset.y *= dirY1* cos(time/200.0);
    // else if(pgCol.y < .9) offset.y *= dirY;


     if(pgCol.x < .1) offset.x *= -1.;
    else if(pgCol.x < .9) offset.x *= dirX;
    
    if(pgCol.y < .1) offset.y *= -1.;
    else if(pgCol.y < .9) offset.y *= dirY;

    //offset *= 0.;
    
    vec3 c = texture2D(img, uv+offset).rgb;


    if(dur == 1.0){
    if(onOff == 0.){
    c += texture2D(img, uv+offset).rgb;
    c -= texture2D(img, uv-offset).rgb;
    }
    }


  

    

    if(celCol > 0.60){
      if(c.r + c.g + c.b < .1) c = vec3(0.0);
    }else if(celCol > 0.40){
      if(c.r + c.g + c.b < .1) c = vec3(0.0);
      else if(c.r + c.g + c.b < 0.2) c = vec3(200., 127., 0.)/255.;//Yellow
    }else if(celCol > 0.20){
      if(c.r + c.g + c.b < .1) c = vec3(0.0);
      else if(c.r + c.g + c.b < 0.2) c = vec3(10., 127., 255.)/255.;//Blue
    }else{
      if(c.r + c.g + c.b < .1) c = vec3(0.0);
      else if(c.r + c.g + c.b < 0.2) c = vec3(100., 180., 20.)/255.;//Green
    }

    // if(c.r + c.g + c.b < .1) c = vec3(0.0);
    //   else if(c.r + c.g + c.b < 0.2) c = vec3(200., 5., 65.)/255.;//Bune



    // else if(c.r + c.g + c.b < 0.2) c = vec3(200., 127., 0.)/255.;//Yellow
    // else if(c.r + c.g + c.b < 0.2) c = vec3(10., 127., 255.)/255.;//Blue
    // else if(c.r + c.g + c.b < 0.2) c = vec3(100., 180., 20.)/255.;//Green
    // // else if(c.r + c.g + c.b < 0.4) c = vec3(0., 0., 123.)/255.;


    //  if(c.r + c.g + c.b > 3.)c = vec3(0.0);
if(dur == 1.0){
   if(onOff == 1.){
    c += texture2D(img, uv+offset).rgb;
    c -= texture2D(img, uv-offset).rgb;
    }
}



    if(satC < 0.40){
      vec3 hsv = rgb2hsv(c.rgb);
        hsv.y *= 1.5;
        c.rgb = hsv2rgb(hsv);
    }


if(celCol > 0.60){
    if(contC > 0.70){
     c.rgb = ((c.rgb - vec3(0.5)) * 1.05 + vec3(0.5));
    }
}

   

   
  

   if(colC > 0.15){

    }else if(colC > 0.10){
      if(c.r + c.g + c.b < .5)c += vec3(.0,-0.5,-0.5);//RED
    }else if(colC > 0.05){
      if(c.r + c.g + c.b < .5)c += vec3(-0.5,0.0,-0.5);//GREEN
    }else{
      if(c.r + c.g + c.b < .5)c += vec3(-0.5,-0.5,0.0);//BLUE
    }

    // c += vec3(-0.01,-0.01,-0.01);

 

    gl_FragColor = vec4(c, 1.);
  }



//   const int indexMatrix4x4[16] = int[](0,  8,  2,  10,
//                                      12, 4,  14, 6,
//                                      3,  11, 1,  9,
//                                      15, 7,  13, 5);

// int indexValue() {
//     int x = int(mod(gl_FragCoord.x, 4.));
//     int y = int(mod(gl_FragCoord.y, 4.));
//     return indexMatrix4x4[(x + y * 4)] / 16;
// }

// float hueDistance(float h1, float h2) {
//     float diff = abs((h1 - h2));
//     return min(abs((1.0 - diff)), diff);
// }

// vec3[2] closestColors(float hue) {
//     vec3 ret[2];
//     vec3 closest = vec3(-2, 0, 0);
//     vec3 secondClosest = vec3(-2, 0, 0);
//     vec3 temp;
//     for (int i = 0; i < paletteSize; ++i) {
//         temp = palette[i];
//         float tempDistance = hueDistance(temp.x, hue);
//         if (tempDistance < hueDistance(closest.x, hue)) {
//             secondClosest = closest;
//             closest = temp;
//         } else {
//             if (tempDistance < hueDistance(secondClosest.x, hue)) {
//                 secondClosest = temp;
//             }
//         }
//     }
//     ret[0] = closest;
//     ret[1] = secondClosest;
//     return ret;
// }

//  float Epsilon = 1e-10;
 
//   float RGBtoHCV(vec3 RGB)
//   {
//     // Based on work by Sam Hocevar and Emil Persson
//     vec4 P = (RGB.g < RGB.b) ? vec4(RGB.bg, -1.0, 2.0/3.0) : vec4(RGB.gb, 0.0, -1.0/3.0);
//     vec4 Q = (RGB.r < P.x) ? vec4(P.xyw, RGB.r) : vec4(RGB.r, P.yzx);
//     float C = Q.x - min(Q.w, Q.y);
//     float H = abs((Q.w - Q.y) / (6. * C + Epsilon) + Q.z);
//     return float(H, C, Q.x);
//   }

//   float rgbToHsl(vec3 RGB)
//   {
//     vec3 HCV = RGBtoHCV(RGB);
//     float L = HCV.z - HCV.y * 0.5;
//     float S = HCV.y / (1 - abs(L * 2 - 1) + Epsilon);
//     return float(HCV.x, S, L);
//   }

// vec3 dither(vec3 color) {
//     vec3 hsl = rgbToHsl(color);
//     vec3 colors[2] = closestColors(hsl.x);
//     vec3 closestColor = cs[0];
//     vec3 secondClosestColor = cs[1];
//     float d = indexValue();
//     float hueDiff = hueDistance(hsl.x, closestColor.x) /
//                     hueDistance(secondClosestColor.x, closestColor.x);
//     return hslToRgb(hueDiff < d ? c1 : c2);
// }