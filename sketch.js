var path,boy,cash,diamonds,jwellery,sword, obstacleGroup;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0, obstacle, obstacleImage;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY = 1, END = 0, gameState;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  obstacleImage = loadImage("obstacle1.png");
}

function setup(){
  
  createCanvas(600, 600);
  // Moving background
  path=createSprite(300,300);
  path.addImage(pathImg);
  path.velocityY = 4;

  boy = createSprite(70,500,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale = 0.08;
  
  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
  obstacleGroup = new Group();
  
  gameState = PLAY;
  
}

function draw() {
  
  background(0);
  
  edges= createEdgeSprites();
  boy.collide(edges);
  console.log(gameState);
  

  if(gameState == PLAY){
    if(path.y > 400 ){
      path.y = height/2;
    }
    
    var rand = Math.round(random(1, 5));
    if(World.frameCount % 25 === 0){
      if(rand == 1){
        createCash();
      }
      if(rand == 2){
        createDiamonds();
      }
      if(rand == 3){
        createJwellery();
      }
      if(rand == 4){
        createSword();
      }
      if(rand == 5){
        createObstacles();
      }
    }
    
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection  = treasureCollection + 400;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection += 700;
    }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection += 1000;
    }
    boy.x = World.mouseX;
    if(swordGroup.isTouching(boy)){
      gameState = END;
    }
    if(obstacleGroup.isTouching(boy){
      gameState = END;   
    }
  } else if(gameState == END){
    swordGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameState = END;
    boy.addAnimation("SahilRunning", endImg);
    boy.scale = 0.8;
    boy.y = 300;
    boy.x = 300;
    cashG.destroyEach();
    cashG.velocityY = 0;
    diamondsG.destroyEach();
    diamondsG.velocityY = 0;
    jwelleryG.destroyEach();
    jwelleryG.velocityY = 0;
    swordGroup.destroyEach();
    swordGroup.velocityY = 0;
    obstacleGroup.velocityY = 0;
    path.y = 0;
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection,250,30);

}

function createCash() {
  var cash = createSprite(Math.round(random(50, 500),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
}

function createDiamonds() {
  var diamonds = createSprite(Math.round(random(50, 500),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}

function createJwellery() {
  var jwellery = createSprite(Math.round(random(50, 500),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
}

function createSword(){
  var sword = createSprite(Math.round(random(50, 500),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
}

function createObstacles(){
  var obstacle = createSprite(Math.round(random(50, 500),40, 10, 10));
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityY = 3;
  obstacle.lifetime = 150;
  obstacleGroup.add(obstacle);
}
