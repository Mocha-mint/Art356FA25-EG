class PlayerB {
  constructor(tempX, tempY, tempW, tempH, tempS) {
    this.x = tempX;
    this.y = tempY;
    this.width = tempW;
    this.height = tempH;
    this.speed = tempS;
    this.color = 255;
    this.toggleFlip = false;
    this.toggleDelay = 10;
    this.health = 8;
    this.invincibilityTimer = 0;
    this.magicMissileArray = [];
    this.sparkArray = [];
    this.boltArray = [];
    this.spikeArray = [];
    this.drainArray = [];
    this.unmakeArray = [];
    this.freezeArray = [];
    this.fireOrbArray = [];
    this.blitzArray = [];
    this.summonArray = [];
    this.shadowGuard = false;
    this.shadowTimer = 0;
    this.blinkDisplay = 0;
  }

  display() {

    if (direction === 'up') {
      if (this.invincibilityTimer > 0) {
      tint(255, 0, 0, 100);
    }

    if (this.shadowGuard) {
      tint(255, 255, 255, 100);
    }

      imageMode(CENTER);
      image(playerTImg, this.x, this.y, 50, 50);
      noTint();
    } else if (direction === 'left') {
      if (this.invincibilityTimer > 0) {
      tint(255, 0, 0, 100);
    }

    if (this.shadowGuard) {
      tint(255, 255, 255, 100);
    }
      imageMode(CENTER);
      image(playerLImg, this.x, this.y, 50, 50);
      noTint();
    } else if (direction === 'right') {
      if (this.invincibilityTimer > 0) {
      tint(255, 0, 0, 100);
    }

    if (this.shadowGuard) {
      tint(255, 255, 255, 100);
    }
      imageMode(CENTER);
      image(playerRImg, this.x, this.y, 50, 50);
      noTint();
    } else if (direction === 'down') {
      if (this.invincibilityTimer > 0) {
      tint(255, 0, 0, 100);
    }

    if (this.shadowGuard) {
      tint(255, 255, 255, 100);
    }
      imageMode(CENTER);
      image(playerImg, this.x, this.y, 50, 50);
      noTint();
    } 

    if (this.blinkDisplay > 0){
      image(blinkImg, this.x, this.y, 100, 100);
      this.blinkDisplay--;
    }
    

    this.spellLogic();


    if (this.invincibilityTimer > 0) {
      this.invincibilityTimer--;
    }

    if (this.shadowTimer > 0) {
      this.shadowTimer--;

      if (this.shadowTimer <= 0) {
        this.shadowGuard = false;
      }
    }
  } 

  sufferDamage() {
    if (this.invincibilityTimer < 1 && this.shadowGuard === false) {
      this.health--;
    this.invincibilityTimer = 60;
    hurtSound.play();

    if (this.health <= 0) {
      gameState = 3;
    } 
    }
  }

  activateSpell(type, id) {
    this.originX = this.x;
    this.originY = this.y;
    this.pendingType = type;
    this.pendingID = id;
    
    //calculateOrigin//
      if (direction === 'up') {
      this.originY = this.originY - 50;
    } else if (direction === 'left') {
      this.originX = this.originX - 50;
    } else if (direction === 'right') {
      this.originX = this.originX + 50;
    } else if (direction === 'down') {
      this.originY = this.originY + 50;
    } 
    //calcEnd//

    //getClosestEnemy//
    this.shortestDist = 20000;
    this.pendingTarget = null;
    for (let i = 0; i < enemySpawns.length; i++) {
      let IntDis = dist(enemySpawns[i].x, enemySpawns[i].y, this.originX, this.originY);
      if (enemySpawns[i].isDead === false) {
        if (IntDis < this.shortestDist) {
      this.shortestDist = IntDis;
      this.pendingTarget = enemySpawns[i];
    }
      }
    }
    //gotClosestEnemy//


    if (this.pendingType === 0) {
      
      if (this.pendingID === 1) {
        player[0].blinkDisplay = 60;
        teleSound.play();
        if (direction === 'up') {
      this.y = this.y - 150;
    } else if (direction === 'left') {
       this.x = this.x - 150;
    } else if (direction === 'right') {
      this.x = this.x + 150;
    } else if (direction === 'down') {
      this.y = this.y + 150;
    } 


      } else if (this.pendingID === 2) {
        spellCast.play();
        this.shadowTimer = 120;
        this.shadowGuard = true;
      } else if (this.pendingID === 3) {
        lightningSpell.play();
        let b1 = new blitz(this.originX, this.originY, 20, direction);
      this.blitzArray.push(b1);
      if (direction === 'up') {
      this.y = this.y - 125;
    } else if (direction === 'left') {
      this.x = this.x - 125;
    } else if (direction === 'right') {
      this.x = this.x + 125;
    } else if (direction === 'down') {
      this.y = this.y + 125;
    }  
      }
    } else {
      if (this.pendingID === 1) {
        spellCast.play();
        let b1 = new magicMissile(this.originX, this.originY, 20, this.pendingTarget);
      this.magicMissileArray.push(b1); 
      let b2 = new magicMissile(this.originX+50, this.originY, 20, this.pendingTarget);
      this.magicMissileArray.push(b2); 
      let b3 = new magicMissile(this.originX-50, this.originY, 20, this.pendingTarget);
      this.magicMissileArray.push(b3); 
      } else if (this.pendingID === 2) {
        lightningSpell.play();
        let b1 = new bolt(this.originX, this.originY, 20, direction);
      this.boltArray.push(b1); 
      } else if (this.pendingID === 3) {
        lightningSpell.play();
        let s1 = new spark(this.originX, this.originY, 20, direction);
      this.sparkArray.push(s1); 
      } else if (this.pendingID === 4) {
        spellCast.play();
        let s1 = new drain(this.originX, this.originY, 125, direction);
      this.drainArray.push(s1); 
      } else if (this.pendingID === 5) {
        spellCast.play();
        let s1 = new spike(this.originX, this.originY, 20, direction);
      this.spikeArray.push(s1); 
      } else if (this.pendingID === 6) {
        spellCast.play();
        let s1 = new summon(this.originX, this.originY, 60, direction);
      this.summonArray.push(s1); 
      } else if (this.pendingID === 7) {
        spellCast.play();
        let f1 = new fireOrb(this.originX, this.originY, 100, direction);
      this.fireOrbArray.push(f1); 
      } else if (this.pendingID === 8) {
        iceSpell.play();
        let f1 = new freeze(this.originX, this.originY, 20, this.pendingTarget);
      this.freezeArray.push(f1); 
      } else if (this.pendingID === 9) {
        clockTick.play();
        let u1 = new unmake(this.originX, this.originY, 75, direction);
      this.unmakeArray.push(u1); 
      }
    }

    
  }

  spellLogic() {
    
    for (let i = 0; i < this.magicMissileArray.length; i++) {
        this.magicMissileArray[i].update();

        if (this.magicMissileArray[i].triggered) {
          for (let j = 0; j < enemySpawns.length; j++) {
            this.magicMissileArray[i].attemptDamage(enemySpawns[j]);
          }
          

          this.magicMissileArray.splice(i, 1);
        }
      }

    for (let i = 0; i < this.sparkArray.length; i++) {
        this.sparkArray[i].update();

        if (this.sparkArray[i].triggered) {
          for (let j = 0; j < enemySpawns.length; j++) {
            this.sparkArray[i].attemptDamage(enemySpawns[j]);
          }
          

          this.sparkArray.splice(i, 1);
        }
      }

    for (let i = 0; i < this.boltArray.length; i++) {
        this.boltArray[i].update();

        if (this.boltArray[i].triggered) {
          for (let j = 0; j < enemySpawns.length; j++) {
            this.boltArray[i].attemptDamage(enemySpawns[j]);
          }
          

          this.boltArray.splice(i, 1);
        }
      }

    for (let i = 0; i < this.spikeArray.length; i++) {
        this.spikeArray[i].update();

        if (this.spikeArray[i].triggered) {
          for (let j = 0; j < enemySpawns.length; j++) {
            this.spikeArray[i].attemptDamage(enemySpawns[j]);
          }
          

          this.spikeArray.splice(i, 1);
        }
      }

    for (let i = 0; i < this.drainArray.length; i++) {
        this.drainArray[i].update();

        if (this.drainArray[i].triggered) {
          for (let j = 0; j < enemySpawns.length; j++) {
            this.drainArray[i].attemptDamage(enemySpawns[j]);
          }
          

          this.drainArray.splice(i, 1);
        }
      }

      for (let i = 0; i < this.unmakeArray.length; i++) {
        this.unmakeArray[i].update();

        if (this.unmakeArray[i].triggered) {
          for (let j = 0; j < enemySpawns.length; j++) {
            this.unmakeArray[i].attemptDamage(enemySpawns[j]);
          }
          

          this.unmakeArray.splice(i, 1);
        }
      }

      for (let i = 0; i < this.freezeArray.length; i++) {
        this.freezeArray[i].update();

        if (this.freezeArray[i].triggered) {
          for (let j = 0; j < enemySpawns.length; j++) {
            this.freezeArray[i].attemptDamage(enemySpawns[j]);
          }
          

          this.freezeArray.splice(i, 1);
        }
      }

      for (let i = 0; i < this.fireOrbArray.length; i++) {
        this.fireOrbArray[i].update();

        if (this.fireOrbArray[i].triggered) {
          for (let j = 0; j < enemySpawns.length; j++) {
            this.fireOrbArray[i].attemptDamage(enemySpawns[j]);
          }
          

          this.fireOrbArray.splice(i, 1);
        }
      }

      for (let i = 0; i < this.blitzArray.length; i++) {
        this.blitzArray[i].update();

        if (this.blitzArray[i].triggered) {
          for (let j = 0; j < enemySpawns.length; j++) {
            this.blitzArray[i].attemptDamage(enemySpawns[j]);
          }
          

          this.blitzArray.splice(i, 1);
        }
      }

      for (let i = 0; i < this.summonArray.length; i++) {
        this.summonArray[i].update();

        if (this.summonArray[i].triggered) {
          for (let j = 0; j < enemySpawns.length; j++) {
            this.summonArray[i].attemptDamage(enemySpawns[j]);
          }
          

          this.summonArray.splice(i, 1);
        }
      }


  }
 

  move(direction) {
    this.toggleDelay--;

    if (this.toggleDelay < 1) {
      if (this.toggleFlip === true) {
        this.toggleFlip = false;
        this.toggleDelay = 10;
      } else if (this.toggleFlip === false) {
        this.toggleFlip = true;
        this.toggleDelay = 10;
      }
    }

    switch (direction) {
      case "up":
        this.y -= this.speed;
        break;
      case "down":
        this.y += this.speed;
        break;
      case "left":
        this.x -= this.speed;
        break;
      case "right":
        this.x += this.speed;
        break;
    }

    if (this.x > 770) {
      this.x = 770;
    } else if (this.x < 120) {
      this.x = 120;
    }

    if (this.y > 720) {
      this.y = 720;
    } else if (this.y < 220) {
      this.y = 220;
    }
  }
}

