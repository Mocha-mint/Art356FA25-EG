class Demon {
  constructor() {
    this.x = 40;
    this.y = 40;
    this.s = 30;
    this.chasePhase = 0;
    this.attackPhase = 0;
    this.delay = 300;
    this.randomize = 0;
    this.toggleDelay = 10;
    this.toggleFlip = false;
    this.monsterScreen = 9;
    this.visible = true;
  }

  display() {

    if (this.monsterScreen === currentScreen) {
      if (this.attackPhase === 1) {
      rectMode(CENTER);
      fill(255, 0, 0, 50);
      square(this.x, this.y, 50);
    }

    if (this.toggleFlip === false) {
      imageMode(CENTER);

     if (monsterType === 1) {
        image(demonImg, this.x, this.y, this.w, this.h);
      } else if (monsterType === 2 && this.visible === true) {
        image(paleImg, this.x, this.y, this.w, this.h);
      } else if (monsterType === 3 && this.visible === true) {
        image(shadowImg, this.x, this.y, this.w, this.h);
      }

    } else if (this.toggleFlip === true) {
      imageMode(CENTER);

      if (monsterType === 1) {
        image(demonImgWalk, this.x, this.y, this.w, this.h);
      } else if (monsterType === 2 && this.visible === true) {
        image(paleImg, this.x, this.y, this.w, this.h);
      } else if (monsterType === 3 && this.visible === true) {
        image(shadowImg, this.x, this.y, this.w, this.h);
      }
    }
  }
   
}

  move(object) {

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




    if (this.chasePhase === 0) {
      
      if (this.monsterScreen === currentScreen) {
        
        heart.setVolume(0.3);
        heart.play();

        if (monsterType === 1) {
        ds1.setVolume(0.4);
        ds1.play();
        }
        
        this.chasePhase = 1;
        this.delay = 300;
      } else {
        if (this.delay > 0) {
        this.delay--;
      } else {
        

        this.screenJumpLogic();
        this.delay = 300;
      }
      }



    } else if (this.chasePhase === 1) {




      let d = dist(this.x, this.y, object.x, object.y);

   
      if (this.monsterScreen === currentScreen) {


        if (monsterType === 1) {


          let vx = ((object.x - this.x) / d) * 3;
      let vy = ((object.y - this.y) / d) * 3;
      this.x = this.x + min(5, vx);
      this.y = this.y + min(5, vy);

      if (d < 30) {
        this.attackPhase = 1;
        this.chasePhase = 2;
        this.delay = 30;
      }

    } else if (monsterType === 3) {


          let vx = ((object.x - this.x) / d) * 2;
      let vy = ((object.y - this.y) / d) * 2;
      this.x = this.x + min(2, vx);
      this.y = this.y + min(2, vy);
      this.visible = false;

      if (d < 30) {
        shadow.setVolume(0.3);
        shadow.play();
        this.attackPhase = 1;
        this.chasePhase = 2;
        this.delay = 45;
        this.visible = true;
      }
    } else if (monsterType === 2) {


      let vx = ((object.x - this.x) / d) * 1;
      let vy = ((object.y - this.y) / d) * 1;
      this.x = this.x + min(1, vx);
      this.y = this.y + min(1, vy);

      if (d < 120) {

        let randomizer = [1, 2, 3, 4];
        let ambush = random(randomizer);

        if (ambush === 1) {
          this.y = object.y + 15;
          this.x = object.x;
        } else if (ambush === 2) {
          this.y = object.y - 15;
          this.x = object.x;
        } else if (ambush === 3) {
          this.x = object.x + 15;
          this.y = object.y;
        } else {
          this.x = object.x - 15;
          this.y = object.y;
        }

        pale.setVolume(0.3);
        pale.play();
        this.attackPhase = 1;
        this.chasePhase = 2;
        this.delay = 35;
      }
    }





      } else {

        this.chasePhase = 0;
        this.delay = 180;

      }




    } else if (this.chasePhase === 2) {
      if (this.delay > 0) {
        this.delay--;

      } else {

        if (this.attackPhase === 1) {
          let d2 = dist(this.x, this.y, object.x, object.y);

          if (d2 < 50 && this.monsterScreen === currentScreen) {
            gameState = 2;
            
          } else {
            console.log("DOHIMISS");
          }

          this.attackPhase = 0;

          if (monsterType > 1) {
            this.delay = 30;
          }
        } else {
          this.chasePhase = 0;
        }    

      }
    }
    }

    screenJumpLogic () {

      if (this.monsterScreen === currentScreen) {

      } else {

        if (this.monsterScreen === 1) {
          let desiredScreen = null;

          if (currentScreen === 2 || currentScreen === 4) {
            desiredScreen = currentScreen;
          } else {
            let tempArray = [2, 4];
            desiredScreen = random(tempArray);
          }

          if (desiredScreen === 2) {
            //left to right//
            this.x = 30;
            this.y = 160;
            this.monsterScreen = 2;
          } else if (desiredScreen === 4) {
            //top to bottom//
            this.x = 192;
            this.y = 30;
            this.monsterScreen = 4;
          }

        } else if (this.monsterScreen === 2) {
          let desiredScreen = null;

          if (currentScreen === 1 || currentScreen === 3 || currentScreen === 5) {
            desiredScreen = currentScreen;
          } else {
            let tempArray = [1, 3, 5];
            desiredScreen = random(tempArray);
          }

          if (desiredScreen === 3) {
            //left to right//
            this.x = 30;
            this.y = 160;
            this.monsterScreen = 3;
          } else if (desiredScreen === 5) {
            //top to bottom//
            this.x = 192;
            this.y = 30;
            this.monsterScreen = 5;
          } else if (desiredScreen === 1) {
            //right to left//
            this.x = 354;
            this.y = 160;
            this.monsterScreen = 1;
          }

        } else if (this.monsterScreen === 3) {
          let desiredScreen = null;

          if (currentScreen === 2 || currentScreen === 6) {
            desiredScreen = currentScreen;
          } else {
            let tempArray = [2, 6];
            desiredScreen = random(tempArray);
          }

          if (desiredScreen === 6) {
            //top to bottom//
            this.x = 192;
            this.y = 30;
            this.monsterScreen = 6;
          } else if (desiredScreen === 2) {
            //right to left//
            this.x = 354;
            this.y = 160;
            this.monsterScreen = 2;
          }

        } else if (this.monsterScreen === 4) {
          let desiredScreen = null;

          if (currentScreen === 1 || currentScreen === 5 || currentScreen === 7) {
            desiredScreen = currentScreen;
          } else {
            let tempArray = [1, 5, 7];
            desiredScreen = random(tempArray);
          }

          if (desiredScreen === 1) {
            //bottom to top//
            this.x = 192;
            this.y = 300;
            this.monsterScreen = 1;
          } else if (desiredScreen === 5) {
            //left to right//
            this.x = 30;
            this.y = 160;
            this.monsterScreen = 5;
          } else if (desiredScreen === 7) {
            //top to bottom//
            this.x = 192;
            this.y = 30;
            this.monsterScreen = 7;
          }

        } else if (this.monsterScreen === 5) {
          let desiredScreen = null;

          if (currentScreen === 2 || currentScreen === 4 || currentScreen === 6 || currentScreen === 8) {
            desiredScreen = currentScreen;
          } else {
            let tempArray = [2, 4, 6, 8];
            desiredScreen = random(tempArray);
          }

          if (desiredScreen === 2) {
            //bottom to top//
            this.x = 192;
            this.y = 300;
            this.monsterScreen = 2;
          } else if (desiredScreen === 4) {
            //right to left//
            this.x = 354;
            this.y = 160;
            this.monsterScreen = 4;
          } else if (desiredScreen === 6) {
            //left to right//
            this.x = 30;
            this.y = 160;
            this.monsterScreen = 6;
          } else if (desiredScreen === 8) {
            //top to bottom//
            this.x = 192;
            this.y = 30;
            this.monsterScreen = 8;
          }

        } else if (this.monsterScreen === 6) {
          let desiredScreen = null;

          if (currentScreen === 3 || currentScreen === 5 || currentScreen === 9) {
            desiredScreen = currentScreen;
          } else {
            let tempArray = [3, 5, 9];
            desiredScreen = random(tempArray);
          }

          if (desiredScreen === 3) {
            //bottom to top//
            this.x = 192;
            this.y = 300;
            this.monsterScreen = 3;
          } else if (desiredScreen === 5) {
             //right to left//
            this.x = 354;
            this.y = 160;
            this.monsterScreen = 5;
          } else if (desiredScreen === 9) {
            //top to bottom//
            this.x = 192;
            this.y = 30;
            this.monsterScreen = 9;
          }

        } else if (this.monsterScreen === 7) {
          let desiredScreen = null;

          if (currentScreen === 4 || currentScreen === 8) {
            desiredScreen = currentScreen;
          } else {
            let tempArray = [4, 8];
            desiredScreen = random(tempArray);
          }

          if (desiredScreen === 4) {
            //bottom to top//aaaa
            this.x = 192;
            this.y = 300;
            this.monsterScreen = 4;
          } else if (desiredScreen === 8) {
            //left to right//
            this.x = 30;
            this.y = 160;
            this.monsterScreen = 8;
          }

        } else if (this.monsterScreen === 8) {
          let desiredScreen = null;

          if (currentScreen === 7 || currentScreen === 5 || currentScreen === 9) {
            desiredScreen = currentScreen;
          } else {
            let tempArray = [7, 5, 9];
            desiredScreen = random(tempArray);
          }

          if (desiredScreen === 5) {
            //bottom to top//
            this.x = 192;
            this.y = 300;
            this.monsterScreen = 5;
          } else if (desiredScreen === 7) {
             //right to left//
            this.x = 354;
            this.y = 160;
            this.monsterScreen = 7;
          } else if (desiredScreen === 9) {
            //left to right//
            this.x = 30;
            this.y = 160;
            this.monsterScreen = 9;
          }

        } else if (this.monsterScreen === 9) {
          let desiredScreen = null;

          if (currentScreen === 8 || currentScreen === 6) {
            desiredScreen = currentScreen;
          } else {
            let tempArray = [8, 6];
            desiredScreen = random(tempArray);
          }

          if (desiredScreen === 6) {
            //bottom to top//
            this.x = 192;
            this.y = 300;
            this.monsterScreen = 6;
          } else if (desiredScreen === 8) {
             //right to left//
            this.x = 354;
            this.y = 160;
            this.monsterScreen = 8;
          } 

        }


      }

      console.log(this.monsterScreen);
      

    }

  }
