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
let specialSurpriseTriggered = false;
let theEnd = 95;
let specialTimer = 60;
let winStreak = 0;

function preload() {
  generatorImg = loadImage("assets/generator.png");
  generatorDoneImg = loadImage("assets/generatorDone.png");
  warpTileImg = loadImage("assets/warpTile.png");
  playerImg = loadImage("assets/player.png");
  playerWalkImg = loadImage("assets/playerWalk.png");
  backgroundForestImg = loadImage("assets/backgroundForest.png");
  backgroundSpecialImg = loadImage("assets/backgroundForestSpecial.png");
  backgroundSpecialImgV = loadImage("assets/backgroundForestSpecialV.png");
  backgroundDarknessImg = loadImage("assets/backgroundForestDarkness.png");
  exitDoorClosedImg = loadImage("assets/doorLocked.png");
  exitDoorOpenImg = loadImage("assets/doorOpen.png");
  demonImg = loadImage("assets/gloomStalker.png");
  demonImgWalk = loadImage("assets/gloomStalkerWalk.png");
  titleS = loadImage("assets/titleScreen.png");
  deathS = loadImage("assets/deathScreen.png");
  deathSp = loadImage("assets/deathScreenS.png");
  winS = loadImage("assets/escapeScreen.png");
  winSp = loadImage("assets/escapeScreenS.png");
  shadowImg = loadImage("assets/theShadow.png");
  paleImg = loadImage("assets/thePale.png");
  meltingImg = loadImage("assets/theMelting.png");
  meltingAngryImg = loadImage("assets/theMeltingAngry.png");
  timeUp = loadImage("assets/gameOver.png");
  //the part where we load sound
  overMusic = loadSound("sound/faithknockknock.mp3");
  surpriseMusic = loadSound("sound/specialSurprise.mp3");
  heart = loadSound("sound/heartbeat.mp3");
  ds1 = loadSound("sound/demonScream1.mp3");
  pale = loadSound("sound/pale.mp3");
  shadow = loadSound("sound/shadow.mp3");
  genFixing = loadSound("sound/genFixing.mp3");
  genWhirring = loadSound("sound/genWhirring.mp3");
  shortFuse = loadSound("sound/shortCircuit.mp3");
  deathSound = loadSound("sound/death.mp3");
  victoryJingle = loadSound("sound/victoryJingle.mp3");
  meltingKill = loadSound("sound/meltingKill.mp3");
  meltingStalk = loadSound("sound/meltingStalk.mp3");
  meltingAngry = loadSound("sound/meltingAngry.mp3");
}

