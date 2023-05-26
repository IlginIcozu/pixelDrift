function genTokenData(projectNum) {
  let data = {};
  let hash = "0x";
  for (var i = 0; i < 64; i++) {
    hash += Math.floor(Math.random() * 16).toString(16);
  }
  data.hash = hash;
  data.tokenId = (projectNum * 1000000 + Math.floor(Math.random() * 1000)).toString();
  return data;
}
let tokenData = genTokenData(123);

// tokenData = {
//   hash: "0xce34bd944cb858405c685472a4129e69fa2d878cfd910cb6a62d5522980f3675",
//   tokenId: "123000766"
// }





let hash = tokenData.hash
let id = tokenData.tokenId

console.log(hash)
console.log(id)


let w;
let h
let pix = 1
let s, c, pg, pg2, img, sh
let f, g, k
let frameMod
let pgStr
let hyperMeter
let blurShader
let blurShader2
let seed
let contChooser
let celColChooser
let onOffChooser
let sqChooser, sqTriChooser
let borderStr
let monoChooser
let darkSat
let darkHue
let contStr
let uOctave
let monoStr
let coun = 0
let shaderChooser, shaderChooser2
let rect1X, rect1Y, rect1W, rect1H
let rect2X, rect2Y
let border
let triChooser
let blockChooser
let blockColor, blockColor2
let sqStr
let stopCount = 1
let fr
let dirC, durC
let bgMult 


function preload() {
  sh = loadShader("pix.vert", "pix.frag");
  blurShader = loadShader('blur.vert', 'blur.frag')
  blurShader2 = loadShader('blur2.vert', 'blur2.frag')
}

