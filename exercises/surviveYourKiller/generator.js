//place gameobjects heret


class Generator {
  constructor(tempX, tempY, tempW, tempH, tempGenScreen) {
    this.x = tempX;
    this.y = tempY;
    this.width = tempW;
    this.height = tempH;
    this.timeleft = 500;
    this.genScreen = tempGenScreen;
    this.genFinished = false;
  
  }

  display() {

    if (currentScreen === this.genScreen) {
     fill(150);
    imageMode(CENTER);

    if (this.genFinished === true){
      image(generatorDoneImg, this.x, this.y, this.w, this.h);
    } else {
    image(generatorImg, this.x, this.y, this.w, this.h);
  }
  }
  } 

  interactionRange(object) {


    if (currentScreen === this.genScreen) {
 let d = dist(this.x, this.y, object.x, object.y);

    if (d < 20 && this.genFinished === false) {
        this.timeleft = this.timeleft - 1;
        console.log("Generator Time Left: "+this.timeleft);
        
        
      if (this.timeleft <= 0) {
        this.genFinished = true;
    } else {
      rectMode(CORNER);
      noStroke;
        fill((0+(this.timeleft*0.51)), (255-(this.timeleft*0.51)), 0);
        rect((this.x -10), (this.y - 20),(20-(this.timeleft*0.04)),5);
    }
  } else {
    this.timeleft = 500;
  }
    }
   
}

  finishCheck(index) {
    if (index === 1) {
      if (this.genFinished === true && isGen1Done === false) {
        isGen1Done = true;
      }
    } else if (index === 2) {
      if (this.genFinished === true && isGen2Done === false) {
        isGen2Done = true;
      }
    } else {
      if (this.genFinished === true && isGen3Done === false) {
        isGen3Done = true;
      }
    }
  }

}

