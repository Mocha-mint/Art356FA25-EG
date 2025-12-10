let player = [];
let spellRack = [];
let direction = 'down';
let playerImg;
let playerWalkImg;
let mobilityCardID = [1, 2, 3];
let attackCardID = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let recentAttackIDa;
let recentAttackIDb;
let recentToggle = 0;
let enemySpawns = [];
let dBulletsActive = [];
let enemyNavRef = [];
let gameState = 0;


function preload() {
  playerImg = loadImage("assets/player.png");
  playerLImg = loadImage("assets/playerL.png");
  playerRImg = loadImage("assets/playerR.png");
  playerTImg = loadImage("assets/playerT.png");
  playerWalkImg = loadImage("assets/playerWalk.png");
  backgroundImg = loadImage("assets/placeholderBackground.png");
  healthOverlayImg = loadImage("assets/healthBarOverlay.png");
  thiefImg = loadImage("assets/thief.png");
  clericImg = loadImage("assets/cleric.png");
  knightImg = loadImage("assets/knight.png");
  mageImg = loadImage("assets/mage.png");
  titleImg = loadImage("assets/titlescreen.png");
  victoryImg = loadImage("assets/victoryscreen.png");
  deathImg = loadImage("assets/deathscreen.png");
  deathImg = loadImage("assets/deathscreen.png");
  fireballImg = loadImage("assets/fireballPic.png");
  minionImg = loadImage("assets/minionSkull.png");
  missileImg = loadImage("assets/magicMissile.png");
  sparkImg = loadImage("assets/spark.png");
  freezeImg = loadImage("assets/freezeImg.png");
  drainImg = loadImage("assets/drainCircle.png");
  unmakeImg = loadImage("assets/unmakeCircle.png");
  boltVImg = loadImage("assets/boltVertical.png");
  boltHImg = loadImage("assets/boltHorizontal.png");
  spikesVImg = loadImage("assets/spikesV.png");
  spikesHImg = loadImage("assets/spikesH.png");
  mageMissileImg = loadImage("assets/mageMissile.png");
  archerShotImg = loadImage("assets/archerShotImg.png");
  blitzImg = loadImage("assets/blitzBorder.png");
  blinkImg = loadImage("assets/blinkImage.png");

  //credit to freesound_community, freesound_CrunchpixStudio, & DRAGON-STUDIO from Pixabay for Sound Effects//

  //credit to Everhood by Foreign Gnomes for Final Battle//
  battleMusic = loadSound("soundsResource/finalBattle.mp3");
  enemyDeath = loadSound("soundsResource/enemyDeath.mp3");
  hurtSound = loadSound("soundsResource/hurtSound.mp3");
  lichWins = loadSound("soundsResource/lichWins.mp3");
  mageHit = loadSound("soundsResource/mageHit.mp3");
  partyWins = loadSound("soundsResource/partyWins.mp3");
  spellCast = loadSound("soundsResource/spellCast.mp3");
  swordSwing = loadSound("soundsResource/swordSwing.mp3");
  lightningSpell = loadSound("soundsResource/lightningSpell.mp3");
  explode = loadSound("soundsResource/explode.mp3");
  iceSpell = loadSound("soundsResource/iceSpell.mp3");
  freezeImpact = loadSound("soundsResource/freezeImpact.mp3");
  teleSound = loadSound("soundsResource/teleSound.mp3");
  clockTick = loadSound("soundsResource/clockTick.mp3");
  gongHit = loadSound("soundsResource/gongHit.mp3");
  minionFire = loadSound("soundsResource/minionFire.mp3");
}

