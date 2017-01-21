'use strict';

var Background = require('./Background.js');
var EnemyController = require('./EnemyController.js');

var PlayScene = {
  preload: function () {
    this.load.image('player', 'images/player/ship.png');
    this.load.image('bullet1', 'images/player/bullet1.png');
  },

  create: function () {
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    // collisions
    this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.bulletCollisionGroup = this.game.physics.p2.createCollisionGroup();
    this.game.physics.p2.updateBoundsCollisionGroup();

    Background.create(this.game);
    EnemyController.create(this.game);
    // Player setup
    this.player = this.game.add.sprite(200, 240, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.setTo(5, 5);
    this.weapon1 = require('./weapon1.js');
    this.emitter = this.game.add.emitter(this.player.x-10, this.player.y, 30);
    this.emitter.makeParticles('bullet1');
    this.emitter.setAlpha(1, 0.5, 600);
    //this.emitter.frequency = 300;
    this.emitter.setScale(10, 4, 10, 4, 1000);
    this.emitter.gravity = 0;
    this.emitter.setXSpeed(5, 10);
    this.emitter.minParticleSpeed.setTo(-50, 0);
    this.emitter.maxParticleSpeed.setTo(-40, 0);
    this.emitter.start(false);//, 1000, 250, 7);
    this.emitter.flow(1000, 500, 1, -1, true);

    //	Enable p2 physics
    this.game.physics.p2.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.body.fixedRotation = true;
    this.player.body.damping = 0.95;
    this.player.body.setCollisionGroup(this.playerCollisionGroup);
    this.player.body.collides(EnemyController.enemyGroup, this.playerEnemyCollision, this);
    this.weapon1.initialize(this.game, 20, 'bullet1');

    //  Cursor keys to fly + space to fire
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

  },
  update: function () {
    Background.update(this.game);
    EnemyController.update(this.game, Background.time);
    this.updatePlayer();
    this.emitter.x = this.player.x-25;
    this.emitter.y = this.player.y;

  },

  updatePlayer: function () {
    var speed = 800;
    this.emitter.on = true;
    this.emitter.frequency = 500;
    if (this.cursors.left.isDown) {
      this.player.body.thrustLeft(speed);
      this.emitter.on = false;
    }
    else if (this.cursors.right.isDown) {
      this.player.body.thrustRight(speed);
      this.emitter.frequency = 200;
    }

    if (this.cursors.up.isDown) {
      this.player.body.thrust(speed);
    }
    else if (this.cursors.down.isDown) {
      this.player.body.reverse(speed);
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      var bullet = this.weapon1.getBullet();
      if (bullet) {
        bullet.reset(this.player.x + 25, this.player.y);
        bullet.body.velocity.x = 1000;
      }
    }

  },

  playerEnemyCollision: function (player, enemy) {
    console.log('collisioon');
  }
};

module.exports = PlayScene;