function setup() {
  let tempScreen = [7, 8, 9]
  createCanvas(384, 320);
  rectMode(CENTER);
  frameRate(60);
  demon = new Demon(random(tempScreen));

  monsterRandomizer = [1, 2, 3];
  monsterType = random(monsterRandomizer);

  specialSpawn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  if (random(specialSpawn) === 10) {
    monsterType = 4;
  }

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

    if (winStreak > 0) {
      winStreak = 0;
    }

    if (overMusic.isPlaying() === true) {
        overMusic.stop();
      }
    if (genWhirring.isPlaying() === true) {
        genWhirring.stop();
      }
    if (shortFuse.isPlaying() === true) {
        shortFuse.stop();
      }

    if (genFixing.isPlaying() === true) {
        genFixing.stop();
      }
     if (surpriseMusic.isPlaying() === true) {
        surpriseMusic.stop();
      }


    background(255, 0, 0);
    imageMode(CENTER);
    image(deathS, width / 2, height / 2, 384, 320);

    textSize(24);
    textAlign(CENTER);
    textFont('Roboto');
    fill('white');

    if (monsterType === 1) {
      imageMode(CENTER);
      image(demonImg, 192, 65);
      text('by the Gloomstalker!', 192, 185);

      textSize(20);
      text('Try leading them away. . .', 192, 220);
    } else if (monsterType === 2) {
      imageMode(CENTER);
      image(paleImg, 192, 65);
      text('by the Pale!', 192, 185);

      textSize(20);
      text('Wait to react to the teleport...', 192, 220);
    } if (monsterType === 3) {
      imageMode(CENTER);
      image(shadowImg, 192, 65);
      text('by the Shadow!', 192, 185);
      textSize(20);
      text('Listen to your heart beat. . .', 192, 220);
    } if (monsterType === 4) {
      imageMode(CENTER);
      image(meltingImg, 192, 65);
      text('by the Melting!', 192, 185);
      textSize(20);
      fill('yellow');
      text('Just WAIT for the best part!', 192, 220);
      if (specialSurpriseTriggered === true) {
        imageMode(CENTER);
        image(deathSp, width / 2, height / 2, 384, 320);
      }
    }

  } else if (gameState === 3) {

if (overMusic.isPlaying() === true) {
        overMusic.stop();
      }
      if (surpriseMusic.isPlaying() === true) {
        surpriseMusic.stop();
      }

    background(0, 255, 0);
    imageMode(CENTER);
    image(winS, width / 2, height / 2, 384, 320);

     textSize(24);
    textAlign(CENTER);
    textFont('Roboto');
    fill('white');

    if (monsterType === 1) {
      imageMode(CENTER);
      image(demonImg, 192, 65);
      text('the Gloomstalker!', 192, 185);

      
    } else if (monsterType === 2) {
      imageMode(CENTER);
      image(paleImg, 192, 65);
      text('the Pale!', 192, 185);

    } if (monsterType === 3) {
      imageMode(CENTER);
      image(shadowImg, 192, 65);
      text('the Shadow!', 192, 185);
    
    } if (monsterType === 4) {
      imageMode(CENTER);
      image(winSp, width / 2, height / 2, 384, 320);
    }

    text(('Win Streak: '+ winStreak), 300, 25);

  } else {

    if (gameState === 1) {

      overMusic.setVolume(0.15);
        
      if (overMusic.isPlaying() === false && specialSurpriseTriggered === false) {
        overMusic.play();
      }
      if (specialSurpriseTriggered === true) {
        if (overMusic.isPlaying() === true) {
        overMusic.stop();
      }
      if (surpriseMusic.isPlaying() === false) {
        surpriseMusic.setVolume(0.06);
        surpriseMusic.play();
        surpriseMusic.jump(5);
        surpriseMusic.setVolume(0.04);
      }
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

  if (specialSurpriseTriggered === true) {
    imageMode(CENTER);
    image(backgroundDarknessImg, width / 2, height / 2, 384, 320);

    textSize(24);
    textAlign(CENTER);
    textFont('Roboto');
    fill(255, 0, 0, 175);
    text(('TIME LEFT TO ESCAPE: ' + theEnd), 192, 20);

    if (theEnd > 0) {
      if (specialTimer > 0) {
        specialTimer--;
      } else {
        theEnd--;
        specialTimer = 60;
      }

      if (2 > theEnd > 0) {
        imageMode(CENTER);
        tint(255, (255 - (4.25 * specialTimer)));
        image(timeUp, width / 2, height / 2, 384, 320);
        tint(255, 255);
      }


    } else {
      gameState = 2;
      meltingKill.setVolume(0.4);
      meltingKill.play();
            
    }


  }

  }
}

function screenCleaner() {
  
  warpsActive.splice(0, warpsActive.length);
  doorsActive.splice(0, doorsActive.length);
  if (genWhirring.isPlaying() === true) {
        genWhirring.stop();
      }
  if (shortFuse.isPlaying() === true) {
        shortFuse.stop();
      }
  
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
    specialSpawn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    if (random(specialSpawn) === 10) {
    monsterType = 4;
    }

    generator1.genFinished = false;
    generator1.genScreen = spawns[0];
    isGen1Done = false;
    generator2.genFinished = false;
    generator2.genScreen = spawns[1];
    isGen2Done = false;
    generator3.genFinished = false;
    generator3.genScreen = spawns[2];
    isGen3Done = false;
    specialSurpriseTriggered = false;
    player[0].speed = 2;
    player[0].x = 150;
    player[0].y = 150;
    theEnd = 95;
    specialTimer = 60;
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
    specialSpawn = [1, 2, 3];
    if (random(specialSpawn) === 3) {
    monsterType = 4;
    }
    
    player[0].x = 150;
    player[0].y = 150;
    generator1.genFinished = false;
    generator1.genScreen = spawns[0];
    isGen1Done = false;
    generator2.genFinished = false;
    generator2.genScreen = spawns[1];
    isGen2Done = false;
    generator3.genFinished = false;
    generator3.genScreen = spawns[2];
    isGen3Done = false;
    specialSurpriseTriggered = false;
    player[0].speed = 2;
    theEnd = 95;
    specialTimer = 60;
    if (victoryJingle.isPlaying() === true) {
        victoryJingle.stop();
      }
    screenCleaner();
    currentScreen = 2;


    gameState = 0;
  
  }

}

//Music Credit to FAITH: The Unholy Trinity, and Outcome Memories

//Melting Art from Alan Garcia