function setup() {

  let R = new Random()
  seed = 99999999 * fxrand()
  noiseSeed(seed)
  randomSeed(seed)

  w = windowWidth
  h = windowHeight

  if(w > 1500){ 
    bgMult = 2
  }else if(w > 1000){
    bgMult = 1.5
  } else{
    bgMult = 1
  }


  c = createCanvas(w, h, WEBGL)
  pixelDensity(pix)

  f = createGraphics(w, h)
  f.pixelDensity(pix)
  f.colorMode(HSB, 360, 100, 100, 1)
  f.background(0, 0, 10)
  f.rectMode(CENTER)

  pg = createGraphics(w, h)
  pg.pixelDensity(pix)
  pg.noStroke()

  pg2 = createGraphics(w, h)
  pg2.pixelDensity(pix)
  pg2.noStroke()

  g = createGraphics(w, h, WEBGL)
  g.pixelDensity(pix)
  g.colorMode(HSB, 360, 100, 100, 1)
  g.background(0, 0, 80)

  k = createGraphics(w, h, WEBGL)
  k.colorMode(HSB, 360, 100, 100, 1);
  k.background(30, 8, 90);
  k.pixelDensity(pix);

  
  img = createGraphics(w, h)
  img.pixelDensity(pix)
  img.imageMode(CENTER)
  img.colorMode(HSB, 360, 100, 100, 1)
  img.rectMode(CENTER)

  pgCh = random([1., 2., 3., 1., 2.])

  let frArr = [20, 50, 100, 100, 20, 50]
  frameMod = frArr[floor(random(frArr.length))]

  s = random([50, 50, 100, 100, 300, 200])
  pgCh = random([1., 2., 3., 1., 2.])

  onOffChooser = random([0, 1, 0, 0])
  celColChooser = random(1)
  contChooser = random(1)
  shaderChooser = random(1)
  shaderChooser2 = random(1)
  triChooser = random(1)
  blockChooser = random(1)
  sqTriChooser = random(1)
  dirC = random(1)
  durC = random(1)
  monoChooser = random(1)

  celColChooser = 1.0

  if (monoChooser < 0.25) monoStr = "mono", contChooser = 0.0

  if (contChooser < 0.45) contStr = "cont"

  if (monoStr == "mono") dirC = random([1.0, 1.0, 0.0, 1.0, 1.0])

  pgStr = 255

  hyperMeter = random([4, 8, 8, 8, 12, 12, 8, 8, 4, 4]) / 2
  fr = random([30, 25, 25, 25, 30, 25])
  frameRate(fr)

  sqChooser = random(1)

  darkHue = random([0, 180, 40, 220, 90, 150, 200, 280, 320])


  monoStr == "mono" ? darkSat = 0 : darkSat = 80

  for (let i = 0; i < 30000; i++) {
    let x = random(width)
    let y = random(height)
    let n = noise(x * 0.01, y * 0.01) / 50
    f.noFill()

    f.stroke(0, 0, 90, 1)
    f.strokeWeight(random(0.5, 1))
    f.ellipse(x, y, random(100))
    f.noFill()
    f.stroke(darkHue, darkSat, 10, 1)
    f.ellipse(x + random(-10, 10), y + random(-10, 10), random(100))

  }

  noiseSeed(seed)
  randomSeed(seed)

  shader(sh)

  sh.setUniform('resolution', [w * pix, h * pix])
  sh.setUniform('pg', pg)
  sh.setUniform('pg2', pg2)
  sh.setUniform('img', f)
  sh.setUniform('ak', random([1., 10., 5., 20.]))
  sh.setUniform('dirX', random([-1., 1., 0., 0.]))
  sh.setUniform('dirY', random([-1., 1., 0., 0.]))
  sh.setUniform('pgC', pgCh)
  sh.setUniform('onOff', onOffChooser)
  sh.setUniform('celCol', celColChooser)
  sh.setUniform('contC', contChooser)
  sh.setUniform('satOn', 1.0)

  img.image(f, w / 2, h / 2)


  uSqr = 0.0
  roundInt = 4
  uAmp = random(0.25, 0.35)
  uOctave = round(random(1.0, 2.5), roundInt);
  uFbmAmp = round(random(30.0, 80.0), roundInt);
  uAngleC = round(random(1), roundInt);
  uAmp2 = random(0.25, 0.35)
  uOctave2 = round(random(1.0, 2.5), roundInt)
  uFbmAmp2 = round(random(30.0, 80.0), roundInt);
  uAngleC2 = round(random(1), roundInt);


  if (sqChooser < 0.50) {
    rect1X = width / 2
    rect1Y = random([height / 4, height - height / 4])
    rect1W = width
    rect1H = height / random(1.9, 2.1)
    sqStr = "yatay"
    if (sqTriChooser < 0.50) {
      rect1X = width / 2
      rect1Y = height / 8
      rect1W = width
      rect1H = height / 3.333

      rect2X = width / 2
      rect2Y = height - height / 8
    }
  } else {
    rect1X = random([width / 4, width - width / 4])
    rect1Y = height / 2
    rect1W = width / random(1.9, 2.1)
    rect1H = height
    sqStr = "dikey"
    if (sqTriChooser < 0.50) {
      rect1X = width / 8
      rect1Y = height / 2
      rect1W = width / 3.333
      rect1H = height

      rect2X = width - width / 8
      rect2Y = height / 2
    }
  }


  blockColor = 255
  blockColor2 = 255
  border = random([0.0, 1.0, 1.0, 1.0, 1.0, 1.0])
  if (border == 0.0) borderStr = "no"
}

