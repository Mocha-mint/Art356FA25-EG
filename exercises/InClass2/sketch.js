let data;
let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSReJ9X6U-MZ-UgIwrm33mOKXYAQkeetrauZrqifTnhNd0SF7vGE00VGEUr3P0U7GusxSUu_3Xhmvfi/pub?gid=42349777&single=true&output=csv";
let planet = 0;

function preload() {
  data = loadTable(url, "csv", "header")
}

function setup() {
  noStroke();
  textAlign(CENTER);
  createCanvas(400, 400); 
}

function draw() {
  background(0);

  if (data) {
   let protein = data.getColumn("Protein");
   let sodium = data.getColumn("Sodium");
   let sugar = data.getColumn("Sugar");
   let calories = data.getColumn("Calories");
   let carbs = data.getColumn("Carbs");
   let names = data.getColumn("Food");


   fill(200, 0, 200, sodium[planet] * 0.34);
   ellipse(0, 400, 700, 600);
   fill(255, 126 + (sodium[planet] * 0.17));
   textSize(20);
   text(sodium[planet] + "mg Sodium", 80, 350);

   fill((0.94 * calories[planet]), 100, (255 - (0.94 * calories[planet])));
   ellipse(200, 200, calories[planet], calories[planet]);
   fill(255);
   textSize(24);
   text(calories[planet] + " Calories", 200, 200);

   textSize(12);
    ellipse(50, 100, carbs[planet], carbs[planet]);
    text(carbs[planet] + "g Carbs", 50, 132);

    fill(255, sugar[planet] * 12.75);
    ellipse(200, (155 - (calories[planet] * 0.1)), 128, 61);
    fill(0);
    text(sugar[planet] + "g Sugar", 200, 155 - (calories[planet] * 0.1));

    fill(255, 100, 100, (14 * protein[planet]));
    triangle(290, 294, 310, 308, 340, 250);
    fill(190, 255, 255);
    ellipse(300, 300, protein[planet] * 4, protein[planet] * 4);
    text(protein[planet] + "g Protein", 300, 320 + (protein[planet] * 1));

   fill(255);
   textAlign(CENTER);
   textSize(18);
   text("Visiting the planet of...", 200, 30);
   textSize(22);
   text(names[planet], 200, 60);

   textSize(12);
   fill(255);
   text("Press the Left or Right Arrow Key to jump planets", 200, 380);
  }
}

function keyPressed() {
  if (keyCode === 39) {
    planet = planet + 1;
    if (planet > 4) {
      planet = 0;
    }
  } else if (keyCode === 37) {
    planet = planet - 1;
    if (planet < 0) {
      planet = 4;
    }
  }
}
  