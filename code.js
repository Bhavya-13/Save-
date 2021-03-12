var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["7d748ef4-a932-4bc1-8cd1-95968b7234e3","e501ee72-cf57-4c61-878c-62ead1f5d21d","5db93e0d-e9ad-4788-8ff4-f7ba589d580a","e1f94c5e-05e3-4899-9c92-41a738b0dcdd","42bb79a9-a4c3-49b9-bee0-a8e98517cf57"],"propsByKey":{"7d748ef4-a932-4bc1-8cd1-95968b7234e3":{"name":"Player","sourceUrl":null,"frameSize":{"x":240,"y":300},"frameCount":1,"looping":true,"frameDelay":12,"version":"84QUopSOmCFiCo23F.35Z7vZTeutxC0c","categories":["robots"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":240,"y":300},"rootRelativePath":"assets/7d748ef4-a932-4bc1-8cd1-95968b7234e3.png"},"e501ee72-cf57-4c61-878c-62ead1f5d21d":{"name":"Enemy1","sourceUrl":"assets/api/v1/animation-library/gamelab/ZdtNFtOiydwR9zKYWovoGTaaRFuvBF6p/category_germs/gameplaywacky_05.png","frameSize":{"x":397,"y":372},"frameCount":1,"looping":true,"frameDelay":2,"version":"ZdtNFtOiydwR9zKYWovoGTaaRFuvBF6p","categories":["germs"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":397,"y":372},"rootRelativePath":"assets/api/v1/animation-library/gamelab/ZdtNFtOiydwR9zKYWovoGTaaRFuvBF6p/category_germs/gameplaywacky_05.png"},"5db93e0d-e9ad-4788-8ff4-f7ba589d580a":{"name":"Enemy2","sourceUrl":"assets/api/v1/animation-library/gamelab/M8B6O7TIbjVEbnqM7JY78H_1_lzVmGnD/category_germs/virus02_07.png","frameSize":{"x":400,"y":340},"frameCount":1,"looping":true,"frameDelay":2,"version":"M8B6O7TIbjVEbnqM7JY78H_1_lzVmGnD","categories":["germs"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":340},"rootRelativePath":"assets/api/v1/animation-library/gamelab/M8B6O7TIbjVEbnqM7JY78H_1_lzVmGnD/category_germs/virus02_07.png"},"e1f94c5e-05e3-4899-9c92-41a738b0dcdd":{"name":"Enemy3","sourceUrl":"assets/api/v1/animation-library/gamelab/XPV2K6ikOfhF.2Jek87gD9AAVCmeN53r/category_germs/gameplaywacky_18.png","frameSize":{"x":400,"y":399},"frameCount":1,"looping":true,"frameDelay":2,"version":"XPV2K6ikOfhF.2Jek87gD9AAVCmeN53r","categories":["germs"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":399},"rootRelativePath":"assets/api/v1/animation-library/gamelab/XPV2K6ikOfhF.2Jek87gD9AAVCmeN53r/category_germs/gameplaywacky_18.png"},"42bb79a9-a4c3-49b9-bee0-a8e98517cf57":{"name":"Back","categories":["backgrounds"],"frameCount":1,"frameSize":{"x":400,"y":400},"looping":true,"frameDelay":12,"jsonLastModified":"2021-01-05 18:38:16 UTC","pngLastModified":"2021-01-05 18:40:00 UTC","version":"1CbQShXLJOdoD_anK5fOTuxoqDOV1h2N","sourceUrl":null,"sourceSize":{"x":400,"y":400},"loadedFromSource":true,"saved":true,"rootRelativePath":"assets/42bb79a9-a4c3-49b9-bee0-a8e98517cf57.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var player;
var score=0;
var t;
var PLAY = 1;
var END = 0;

var gameState = PLAY;

var enemygrp = createGroup();

var back;
back = createSprite(200, 200 ,25 ,25);

player = createSprite(200,350 ,25 ,25);
player.setAnimation("Player");
player.scale=0.3;

var enemygrp=createGroup();



function draw() {
  background("white");
  

  



  
    back.setAnimation("Back");

    drawSprites();
    
      if (enemygrp.isTouching(bottomEdge)){
    gameState = END;
    playSound( "assets/Dies_.mp3");
  }
  
  if(gameState === PLAY) {
  movement();
  Spawner();
  }else if(gameState === END){
    player.velocityY=0;
    player.velocityX=0;
  
    textSize(20); 
    fill("yellow");
    t = text("Press 'Space' to restart", 100,200);
    //t.visible = false;
    t.depth=100;
    
  
    reset();
    back.depth=-100;
  }


    
    
  textSize(30);
  fill("white");
  text("score: "+score,260,30);

}

function movement(){
  
  player.velocityY=0;
  player.velocityX=0;
  
/*  if(keyDown(UP_ARROW)){
    player.velocityY= -5;
  }
  
  if(keyDown(DOWN_ARROW)){
    player.velocityY= 5;
  }*/
  
  if(keyDown(LEFT_ARROW)){
  player.velocityX= -5;
  }
  
  if(keyDown(RIGHT_ARROW)){
  player.velocityX= 5;
  }
  
  createEdgeSprites();
  player.bounceOff(edges);

}

function Spawner(){
  
  if(World.frameCount%80 === 0){
    var monster=createSprite(400,10,20,20);
     var dom=randomNumber(1,3);
     monster.setAnimation("Enemy"+dom);
     monster.scale=0.15;
     
    monster.x = randomNumber (50,250);
    monster.velocityY = (5+(score/10));
    monster.Lifetime=50;
    
    enemygrp.add(monster);
  }
  if (enemygrp.isTouching(player)) {
    enemygrp.destroyEach();
    score = score+1;
    playSound("assets/enemy-killed_.mp3");
}
}

function reset(){
  if(keyWentDown("space")){
    gameState = PLAY;
    score = 0;
  }

}


  

    

    


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