function setup() {
  createCanvas(900, 1200);
  rectMode(CENTER);
  frameRate(60);

  battleMusic.setVolume(.15);
  spellCast.setVolume(.25);
  mageHit.setVolume(1);
  lightningSpell.setVolume(.20);
  explode.setVolume(.05);
  clockTick.setVolume(2.5);
  gongHit.setVolume(.20);
  minionFire.setVolume(1.20);
  teleSound.setVolume(.5);

  let p = new PlayerB(450, 210, 10, 10, 4); 
  player.push(p);

  let e1 = new enemyUnit(450, 565, 10, 0, 15); 
  enemySpawns.push(e1);

  let e2 = new enemyUnit(350, 565, 10, 1, 25); 
  enemySpawns.push(e2);

  let e3 = new enemyUnit(550, 565, 10, 2, 20); 
  enemySpawns.push(e3);

  let e4 = new enemyUnit(450, 665, 10, 3, 15); 
  enemySpawns.push(e4);

  let spell1 = new spellCard(120, 1025, 0, 0); 
  spellRack.push(spell1);
  let spell2 = new spellCard(340, 1025, 1, 1); 
  spellRack.push(spell2);
  let spell3 = new spellCard(560, 1025, 1, 2); 
  spellRack.push(spell3);
  let spell4 = new spellCard(780, 1025, 1, 3); 
  spellRack.push(spell4);

  let en1 = new enemyNavUnit(170, 250); 
  enemyNavRef.push(en1);
  let en5 = new enemyNavUnit(355, 250); 
  enemyNavRef.push(en5);
  let en6 = new enemyNavUnit(545, 250); 
  enemyNavRef.push(en6);
  let en2 = new enemyNavUnit(730, 250); 
  enemyNavRef.push(en2);
  let en3 = new enemyNavUnit(170, 690); 
  enemyNavRef.push(en3);
  let en4 = new enemyNavUnit(730, 690); 
  enemyNavRef.push(en4);
  let en7 = new enemyNavUnit(355, 690); 
  enemyNavRef.push(en7);
  let en8 = new enemyNavUnit(545, 690); 
  enemyNavRef.push(en8);

  let en9 = new enemyNavUnit(170, 395); 
  enemyNavRef.push(en9);
  let en10 = new enemyNavUnit(355, 395); 
  enemyNavRef.push(en10);
  let en11 = new enemyNavUnit(545, 395); 
  enemyNavRef.push(en11);
  let en12 = new enemyNavUnit(730, 395); 
  enemyNavRef.push(en12);

  let en13 = new enemyNavUnit(170, 545); 
  enemyNavRef.push(en13);
  let en14 = new enemyNavUnit(730, 545); 
  enemyNavRef.push(en14);
  let en15 = new enemyNavUnit(355, 545); 
  enemyNavRef.push(en15);
  let en16 = new enemyNavUnit(545, 545); 
  enemyNavRef.push(en16);

  for (let i = 0; i < spellRack.length; i++) {
    spellRack[i].rerollCard();
  }
  
}

function draw() {

  if (gameState === 0) {
    background(100);
    imageMode(CENTER);
    image(titleImg, 450, 600);

    if (battleMusic.isPlaying() === true) {
          battleMusic.stop();
      }
  } else if (gameState === 2) {
    background(100);
    imageMode(CENTER);
    image(victoryImg, 450, 600);
    if (battleMusic.isPlaying() === true) {
          battleMusic.stop();
          lichWins.play();
      }
  } else if (gameState === 3 ) {
    background(100);
    imageMode(CENTER);
    image(deathImg, 450, 600);
    if (battleMusic.isPlaying() === true) {
          battleMusic.stop();
          partyWins.play();
      }
  } else {

    if (battleMusic.isPlaying() === false) {
        battleMusic.play();
      }
    
  background(100);
  imageMode(CENTER);
  image(backgroundImg, 450, 600);
  rectMode(CENTER);
  

  for (let i = 0; i < spellRack.length; i++) {
    spellRack[i].display();
  }

  for (let i = 0; i < enemyNavRef.length; i++) {
    enemyNavRef[i].display();
  }

  for (let i = 0; i < player[0].health; i++) {
    rectMode(CENTER);
    fill(255, 100, 100);
    rect(165.75 +(i * 81), 62, 81, 70);
  }

  for (let i = 0; i < dBulletsActive.length; i++) {
    dBulletsActive[i].display();
    dBulletsActive[i].move();

    if (dBulletsActive[i].lifespan <= 0) {
      dBulletsActive.splice([i], 1)
    }
  }

  //displays player
  player[0].display();

   for (let i = 0; i < enemySpawns.length; i++) {
    enemySpawns[i].display();
  }

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

image(healthOverlayImg, 450, 600);

//victory check//
let deathCheck = true;
for (let i = 0; i < enemySpawns.length; i++) {
    if (enemySpawns[i].isDead === false) {
      deathCheck = false;
    }
  }

if (deathCheck) {
  gameState = 2;
}


  }

}

