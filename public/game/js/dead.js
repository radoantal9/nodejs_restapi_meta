Game.Dead = function (game) { };

Game.Dead.prototype = {

	create: function () {

		console.log('Dead. update playID', playID, 'score', score, 'level', realm);
		request('put','/plays/' + playID, { score: score, level: realm, finished: new Date() }, function() {
			console.log(this.responseText);
		});

			// RESET REALM
		// realm = 1;

		// createTitle('Game Over');

	    // createGround();

		

	    var txt = 'GAME\nOVER';
	    this.title = game.add.text(30, 50, txt, { font: '48px kemco', fill: '#fff', stroke: '#000', strokeThickness: 7 });

	    this.share_copy = game.add.text(30, 160, 'Share your score!', { font: '13px kemco', fill: '#fff', stroke: '#000', strokeThickness: 7 });

		this.facebook = game.add.sprite(30, 190, 'facebook');
	    this.facebook.scale.setTo(0.5, 0.5);
	    this.facebook.inputEnabled = true;
	    this.facebook.events.onInputUp.add(function(e){
	    	var win = window.open('https://www.facebook.com/marcangelofoods', '_blank');  
	    	win.focus();
	      	console.log('share w/ facebook');
	    });

	    this.twitter = game.add.sprite(100, 190, 'twitter');
	    this.twitter.scale.setTo(0.5, 0.5);
	    this.twitter.inputEnabled = true;
	    this.twitter.events.onInputUp.add(function(e){
	    	var win = window.open('https://twitter.com/MarcAngeloFoods?lang=en', '_blank');  
	    	win.focus();
	      	console.log('share w/ twitter');
	    });

	    this.score = game.add.text(30, 265, 'SCORE: ' + score, { font: 'bold 16px Arial', fill: '#000' });
	    
	    // RESET LEVEL SCORE:
		score = score_level_start;

	    this.character = game.add.sprite(170, 110, 'character_intro');
    	this.character.frame = 0;
    	this.character.scale.setTo(0.5, 0.5);

	    // this.circleimage = game.add.sprite(150, 140, 'circleimage');
	    // this.circleimage.scale.setTo(0.5, 0.5);

	    this.btn_mainmenu = game.add.sprite(30, 300, 'btn_mainmenu');
		this.btn_mainmenu.scale.setTo(0.5, 0.5);
		this.btn_mainmenu.inputEnabled = true;
		this.btn_mainmenu.events.onInputUp.add(function(e){
			game.state.start('Menu');
		});

		this.btn_playagain = game.add.sprite(30, 350, 'btn_playagain');
		this.btn_playagain.scale.setTo(0.5, 0.5);
		this.btn_playagain.inputEnabled = true;
		this.btn_playagain.events.onInputUp.add(function(e){
			game.state.start('Play');
		});


		/*

	    game.add.text(Math.floor(w/2)+0.5, 50, 'GAME OVER', { font: '40px kemco', fill: '#fff' })
			.anchor.setTo(0.5, 0.5);

			*/

      /*
	    game.add.text(Math.floor(w/2)+0.5, 130, 'your score: '+score+'\nbest score: '+best_score, { font: '30px Arial', fill: '#fff', align: 'center' })
			.anchor.setTo(0.5, 0.5);

		if (this.game.device.desktop)
			var txt = 'press the UP arrow key to restart';
		else
			var txt = 'tap anywhere to restart';

	    label = game.add.text(Math.floor(w/2)+0.5, 200, txt, { font: '25px Arial', fill: '#fff' });
		label.anchor.setTo(0.5, 0.5);
		game.add.tween(label).to({ angle:1 }, 300, Phaser.Easing.Linear.None)
    	.to({ angle:-1 }, 300, Phaser.Easing.Linear.None).loop().start();

	    label2 = game.add.text(Math.floor(w/2)+0.5, h+300, 'I\'m sure you can do better!', { font: '25px Arial', fill: '#fff' });
		label2.anchor.setTo(0.5, 0.5);

		player = this.game.add.sprite(w/2, h+h, 'player_zoom');
    	player.anchor.setTo(0.5, 1);

		game.add.tween(label2).to({ y: 300 }, 2000, Phaser.Easing.Bounce.Out).start();
		game.add.tween(player).to({ y: h}, 2000, Phaser.Easing.Bounce.Out).start();

		if (sound) game.add.audio('dead').play('', 0, 0.3, false);
    */

		// this.cursor = this.game.input.keyboard.createCursorKeys();

    // var header = document.getElementById('header');
    // header.style.display = 'block';


    /*
    this.playagain = game.add.text(20, 100, 'Play Again');
    this.playagain.inputEnabled = true;
    this.playagain.events.onInputUp.add(function(e){
      game.state.start('Play');
    });

    this.menu = game.add.text(20, 160, 'Back to Game Menu');
    this.menu.inputEnabled = true;
    this.menu.events.onInputUp.add(function(e){
      game.state.start('Menu');
    });
    */

	},

	update: function() {
    /*
		if (this.cursor.up.isDown || game.input.activePointer.isDown)
			game.state.start('Play');
    */
	},

	shutdown: function() {
		game.world.removeAll();
	}
};
