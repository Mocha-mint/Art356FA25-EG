let player = [];
let direction = 'left';
let warpTileImg;
let playerImg;
let playerWalkImg;
let currentScreen = 2;
let screenActive = 0;
let warpsActive = [];
let generatorsActive = [];
let doorsActive = [];
let isGen1Done = false;
let gen1Location = null;
let isGen2Done = false;
let gen2Location = null;
let isGen3Done = false;
let gen3Location = null;
let demonImg;
let demonImgWalk;
let demon = null;
let gameState = 0;
let monsterType = 2;

function preload() {
  generatorImg = loadImage("assets/generator.png");
  generatorDoneImg = loadImage("assets/generatorDone.png");
  warpTileImg = loadImage("assets/warpTile.png");
  playerImg = loadImage("assets/player.png");
  playerWalkImg = loadImage("assets/playerWalk.png");
  backgroundForestImg = loadImage("assets/backgroundForest.png");
  exitDoorClosedImg = loadImage("assets/doorLocked.png");
  exitDoorOpenImg = loadImage("assets/doorOpen.png");
  demonImg = loadImage("assets/gloomStalker.png");
  demonImgWalk = loadImage("assets/gloomStalkerWalk.png");
  titleS = loadImage("assets/titleScreen.png");
  deathS = loadImage("assets/deathScreen.png");
  winS = loadImage("assets/escapeScreen.png");
  shadowImg = loadImage("assets/theShadow.png");
  paleImg = loadImage("assets/thePale.png");
  overMusic = loadSound("sound/faithknockknock.mp3");
  heart = loadSound("sound/heartbeat.mp3");
  ds1 = loadSound("sound/demonScream1.mp3");
  pale = loadSound("sound/pale.mp3");
  shadow = loadSound("sound/shadow.mp3");
}

function setup() {
  createCanvas(384, 320);
  rectMode(CENTER);
  frameRate(60);
  demon = new Demon();

  monsterRandomizer = [1, 2, 3];
  monsterType = random(monsterRandomizer);

  let p = new PlayerB(150, 150, 10, 10, 2); 
  player.push(p);



  let spawns = [1, 9, 3, 4, 5, 6, 7, 8]
  shuffle(spawns, true);

  generator1 = new Generator(random(45,339), random(45,275), 21, 22, spawns[0]);
  generatorsActive.push(generator1);

  generator2 = new Generator(random(45,339), random(45,275), 21, 22, spawns[1]);
  generatorsActive.push(generator2);

  generator3 = new Generator(random(45,339), random(45,275), 21, 22, spawns[2]);
  generatorsActive.push(generator3);
}

function draw() {


  background(30);

  if (gameState === 0) {
    
    if (overMusic.isPlaying() === true) {
        overMusic.stop();
      }
    imageMode(CENTER);
    image(titleS, width / 2, height / 2, 384, 320);

  } else if (gameState === 2) {

    if (overMusic.isPlaying() === true) {
        overMusic.stop();
      }
    
    


    background(255, 0, 0);
    imageMode(CENTER);
    image(deathS, width / 2, height / 2, 384, 320);

    textSize(24);
    textAlign(CENTER);
    textFont('Roboto');
    fill('white');

    if (monsterType === 1) {
      text('by the Gloomstalker!', 192, 185);

      textSize(20);
      text('No tricks, pure speed. . .', 192, 220);
    } else if (monsterType === 2) {
      text('by the Pale!', 192, 185);

      textSize(20);
      text('Teleports before each attack. . .', 192, 220);
    } if (monsterType === 3) {
      text('by the Shadow!', 192, 185);
      textSize(20);
      text('Listen to your heart beat. . .', 192, 220);
    }

  } else if (gameState === 3) {

if (overMusic.isPlaying() === true) {
        overMusic.stop();
      }

    background(0, 255, 0);
    imageMode(CENTER);
    image(winS, width / 2, height / 2, 384, 320);

     textSize(24);
    textAlign(CENTER);
    textFont('Roboto');
    fill('white');

    if (monsterType === 1) {
      text('the Gloomstalker!', 192, 185);

      
    } else if (monsterType === 2) {
      text('the Pale!', 192, 185);

    } if (monsterType === 3) {
      text('the Shadow!', 192, 185);
    
    }

  } else {

    if (gameState === 1) {

      overMusic.setVolume(0.15);
        
      if (overMusic.isPlaying() === false) {
        overMusic.play();
      }
        
      }

  warpLogic();

  //displays player
  player[0].display();

   //player controls
  if (keyIsDown(LEFT_ARROW)||keyIsDown(65)) {
    player[0].move("left");
    direction = 'left';
  }
  if (keyIsDown(RIGHT_ARROW)||keyIsDown(68)) {
    player[0].move("right");
    direction = 'right';
  }
  if (keyIsDown(UP_ARROW)||keyIsDown(87)) {
    player[0].move("up");
    direction = 'up';
  }
  if (keyIsDown(DOWN_ARROW)||keyIsDown(83)) {
    player[0].move("down");
    direction = 'down';
  }

  for (let i = 0; i < generatorsActive.length; i++) {
    generatorsActive[i].display();
    generatorsActive[i].interactionRange(player[0]);
    generatorsActive[i].finishCheck((i+1))
    
  }

  demon.display();
  demon.move(player[0]);

  }
}

function screenCleaner() {
  
  warpsActive.splice(0, warpsActive.length);
  doorsActive.splice(0, doorsActive.length);
  
  screenActive = 0;
}

function mouseClicked() {

  if (gameState === 0) {
    gameState = 1;
  }

  if (gameState === 2) {
    let spawns = [1, 9, 3, 4, 5, 6, 7, 8]
    shuffle(spawns, true);

    demon.monsterScreen = 9;
    demon.delay = 300;
    demon.chasePhase = 0;
    demon.attackPhase = 0;

    monsterRandomizer = [1, 2, 3];
    monsterType = random(monsterRandomizer);

    generator1.genFinished = false;
    generator1.genScreen = spawns[0];
    isGen1Done = false;
    generator2.genFinished = false;
    generator2.genScreen = spawns[1];
    isGen2Done = false;
    generator3.genFinished = false;
    generator3.genScreen = spawns[2];
    isGen3Done = false;
    screenCleaner();
    currentScreen = 2;


    gameState = 0;
  } else if (gameState === 3) {
    let spawns = [1, 9, 3, 4, 5, 6, 7, 8]
    shuffle(spawns, true);

    demon.monsterScreen = 9;
    demon.delay = 300;
    demon.chasePhase = 0;
    demon.attackPhase = 0;

    monsterRandomizer = [1, 2, 3];
    monsterType = random(monsterRandomizer);
    
    generator1.genFinished = false;
    generator1.genScreen = spawns[0];
    isGen1Done = false;
    generator2.genFinished = false;
    generator2.genScreen = spawns[1];
    isGen2Done = false;
    generator3.genFinished = false;
    generator3.genScreen = spawns[2];
    isGen3Done = false;
    screenCleaner();
    currentScreen = 2;


    gameState = 0;
  
  }

}