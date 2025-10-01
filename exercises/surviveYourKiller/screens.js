function screen1() {
  imageMode(CENTER);
  image(backgroundForestImg, width / 2, height / 2, 384, 320);
  textAlign(RIGHT);
   fill(255);
  textSize(40);
  text("Screen 1", width - 10, height - 10);

  for (let i = 0; i < warpsActive.length; i++) {
    warpsActive[i].display();
    warpsActive[i].teleport(player[0]);
  }
}

function screen2() {
  imageMode(CENTER);
  image(backgroundForestImg, width / 2, height / 2, 384, 320);
  textAlign(RIGHT);
  fill(255);
  textSize(40);
  text("Screen 2", width - 10, height - 10);

  for (let i = 0; i < warpsActive.length; i++) {
    warpsActive[i].display();
    warpsActive[i].teleport(player[0]);
  }
  for (let i = 0; i < doorsActive.length; i++) {
    doorsActive[i].display();
    doorsActive[i].teleport(player[0]);
  }

}

function screen3() {
  imageMode(CENTER);
  image(backgroundForestImg, width / 2, height / 2, 384, 320);
  textAlign(RIGHT);
   fill(255);
  textSize(40);
  text("Screen 3", width - 10, height - 10);

  for (let i = 0; i < warpsActive.length; i++) {
    warpsActive[i].display();
    warpsActive[i].teleport(player[0]);
  }
}

function screen4() {
  imageMode(CENTER);
  image(backgroundForestImg, width / 2, height / 2, 384, 320);
  textAlign(RIGHT);
   fill(255);
  textSize(40);
  text("Screen 4", width - 10, height - 10);

  for (let i = 0; i < warpsActive.length; i++) {
    warpsActive[i].display();
    warpsActive[i].teleport(player[0]);
  }
}

function screen5() {
  imageMode(CENTER);
  image(backgroundForestImg, width / 2, height / 2, 384, 320);
  textAlign(RIGHT);
   fill(255);
  textSize(40);
  text("Screen 5", width - 10, height - 10);

  for (let i = 0; i < warpsActive.length; i++) {
    warpsActive[i].display();
    warpsActive[i].teleport(player[0]);
  }
}

function screen6() {
  imageMode(CENTER);
  image(backgroundForestImg, width / 2, height / 2, 384, 320);
  textAlign(RIGHT);
   fill(255);
  textSize(40);
  text("Screen 6", width - 10, height - 10);

  for (let i = 0; i < warpsActive.length; i++) {
    warpsActive[i].display();
    warpsActive[i].teleport(player[0]);
  }
}

function screen7() {
  imageMode(CENTER);
  image(backgroundForestImg, width / 2, height / 2, 384, 320);
  textAlign(RIGHT);
   fill(255);
  textSize(40);
  text("Screen 7", width - 10, height - 10);

  for (let i = 0; i < warpsActive.length; i++) {
    warpsActive[i].display();
    warpsActive[i].teleport(player[0]);
  }
}

function screen8() {
  imageMode(CENTER);
  image(backgroundForestImg, width / 2, height / 2, 384, 320);
  textAlign(RIGHT);
   fill(255);
  textSize(40);
  text("Screen 8", width - 10, height - 10);

  for (let i = 0; i < warpsActive.length; i++) {
    warpsActive[i].display();
    warpsActive[i].teleport(player[0]);
  }
}

function screen9() {
  imageMode(CENTER);
  image(backgroundForestImg, width / 2, height / 2, 384, 320);
  textAlign(RIGHT);
   fill(255);
  text("Screen 9", width - 10, height - 10);

  for (let i = 0; i < warpsActive.length; i++) {
    warpsActive[i].display();
    warpsActive[i].teleport(player[0]);
  }
}
