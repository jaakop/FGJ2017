'use strict';

var EnemyController = {
  enemyTable: [],
  enemyGroup: undefined,
  enemyCollisionGroup: undefined,
  
  create: function (game) {
    this.enemyCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
    
    
    this.enemyGroup = game.add.group();
    this.enemyGroup.enableBody = true;
    this.enemyGroup.physicsBodyType = Phaser.Physics.P2JS;
    
    this.enemyTable.push({
      spriteName: "vihu2",
      time: 300,
      posy: 250,
      sprite: undefined
    });
    this.enemyTable.push({
      spriteName: "vihu2",
      time: 300,
      posy: 200,
      sprite: undefined
    });
    this.enemyTable.push({
      spriteName: "vihu1",
      time: 200,
      posy: 500,
      sprite: undefined
    });
    this.enemyTable.push({
      spriteName: "vihu2",
      time: 350,
      posy: 250,
      sprite: undefined
    });
    this.enemyTable.push({
      spriteName: "vihu1",
      time: 400,
      posy: 100,
      sprite: undefined
    });
  },
  update: function(game, time) {
    for(var vihuIndex in this.enemyTable) {
      var vihu = this.enemyTable[vihuIndex];
      if(vihu.time === time && !vihu.sprite) {
        vihu.sprite = game.add.sprite(800, vihu.posy, vihu.spriteName);
        this.enemyGroup.addChild(vihu.sprite);
        
        vihu.sprite.scale.setTo(3);
        
        game.physics.p2.enable(vihu.sprite);
        
        vihu.sprite.body.setCollisionGroup(this.enemyCollisionGroup);
        
        vihu.sprite.body.fixedRotation = true;
        vihu.sprite.body.thrust(600);
        vihu.sprite.body.collideWorldBounds = true;
        
        
        
      }
      if(vihu.sprite) {
        if(vihu.sprite.x < -30) {
          vihu.sprite.kill();
          vihu.sprite = undefined;
        } 
      }
    }
  }
};

module.exports = EnemyController;
