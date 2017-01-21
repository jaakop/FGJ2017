'use strict';

var Background = require('./Background.js');
var EnemyController = require('./EnemyController.js');

var PlayScene = {
  preload: function () {
    this.load.image('player', 'images/player/ship.png');
    this.load.image('bullet1', 'images/player/bullet1.png');
  },

  create: function () {
    Background.create(this.game);
    EnemyController.create(this.game);
    // Player setup
    this.player = this.game.add.sprite(200, 240, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.setTo(5, 5);
    this.weapon1 = require('./weapon1.js');
    //this.weapon1.bullets = this.game.addGroup();

    //	Enable p2 physics
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.body.fixedRotation = true;
    this.player.body.damping = 0.95;
    this.weapon1.initialize(this.game, 20, 'bullet1');

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
    var speed = 800;
    if (this.cursors.left.isDown) {
      this.player.body.thrustLeft(speed);
    }
    else if (this.cursors.right.isDown) {
      this.player.body.thrustRight(speed);
    }

    if (this.cursors.up.isDown) {
      this.player.body.thrust(speed);
    }
    else if (this.cursors.down.isDown) {
      this.player.body.reverse(speed);
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      var bullet = this.weapon1.bullets.getFirstExists(false);
      if(bullet){
        bullet.reset(this.player.x+25, this.player.y);
        bullet.body.velocity.x = 1000;
      }
    }

  }
};

module.exports = PlayScene;
