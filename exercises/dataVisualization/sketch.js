let data;
// Original Datasheet Link - https://www.kaggle.com/datasets/abdulmalik1518/cars-datasets-2025 //
let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5A8OEZjb4ikD4p80PjMx78pMSXA5SHFcGP60ixJbLZidb3u3ixFHfJXUut5tkx1a8vaNLCsaQdAAF/pub?gid=1901912705&single=true&output=csv";
let brandSlot = 0;
let ferrariRows = [];
let toyotaRows = [];
let nissanRows = [];
let lamborghiniRows = [];
let bmwRows = [];
let backgroundGarage;
let toyotaCar;
let currentCar = 0;
let myButton1;
let myButton2;
let menuMusic;
let gameState = false;

let changeSequence = false;
let changeTimer = 0;
let ventHeight = 0;
let carHorizontal = 0;

let vehicle;


function preload() {
  data = loadTable(url, "csv", "header");
  backgroundGarage = loadImage("images/background.png");
  shutters = loadImage("images/shutters.png");
  roof = loadImage("images/roof.png");
  ferrariCar = loadImage("images/ferrariStockImage.png");
  toyotaCar = loadImage("images/toyotaStockImage.png");
  nissanCar = loadImage("images/nissanStockImage.png");
  bmwCar = loadImage("images/bmwStockImage.png");
  lamborghiniCar = loadImage("images/lamborghiniStockImage.png");
  menuMusic = loadSound("sound/menuMusic.mp3");
  backgroundInit = loadImage("images/backgroundInit.png")
}

function setup() {

  //for loop to reduce data to our focus brands//
   for (let i = 0; i < data.getRowCount(); i++) {
    let row = data.getRow(i);
    let brand = row.getString('Company');

    //adds to a array to reference later if a match is made//
    if (brand === 'FERRARI') {
      ferrariRows.push(row);
    }

    if (brand === 'TOYOTA') {
      toyotaRows.push(row);
    }

    if (brand === 'Nissan') {
      nissanRows.push(row);
    }

    if (brand === 'LAMBORGHINI') {
      lamborghiniRows.push(row);
    }

    if (brand === 'BMW') {
      bmwRows.push(row);
    }
  }
  
  console.log('All Ferrari Rows:', ferrariRows);

  createCanvas(1050,600);

  vehicle = new Car(525, 330, 0);

}

function draw() {

  if (gameState === false) {
    imageMode(CENTER);
    image(backgroundInit, 525, 300);
  } else {
    
  if (menuMusic.isPlaying() === false) {
        menuMusic.setVolume(0.15);
        menuMusic.play();
      }

  imageMode(CENTER);
  background(255);
  image(backgroundGarage, 525, 300);

  vehicle.drive();

  image(shutters, 525, 300 - ventHeight);
  
  image(roof, 525, 300);

  if (data) {
    let row = null;
    let companyName = null;

    if (brandSlot === 0) {
      row = ferrariRows[currentCar];
      companyName = "Ferrari: ";
      fill(255, 40, 0);
    } else if (brandSlot === 1) {
      row = toyotaRows[currentCar];
      companyName = "Toyota: ";
      fill(255, 255, 255);
    } else if (brandSlot === 2) {
      row = nissanRows[currentCar];
      companyName = "Nissan: ";
      fill(30, 90, 180);
    } else if (brandSlot === 3) {
      row = lamborghiniRows[currentCar];
      companyName = "Lamborghini: ";
      fill(80, 80, 80);
    } else if (brandSlot === 4) {
      row = bmwRows[currentCar];
      companyName = "BMW: ";
      fill(210, 180, 140);
    }


    
    let model = row.getString('Name');
    stroke(0);
    strokeWeight(5);
    textSize(48);
    if (brandSlot === 0) {
      text("("+(currentCar + 1)+"/"+(ferrariRows.length)+")", 525, 50);
    } else if (brandSlot === 1) {
      text("("+(currentCar + 1)+"/"+(toyotaRows.length)+")", 525, 50);
    } else if (brandSlot === 2) {
      text("("+(currentCar + 1)+"/"+(nissanRows.length)+")", 525, 50);
    } else if (brandSlot === 3) {
      text("("+(currentCar + 1)+"/"+(lamborghiniRows.length)+")", 525, 50);
    } else if (brandSlot === 4) {
      text("("+(currentCar + 1)+"/"+(bmwRows.length)+")", 525, 50);
    }
    
    text(companyName + model, 525, 100);
    let mph = row.getString('Speed');

    textSize(32);
    strokeWeight(2);
    text("Engine: " + row.getString('Engine'), 180, 520);
    text("Battery: " + row.getString('Battery'), 525, 520);
    text("Horsepower: " + row.getString('HorsePower'), 870, 520);
    text("Seats: " + row.getString('Seats'), 170, 570);
    text("Price: " + row.getString('Price'), 525, 570);
    text("Fuel: " + row.getString('Fuel'), 870, 570);

    textSize(24);
    strokeWeight(2);
    text("Top MPH (" + mph +"): ", 160, 470);
    rectMode(LEFT);
    noStroke();
    rect(250, 450, (mph * 2), 25);

    


  }

  noStroke();
  textAlign(CENTER);
  textSize(18);
   fill(0);
   text("Press the Left or Right Arrow Key to change Brand", 525, 594);


  if (changeSequence === true) {

    
    changeTimer++;

    if (changeTimer < 30) {
      ventHeight = ventHeight + 8;
    } else if (changeTimer > 90 && changeTimer < 120){
      ventHeight = ventHeight - 8;
    } else if (changeTimer >= 120) {
      changeSequence = false;
      changeTimer = 0;
      
    }

  }

  }

}

