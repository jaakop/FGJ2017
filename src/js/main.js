'use strict';

var PlayScene = require('./play_scene.js');
var IntroScene = require('./intro_scene.js');


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    
  },

  create: function () {
    
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.image('gameover', 'images/game_over.png');
    this.game.load.image('vihu1', 'images/characters/Vihu.png');
    this.game.load.image('vihu2', 'images/characters/Vihu2.png');
    this.game.load.image('vihu3', 'images/characters/Vihu3.png');
    this.game.load.image('mountain', 'images/background/Mountain.png');
    this.game.load.image('gravity_effect', 'images/effects/GravityEffect1.png');
    this.game.load.spritesheet('bottom_tilesprite', 'images/background/Tileset Walls.png', 64, 128, 1);
    this.game.load.spritesheet('top_tilesprite', 'images/background/TileSetWalls2.png', 64, 128, 1);
    this.game.load.spritesheet('wall', 'images/background/Wall1.png', 32, 32, 1);
    this.game.load.spritesheet('explosion', 'images/effects/Explosions.png', 32, 32, 3);
    this.game.load.image('gravity_circle', 'images/effects/GravityCircle_placeholder.png');
    this.game.load.image('bullet1', 'images/effects/LightBall.png');
    this.game.load.image('enemy_bullet1', 'images/effects/EnemyLightBall.png');
    this.game.load.image('mine', 'images/characters/StaticEmitter.png');
    
    this.game.load.audio('flush', 'sounds/Gravitysound.wav');
    this.game.load.audio('explosion', 'sounds/Explotion.wav');
    this.game.load.audio('laser', 'sounds/PiuPiu.wav');
    this.game.load.audio('hit', 'sounds/Hit.wav');
  },

  create: function () {
    
    this.game.state.start('intro');
  }
};


window.onload = function () {
  var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);
  game.state.add('intro', IntroScene);

  game.state.start('boot');
};