class magicMissile {
  constructor(x, y, r, target) {
    this.x = x;
    this.y = y;
    this.startTime = millis();
    this.delay = 5000; 
    this.triggered = false;
    this.radius = r;
    this.target = target;
  }

  update() {
    if (millis() - this.startTime >= this.delay) {
      this.triggered = true;
    }

    let dis = dist(this.x, this.y, this.target.x, this.target.y);       
                let vx = ((this.target.x - this.x) / dis) * 6;
                let vy = ((this.target.y - this.y) / dis) * 6;
                this.x = this.x + min(10, vx);
                this.y = this.y + min(10, vy);

    this.display();

    let d = dist(this.x, this.y, this.target.x, this.target.y);
    if (d < this.radius) {
      this.triggered = true;
    }

  }

  attemptDamage(enemy) {
    let d = dist(this.x, this.y, enemy.x, enemy.y);
    if (d < this.radius) {
      enemy.sufferDamage(1);
    }
  }

  display() {
    // placeholder //
    stroke(125,0, 0);
    fill(125, 0, 120);
    ellipse(this.x, this.y, this.radius * 2);
    image(missileImg, this.x, this.y, 80, 80);
    stroke(0);
  }
}

class spark {
  constructor(x, y, r, thisDirection) {
    this.x = x;
    this.y = y;
    this.startTime = millis();
    this.delay = 300; 
    this.triggered = false;
    this.radius = r;
    this.intDirection = thisDirection;
  }

