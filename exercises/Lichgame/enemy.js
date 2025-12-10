class enemyUnit {
  constructor(tempX, tempY, tempS, TenemyType, HP) {
    this.x = tempX;
    this.y = tempY;
    this.width = 50;
    this.height = 50;
    this.speed = tempS;
    this.color = 255;
    this.health = HP;
    this.enemyType = TenemyType;
    this.attackDelay = 120;
    this.isMoving = false;
    this.desiredTargetX;
    this.desiredTargetY;
    this.longestDist;
    this.isMeleeAttacking = false;
    this.meleeAttackTimer = 0;
    this.meleeHitbox = null;
    this.navUnitReference = null;
    this.tryingToHeal = false;
    this.healTarget = null;
    this.isDead = false;
    this.healCooldown = 240;
    this.mageCooldown = 300;
    this.mageGuidingBolt = null;
    this.mageSpell = 0;
    this.invincibilityTimer = 0;
    this.frozenTime = 0;
  }

  sufferDamage(dmgVal) {
    if (this.invincibilityTimer < 1 && this.isDead === false) {
      this.health = this.health - dmgVal;
    this.invincibilityTimer = 5;
    mageHit.play();

    if (this.health <= 0) {
      this.isDead = true;
      enemyDeath.play();
    } 
    }
  }

  display() {

    if (this.isDead === false) {
      if (this.meleeHitbox) {
        this.meleeHitbox.display();
      }

    if (this.enemyType === 0){

      if (this.health > 20) {
        this.health = 20;
      }

      //rogue//
      if (this.frozenTime < 1) {
        
      this.attackLogic();
      this.movementLogic();
      } else {
        this.frozenTime--;
      }
      fill(0,200,0);
    } else if (this.enemyType === 1){
      if (this.health > 30) {
        this.health = 30;
      }
      //paladin//
      if (this.frozenTime < 1) {
        
      this.attackLogic();
      this.simplePaladinMovLogic();
      } else {
        this.frozenTime--;
      }
      fill(200,0,0);
    } else if (this.enemyType === 2){
      //cleric//
      if (this.frozenTime < 1) {
        
      this.clericLogic();

      if (this.tryingToHeal === false) {
        this.movementLogic();
      }
      
      } else {
        this.frozenTime--;
      }
      fill(200,0,200);
    } else if (this.enemyType === 3){
      if (this.health > 20) {
        this.health = 20;
      }
      //mage//
      if (this.frozenTime < 1) {
        this.movementLogic();
      this.mageAttackCycle();
      } else {
        this.frozenTime--;
      }
      
      fill(0,200,200);
    }

    if (this.frozenTime > 0) {
      tint(0, 0, 255);
    }

    if (this.invincibilityTimer > 0) {
      tint(255, 0, 0, 250);
    }
    
    let angle = atan2(player[0].y - this.y, player[0].x - this.x);

    if (this.frozenTime > 0) {
      angle = 1.4;
    }

    push();
    translate(this.x, this.y); 
    
    

    if (this.enemyType === 0) {
      rotate(angle - HALF_PI);
      image(thiefImg, 0, 0, 50, 50);
    } else if (this.enemyType === 1) {
      rotate(angle - HALF_PI);
      image(knightImg, 0, 0, 50, 50);
    } else if (this.enemyType === 2) {
      rotate(angle - HALF_PI);
      image(clericImg, 0, 0, 50, 50);
    } else if (this.enemyType === 3) {
      rotate(angle - HALF_PI);
      image(mageImg, 0, 0, 50, 50);
    }

      pop(); 
      
      rectMode(CENTER);
    
    
    noTint();
    textSize(20);
    textAlign(CENTER, CENTER);
    text("HP: "+this.health, this.x, this.y-40);
    textAlign(LEFT);
    
    }

    if (this.invincibilityTimer > 0) {
      this.invincibilityTimer--;
    }
    
  } 

  mageAttackCycle() {
    //guidingBolt > fireburst > thunderbolt

    if (this.mageCooldown <= 0) {
      if (this.mageSpell === 0) {
        this.mageGuidingBolt = new guidingBolt(this.x, this.y, 30);
      }
      
      this.mageCooldown = 600;
    } else {
      this.mageCooldown--;
    }

    if (this.mageGuidingBolt) {
        this.mageGuidingBolt.update();

        if (this.mageGuidingBolt.triggered) {
          this.mageGuidingBolt.attemptDamage(player[0]);

          this.mageGuidingBolt = null;
        }
      }

  }

  clericLogic() {

    if (this.tryingToHeal === false) {

      if (this.healCooldown <= 0) {
        this.highestHealthMissing = 0;

      if (enemySpawns[0].health < 20) {
        if (enemySpawns[0].health > 0) {
          this.healTarget = enemySpawns[0];
          this.highestHealthMissing = 20 - enemySpawns[0].health;
        }
      }

      if (enemySpawns[1].health < 30) {
        if (enemySpawns[1].health > 0) {
        if (30 - enemySpawns[1].health > this.highestHealthMissing) {
          this.healTarget = enemySpawns[1];
        this.highestHealthMissing = 30 - enemySpawns[1].health;
        }
      }
      }

      if (0 < enemySpawns[3].health < 20) {
        if (enemySpawns[3].health > 0) {
        if (20 - enemySpawns[3].health > this.highestHealthMissing) {
          this.healTarget = enemySpawns[3];
        this.highestHealthMissing = 20 - enemySpawns[1].health;
        }
      }
      }

      if (this.healTarget) {
        this.tryingToHeal = true;
      }
      } else {
        this.healCooldown--;
      }

      


    } else {
      //hasAHealTarget//
      if (this.healTarget.health > 0) {
                let dis = dist(this.x, this.y, this.healTarget.x, this.healTarget.y);       
                let vx = ((this.healTarget.x - this.x) / dis) * 2.5;
                let vy = ((this.healTarget.y - this.y) / dis) * 2.5;
                this.x = this.x + min(10, vx);
                this.y = this.y + min(10, vy);

                let disH = dist(this.x, this.y, this.healTarget.x, this.healTarget.y);
                if (disH < 30) {
                this.healTarget.health = this.healTarget.health + 1;


                
                this.tryingToHeal = false;
                this.healTarget = null;
                this.healCooldown = 240;
            }


            } else {
              this.tryingToHeal = false;
              this.healTarget = null;
              this.healCooldown = 180;
            }
            
    }



  }

  simplePaladinMovLogic() {
    if (this.isMeleeAttacking === false) {
                let dis = dist(this.x, this.y, player[0].x, player[0].y);       
                let vx = ((player[0].x - this.x) / dis) * 2;
                let vy = ((player[0].y - this.y) / dis) * 2;
                this.x = this.x + min(10, vx);
                this.y = this.y + min(10, vy);
            }
  }

  movementLogic() {

    if (this.isMoving === false) {
      let dis = dist(this.x, this.y, player[0].x, player[0].y);

    if (dis <= 200) {
      this.longestDist = 0;

      if (this.navUnitReference) {
        this.navUnitReference.leave();
      }
      

      for (let i = 0; i < enemyNavRef.length; i++) {
        let IntDis = dist(enemyNavRef[i].x, enemyNavRef[i].y, player[0].x, player[0].y);

        if (enemyNavRef[i].occupied === 0) {

          let targetDistance = 500;

          if (this.enemyType === 0) {
            targetDistance = 450;
          } else if (this.enemyType === 2) {
            targetDistance = 400;
          }


          if (IntDis > this.longestDist && IntDis < targetDistance) {
      this.longestDist = IntDis;
      this.desiredTargetX = enemyNavRef[i].x;
      this.desiredTargetY = enemyNavRef[i].y;

      this.navUnitReference = enemyNavRef[i];
    }

    

        }

    
  }

  this.navUnitReference.occupy();
  this.isMoving = true;
  
    }
  } else  if (this.isMoving === true) {

    if (this.isMeleeAttacking === false) {
      let dis = dist(this.x, this.y, this.desiredTargetX, this.desiredTargetY);       

                let vx = ((this.desiredTargetX - this.x) / dis) * 5;
                let vy = ((this.desiredTargetY - this.y) / dis) * 5;
                this.x = this.x + min(10, vx);
                this.y = this.y + min(10, vy);
    }

    let dis2 = dist(this.x, this.y, this.desiredTargetX, this.desiredTargetY);

    if (dis2 <= 10) {
      this.isMoving = false;
    }

  }
}

  attackLogic() {
    if (this.enemyType === 0){
      this.attackDelay--;

      //meleeattack//
      let meleeD = dist(this.x, this.y, player[0].x, player[0].y);
      if (meleeD < 60 && this.isMeleeAttacking === false) {
        this.startMeleeAttack();
      } else if (this.isMeleeAttacking === true) {
        this.meleeHitbox.update();

        if (this.meleeHitbox.triggered) {
          this.meleeHitbox.attemptDamage(player[0]);

          this.meleeHitbox = null;
          this.isMeleeAttacking = false;
        }
      }
      //test//

      if (this.attackDelay <= 0 && this.isMeleeAttacking === false) {
        let db1 = new eBullet(enemySpawns[0], (player[0].x), (player[0].y));
        dBulletsActive.push(db1);
        this.attackDelay = 120;
      }
    } else if (this.enemyType === 1){

      //meleeattack//
      let meleeD = dist(this.x, this.y, player[0].x, player[0].y);
      if (meleeD < 60 && this.isMeleeAttacking === false) {
        this.startMeleeAttack();
      } else if (this.isMeleeAttacking === true) {
        this.meleeHitbox.update();

        if (this.meleeHitbox.triggered) {
          this.meleeHitbox.attemptDamage(player[0]);

          this.meleeHitbox = null;
          this.isMeleeAttacking = false;
        }
      }
      //test//
     
    } else if (this.enemyType === 2){
      
    } else if (this.enemyType === 3){
      
    }
  }

  startMeleeAttack() {
    this.isMeleeAttacking = true;

    let midX = (this.x + player[0].x) / 2;
    let midY = (this.y + player[0].y) / 2;

    if (this.enemyType === 0) {
      this.meleeHitbox = new meleeHitboxObj(midX, midY, 50);
    } else if (this.enemyType === 1) {
      this.meleeHitbox = new meleeHitboxObj(midX, midY, 80);
    }
    
  }

  /* death(object) {
    let d = dist(this.x, this.y, object.x, object.y);

    if (d < object.s && isHiding == false) {
      isDead = true;
    }
  }*/
triggerFreeze() {
  this.frozenTime = 300;
  freezeImpact.play();
}
  
}