class spellCard {
  constructor(tempX, tempY, thisCardType, tempSlot) {
    this.x = tempX;
    this.y = tempY;
    this.damageValue = 1;
    this.spellName = "PLACEHOLDER";
    this.cooldownTime = 10;
    this.cardType = thisCardType;
    this.spellID;
    this.slot = tempSlot;
    this.onCooldown = false;
    this.realCooldown = 10;
    this.tick = 60;
  }

  display(){
    rectMode(CENTER);
    

    fill(255);
    textSize(60);
    text(this.damageValue, this.x +55, this.y+120);


    textSize(35);
    text("CD", this.x -90, this.y+90);
    text(this.cooldownTime, this.x -85, this.y+125);

    textSize(24);
    text(this.spellName, this.x -90, this.y-100);

    if (this.cardType === 0) {
      if (this.spellID === 1){
        image(blinkImg, this.x, this.y, 180, 180);
      } else if (this.spellID === 2) {
        
      } else if (this.spellID === 3) {
        image(blitzImg, this.x, this.y, 180, 180);
      }
    } else {
      if (this.spellID === 1){
        image(missileImg, this.x, this.y, 180, 180);
      } else if (this.spellID === 2){
       image(boltVImg, this.x, this.y, 40, 180);
      } else if (this.spellID === 3){
        image(sparkImg, this.x, this.y, 180, 180);
      } else if (this.spellID === 4){
       image(drainImg, this.x, this.y, 180, 180);
      } else if (this.spellID === 5){
        image(spikesHImg, this.x, this.y, 180, 40);
      } else if (this.spellID === 6){
        image(minionImg, this.x, this.y, 180, 180);
      } else if (this.spellID === 7){
        image(fireballImg, this.x, this.y, 180, 180);
      } else if (this.spellID === 8){
        image(freezeImg, this.x, this.y, 180, 180);
      } else if (this.spellID === 9){
        image(unmakeImg, this.x, this.y, 180, 180);
      }
    }
    if (this.onCooldown === true){
      fill(0, 0, 0, 150);
      rect(this.x, this.y, 200, 300);
      fill(255, 255, 255);
      textSize(164);
      textAlign(CENTER);
      text(this.realCooldown, this.x -5, this.y+50);
      textAlign(LEFT);

      this.tick--;
      if (this.tick <= 0) {
        this.tick = 60;
        this.realCooldown--;
        if (this.realCooldown <= 0) {
          this.onCooldown = false;
        }
      }

    }
    
  }

  rerollCard(){
    if (this.cardType === 0) {
      this.spellID = random(mobilityCardID);

      if (this.spellID === 1){
        this.spellName = "Blink"
        this.cooldownTime = 6; 
        this.damageValue = 0;
      } else if (this.spellID === 2) {
        this.spellName = "Vanish"
        this.cooldownTime = 4; 
        this.damageValue = 0;
      } else if (this.spellID === 3) {
        this.spellName = "Blitz"
        this.cooldownTime = 8; 
        this.damageValue = 4;
      }
    } else {
      this.spellID = random(attackCardID);

      if (this.spellID === 1){
        this.spellName = "Magic Missile"
        this.cooldownTime = 2; 
        this.damageValue = 1;
      } else if (this.spellID === 2){
        this.spellName = "Bolt"
        this.cooldownTime = 2; 
        this.damageValue = 2;
      } else if (this.spellID === 3){
        this.spellName = "Spark"
        this.cooldownTime = 7; 
        this.damageValue = 3;
      } else if (this.spellID === 4){
        this.spellName = "Drain"
        this.cooldownTime = 10; 
        this.damageValue = 1;
      } else if (this.spellID === 5){
        this.spellName = "Spike"
        this.cooldownTime = 4; 
        this.damageValue = 2;
      } else if (this.spellID === 6){
        this.spellName = "Summon"
        this.cooldownTime = 8; 
        this.damageValue = 2;
      } else if (this.spellID === 7){
        this.spellName = "Fire Orb"
        this.cooldownTime = 8; 
        this.damageValue = 2;
      } else if (this.spellID === 8){
        this.spellName = "Freeze"
        this.cooldownTime = 6; 
        this.damageValue = 1;
      } else if (this.spellID === 9){
        this.spellName = "Unmake"
        this.cooldownTime = 12; 
        this.damageValue = 5;
      }
      
      if (this.spellID === recentAttackIDa) {
        this.rerollCard();
      } else if (this.spellID === recentAttackIDb) {
        this.rerollCard();
      } else if (this.slot === 1 && this.spellID === spellRack[2].spellID){
        this.rerollCard();
      } else if (this.slot === 1 && this.spellID === spellRack[3].spellID){
        this.rerollCard();
      } else if (this.slot === 2 && this.spellID === spellRack[1].spellID){
        this.rerollCard();
      } else if (this.slot === 2 && this.spellID === spellRack[3].spellID){
        this.rerollCard();
      } else if (this.slot === 3 && this.spellID === spellRack[1].spellID){
        this.rerollCard();
      } else if (this.slot === 3 && this.spellID === spellRack[2].spellID){
        this.rerollCard();
      }
      
      
      
      
      else {
        if (recentToggle === 0) {
          recentToggle = 1;
          recentAttackIDa = this.spellID;
        } else {
          recentToggle = 2;
          recentAttackIDb = this.spellID;
        }
      }

    }
  }

} 