  update() {
    if (millis() - this.startTime >= this.delay) {
      this.triggered = true;
    }

   if (this.intDirection === 'up') {
      this.y = this.y - 9;
    } else if (this.intDirection === 'left') {
      this.x = this.x - 9;
    } else if (this.intDirection === 'right') {
      this.x = this.x + 9;
    } else if (this.intDirection === 'down') {
      this.y = this.y + 9;
    } 

    this.display();

    for (let j = 0; j < enemySpawns.length; j++) {
      let d = dist(this.x, this.y, enemySpawns[j].x, enemySpawns[j].y);
            if (d < 10) {
      this.triggered = true;
    }
    }  

  }

  attemptDamage(enemy) {
    explode.play();
    let d = dist(this.x, this.y, enemy.x, enemy.y);
    if (d < this.radius * 8) {
      enemy.sufferDamage(3);
    }
  }

  display() {
    // placeholder //
    stroke(125,0, 0);
    fill(205, 100, 0);
    ellipse(this.x, this.y, this.radius * 1);
    fill(205, 100, 0, 90);
    ellipse(this.x, this.y, 160);
    stroke(0);
    image(sparkImg, this.x, this.y, 80, 80);
  }
}

class bolt {
  constructor(x, y, r, thisDirection) {
    this.x = x;
    this.y = y;
    this.startTime = millis();
    this.delay = 100; 
    this.triggered = false;
    this.radius = r;
    this.intDirection = thisDirection;
    this.w = 20;
    this.h = 20;

    if (this.intDirection === 'up') {
      this.h = 300;
      this.w = 55;
      this.y -= 125;
    } else if (this.intDirection === 'left') {
      this.h = 55;
      this.w = 300;
      this.x -= 125;
    } else if (this.intDirection === 'right') {
      this.h = 55;
      this.w = 300;
      this.x += 125;
    } else if (this.intDirection === 'down') {
      this.h = 300;
      this.w = 55;
      this.y += 125;
    }

  }

