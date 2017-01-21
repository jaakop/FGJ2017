'use strict';

var EnemyWeapon = {
    lastShot: 0,
    coolDown: 300,
    bullets: {},
    collisionGroup: undefined,

    initialize: function (game, num, image) {
        this.bullets = game.add.group();
        this.collisionGroup = game.physics.p2.createCollisionGroup();
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
            bullet.body.setCollisionGroup(this.collisionGroup);
        }
    },

    getBullet: function(){
        if(this.lastShot + this.coolDown < Date.now()){
            this.lastShot = Date.now();
            return this.bullets.getFirstExists(false);
        }
    }
}

module.exports = EnemyWeapon;
