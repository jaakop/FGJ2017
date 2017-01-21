'use strict';
var IntroScene = {
    preload: function () {
        this.load.image('phaser', 'images/phaser.png');
    },

    create: function () {
        this.game.add.sprite(200, 200, 'phaser');
        this.game.input.keyboard.onDownCallback = function (e) {
            this.game.input.keyboard.onDownCallback = undefined;
            this.game.state.start('play')
        }
    },
    update: function () {


    }
};

module.exports = IntroScene;