  update() {
    if (millis() - this.startTime >= this.delay) {
      this.triggered = true;
    }

   

    this.display();

    
    

  }

  attemptDamage(enemy) {
    if (pointInRect(enemy.x, enemy.y, this.x, this.y, this.w, this.h)) {
      enemy.sufferDamage(2);
    }
  }

  display() {
    // placeholder //
    stroke(125,0, 0);
    fill(205, 100, 0, 100);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);

    if (this.intDirection === 'up') {
      image(boltVImg, this.x, this.y, 55, 300);
    } else if (this.intDirection === 'left') {
      image(boltHImg, this.x, this.y, 300, 55);
    } else if (this.intDirection === 'right') {
      image(boltHImg, this.x, this.y, 300, 55);
    } else if (this.intDirection === 'down') {
      image(boltVImg, this.x, this.y, 55, 300);
    } 
    stroke(0);
  }
}

class spike {
  constructor(x, y, r, thisDirection) {
    this.x = x;
    this.y = y;
    this.startTime = millis();
    this.delay = 400; 
    this.triggered = false;
    this.radius = r;
    this.intDirection = thisDirection;
    this.w = 20;
    this.h = 20;

    if (this.intDirection === 'up') {
      this.h = 75;
      this.w = 300;
      this.y -= 125;
    } else if (this.intDirection === 'left') {
      this.h = 300;
      this.w = 75;
      this.x -= 125;
    } else if (this.intDirection === 'right') {
      this.h = 300;
      this.w = 75;
      this.x += 125;
    } else if (this.intDirection === 'down') {
      this.h = 75;
      this.w = 300;
      this.y += 125;
    }

  }

