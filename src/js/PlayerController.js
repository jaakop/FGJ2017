'use strict';

var Effects = require('./Effects.js');

var Player = {
  player: undefined,
  cursors: undefined,
  input: undefined,
  playerCollisionGroup: undefined,
  emitter: undefined,
  
  create: function (game, input) {
    this.input = input;
    this.player = game.add.sprite(200, 240, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.setTo(4, 4);
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
    
    this.player.body.setCollisionGroup(this.playerCollisionGroup);
    //  Cursor keys to fly + space to fire
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    
    this.emitter = Effects.createEmitter(this.player);
  },
  update: function(game, cursors) {
    //this.player.body.setZeroVelocity();
    var speed = 1000;
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
    
    
    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !this.emitter.on){
      this.emitter.x = this.player.x;
      this.emitter.y = this.player.y;
      this.emitter.start(false, 1000, 250, 7);
    } 
    if(this.emitter.on) {
      this.emitter.x = this.player.x;
      this.emitter.y = this.player.y;
    }
 }
};

module.exports = Player;
