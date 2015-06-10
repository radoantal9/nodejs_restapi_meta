
var game;

function bootGame() {

  var options = {
    name: 'Agents of MMEAT',
    width: w,
    height: h,
    parent: 'game-container',
    renderType: Phaser.AUTO,
    antialias: false
  }

  // w, h, Phaser.AUTO, 'game-container'
  game = new Phaser.Game(options);
  game.state.add('Boot', Game.Boot);
  game.state.add('Load', Game.Load);
  game.state.add('Menu', Game.Menu);
  game.state.add('HowToPlay', Game.HowToPlay);
  game.state.add('Share', Game.Share);
  game.state.add('Leaderboard', Game.Leaderboard);
  game.state.add('Menu', Game.Menu);
  game.state.add('PlayerSelect', Game.PlayerSelect);
  game.state.add('Play', Game.Play);
  game.state.add('Realm', Game.Realm);
  game.state.add('Dead', Game.Dead);
  game.state.add('BleepBlorp', Game.BleepBlorp); // GAME WON!
  game.state.start('Boot');
}

angular.module(ApplicationConfiguration.applicationModuleName)
  .run(['$rootScope', '$location', 'Authentication', function($rootScope, $location, Authentication){
    $rootScope.$on('$viewContentLoaded', function(){
      var body = document.getElementsByTagName('body')[0];
      if (angular.element(body).hasClass('play') && document.getElementById('game-container') != null) {
        if (Authentication.user) {
          bootGame();
        } else {
          $location.path('/signin');
        }
      }
    });
  }]);
