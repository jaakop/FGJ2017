'use strict';

var Background = {
  mountainCollisionGroup: undefined,
  bottomGroup: undefined,
  time: 0,
  mountainArray: [{
    time: 500,
    size: 2
  },{
    time: 800,
    size: 3
  }],
  
  create: function (game) {
    console.log("TESTESTE");
    
    this.mountainCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
    
    this.bottomGroup = game.add.tileSprite(0, 542, 5000, 32, 'bottom_tilesprite');
    this.bottomGroup.scale.setTo(2);
  },
  update: function(game, playerCollisionGroup) {
    this.bottomGroup.x -= 2;
    this.time++;
    for(var mountainIndex in this.mountainArray) {
      var mountain = this.mountainArray[mountainIndex];
      
      if(mountain.time === this.time) {
        console.log("MOUNTAIN!");
        var mountainSprite = game.add.sprite(800, 600, "mountain");
        mountainSprite.anchor.x = 0;
        mountainSprite.anchor.y = 1;
        mountainSprite.scale.setTo(mountain.size);
        
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
