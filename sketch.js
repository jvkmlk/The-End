var p1,p2,asteroid1,asteroid2,asteroid3;
var blast,blastImage,space,spaceImage;
var spaceShip,spaceShipImage, laserImage;
var shoot = 0;
var score = 0;
var laser,asteroidGroup,laserGroup;
var explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;
var song;
var aipayee;
var gameover;

function preload() {
  spaceImage = loadImage("space.jpg");
  spaceShipImage = loadImage("spaceship.png");
  laserImage = loadImage("laser.png");
  asteroid1 = loadImage("as1.png");
  asteroid2 = loadImage("as2.png");
  asteroid3 = loadImage("as3.png");
  blastImage = loadImage("blast.png");
  explasionImage = loadImage("blast.png");

 // gameover = loadImage("gameover.png");
}

function setup() {  
  canvas = createCanvas(displayWidth,displayHeight);
  space = createSprite(250,350,100,20);
  space.addImage(spaceImage);
  space.velocityY = (5 + score/10);
  space.scale=3.5;

  spaceShip = createSprite(250,600);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.6;
  
  p1 = createSprite(250,600);
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;
  
  asteroidGroup = new Group;
  laserGroup = new Group;
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;
}

function draw() {
  background(0);

  if(gameState === play) {
    text("Song playing")
    
    if(space.y > 800) {
      space.y = 300;
    }
    
    shoot = shoot - 1;

    if(keyDown("space") && shoot < 460) {
      laser = createSprite(spaceShip.x,spaceShip.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8; 
      laser.scale = 0.7;
      laserGroup.add(laser);

      //console.log(laser.x);
      shoot = laser.y;
    }  

    if(keyDown("right") && spaceShip.x < 1400) {
      spaceShip.x = spaceShip.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("left") && spaceShip.x > 50) {
      spaceShip.x = spaceShip.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    
    if(asteroidGroup.isTouching(p2) || asteroidGroup.isTouching(p1)) {
      asteroidGroup.destroyEach();
      var blast = createSprite(spaceShip.x,spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;

      spaceShip.destroy();
      gameState = end;
    }
    
    if(asteroidGroup.isTouching(laserGroup)) {
      asteroidGroup.destroyEach();
      laserGroup.destroyEach();

      score = score + 1;
    }

    asteroids();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(30);
    text("score : " + score,210,60);
    textSize(20);
    text("Long Press W to know the song playing,",240,20);


    if(keyDown("w")){
    text("song playing : Master the Blaster",210,240);
    }
    
    if(asteroidGroup.isTouching(endline)) {
      asteroidGroup.destroyEach();
      gameState = end;
    }
    
  }
  else if(gameState === end) {
    space.velocityY = 0;
   // gameover = addImage(gameover);
    stroke("yellow");
    fill("white");
    textSize(40);
    text("GAME OVER!",canvas.width/2-400,canvas.height/2+50);
    text("The asteroids destroyed the planet",canvas.width/2-400,canvas.height/2+100);
    text("Your final score:"+score,canvas.width/2-400,canvas.height/2+200);



    //aipayee.play();


    
  }

  if(keyDown("h")){
    gameState = instruction;
  }


  if(gameState === instruction) {
    stroke("white");
    fill("white");
    textFont("trebuchetMS")
    textSize(50);
    fill("red");

    text("------SPACE SHOOTERS------",canvas.width/2-300,canvas.height/2-300);

    stroke("yellow");
    fill("yellow");
    textSize(35);
    textFont("Apple Chancery");
   // text("year 2500 .....",canvas.width/2-300,canvas.height/2-250);
    text(" Some asteroids are coming towords Earth.",canvas.width/2-300, canvas.height/2 - 210);
    text("  You are a space fighter.",canvas.width/2-300,canvas.height/2-170);
    text("Please save the earth",canvas.width/2-300,canvas.height/2-130);
    text("  press 'space' to shoot.",canvas.width/2-300,canvas.height/2-90);
    text("  use right and left arrows to move.",canvas.width/2-300,canvas.height/2-50);
    text("  press 's' to start game.",canvas.width/2,canvas.height/2-10);
   // text("wanna hear song while playing? click N",canvas.width/2-30,canvas.height/2-40);

 
    if(keyDown("w")){
      textSize(25);
      text("Song Playing : master the blaster",canvas.width/2-870,canvas.height/2-270);
    }

    
   
    //text("file:///C:/Users/paran/Desktop/info.html",canvas.width/2-50,canvas.width/2-30);
    
    if(keyDown("s")) {
      gameState = play;
    } 
    if(keyDown("r")) {
      gameState = instruction;
    }
   
  }
  if(keyDown("n")){
    song.play();
  }

  
  
}



  

function asteroids() {
  if(frameCount % 110 === 0) {
  
    var asteroid = createSprite(Math.round(random(50,1350)),-20);
    asteroid.velocityY = (6 + score/10);
    asteroid.lifetime = 200;
    asteroid.scale = random(0.4,0.5);
    //asteroid.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: asteroid.addImage(asteroid1);
              asteroid.setCollider("circle",-80,10,160);
              break;
      case 2: asteroid.addImage(asteroid2);
              asteroid.setCollider("circle",50,0,150);
              break;
      case 3: asteroid.addImage(asteroid3);
              asteroid.setCollider("circle",0,0,170)
      default: break;
    }
    
    //console.log(asteroid.x);
    asteroidGroup.add(asteroid);
  }
}