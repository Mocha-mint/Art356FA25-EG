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
  }

  display() {

    if (this.toggleFlip === false) {
      imageMode(CENTER);
      image(playerImg, this.x, this.y, this.w, this.h);
    } else if (this.toggleFlip === true) {
      imageMode(CENTER);
      image(playerWalkImg, this.x, this.y, this.w, this.h);
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

    if (this.x > width) {
      this.x = width;
    } else if (this.x < 0) {
      this.x = 0;
    }

    if (this.y > height) {
      this.y = height;
    } else if (this.y < 0) {
      this.y = 0;
    }
  }
}
