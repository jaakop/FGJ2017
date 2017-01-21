'use strict';

var Effects = {
  game: undefined,

  create: function (game) {
    this.game = game;
  },

  explode: function (sprite, explosionName) {
    console.log(sprite);
    sprite.kill();

    var explosion = this.game.add.sprite(sprite.x, sprite.y, explosionName);
    var anim = explosion.animations.add("boom");
    explosion.scale.setTo(2);
    anim.onComplete.add(function(){
      explosion.kill();
    });
    explosion.animations.play("boom", 3, false);
  },
  createAttractor: function (enemy) {
    var attractor = this.game.add.emitter(enemy.centerX, enemy.centerY, 10);
    attractor.width = 0;
    attractor.maxParticleSpeed = 0;
    attractor.makeParticles("gravity_circle");
    attractor.frequency = 200;
    attractor.setAlpha(0.1, 1, 1000);
    attractor.setScale(0.8, 0.1, 0.8, 0.1, 3000, Phaser.Easing.Quintic.Out);
    return attractor;
  },
  createEmitter: function (player) {
    var emitter = this.game.add.emitter(player.centerX, player.centerY, 10);
    emitter.width = 0;
    emitter.maxParticleSpeed = 0;
    emitter.makeParticles("gravity_circle");
    emitter.frequency = 200;
    emitter.setAlpha(1, 0.1, 1000);
    emitter.setScale(0.1, 1, 0.1, 1, 6000, Phaser.Easing.Quintic.Out);
    return emitter;
  },
  trailEmitter: function (player) {
    var emitter = this.game.add.emitter(player.x - 10, player.y, 30);
    emitter.makeParticles('bullet1');
    emitter.setAlpha(1, 0.5, 600);
    emitter.setScale(10, 4, 10, 4, 1000);
    emitter.gravity = 0;
    emitter.setXSpeed(5, 10);
    emitter.minParticleSpeed.setTo(-50, 0);
    emitter.maxParticleSpeed.setTo(-40, 0);
    emitter.start(false);
    emitter.flow(1000, 500, 1, -1, true);
    return emitter;
  }
};

module.exports = Effects;
