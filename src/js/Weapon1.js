'use strict';

var Weapon1 = {
    bullets: {},

    initialize: function (game, num, image) {
        this.bullets = game.add.group();
        for (var i = 0; i < num; i++) {
            var bullet = this.bullets.create(0, 0, image);
            bullet.exists = false;
            game.physics.p2.enable(bullet);
            bullet.scale.setTo(5, 5);
            bullet.anchor.setTo(0.5, 0.5);
            bullet.body.fixedRotation = true;
            bullet.body.collideWorldBounds = false;
            bullet.checkWorldBounds = true;
            bullet.outOfBoundsKill = true;
        }
    }
}

module.exports = Weapon1;
