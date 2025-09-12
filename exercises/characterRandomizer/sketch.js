
//Establish some globals
let background = null;
let overlay = null;
let bodys = ["assets/TrapperBody.png", "assets/DredgeBody.png", "assets/NurseBody.png", "assets/HuntressBody.png", "assets/WraithBody.png"]
let Layer1 = [1, 2, 3, 4, 5];
let bodyVar = 0;
//Create an array of images, and then a Layer relating to its position to be called later. The bodyVar is actively updated within program to reference which part of the Layer to load//
let heads = ["assets/THeadCrop.png", "assets/DredgeHead.png", "assets/NHeadCrop.png", "assets/HHeadCrop.png", "assets/WHeadCrop.png"]
let Layer2 = [1, 2, 3, 4, 5];
let headVar = 0;
let weapons = ["assets/TrapperWeapon.png", "assets/DredgeWeapon.png", "assets/NurseWeapon.png", "assets/HuntressWeapon.png", "assets/WraithWeapon.png"]
let Layer3 = [1, 2, 3, 4, 5];
let weaponVar = 0;
//Image globals finished//
let tutorialState = true;
//All globals finished//

function preload(){
  for (let i = 0; i < bodys.length; i++) {
     Layer1[i] = loadImage(bodys[i]);
  }

  for (let i = 0; i < heads.length; i++) {
   Layer2[i] = loadImage(heads[i]);
  }

  for (let i = 0; i < weapons.length; i++) {
   Layer3[i] = loadImage(weapons[i]);
  }

  background = loadImage("assets/Background.png");
  overlay = loadImage("assets/CycleIcons.png");

}

function setup() {
  createCanvas(1500,1500);

}

function draw() {

  image(background, 0, 0, 1500, 1500)

  if (tutorialState === true) {
    
    textSize(124);
    textAlign(CENTER);
    textFont('Roboto');
    fill('white');
    text('Press [M1] to generate', 750, 650);
    text('a new killer from the fog...', 750, 775);

  } else {

      //Draw Our Body//

    image(Layer1[bodyVar], 0, 0, 1500, 1500)

    //Draw Our Head//

    if (bodyVar === 0) {
      image(Layer2[headVar], 480, 0, 567, 567)

    } else if (bodyVar === 1) {
      image(Layer2[headVar], 360, 0, 567, 567)

    } else if (bodyVar === 3) {
      image(Layer2[headVar], 400, -50, 567, 567)

    } else if (bodyVar === 4) {
      image(Layer2[headVar], 425, -30, 567, 567)

    } else {
      image(Layer2[headVar], 440, 180, 567, 567)

    }

    //Draw Our Weapon//

    if (bodyVar === 0) {
      image(Layer3[weaponVar], 70, 780, 730, 730)

    } else if (bodyVar === 1) {
      image(Layer3[weaponVar], 50, 760, 730, 730)

    } else if (bodyVar === 3) {
      image(Layer3[weaponVar], 115, 665, 730, 930)

    } else if (bodyVar === 4) {
      image(Layer3[weaponVar], 80, 680, 730, 930)

    } else {
      image(Layer3[weaponVar], 200, 950, 730, 730)

    }

    //Draw our Text//

    let stringp1 = ['T','D', 'N', 'H','W']
    let stringp2 = ['rap','red', 'ur', 'un', 'rai']
    let stringp3 = ['per','ge', 'se', 'tress', 'th']

    textSize(100);
    textAlign(CENTER);
    textFont('Roboto');
    fill('white');
    text('The '+stringp1[bodyVar]+stringp2[headVar]+stringp3[weaponVar], 750, 150);

    image(overlay, 0, 0, 1500, 1500)

  }

}

function mouseClicked() {

  if (tutorialState === true) {
    tutorialState = false;
  }

  let options = [0, 1, 2, 3, 4];
  bodyVar = random(options);
  headVar = random(options);
  weaponVar = random(options);

}

function keyPressed() {
  let options = [0, 1, 2, 3, 4];

  if (tutorialState === true) {

  } else {
    if (key === '1') {
        headVar = random(options);
      } else if (key === '2') {
        bodyVar = random(options);
      } else if (key === '3') {
        weaponVar = random(options);
      }
  }

}