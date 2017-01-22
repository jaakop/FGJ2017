'use strict';

var IntroScene = {
    preload: function () {
        this.game.load.image('intro', 'images/IntroKuva.png');
    },

    create: function () {
        var splash = this.game.add.sprite(100, 0, 'intro');
        splash.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        splash.scale.setTo(8.25);
        this.game.input.keyboard.onDownCallback = function (e) {
            this.game.input.keyboard.onDownCallback = undefined;
            this.game.state.start('play')
        }
    },
    update: function () {


    }
};

module.exports = IntroScene;