  update() {
    if (millis() - this.startTime >= this.delay) {
      this.triggered = true;
    }

   if (this.intdirection === 'up') {
      
    } else if (this.intdirection === 'left') {
      
    } else if (this.intdirection === 'right') {
      
    } else if (this.intdirection === 'down') {
      
    } 

    this.display();

    
    

  }

  attemptDamage(enemy) {
    if (pointInRect(enemy.x, enemy.y, this.x, this.y, this.w, this.h)) {
      enemy.sufferDamage(2);
    }
  }

  display() {
    // placeholder //
    stroke(125,0, 0);
    fill(125, 100, 100, 100);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h)
    if (this.intDirection === 'up') {
      image(spikesHImg, this.x, this.y, 300, 75);
    } else if (this.intDirection === 'left') {
      image(spikesVImg, this.x, this.y, 75, 300);
    } else if (this.intDirection === 'right') {
      image(spikesVImg, this.x, this.y, 75, 300);
    } else if (this.intDirection === 'down') {
      image(spikesHImg, this.x, this.y, 300, 75);
    } 
    stroke(0);
  }
}

class drain {
  constructor(x, y, r, thisDirection) {
    this.x = x;
    this.y = y;
    this.startTime = millis();
    this.delay = 800; 
    this.triggered = false;
    this.radius = r;
    this.intDirection = thisDirection;

    if (this.intDirection === 'up') {
      
      this.y -= 125;
    } else if (this.intDirection === 'left') {
      
      this.x -= 125;
    } else if (this.intDirection === 'right') {
      
      this.x += 125;
    } else if (this.intDirection === 'down') {
      
      this.y += 125;
    }
  }

  update() {
    if (millis() - this.startTime >= this.delay) {
      this.triggered = true;
    }


    this.display();

    for (let j = 0; j < enemySpawns.length; j++) {
      let d = dist(this.x, this.y, enemySpawns[j].x, enemySpawns[j].y);
            if (d < 10) {
      this.triggered = true;
    }
    }  

  }

  attemptDamage(enemy) {
    let d = dist(this.x, this.y, enemy.x, enemy.y);
    if (d < this.radius) {
      enemy.sufferDamage(1);

      if (player[0].health < 8) {
        player[0].health++;
      }

    }
  }

  display() {
    // placeholder //
    stroke(125,0, 0);
    fill(45, 150, 106);
    
    image(drainImg, this.x, this.y, 260, 260);
    stroke(0);
  }
}

class unmake {
  constructor(x, y, r, thisDirection) {
    this.x = x;
    this.y = y;
    this.startTime = millis();
    this.delay = 1200; 
    this.triggered = false;
    this.radius = r;
    this.intDirection = thisDirection;

    if (this.intDirection === 'up') {
      
      this.y -= 150;
    } else if (this.intDirection === 'left') {
      
      this.x -= 150;
    } else if (this.intDirection === 'right') {
      
      this.x += 150;
    } else if (this.intDirection === 'down') {
      
      this.y += 150;
    }
  }

  update() {
    if (millis() - this.startTime >= this.delay) {
      this.triggered = true;
    }


    this.display();

    for (let j = 0; j < enemySpawns.length; j++) {
      let d = dist(this.x, this.y, enemySpawns[j].x, enemySpawns[j].y);
            if (d < 10) {
      this.triggered = true;
    }
    }  

  }

  attemptDamage(enemy) {
    gongHit.play();
    let d = dist(this.x, this.y, enemy.x, enemy.y);
    if (d < this.radius) {
      enemy.sufferDamage(5);

    

    }
  }

