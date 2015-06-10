Game.Realm = function (game) { };

Game.Realm.prototype = {

	create: function () {

			score_level_start = score;
			
			console.log('update play');
			request('put','/plays/' + playID, { score: score, level: realm }, function() {
				console.log(this.responseText);
			});

	    createTitle('Level ' + realm + ' Complete!');

	    createGround();

	    var txt = 'CONGRATULATIONS! \nYOU COMPLETED \nLEVEL ' + realm;
	    this.title = game.add.text(30, 60, txt, { font: 'bold 24px Arial', fill: '#fff' });

	    //this.marketing_copy = game.add.text(30, 180, 'Try our new \nauthentic \nsouvlak!', { font: '16px Arial', fill: '#fff' });
	    this.marketing_copy = game.add.text(30, 180, realms[realm-1]['assets']['win_message'], { font: '16px Arial', fill: '#fff' });

	    this.score = game.add.text(30, 260, 'SCORE: ' + score, { font: 'bold 16px Arial', fill: '#000' });

	    //this.circleimage = game.add.sprite(150, 140, 'circleimage');
	    this.circleimage = game.add.sprite(150, 140, realms[realm-1]['assets']['win_icon']);
	    this.circleimage.scale.setTo(0.5, 0.5);

		this.btn_nextlevel = game.add.sprite(30, 300, 'btn_nextlevel');
		this.btn_nextlevel.scale.setTo(0.5, 0.5);
		this.btn_nextlevel.inputEnabled = true;
		this.btn_nextlevel.events.onInputUp.add(function(e){
			realm++;
			game.state.start('Play');
		});

		// this.cursor = this.game.input.keyboard.createCursorKeys();
	},

	update: function() {
		// if (this.cursor.up.isDown || game.input.activePointer.isDown)
		// 	game.state.start('Play');
	},

	shutdown: function() {
		game.world.removeAll();
	}
};
