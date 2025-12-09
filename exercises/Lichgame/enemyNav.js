class enemyNavUnit {
  constructor(tempX, tempY) {
    this.x = tempX;
    this.y = tempY;
    this.occupied = 0;
  }

  display() {

    
  } 

  occupy() {
    this.occupied = 1;
  }

  leave() {
    this.occupied = 0;
  }

}