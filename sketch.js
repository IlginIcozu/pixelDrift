let w;
let h
let pix = 1
let s, c, pg, pg2, img, sh
let i, f, g, k
let frameMod
let pgStr
let aniChooser
let hyperMeter
let blurShader
let blurShader2
let rect1C
let rect2C
let pitchShift
let seed = 99999999 * fxrand()
let contChooser
let colCChooser
let celColChooser


let player1, player2, player3

let buffer1, buffer2, buffer3, buffer4, buffer5, buffer6, buffer7
let uOctave
let monoStr
let bgStr

let coun = 0
let shaderChooser
let rect1X, rect1Y
let rect2X, rect2Y
let border



function preload() {
  // seed = 89633981.75552714
  // seed = 5484812.465596268


  console.log(seed)
  noiseSeed(seed)
  randomSeed(seed)

  sh = loadShader("pix.vert", "pix.frag");
  blurShader = loadShader('blur.vert', 'blur.frag')
  blurShader2 = loadShader('blur2.vert', 'blur2.frag')

}

function setup() {
  w = 1000
  h = 1000

  // w = windowWidth
  // h = windowHeight

  // w = min(windowWidth, windowHeight)
  // h = w
  c = createCanvas(w, h, WEBGL)
  pixelDensity(pix)
  f = createGraphics(w, h)
  f.pixelDensity(pix)
  f.colorMode(HSB, 360, 100, 100, 1)
  pg = createGraphics(w, h)
  pg.pixelDensity(pix)
  pg.noStroke()

  g = createGraphics(w, h, WEBGL)
  g.pixelDensity(pix)
  g.colorMode(HSB, 360, 100, 100, 1)
  g.background(0, 0, 80)




  k = createGraphics(w, h, WEBGL)
  k.colorMode(HSB, 360, 100, 100, 1);
  k.background(30, 8, 90);
  k.pixelDensity(pix);

  f.background(0, 0, 10)

  pgCh = random([1., 2., 3., 1., 2.])

  let frArr = [20, 50, 100, 200, 20, 50]


  frameMod = frArr[floor(random(frArr.length))]

  s = random([50, 50, 100, 100, 300, 200])

  pgStr = random([0, 255, 255, 255, 255])

  pgCh = random([1., 2., 3., 1., 2.])

  aniChooser = random(1)

  rect1C = random(1)
  rect2C = random(1)

  if (pgCh == 3.) pgStr = 0

  pgStr = 255

  if (rect1C < 0.70) {
    for (let y = 0; y < h; y += s) {
      for (let x = 0; x < w; x += s) {
        // pg.fill(random([0, 127, 255]), random([.1, 127, 255]), 0)

        pg.fill(random([0, 127, 255]), random([.1, 127, 255]), 0)
        pg.rect(x, y, s, s)
      }
    }
  }

  pg2 = createGraphics(w, h)
  pg2.pixelDensity(pix)
  pg2.noStroke()
  if (rect2C < 0.70) {
    for (let y = 0; y < h; y += s) {
      for (let x = 0; x < w; x += s) {
        pg2.fill(pgStr)
        pg2.rect(x, y, s, s)
      }
    }
  }

  img = createGraphics(w, h)
  img.pixelDensity(pix)
  img.imageMode(CENTER)
  img.colorMode(HSB, 360, 100, 100, 1)
  img.rectMode(CENTER)

  f.rectMode(CENTER)
  let space = w / 10


  for (let x = 0; x <= width; x += space) {
    let r = random(1)
    if (r > .70) {
      f.beginShape(LINES)
    } else if (r > .40) {
      f.beginShape(QUADS)
    } else {
      f.beginShape(TRIANGLES)
    }
    for (let y = 0; y <= height; y += space) {

      f.fill(random([0, 40, 150, 220]), 0, random(60, 100))

      // f.vertex(x + random(-10,10), y+ random(-10,10))
      f.endShape(CLOSE)

      f.noStroke()
      // f.fill(random([0, 20]), 0, random(0, 10))

      f.rect(x, y, random(space / 2, space))


      f.stroke(random([0, 40, 150, 220]), 0, random(0, 10))
      f.line(x - random(space / 2, space) * random([-1, 1]), y - random(space / 2, space) * random([-1, 1]), x + random(space / 2, space) * random([-1, 1]), y + random(space / 2, space) * random([-1, 1]))
    }
  }

  for (let i = 0; i < 30000; i++) {
    let x = random(width)
    let y = random(height)
    let n = noise(x * 0.01, y * 0.01) / 50
    // fill(0, 0, 50, n)
    f.noFill()
    f.stroke(0, 0, 90, n * 2)
    f.strokeWeight(random(0.5, 1))
    // noStroke()
    f.ellipse(x, y, random(100))


  }


  img.image(f, w / 2, h / 2)



  // if (sh) sh.setUniform('img', img)


  let onOffChooser = random([0, 1])
  celColChooser = random(1)
  let satChooser = random(1)
  contChooser = random(1)
  colCChooser = random(1)
  shaderChooser = random(1)

  if (colCChooser < 0.15) celColChooser = 0.5 //, contChooser = 0.0



  shader(sh)
  sh.setUniform('resolution', [w * pix, h * pix])
  sh.setUniform('pg', pg)
  sh.setUniform('pg2', pg2)
  sh.setUniform('img', img)
  sh.setUniform('ak', random([1., 10., 5., 20.]))
  sh.setUniform('dirX', random([-1., 1., 0., 0.]))
  sh.setUniform('dirY', random([-1., 1., 0., 0.]))
  sh.setUniform('dirX1', random([-1., 1., -1., 0.]))
  sh.setUniform('dirY1', random([-1., 1., -1., 0.]))
  sh.setUniform('pgC', pgCh)
  sh.setUniform('aniC', aniChooser)
  sh.setUniform('timeM', random([2.0, 4.0, 8.0, 2.0, 4.0, 8.0, 12.0]))
  sh.setUniform('onOff', onOffChooser)
  sh.setUniform('celCol', celColChooser)
  sh.setUniform('satC', satChooser)
  sh.setUniform('contC', contChooser)
  sh.setUniform('colC', colCChooser)






  hyperMeter = random([4, 8, 8, 8, 12, 12, 16, 16, 8, 8, 4, 4])
  frameRate(random([30, 60, 25, 25, 30, 25]))



  // frameRate(25)

  uSqr = 0.0
  roundInt = 4
  uPi = 1.0
  uAmp = random(0.25, 0.35)
  uOctave = round(random(1.0, 2.5), roundInt);
  uFbmAmp = round(random(30.0, 80.0), roundInt);
  uAngleC = round(random(1), roundInt);
  uAniSpeed = random([2250.0, 2250.0, 2500.0, 2500.0, 3000.0, 3000.0, 3000.0, 3000.0])

  uAmp2 = random(0.25, 0.35)
  uOctave2 = round(random(1.0, 2.5), roundInt)
  uFbmAmp2 = round(random(30.0, 80.0), roundInt);
  uAngleC2 = round(random(1), roundInt);
  uAniSpeed2 = random([2250.0, 2250.0, 2500.0, 2500.0, 3000.0, 3000.0, 3000.0, 3000.0])

  rect1X = random([250, 750])
  rect1Y = random([250, 750])
  rect2X = random([250, 750])
  rect2Y = random([250, 750])

  border = random(1)

}

