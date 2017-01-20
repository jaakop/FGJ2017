'use strict';

var Background = require('./Background.js');
var EnemyController = require('./EnemyController.js');

var PlayScene = {
  preload: function () {
    this.load.image('player', 'images/player/ship.png');
  },

  create: function () {
    Background.create(this.game);
    EnemyController.create(this.game);
    // Player setup
    this.player = this.game.add.sprite(200, 240, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.setTo(10, 10);
    //	Enable p2 physics
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.body.fixedRotation = true;
    this.player.body.damping = 0.9;

    //  Cursor keys to fly + space to fire
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    
  },
  update: function() {
    Background.update(this.game);
    EnemyController.update(this.game, Background.time);
    this.updatePlayer();

  },

  updatePlayer: function () {
    //this.player.body.setZeroVelocity();
    var speed = 800;
    if (this.cursors.left.isDown) {
      this.player.body.force.x = -speed;
      //this.player.body.moveLeft(speed);
    }
    else if (this.cursors.right.isDown) {
      this.player.body.force.x = speed;
      //this.player.body.moveRight(speed);
    }

    if (this.cursors.up.isDown) {
      this.player.body.force.y = -speed;
      //this.player.body.moveUp(speed);
    }
    else if (this.cursors.down.isDown) {
      this.player.body.force.y = speed;
      //this.player.body.moveDown(speed);
    }

  }
};

module.exports = PlayScene;
