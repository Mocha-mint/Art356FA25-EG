//place gameobjects heret


class exitDoor {
  constructor(tempX, tempY, tempW, tempH) {
    this.x = tempX;
    this.y = tempY;
    this.width = tempW;
    this.height = tempH;
  }

  display() {
    fill(150);
    imageMode(CENTER);
    if (isGen1Done === true && isGen2Done === true &&isGen3Done === true) {
      image(exitDoorOpenImg, this.x, this.y, this.w, this.h);
    } else {
      image(exitDoorClosedImg, this.x, this.y, this.w, this.h);
    }
    
    if (isGen1Done === true) {
      noStroke();
      fill(0, 255, 90);
      circle(167, 1, 6)
    } else {
      noStroke();
      fill('red');
      circle(167, 1, 6)
    }

    if (isGen2Done === true) {
      noStroke();
      fill(0, 255, 90);
      circle(180, 1, 6)
    } else {
      noStroke();
      fill('red');
      circle(180, 1, 6)
    }

    if (isGen3Done === true) {
      noStroke();
      fill(0, 255, 90);
      circle(193, 1, 6)
    } else {
      noStroke();
      fill('red');
      circle(193, 1, 6)
    }
  }

  teleport(object) {
    let d = dist(this.x, this.y, object.x, object.y);


    if (d < 20 && isGen1Done === true && isGen2Done === true &&isGen3Done === true) {
      victoryJingle.setVolume(0.3);
      victoryJingle.play();
      gameState = 3;
      
    }
  }
}