function draw() {



  let x = (random(w / s) ^ (frameCount / s)) * s
  let y = (random(h / s) ^ (frameCount / s)) * s


  pg.fill(random([0, 127, 255]), random([0, 127, 255]), 0)
  pg.rect(x ^ y, y, s * 2, s * 2)


  pg2.fill(random([20, 50, 100]), random([20, 50, 100]) * 2, 0)
  yamuk(x ^ y, y, s * 2, s * 2)

  if (border == 1.0) {
    pg2.push()
    pg2.fill(blockColor)
    if (blockChooser > 0.40) {
      yamuk(rect1X, rect1Y, rect1W, rect1H)
      if (sqTriChooser < 0.50) {
        pg2.fill(blockColor2)
        yamuk(rect2X, rect2Y, rect1W, rect1H)
      }
    } else if (blockChooser > 0.20) {
      pg2.ellipse(width / 2, height / 2, height / 1.5)
    } else {

      tri()
    }

    pg2.pop()
  }


  blurShader.setUniform("uTexture0", pg);
  blurShader.setUniform('u_time', millis() / 1000.0)
  blurShader.setUniform("uResolution", [width * pix, height * pix]);
  blurShader.setUniform("u_amp", uAmp);
  blurShader.setUniform("u_octave", uOctave);
  blurShader.setUniform("u_fbmAmp", uFbmAmp);
  blurShader.setUniform("u_angleC", uAngleC);
  blurShader.setUniform("u_sqr", uSqr);

  g.noStroke()

  g.shader(blurShader);
  g.translate(-width / 2, -height / 2)
  g.rect(0, 0, width, height);


  blurShader2.setUniform("uTexture0", pg2);
  blurShader2.setUniform('u_time', millis() / 1000.0)
  blurShader2.setUniform("uResolution", [width * pix, height * pix]);
  blurShader2.setUniform("u_amp", uAmp2);
  blurShader2.setUniform("u_octave", uOctave2);
  blurShader2.setUniform("u_fbmAmp", uFbmAmp2);
  blurShader2.setUniform("u_angleC", uAngleC2);
  blurShader2.setUniform("u_sqr", uSqr);

  k.noStroke()

  k.shader(blurShader2);
  k.translate(-width / 2, -height / 2)
  k.rect(0, 0, width, height);


  img.image(c, w / 2, h / 2)


  if (frameCount % frameMod == 0) {
    let s = random([25, 40, 100, 25, 40, 10, 100, 100, 200])
    blockColor = random([0, 255, 255, 255])
    blockColor2 = random([0, 255, 255, 255])
    for (let y = 0; y < h; y += s) {
      for (let x = 0; x < w; x += s) {
        pg.fill(random([0, 127, 86]), random([0, 127, 86]), 0)
        pg.rect(x, y, s * 2, s * 2)
      }
    }
    sh.setUniform('ak', random([1., 10., 5., 15., 10., 5., 10., 10., 5., 1.]))
    // sh.setUniform('ak', 15.)

    if (dirC < 0.20) {
      sh.setUniform('dirX', random([-1., 1., 0., 0.]))
      sh.setUniform('dirY', random([-1., 1., 0., 0.]))
    }

    if (contStr == "cont") {
      for (let i = 0; i < 10/bgMult; i++) {

        for (let i = 0; i < width; i++) {
          let x = random(width)
          let y = random(height)
          let n = noise(x * 0.01, y * 0.01) / (50)
          img.noFill()
          img.stroke(darkHue, random([0, darkSat]), random([10, 90, 90, 0]), n * 2)
          img.strokeWeight(random(0.5, 1))
          img.ellipse(x, y, random(100))
        }
      }
      if (monoStr == "mono") {
        sh.setUniform("dur", random([1.0, 0.0, 0.0]))
      } else {
        sh.setUniform("dur", random([1.0, 0.0, 0.0, 0.0]))
      }

      // sh.setUniform('dirX', random([-1., 1., 0., 0.]))
      // sh.setUniform('dirY', random([-1., 1., 0., 0.]))
    } else {
      sh.setUniform("dur", random([1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]))
    }




  }



  if (frameCount % (frameMod * hyperMeter) == 0) { //

    sh.setUniform('dirX', random([-1., 1., 0., 0., 0.]))
    sh.setUniform('dirY', random([-1., 1., 0., 0., 0.]))
    sh.setUniform('satOn', random([1.0, 0.0, 0.0]))


    for (let i = 0; i < 10/bgMult; i++) {

      for (let i = 0; i < width * 1; i++) {
        let x = random(width)
        let y = random(height)
        let n = noise(x * 0.01, y * 0.01) / (50)

        img.noFill()
        img.stroke(darkHue, random([0, darkSat]), random([0, 100, 100, 90, 0]), n * 2)
        img.strokeWeight(random(0.5, 1))
        img.ellipse(x, y, random(100))
      }
    }

    if (contStr == "cont") {

      sh.setUniform("dur", 1.0)

    } else {
      sh.setUniform("dur", random([1.0, 0.0, 0.0, 0.0]))
    }


  }

  if (mouseIsPressed) {
    coun += 1
    if (coun == 1) {

      blockColor = 255
      blockColor2 = 255

      sh.setUniform("dur", 1.0)
      // sh.setUniform('contC', 0.0)
      sh.setUniform('celCol', celColChooser)
      sh.setUniform('dirX', random([-1., 1., 0., 0.]))
      sh.setUniform('dirY', random([-1., 1., 0., 0.]))
      for (let i = 0; i < 5; i++) {

        for (let i = 0; i < width * 1; i++) {
          let x = random(width)
          let y = random(height)
          let n = noise(x * 0.01, y * 0.01) / (50)

          img.noFill()
          img.stroke(darkHue, darkSat, random([0, 100, 100, 90]), n * 2)
          img.strokeWeight(random(0.5, 1))

          img.ellipse(x, y, random(100))
        }
      }

      coun = 0
    }
  }




  if (shaderChooser2 < 0.65) {
    sh.setUniform('pg', g)
  } else {
    sh.setUniform('pg', pg)
  }

  sh.setUniform('img', img)

  if (shaderChooser < 0.65) {
    sh.setUniform('pg2', k)
  } else {
    if (blockChooser > 0.20) {
      sh.setUniform('pg2', pg2)
    } else {
      sh.setUniform('pg2', k)
    }

  }

  sh.setUniform('time', millis())

  quad(-1, -1, 1, -1, 1, 1, -1, 1)


}

