Game.Share = function (game) { };

Game.Share.prototype = {

	create: function () {
	  
    createTitle('Share');
    
    createGround();
    
    this.marc = game.add.sprite(70, 230, 'p1static');
    this.marc.smoothed = false;
    this.marc.frame = 1;
    
    this.angelo = game.add.sprite(200, 234, 'p2static');
    this.angelo.smoothed = false;
    this.angelo.frame = 1;
    
    this.facebook = game.add.sprite(40, 80, 'facebook');
    this.facebook.scale.setTo(0.5, 0.5);
    this.facebook.inputEnabled = true;
    this.facebook.events.onInputUp.add(function(e){
      console.log('share w/ facebook');
    });
    
    this.instagram = game.add.sprite(105, 80, 'instagram');
    this.instagram.scale.setTo(0.5, 0.5);
    this.instagram.inputEnabled = true;
    this.instagram.events.onInputUp.add(function(e){
      console.log('share w/ instagram');
    });
    
    this.twitter = game.add.sprite(170, 80, 'twitter');
    this.twitter.scale.setTo(0.5, 0.5);
    this.twitter.inputEnabled = true;
    this.twitter.events.onInputUp.add(function(e){
      console.log('share w/ twitter');
    });
    
    this.email = game.add.sprite(235, 80, 'email');
    this.email.scale.setTo(0.5, 0.5);
    this.email.inputEnabled = true;
    this.email.events.onInputUp.add(function(e){
      console.log('share w/ email');
    });
    
    this.btn_mainmenu = game.add.sprite(80, 160, 'btn_mainmenu');
    this.btn_mainmenu.scale.setTo(0.5, 0.5);
    this.btn_mainmenu.inputEnabled = true;
    this.btn_mainmenu.events.onInputUp.add(function(e){
      game.state.start('Menu');
    });

		this.cursor = this.game.input.keyboard.createCursorKeys();
	},

	update: function() {
		// if (this.cursor.up.isDown || game.input.activePointer.isDown)
			// game.state.start('Menu');
	},

	shutdown: function() {
		game.world.removeAll();	
	}
};
