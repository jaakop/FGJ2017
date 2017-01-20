'use strict';

var Background = require('./Background.js');
var EnemyController = require('./EnemyController.js');

var PlayScene = {
  create: function () {
    Background.create(this.game);
    EnemyController.create(this.game);
  },
  update: function() {
    Background.update(this.game);
    EnemyController.update(this.game, Background.time);
  }
};

module.exports = PlayScene;