function yamuk(x, y, w, h) {
  pg2.beginShape()
  pg2.noStroke()

  let rW = min(w, h) / 7
  pg2.vertex(x - w / 2 + random(-rW, rW), y - h / 2 + random(-rW, rW))
  pg2.vertex(x - w / 4 + random(-rW, rW), y - h / 2 + random(-rW, rW))
  pg2.vertex(x + random(-rW, rW), y - h / 2 + random(-rW, rW))
  pg2.vertex(x + w / 4 + random(-rW, rW), y - h / 2 + random(-rW, rW))

  pg2.vertex(x + w / 2 + random(-rW, rW), y - h / 2 + random(-rW, rW))
  pg2.vertex(x + w / 2 + random(-rW, rW), y - h / 4 + random(-rW, rW))
  pg2.vertex(x + w / 2 + random(-rW, rW), y + random(-rW, rW))
  pg2.vertex(x + w / 2 + random(-rW, rW), y + h / 4 + random(-rW, rW))

  pg2.vertex(x + w / 2 + random(-rW, rW), y + h / 2 + random(-rW, rW))
  pg2.vertex(x + w / 4 + random(-rW, rW), y + h / 2 + random(-rW, rW))
  pg2.vertex(x + random(-rW, rW), y + h / 2 + random(-rW, rW))
  pg2.vertex(x - w / 4 + random(-rW, rW), y + h / 2 + random(-rW, rW))

  pg2.vertex(x - w / 2 + random(-rW, rW), y + h / 2 + random(-rW, rW))
  pg2.vertex(x - w / 2 + random(-rW, rW), y + h / 4 + random(-rW, rW))
  pg2.vertex(x - w / 2 + random(-rW, rW), y + random(-rW, rW))
  pg2.vertex(x - w / 2 + random(-rW, rW), y - h / 4 + random(-rW, rW))

  pg2.endShape()

}



function yamukF(x, y, w, h) {
  f.beginShape()
  f.noStroke()

  let rW = w / 2
  f.vertex(x - w / 2 + random(-rW, rW), y - h / 2 + random(-rW, rW))
  f.vertex(x + w / 2 + random(-rW, rW), y - h / 2 + random(-rW, rW))
  f.vertex(x + w / 2 + random(-rW, rW), y + h / 2 + random(-rW, rW))
  f.vertex(x - w / 2 + random(-rW, rW), y + h / 2 + random(-rW, rW))

  f.endShape()

}

function tri() {
  pg2.beginShape()
  pg2.noStroke()

  let rW = 20
  if (triChooser < 0.50) {
    pg2.vertex(0, 0)
    pg2.vertex(width, 0)
    pg2.vertex(width, height)
  } else {
    pg2.vertex(0, 0)
    pg2.vertex(0, height)
    pg2.vertex(width, 0)
  }


  pg2.endShape()

}

function keyPressed() {
  if (key == ' ') {
    stopCount += 1
    if (stopCount % 2 == 0) {
      frameRate(0)
    } else {
      frameRate(fr)
    }
  }
  if (key == "s") {
    saveCanvas("PixDrift", "png")
  }
}

class Random {
  constructor() {
    this.useA = false;
    let sfc32 = function (uint128Hex) {
      let a = parseInt(uint128Hex.substr(0, 8), 16);
      let b = parseInt(uint128Hex.substr(8, 8), 16);
      let c = parseInt(uint128Hex.substr(16, 8), 16);
      let d = parseInt(uint128Hex.substr(24, 8), 16);
      return function () {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    // seed prngA with first half of tokenData.hash
    this.prngA = new sfc32(tokenData.hash.substr(2, 32));
    // seed prngB with second half of tokenData.hash
    this.prngB = new sfc32(tokenData.hash.substr(34, 32));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }
  // random number between 0 (inclusive) and 1 (exclusive)
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
}
