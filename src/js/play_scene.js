'use strict';

var BackgroundController = require('./BackgroundController.js');
var EnemyController = require('./EnemyController.js');
var PlayerController = require('./PlayerController.js');
var Effects = require('./Effects.js');

var PlayScene = {
  explosion: undefined,
  
  preload: function () {
    this.load.image('player', 'images/player/ship.png');
  },

  create: function () {
    Effects.create(this.game);
    
    PlayerController.create(this.game, this.input);
    BackgroundController.create(this.game, PlayerController);
    
    EnemyController.create(this.game, BackgroundController.mountainCollisionGroup);
    BackgroundController.topGroup.body.collides(EnemyController.enemyCollisionGroup, function(mountain, enemy) {
      Effects.explode(enemy.sprite, "explosion");
    }, this);
    
    PlayerController.player.body.collides(BackgroundController.mountainCollisionGroup, function(player, mountain) {
      Effects.explode(player.sprite, "explosion");
    }, this);
    
    PlayerController.player.body.collides(EnemyController.enemyCollisionGroup, function(player, enemy) {
      Effects.explode(player.sprite, "explosion");
      Effects.explode(enemy.sprite, "explosion");
    }, this);
    
    
  },
  update: function() {
    
    BackgroundController.update(this.game);
    EnemyController.update(this.game, PlayerController, BackgroundController.time);
    PlayerController.update(this.game);
    
  },

};

module.exports = PlayScene;