function keyPressed() {
  if (keyCode === 39) {

    if (changeSequence === false) {

      changeSequence = true;

    currentCar = 0;
    brandSlot = brandSlot + 1;
    if (brandSlot > 4) {
      brandSlot = 0;
    }
    }
    
  } else if (keyCode === 37) {

if (changeSequence === false) {

      changeSequence = true;

    currentCar = 0;
    brandSlot = brandSlot - 1;
    if (brandSlot < 0) {
      brandSlot = 4;
    }
  }
  } else if (keyCode === 69) {
    cycleRight();
  } else if (keyCode === 81) {
    cycleLeft();
} else if (keyCode === 32) {
  if (gameState === false) {
    gameState = true;

    myButton1 = createButton('Click Me or Press E')
    myButton1.position(500, -400, 'relative');
    myButton1.mousePressed(cycleRight);
    myButton1.style('border-radius', '20px');

    myButton2 = createButton('Click Me or Press Q')
    myButton2.position(-500, -400, 'relative');
    myButton2.mousePressed(cycleLeft);
    myButton2.style('border-radius', '20px');
  }
}
}

class Car {
  constructor(tempx, tempy) {
    this.horizontal = 0;
    this.x = tempx;
    this.y = tempy;
    this.brand = 0;
    this.carImage = ferrariCar;
    this.carTintR = (220);
    this.carTintG = (70);
    this.carTintB = (20);
  }

  drive() {

    tint(this.carTintR, this.carTintG, this.carTintB);
     image(this.carImage, this.x + this.horizontal, this.y);
     tint(255, 255, 255);

    if (changeSequence === true) {

      if (changeTimer < 30) {
        this.horizontal++;
      } else if (changeTimer > 90) {
        this.horizontal++;
      } else {
        this.horizontal = this.horizontal + 24;
      }

      if (changeTimer > 60 && this.horizontal > 745) {
        this.horizontal = -750;
        this.brand = brandSlot;
        this.carTintR = random(0, 255);
        this.carTintG = random(0, 255);
        this.carTintB = random(0, 255);

        if (this.brand === 0) {
          this.carImage = ferrariCar;
        } else if (this.brand === 1) {
          this.carImage = toyotaCar;
        } else if (this.brand === 2) {
          this.carImage = nissanCar;
        } else if (this.brand === 3) {
          this.carImage = lamborghiniCar;
        } else if (this.brand === 4) {
          this.carImage = bmwCar;
        }
      }

    }
  }
}

function cycleRight() {

    if (changeSequence === false) {

      changeSequence = true;
    
      currentCar++;

    if (brandSlot === 0) {
       if (currentCar > ferrariRows.length - 1) {
      currentCar = 0;
      }
    } else if (brandSlot === 1) {
       if (currentCar > toyotaRows.length - 1) {
      currentCar = 0;
      }
    } else if (brandSlot === 2) {
       if (currentCar > nissanRows.length - 1) {
      currentCar = 0;
      }
    } else if (brandSlot === 3) {
       if (currentCar > lamborghiniRows.length - 1) {
      currentCar = 0;
      }
    } else if (brandSlot === 4) {
       if (currentCar > bmwRows.length - 1) {
      currentCar = 0;
      }
    }
  }   
}

function cycleLeft() {
 if (changeSequence === false) {

      changeSequence = true;


    if (currentCar === 0) {
      if (brandSlot === 0){
        currentCar = ferrariRows.length - 1;
      } else if (brandSlot === 1){
        currentCar = toyotaRows.length - 1;
      } else if (brandSlot === 2){
        currentCar = nissanRows.length - 1;
      } else if (brandSlot === 3){
        currentCar = lamborghiniRows.length - 1;
      } else if (brandSlot === 4){
        currentCar = bmwRows.length - 1;
      }
    } else {
      currentCar--;
    }
  }
}