  display() {
    // placeholder //
    stroke(125,0, 0);
    fill(20, 20, 20);
    ellipse(this.x, this.y, this.radius * 2);
    image(unmakeImg, this.x, this.y, 140, 140);
    stroke(0);
  }
}

class freeze {
  constructor(x, y, r, target) {
    this.x = x;
    this.y = y;
    this.startTime = millis();
    this.delay = 5000; 
    this.triggered = false;
    this.radius = r;
    this.target = target;
  }

  update() {
    if (millis() - this.startTime >= this.delay) {
      this.triggered = true;
    }

    let dis = dist(this.x, this.y, this.target.x, this.target.y);       
                let vx = ((this.target.x - this.x) / dis) * 6;
                let vy = ((this.target.y - this.y) / dis) * 6;
                this.x = this.x + min(10, vx);
                this.y = this.y + min(10, vy);

    this.display();

    let d = dist(this.x, this.y, this.target.x, this.target.y);
    if (d < this.radius) {
      this.triggered = true;
    }

  }

  attemptDamage(enemy) {
    let d = dist(this.x, this.y, enemy.x, enemy.y);
    if (d < this.radius) {
      enemy.sufferDamage(1);
      enemy.triggerFreeze();
    }
  }

  display() {
    // placeholder //
    stroke(125,0, 0);
    fill(0, 0, 200);
    ellipse(this.x, this.y, this.radius * 2);
    image(freezeImg, this.x, this.y-25, 80, 80);
    stroke(0);
  }
}

class fireOrb {
  constructor(x, y, r, thisDirection) {
    this.x = x;
    this.y = y;
    this.startTime = millis();
    this.delay = 900; 
    this.triggered = false;
    this.radius = r;
    this.intDirection = thisDirection;
    this.extra1 = false;
    this.extra2 = false;
    this.extra3 = false;
  }

  update() {

    if (this.extra3 === false) {
        this.extra3 = true;
        for (let j = 0; j < enemySpawns.length; j++) {
            this.attemptDamage(enemySpawns[j]);
          }
      }


    if (millis() - this.startTime >= this.delay) {
      this.triggered = true;
    }

    if (millis() - this.startTime >= 300) {
      if (this.extra1 === false) {
        this.extra1 = true;
        for (let j = 0; j < enemySpawns.length; j++) {
            this.attemptDamage(enemySpawns[j]);
          }
      }
    }

    if (millis() - this.startTime >= 600) {
      if (this.extra2 === false) {
        this.extra2 = true;
        for (let j = 0; j < enemySpawns.length; j++) {
            this.attemptDamage(enemySpawns[j]);
          }
      }
    }

   if (this.intDirection === 'up') {
      this.y = this.y - 2;
    } else if (this.intDirection === 'left') {
      this.x = this.x - 2;
    } else if (this.intDirection === 'right') {
      this.x = this.x + 2;
    } else if (this.intDirection === 'down') {
      this.y = this.y + 2;
    } 

    this.display();

    for (let j = 0; j < enemySpawns.length; j++) {
      let d = dist(this.x, this.y, enemySpawns[j].x, enemySpawns[j].y);
            if (d < 10) {
      this.triggered = true;
    }
    }  

  }

  attemptDamage(enemy) {
    let d = dist(this.x, this.y, enemy.x, enemy.y);
    if (d < this.radius) {
      enemy.sufferDamage(2);
    }
  }

  display() {
    // placeholder //
    
    stroke(125,0, 0);
    fill(205, 100, 0);
    stroke(0);
    image(fireballImg, this.x, this.y, 120, 120);
  }
}

class blitz {
  constructor(x, y, r, thisDirection) {
    this.x = x;
    this.y = y;
    this.startTime = millis();
    this.delay = 100; 
    this.triggered = false;
    this.radius = r;
    this.intDirection = thisDirection;
    this.w = 20;
    this.h = 20;

    if (this.intDirection === 'up') {
      this.h = 175;
      this.w = 50;
      this.y -= 25;
    } else if (this.intDirection === 'left') {
      this.h = 50;
      this.w = 175;
      this.x -= 25;
    } else if (this.intDirection === 'right') {
      this.h = 50;
      this.w = 175;
      this.x += 25;
    } else if (this.intDirection === 'down') {
      this.h = 175;
      this.w = 50;
      this.y += 25;
    }

  }

