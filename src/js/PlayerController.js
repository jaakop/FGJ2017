'use strict';

var Effects = require('./Effects.js');

var Player = {
  player: undefined,
  cursors: undefined,
  input: undefined,
  playerCollisionGroup: undefined,
  emitter: undefined,
  sounds: {
    flush: undefined,
    laser: undefined,
    hit: undefined
  },

  create: function (game, input) {
    this.input = input;
    this.sounds["hit"] = game.add.audio('hit');
    this.player = game.add.sprite(200, 240, 'player');
    this.player.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.setTo(4, 4);
    this.weapon1 = require('./Weapon1.js');
    //	Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.enable(this.player);
    game.physics.p2.setImpactEvents(true);

    game.physics.p2.restitution = 0.8;
    this.player.body.collideWorldBounds = true;

    this.player.body.fixedRotation = true;
    this.player.body.damping = 0.9;
    this.player.body.setRectangle(16, 16);
    this.playerCollisionGroup = game.physics.p2.createCollisionGroup();

    this.weapon1.initialize(game, 20, 'bullet1');

    this.player.body.setCollisionGroup(this.playerCollisionGroup);
    //  Cursor keys to fly + space to fire
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    this.input.keyboard.addKeyCapture([Phaser.Keyboard.ENTER]);

    this.emitter = Effects.createEmitter(this.player);
    this.trailEmitter = Effects.trailEmitter(this.player);
    
    this.sounds["flush"] = game.add.audio('flush');
    this.sounds["laser"] = game.add.audio('laser');
    this.sounds["laser"].volume = 0.8;
    
  },
  update: function (game, cursors) {
    this.trailEmitter.on = this.player.alive;
    
    
    this.trailEmitter.frequency = 500;
    this.trailEmitter.x = this.player.x - 25;
    this.trailEmitter.y = this.player.y;
    var speed = 1000;
    if (this.cursors.left.isDown) {
      this.player.body.force.x = -speed;
      this.trailEmitter.on = false;
    }
    else if (this.cursors.right.isDown) {
      this.player.body.force.x = speed;
      this.trailEmitter.frequency = 200;
    }
    if (this.cursors.up.isDown) {
      this.player.body.force.y = -speed;
      //this.player.body.moveUp(speed);
    }
    else if (this.cursors.down.isDown) {
      this.player.body.force.y = speed;
      //this.player.body.moveDown(speed);
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER) && !this.emitter.on) {
      this.emitter.x = this.player.x;
      this.emitter.y = this.player.y;
      this.emitter.start(false, 1000, 250, 7);
      
      this.sounds["flush"].play();
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      var bullet = this.weapon1.getBullet();
      if (bullet) {
        bullet.reset(this.player.x + 25, this.player.y);
        bullet.body.velocity.x = 1000;
        this.sounds["laser"].play();
      }
    }
  },

  collideBullets: function (target) {
    for(var i in this.weapon1.bullets.children){
      var bullet = this.weapon1.bullets.children[i];
      bullet.body.collides(target, this.bulletHits, this);
    }
  },

  bulletHits: function(bullet, target){
    //Effects.explode(target.sprite, 'explosion');
    bullet.sprite.kill();
    console.log("HITPLAY");
    this.sounds["hit"].play();
    
    if(!--target.sprite.health) {
      Effects.explode(target.sprite, 'explosion');
    }
  }
};


module.exports = Player;
