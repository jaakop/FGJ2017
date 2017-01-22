'use strict';

var BackgroundController = undefined;
var EnemyController = undefined;
var PlayerController = undefined;
var Effects = require('./Effects.js');

var PlayScene = {
  sounds: {
    explosion: undefined
  },


  preload: function () {
    this.load.image('player', 'images/player/ship.png');
    this.load.image('bullet1', 'images/player/bullet1.png');
  },

  create: function () {
    var thisGame = this.game;
    BackgroundController = require('./BackgroundController.js');
    EnemyController = require('./EnemyController.js');
    PlayerController = require('./PlayerController.js');

    this.sounds["explosion"] = this.game.add.audio('explosion');
    
    Effects.create(this.game);

    PlayerController.create(this.game, this.input);
    BackgroundController.create(this.game, PlayerController);

    EnemyController.create(this.game, BackgroundController.mountainCollisionGroup);
    BackgroundController.topGroup.body.collides(EnemyController.enemyCollisionGroup, function (mountain, enemy) {
      Effects.explode(enemy.sprite, "explosion");
      this.sounds["explosion"].play();
    }, this);

    PlayerController.player.body.collides(BackgroundController.mountainCollisionGroup, function (player, mountain) {
      Effects.explode(player.sprite, "explosion", function () {
        var popup = thisGame.add.sprite(thisGame.width/2, thisGame.height/2, 'gameover');
        popup.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        popup.anchor.setTo(0.5, 0.5);
        popup.scale.setTo(6, 6);
    
        thisGame.paused = true;
        thisGame.input.keyboard.onDownCallback = function (e) {
            location.reload();
        }
      });
      this.sounds["explosion"].play();
    }, this);

    PlayerController.player.body.collides(EnemyController.enemyCollisionGroup, function (player, enemy) {
      Effects.explode(player.sprite, "explosion", function () {
        var popup = thisGame.add.sprite(thisGame.width/2, thisGame.height/2, 'gameover');
        popup.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        popup.anchor.setTo(0.5, 0.5);
        popup.scale.setTo(6, 6);
        thisGame.paused = true;
        thisGame.input.keyboard.onDownCallback = function (e) {
            location.reload();
        }});
      Effects.explode(enemy.sprite, "explosion");
      this.sounds["explosion"].play();
    }, this);

    PlayerController.collideBullets(EnemyController.enemyCollisionGroup);
  },
  update: function () {

    BackgroundController.update(this.game);
    EnemyController.update(this.game, PlayerController, BackgroundController.time);
    PlayerController.update(this.game);

    if (this.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
      location.reload();
    }

  },

};

module.exports = PlayScene;