function keyPressed() {

  if (keyCode === 13 && gameState === 0) {
    gameState = 1;
  } else if (keyCode === 13 && gameState === 2) {
    resetGame();
  } else if (keyCode === 13 && gameState === 3) {
    resetGame();
  }

  if (keyCode === 49) {
    if (spellRack[0].onCooldown === false) {
      player[0].activateSpell(spellRack[0].cardType, spellRack[0].spellID);
      spellRack[0].realCooldown = spellRack[0].cooldownTime;
      spellRack[0].onCooldown = true;
      spellRack[0].rerollCard();
    }

  } else if (keyCode === 50) {
    if (spellRack[1].onCooldown === false) {
      player[0].activateSpell(spellRack[1].cardType, spellRack[1].spellID);
      spellRack[1].realCooldown = spellRack[1].cooldownTime;
      spellRack[1].onCooldown = true;
      spellRack[1].rerollCard();
    }
  } else if (keyCode === 51) {
    if (spellRack[2].onCooldown === false) {
      player[0].activateSpell(spellRack[2].cardType, spellRack[2].spellID);
      spellRack[2].realCooldown = spellRack[2].cooldownTime;
      spellRack[2].onCooldown = true;
      spellRack[2].rerollCard();
    }
  } else if (keyCode === 52) {
    if (spellRack[3].onCooldown === false) {
      player[0].activateSpell(spellRack[3].cardType, spellRack[3].spellID);
      spellRack[3].realCooldown = spellRack[3].cooldownTime;
      spellRack[3].onCooldown = true;
      spellRack[3].rerollCard();
    }
  }
}

function pointInRect(px, py, rx, ry, rw, rh) {
  return (
    px >= rx - rw/2 &&
    px <= rx + rw/2 &&
    py >= ry - rh/2 &&
    py <= ry + rh/2
  );
}

function resetGame() {
  player[0].health = 10;
  player[0].x = 450;
  player[0].y = 250;

  enemySpawns[0].isDead = false;
  enemySpawns[0].health = 15;
  enemySpawns[0].x = 450;
  enemySpawns[0].y = 565;
  enemySpawns[0].frozenTime = 0;

  enemySpawns[1].isDead = false;
  enemySpawns[1].health = 25;
  enemySpawns[1].x = 350;
  enemySpawns[1].y = 565;
  enemySpawns[1].frozenTime = 0;

  enemySpawns[2].isDead = false;
  enemySpawns[2].health = 20;
  enemySpawns[2].x = 550;
  enemySpawns[2].y = 565;
  enemySpawns[2].frozenTime = 0;

  enemySpawns[3].isDead = false;
  enemySpawns[3].health = 15;
  enemySpawns[3].x = 450;
  enemySpawns[3].y = 665;
  enemySpawns[3].frozenTime = 0;

  gameState = 1;
}