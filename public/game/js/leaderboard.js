Game.Leaderboard = function (game) { };

Game.Leaderboard.prototype = {

	create: function () {
	  
	    createTitle('Leaderboard');
	    
	    function createLeaderboardEntry(place, name, points) {
	    	var title = game.add.text(
				50, 
				30 + (place * 30), 
				place + '.\t\t\t\t' + name + '\t\t\t\t' + points + 'pts', { 
					font: '18px Oswald', 
					fill: '#000' 
					
				});
			return title;
	    }
	    
      	var req = new XMLHttpRequest();
		req.onload = function() {
			var leaders = JSON.parse(this.responseText);
			for (var i=0; i < leaders.length; i++) {
				createLeaderboardEntry(i+1, leaders[i].name, leaders[i].score);
			}
		};
		req.open('get', '/leaderboard', true);
		// req.setRequestHeader('Content-Type', 'application/json');
		req.send();
	    
		this.btn_mainmenu = game.add.sprite(80, 380, 'btn_mainmenu');
		this.btn_mainmenu.scale.setTo(0.5, 0.5);
		this.btn_mainmenu.inputEnabled = true;
		this.btn_mainmenu.events.onInputUp.add(function(e){
			game.state.start('Menu');
		});

		// this.cursor = this.game.input.keyboard.createCursorKeys();
	},

	update: function() {
		// if (this.cursor.up.isDown || game.input.activePointer.isDown)
		// 	game.state.start('Menu');
	},

	shutdown: function() {
		game.world.removeAll();	
	}
};
