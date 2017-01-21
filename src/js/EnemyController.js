'use strict';
var Effects = require('./Effects.js');

var EnemyController = {
  enemyTable: [],
  enemyGroup: undefined,
  enemyCollisionGroup: undefined,
  
  closestEnemy: undefined,
  gravityEffect: undefined,
  
  create: function (game) {
    this.enemyCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
    
    
    this.enemyGroup = game.add.group();
/*    this.enemyGroup.enableBody = true;
    this.enemyGroup.physicsBodyType = Phaser.Physics.P2JS;
  */  
    

    this.enemyTable.push({
      spriteName: "vihu1",
      time: 10,
      posy: 200,
      frequency: 200,
      gravityMultiplier: 5,
      sprite: undefined
    });
    /*this.enemyTable.push({
      spriteName: "vihu1",
      time: 110,
      posy: 400,
      frequency: 200,
      gravityMultiplier: 5,
      sprite: undefined
    });
    this.enemyTable.push({
      spriteName: "vihu1",
      time: 100,
      posy: 300,
      frequency: 200,
      gravityMultiplier: 5,
      sprite: undefined
    });
    
    
    this.enemyTable.push({
      spriteName: "vihu1",
      time: 170,
      posy: 600,
      frequency: 250,
      gravityMultiplier: 5,
      sprite: undefined
    });
    this.enemyTable.push({
      spriteName: "vihu1",
      time: 165,
      posy: 550,
      frequency: 300,
      gravityMultiplier: 5,
      sprite: undefined
    });
    this.enemyTable.push({
      spriteName: "vihu1",
      time: 160,
      posy: 500,
      frequency: 250,
      gravityMultiplier: 5,
      sprite: undefined
    });
    
    this.enemyTable.push({
      spriteName: "vihu2",
      time: 200,
      posy: 400,
      gravityMultiplier: 0.5,
      sprite: undefined
    });
    
    this.enemyTable.push({
      spriteName: "vihu2",
      time: 220,
      posy: 400,
      gravityMultiplier: 0.5,
      sprite: undefined
    });
    
    this.enemyTable.push({
      spriteName: "vihu2",
      time: 240,
      posy: 400,
      gravityMultiplier: 0.5,
      sprite: undefined
    });
    
    
    this.enemyTable.push({
      spriteName: "vihu2",
      time: 300,
      posy: 600,
      gravityMultiplier: 0.5,
      sprite: undefined
    });
    
    this.enemyTable.push({
      spriteName: "vihu2",
      time: 320,
      posy: 600,
      gravityMultiplier: 0.5,
      sprite: undefined
    });
    
    this.enemyTable.push({
      spriteName: "vihu2",
      time: 340,
      posy: 600,
      gravityMultiplier: 0.5,
      sprite: undefined
    });*/
  },
  update: function(game, playerController, time) {
    for(var vihuIndex in this.enemyTable) {
      var vihu = this.enemyTable[vihuIndex];
      if(vihu.time === time && !vihu.sprite) {
        vihu.sprite = game.add.sprite(game.width, vihu.posy, vihu.spriteName);
        this.enemyGroup.addChild(vihu.sprite);
        
        var scaleModifier = 1 + vihu.gravityMultiplier;
        vihu.sprite.scale.setTo(scaleModifier);
        game.physics.p2.enable(vihu.sprite);
        vihu.sprite.body.setRectangle(16, 16);
        vihu.sprite.body.setCollisionGroup(this.enemyCollisionGroup);
        
        if(vihu.gravityMultiplier > 1) {
            vihu.sprite.body.fixedRotation = true;
        }
        
        vihu.sprite.body.collideWorldBounds = false;
        vihu.sprite.checkWorldBounds = true;
        vihu.sprite.outOfBoundsKill = true;
        
        vihu.sprite.body.collides(playerController.playerCollisionGroup);
       }
       
      if(vihu.sprite) {
        var distance = this.distanceBetween(playerController.player, vihu.sprite);
        if(vihu.gravityMultiplier >= 1) {
          vihu.sprite.body.thrustLeft(100);
          
          if(time%vihu.frequency === 1) {
            vihu.attractor = Effects.createAttractor(vihu.sprite);
            vihu.attractor.start(false, 1000, 250, 7);
            this.calculateGravity(game, playerController.player, vihu);
          }
        } else {
          this.accelerateToObject(game, vihu.sprite, playerController.player, 80 * (1 + vihu.gravityMultiplier));
        }
        
            
        if(vihu.attractor && vihu.attractor.on) {
          vihu.attractor.x = vihu.sprite.x;
          vihu.attractor.y = vihu.sprite.y;
          if(time%10 === 1) {
            this.calculateGravity(game, playerController.player, vihu);
          }
        }
        
        if(!vihu.sprite.visible) {
          vihu.sprite.kill();
          vihu.sprite = undefined;
        } 
      }
    }
    
    
    if(playerController.emitter.on) {
      for(var vihuIndex in this.enemyTable) {
        var vihu = this.enemyTable[vihuIndex];
        if(vihu.sprite) {
            this.accelerateFromObject(game, vihu.sprite, playerController.emitter, 500);
        }
      }
    } 
    
    /*else if(this.closestEnemy && this.closestEnemy.enemy.sprite) {
      this.calculateGravity(game, playerController.player);
      this.closestEnemy = undefined;
    }*/
    
    
  },
  calculateGravity: function(game, player, vihu) {
    var speed = 200;
    var distance = this.distanceBetween(player, vihu.sprite);
    if (distance < 300) { 
      speed = 500;
    } else if (distance < 600) { 
      speed = 400;
    } else if (distance < 900) { 
      speed = 300;
    }
    console.log(speed * vihu.gravityMultiplier);
    this.accelerateToObject(game, player, vihu.sprite, 5* speed * vihu.gravityMultiplier);
  },
  distanceBetween: function(spriteA, spriteB){    
    var dx = spriteA.body.x - spriteB.body.x;  
    var dy = spriteA.body.y - spriteB.body.y;  
    var dist = Math.sqrt(dx*dx + dy*dy);     
    return dist;
    
  },
  accelerateToObject: function(game, obj1, obj2, speed) {     
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);    
    obj1.body.rotation = angle + game.math.degToRad(180);  
    obj1.body.force.x = Math.cos(angle) * speed;    
    obj1.body.force.y = Math.sin(angle) * speed;
  },
  accelerateFromObject: function(game, obj1, obj2, speed) {     
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);    
    obj1.body.rotation = angle + game.math.degToRad(180);  
    obj1.body.force.x = Math.cos(angle) * speed * -1;    
    obj1.body.force.y = Math.sin(angle) * speed * -1;
  }
};

module.exports = EnemyController;