class meleeHitboxObj {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.startTime = millis();
    this.delay = 500; 
    this.triggered = false;
    this.radius = r;
  }

  update() {
    if (millis() - this.startTime >= this.delay) {
      this.triggered = true;
    }
  }

  attemptDamage(player) {
    swordSwing.play();
    let d = dist(this.x, this.y, player.x, player.y);
    if (d < this.radius) {
      player.sufferDamage();
    }
  }

  display() {
    // placeholder //
    fill(255, 0, 0, 80);
    ellipse(this.x, this.y, this.radius * 2);

  }
}

class guidingBolt {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.startTime = millis();
    this.delay = 5000; 
    this.triggered = false;
    this.radius = r;
  }

  update() {
    if (millis() - this.startTime >= this.delay) {
      this.triggered = true;
    }

    let dis = dist(this.x, this.y, player[0].x, player[0].y);       
                let vx = ((player[0].x - this.x) / dis) * 3.5;
                let vy = ((player[0].y - this.y) / dis) * 3.5;
                this.x = this.x + min(10, vx);
                this.y = this.y + min(10, vy);

    this.display();

    let d = dist(this.x, this.y, player[0].x, player[0].y);
    if (d < this.radius) {
      this.triggered = true;
    }

  }

  attemptDamage(player) {
    let d = dist(this.x, this.y, player.x, player.y);
    if (d < this.radius) {
      player.sufferDamage();
    }
  }

  display() {
    // placeholder //
    fill(125, 0, 120, 50);
    ellipse(this.x, this.y, this.radius * 2);
    image(mageMissileImg, this.x, this.y, 80, 80);

  }
}