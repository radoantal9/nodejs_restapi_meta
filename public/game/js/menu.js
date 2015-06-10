Game.Menu = function (game) { };

Game.Menu.prototype = {

	create: function () {

    // var header = document.getElementById('header');
    // header.style.display = 'block';

    this.clouds = game.add.sprite(-50, 110, 'clouds_intro');
    // this.clouds.smoothed = false;
    this.clouds.scale.setTo(0.75, 0.75);

    this.logo = game.add.sprite(0, 50, 'logo');
    this.logo.scale.setTo(0.5, 0.5);
    this.logo.x = (w - this.logo.width - 140) * 0.5;

    this.character = game.add.sprite(170, 110, 'character_intro');
    this.character.frame = 0;
    this.character.scale.setTo(0.5, 0.5);

    this.platform = game.add.sprite(230, 380, 'platform');
    this.platform.scale.setTo(0.8, 0.8);

    var menuItems = [
      {
        text: 'Play',
        size: '40px',
        state: 'PlayerSelect'
      },
      {
        text: 'How To Play',
        size: '20px',
        state: 'HowToPlay'
      },
      {
        text: 'Share',
        size: '20px',
        state: 'Share'
      },
      {
        text: 'Leaderboard',
        size: '20px',
        state: 'Leaderboard'
      },
    ];

    var menuOptions = {
      font: 'kemco',
      startX: 0,
      startY: 200,
      x: 20,
      y: 0,
      labelX: (w - 260) * 0.5,
      marginBottom: 25,
      off: 0xFFFFFF,
      on: 0xFF0000
    };

    function createMenu(items, options) {
      var menu = {
        items: [],
        selected: 'Play'
      };
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var y;

        if (i === 0) {
          y = options.startY;
        } else {
          var previousItem = menu.items[i-1];
          y = previousItem.y + previousItem.height + options.marginBottom;
        }

        var label = game.add.text(options.x, y, item.text, {
          font: item.size + ' ' + options.font,
          fill: '#fff',
          stroke: '#000',
          strokeThickness: 7
        });
        label.state = item.state;
        label.inputEnabled = true;
        label.events.onInputUp.add(function(e){
          if (e.state == 'HowToPlay') {
            window.location.href = '/#!/how-to-play';
          } else {
            game.state.start(e.state);
          }
        });
        menu.items.push(label);
        if (i === 0) {
          label.tint = options.on;
        }
      }
      return menu;
    }

    var menu = createMenu(menuItems, menuOptions);

	},

	update: function() {

	},

	shutdown: function() {
		game.world.removeAll();
	}

};