  update() {
    if (millis() - this.startTime >= this.delay) {
      this.triggered = true;
    }

   if (this.intdirection === 'up') {
      
    } else if (this.intdirection === 'left') {
      
    } else if (this.intdirection === 'right') {
      
    } else if (this.intdirection === 'down') {
      
    } 

    this.display();

    
    

  }

  attemptDamage(enemy) {
    if (pointInRect(enemy.x, enemy.y, this.x, this.y, this.w, this.h)) {
      enemy.sufferDamage(4);
    }
  }

  display() {
    // placeholder //
    stroke(125,0, 0);
    fill(200, 200, 0, 50);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h)
    image(blitzImg, this.x, this.y, this.w, this.h);
    stroke(0);
  }
}

class summon {
  constructor(x, y, r, thisDirection) {
    this.x = x;
    this.y = y;
    this.startTime = millis();
    this.delay = 1500; 
    this.triggered = false;
    this.radius = r;
    this.intDirection = thisDirection;
    this.extra1 = false;
    this.extra2 = false;

    if (this.intDirection === 'up') {
      
      this.y -= 100;
    } else if (this.intDirection === 'left') {
      
      this.x -= 100;
    } else if (this.intDirection === 'right') {
      
      this.x += 100;
    } else if (this.intDirection === 'down') {
      
      this.y += 100;
    }
  }

  update() {


    if (millis() - this.startTime >= this.delay) {
      this.triggered = true;
    }

    if (millis() - this.startTime >= 500) {
      if (this.extra1 === false) {
        this.extra1 = true;
        minionFire.play();

        //getClosestEnemy//
    this.shortestDist = 20000;
    this.pendingTarget = null;
    for (let i = 0; i < enemySpawns.length; i++) {
      let IntDis = dist(enemySpawns[i].x, enemySpawns[i].y, this.x, this.y);
      if (enemySpawns[i].isDead === false) {
        if (IntDis < this.shortestDist) {
      this.shortestDist = IntDis;
      this.pendingTarget = enemySpawns[i];
    }
      }
    }
    
    let b1 = new magicMissile(this.x, this.y, 20, this.pendingTarget);
    player[0].magicMissileArray.push(b1); 

      }
    }

    if (millis() - this.startTime >= 1000) {
      if (this.extra2 === false) {
        this.extra2 = true;
        minionFire.play();

        //getClosestEnemy//
    this.shortestDist = 20000;
    this.pendingTarget = null;
    for (let i = 0; i < enemySpawns.length; i++) {
      let IntDis = dist(enemySpawns[i].x, enemySpawns[i].y, this.x, this.y);
      if (enemySpawns[i].isDead === false) {
        if (IntDis < this.shortestDist) {
      this.shortestDist = IntDis;
      this.pendingTarget = enemySpawns[i];
    }
      }
    }
    
    let b1 = new magicMissile(this.x, this.y, 20, this.pendingTarget);
    player[0].magicMissileArray.push(b1); 

      }
    }

    this.display();

    for (let j = 0; j < enemySpawns.length; j++) {
      let d = dist(this.x, this.y, enemySpawns[j].x, enemySpawns[j].y);
            if (d < 10) {
      this.triggered = true;
    }
    }  

  }

  attemptDamage(enemy) {
    explode.play();
    let d = dist(this.x, this.y, enemy.x, enemy.y);
    if (d < this.radius*2) {
      enemy.sufferDamage(2);
    }
  }

  display() {
    // placeholder //
    stroke(125,0, 0);
    fill(105, 20, 100);
    
    image(minionImg, this.x, this.y, 80, 80);
    fill(105, 20, 100, 100);
    ellipse(this.x, this.y, this.radius * 4);
    stroke(0);
  }
}