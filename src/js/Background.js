'use strict';

var Background = {
  bottomGroup: undefined,
  time: 0,
  
  create: function (game) {
    console.log("TESTESTE");
    this.bottomGroup = game.add.tileSprite(0, 542, 5000, 32, 'bottom_tilesprite');
    this.bottomGroup.scale.setTo(2);
  },
  update: function(game) {
    this.bottomGroup.x -= 2;
    this.time++;
  }
};

module.exports = Background;
