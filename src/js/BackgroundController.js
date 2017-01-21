'use strict';

var Background = {
  mountainCollisionGroup: undefined,
  bottomGroup: undefined,
  topGroup: undefined,
  time: 0,
  mountainArray: [{
    time: 500,
    size: 6
  },{
    time: 800,
    size: 8
  }],
  
  create: function (game, playerController) {
    
    
    this.mountainCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
    
    this.wall = game.add.tileSprite(0,0, 5000, 264, 'wall');
    this.wall.scale.setTo(4);
    this.wall.alpha = 0.2;
    this.wall.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    
    this.bottomGroup = game.add.tileSprite(0, game.height - 32, 5000, 32, 'bottom_tilesprite');
    this.bottomGroup.scale.setTo(2);
    this.bottomGroup.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    
    this.topGroup = game.add.tileSprite(0, 0, 5000, 32, 'top_tilesprite');
    this.topGroup.scale.setTo(2);
    this.topGroup.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    
    
    game.physics.p2.enable([this.bottomGroup, this.topGroup]);
    this.bottomGroup.body.kinematic = true;
    this.bottomGroup.body.setCollisionGroup(this.mountainCollisionGroup);
    this.bottomGroup.body.collides(playerController.playerCollisionGroup);
    this.bottomGroup.body.velocity.x = -100;

    this.topGroup.body.kinematic = true;
    this.topGroup.body.setCollisionGroup(this.mountainCollisionGroup);
    this.topGroup.body.collides(playerController.playerCollisionGroup);
    this.topGroup.body.velocity.x = -100;
    
  },
  update: function(game, playerCollisionGroup) {
    
    this.topGroup.x -= 2;
    this.wall.x -= 1;
    this.time++;
    for(var mountainIndex in this.mountainArray) {
      var mountain = this.mountainArray[mountainIndex];
      
      if(mountain.time === this.time) {
        var mountainSprite = game.add.sprite(game.width, game.height, "mountain");
        mountainSprite.anchor.x = 0;
        mountainSprite.anchor.y = 1;
        mountainSprite.scale.setTo(mountain.size);
        mountainSprite.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        
        mountain.sprite = mountainSprite;
        
        //game.physics.p2.enable(mountain.sprite);
        
        //mountain.sprite.body.fixedRotation = true;
        //mountain.sprite.body.mass = 0;
        //mountain.sprite.body.setCollisionGroup(this.mountainCollisionGroup);
        /*mountain.sprite.body.collides([playerCollisionGroup], function() {
          console.log("HIT!!!");
        }, this);*/
      }
      if(mountain.sprite) {
        mountain.sprite.x -= 2;
      }
    }
  }
};

module.exports = Background;
