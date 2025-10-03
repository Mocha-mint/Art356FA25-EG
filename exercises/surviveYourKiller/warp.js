//place gameobjects heret

function warpLogic() {
  if (currentScreen === 1) {
    //run all one item/object loads here
    if (screenActive === 0) {
      //Left to Right Warp
      warp1 = new Warp(384, 160, 20, 20, 50, 160, 2);
      warpsActive.push(warp1);
      //Top to Bottom Warp
      warp3 = new Warp(192, 320, 20, 20, 192, 50, 4);
      warpsActive.push(warp3);

      //always end on screenActive = 1
      screenActive = 1;
    }
    if (screenActive === 1) {
      screen1();
    }
  } else if (currentScreen === 2) {
    if (screenActive === 0) {
      //Left to Right Warp
      warp1 = new Warp(384, 160, 20, 20, 50, 160, 3);
      warpsActive.push(warp1);
      //Top to Bottom Warp
      warp3 = new Warp(192, 320, 20, 20, 192, 50, 5);
      warpsActive.push(warp3);
      //Right to Left Warp
      warp2 = new Warp(0, 160, 20, 20, 334, 160, 1);
      warpsActive.push(warp2);
      //always end on screenActive = 1
      door1 = new exitDoor(180, 15, 100, 20);
      doorsActive.push(door1);
      screenActive = 1;
    }
    if (screenActive === 1) {
      screen2();
    }
  } else if (currentScreen === 3) {
    if (screenActive === 0) {
      //Right to Left Warp
      warp2 = new Warp(0, 160, 20, 20, 334, 160, 2);
      warpsActive.push(warp2);
      //Top to Bottom Warp
      warp3 = new Warp(192, 320, 20, 20, 192, 50, 6);
      warpsActive.push(warp3);

      

      screenActive = 1;
    }
    if (screenActive === 1) {
      screen3();
    }
  } else if (currentScreen === 4) {
    if (screenActive === 0) {
      //Left to Right Warp
      warp1 = new Warp(384, 160, 20, 20, 50, 160, 5);
      warpsActive.push(warp1);
      //Top to Bottom Warp
      warp3 = new Warp(192, 320, 20, 20, 192, 50, 7);
      warpsActive.push(warp3);
      //Bottom to Top Warp
      warp4 = new Warp(192, 0, 20, 20, 192, 270, 1);
      warpsActive.push(warp4);
      

      screenActive = 1;
    }
    if (screenActive === 1) {
      screen4();
    }
  } else if (currentScreen === 5) {
    if (screenActive === 0) {
      //Left to Right Warp
      warp1 = new Warp(384, 160, 20, 20, 50, 160, 6);
      warpsActive.push(warp1);
      //Right to Left Warp
      warp2 = new Warp(0, 160, 20, 20, 334, 160, 4);
      warpsActive.push(warp2);
      //Top to Bottom Warp
      warp3 = new Warp(192, 320, 20, 20, 192, 50, 8);
      warpsActive.push(warp3);
      //Bottom to Top Warp
      warp4 = new Warp(192, 0, 20, 20, 192, 270, 2);
      warpsActive.push(warp4);
      
      screenActive = 1;
    }
    if (screenActive === 1) {
      screen5();
    }
  } else if (currentScreen === 6) {
    if (screenActive === 0) {
      
      //Right to Left Warp
      warp2 = new Warp(0, 160, 20, 20, 334, 160, 5);
      warpsActive.push(warp2);
      //Top to Bottom Warp
      warp3 = new Warp(192, 320, 20, 20, 192, 50, 9);
      warpsActive.push(warp3);
      //Bottom to Top Warp
      warp4 = new Warp(192, 0, 20, 20, 192, 270, 3);
      warpsActive.push(warp4);
      
      screenActive = 1;
    }
    if (screenActive === 1) {
      screen6();
    }
  } else if (currentScreen === 7) {
    if (screenActive === 0) {
      //Left to Right Warp
      warp1 = new Warp(384, 160, 20, 20, 50, 160, 8);
      warpsActive.push(warp1);
      
      //Bottom to Top Warp
      warp4 = new Warp(192, 0, 20, 20, 192, 270, 4);
      warpsActive.push(warp4);
      
      screenActive = 1;
    }
    if (screenActive === 1) {
      screen7();
    }
  } else if (currentScreen === 8) {
    if (screenActive === 0) {

       //Left to Right Warp
      warp1 = new Warp(384, 160, 20, 20, 50, 160, 9);
      warpsActive.push(warp1);

      //Right to Left Warp
      warp2 = new Warp(0, 160, 20, 20, 334, 160, 7);
      warpsActive.push(warp2);

      //Bottom to Top Warp
      warp4 = new Warp(192, 0, 20, 20, 192, 270, 5);
      warpsActive.push(warp4);


      screenActive = 1;
    }
    if (screenActive === 1) {
      screen8();
    }
  
  } else if (currentScreen === 9) {
    if (screenActive === 0) {
      
      //Right to Left Warp
      warp2 = new Warp(0, 160, 20, 20, 334, 160, 8);
      warpsActive.push(warp2);
      //Bottom to Top Warp
      warp4 = new Warp(192, 0, 20, 20, 192, 270, 6);
      warpsActive.push(warp4);

      screenActive = 1;
    }
    if (screenActive === 1) {
      screen9();
    }
  }
   
}

class Warp {
  constructor(tempX, tempY, tempW, tempH, tempX2, tempY2, desiredScreen) {
    this.x = tempX;
    this.y = tempY;
    this.width = tempW;
    this.height = tempH;
    this.desiredX = tempX2;
    this.desiredY = tempY2;
    this.desiredS = desiredScreen;
  }

  display() {
    fill(150);
    imageMode(CENTER);
    image(warpTileImg, this.x, this.y, this.w, this.h);
  }
  teleport(object) {
    let d = dist(this.x, this.y, object.x, object.y);

    /* if (this.desiredS === 666) {
      if (d < 20 && cantEscape === false && keyPickedUp === true) {
        player[0].x = this.desiredX;
        player[0].y = this.desiredY;
        screenCleaner();
        currentScreen = this.desiredS;
      }
    } else */ if (d < 20 /*&& cantEscape === false*/) {
      player[0].x = this.desiredX;
      player[0].y = this.desiredY;
      screenCleaner();
      currentScreen = this.desiredS;
    }
  }
}