function draw() {
  // if(!mouseIsPressed) {    


  let x = (random(w / s) ^ (frameCount / s)) * s
  let y = (random(h / s) ^ (frameCount / s)) * s

  // let x = (random(w / s) ^ (frameCount / 100.0)) * s
  // let y = (random(h / s) ^ (frameCount / 100.0)) * s


  pg.fill(random([0, 127, 255]), random([0, 127, 255]), 0)
  pg.rect(x ^ y, y, s * 2, s * 2)


  pg2.fill(random([20, 50, 100]), random([20, 50, 100]) * 2, 0)
  yamuk(x ^ y, y, s * 2, s * 2)

  if (border < 0.60) {
    pg2.push()
    pg2.fill(255)
    yamuk(rect1X, rect1Y, w / 2, h / 2)
    yamuk(rect2X, rect2Y, w / 2, h / 2)
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
  blurShader.setUniform("u_anispd", uAniSpeed);

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
  blurShader2.setUniform("u_anispd", uAniSpeed2);

  k.noStroke()

  k.shader(blurShader2);
  k.translate(-width / 2, -height / 2)
  k.rect(0, 0, width, height);


  img.image(c, w / 2, h / 2)


  if (frameCount % frameMod == 0) {
    let s = random([25, 40, 100, 25, 40, 10, 100, 100, 200])


    for (let y = 0; y < h; y += s) {
      for (let x = 0; x < w; x += s) {
        pg.fill(random([0, 127, 86]), random([0, 127, 86]), 0)
        pg.rect(x, y, s * 2, s * 2)
      }
    }
    sh.setUniform('ak', random([1., 10., 5., 20., 10., 5., 10., 20., 5.]))

    sh.setUniform('dirX1', random([-1., 1., 0., 0.]))
    sh.setUniform('dirY1', random([-1., 1., 0., 0.]))
    sh.setUniform("dur", random([1.0, 0.0, 0.0, 0.0]))

  }



  if (frameCount % (frameMod * hyperMeter) == 0) { //

    sh.setUniform('dirX', random([-1., 1., 0., 0.]))
    sh.setUniform('dirY', random([-1., 1., 0., 0.]))

    rect1X = random([250, 750, width / 2, 250, 750])
    rect1Y = random([250, 750])
    rect2X = random([250, 750, width / 2, 250, 750])
    rect2Y = random([250, 750])
    // sh.setUniform("dur", 1.0)
    for (let i = 0; i < random([2, 10, 30, 5, 2, 10]); i++) {

      for (let i = 0; i < width * 1; i++) {
        let x = random(width)
        let y = random(height)
        let n = noise(x * 0.01, y * 0.01) / (50)
        // fill(0, 0, 50, n)
        img.noFill()
        img.stroke(0, 0, random([10, 90, 90]), n * 2)
        img.strokeWeight(random(0.5, 1))
        // noStroke()
        img.ellipse(x, y, random(100))
      }
    }
    // player2.start().toDestination();
  }

  if (mouseIsPressed) {
    coun += 1
    if (coun == 1) {
      if (celColChooser > 0.60) {

      } else {
        celColChooser = random(1)
      }

      sh.setUniform("dur", 1.0)
      sh.setUniform('contC', 0.0)
      sh.setUniform('celCol', celColChooser)
      for (let i = 0; i < 5; i++) {

        for (let i = 0; i < width * 1; i++) {
          let x = random(width)
          let y = random(height)
          let n = noise(x * 0.01, y * 0.01) / (50)
          // fill(0, 0, 50, n)
          img.noFill()
          img.stroke(0, 0, random([0, 100, 100, 90]), n * 2)
          img.strokeWeight(random(0.5, 1))
          // noStroke()
          img.ellipse(x, y, random(100))
        }
      }
      coun = 0
    }
  }





  sh.setUniform('pg', g)
  sh.setUniform('img', img)
  if (shaderChooser < 0.65) {
    sh.setUniform('pg2', k)
  } else {
    sh.setUniform('pg2', pg2)
  }

  sh.setUniform('time', millis())

  quad(-1, -1, 1, -1, 1, 1, -1, 1)


}

function mouseReleased() {
  sh.setUniform('contC', contChooser)
}


function yamuk(x, y, w, h) {
  pg2.beginShape()
  pg2.noStroke()

  let rW = 20
  pg2.vertex(x - w / 2 + random(-rW, rW), y - h / 2 + random(-rW, rW))
  pg2.vertex(x + w / 2 + random(-rW, rW), y - h / 2 + random(-rW, rW))
  pg2.vertex(x + w / 2 + random(-rW, rW), y + h / 2 + random(-rW, rW))
  pg2.vertex(x - w / 2 + random(-rW, rW), y + h / 2 + random(-rW, rW))

  pg2.endShape()

}

