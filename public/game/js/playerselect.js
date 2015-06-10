Game.PlayerSelect = function (game) { };

Game.PlayerSelect.prototype = {

	create: function () {
    
    createTitle('Select a character');
    
    createGround();

    this.p1_label = game.add.text(0, 100, 'Marc', { font: '28px kemco', fill: '#fff', stroke: '#000', strokeThickness: 5 });
    this.p2_label = game.add.text(0, 100, 'Angelo', { font: '28px kemco', fill: '#fff', stroke: '#000', strokeThickness: 5 });

    this.p1_label.frame = 1;
    this.p1_label.inputEnabled = true;
    this.p1_label.events.onInputUp.add(function(e){
      playerSelected = 1;
      game.state.start('Play');
    });

    this.p2_label.frame = 1;
    this.p2_label.inputEnabled = true;
    this.p2_label.events.onInputUp.add(function(e){
      playerSelected = 2;
      game.state.start('Play');
    });

    this.p1_label.x = 36; // (w - this.p1_label.width - this.p2_label.width - 30 ) * 0.5;
    this.p2_label.x = 160; // (w + this.p1_label.width - this.p2_label.width + 30 ) * 0.5;

    // this.p1_label.tint = 0xFF0000;

    /*
    this.p1 = game.add.sprite(0, 200, 'p1');
    this.p1.x = this.p1_label.x + ((this.p1_label.width - this.p1.width) * 0.5);
    this.p1.frame = 1;
    this.p1.inputEnabled = true;
    this.p1.events.onInputUp.add(function(e){
      playerSelected = 1;
      game.state.start('Play');
    });
    
    this.p2 = game.add.sprite(0, 200, 'p2');
    this.p2.x = this.p2_label.x + ((this.p2_label.width - this.p2.width) * 0.5);
    this.p2.frame = 1;
    this.p2.inputEnabled = true;
    this.p2.events.onInputUp.add(function(e){
      playerSelected = 2;
      game.state.start('Play');
    });
    */
    
    this.marc = game.add.sprite(42, 180, 'p1static');
    this.marc.smoothed = false;
    this.marc.frame = 1;
    this.marc.scale.setTo(1.3, 1.3);
    this.marc.inputEnabled = true;
    this.marc.events.onInputUp.add(function(e){
      playerSelected = 1;
      game.state.start('Play');
    });
    
    this.angelo = game.add.sprite(190, 184, 'p2static');
    this.angelo.smoothed = false;
    this.angelo.frame = 1;
    this.angelo.scale.setTo(1.3, 1.3);
    this.angelo.inputEnabled = true;
    this.angelo.events.onInputUp.add(function(e){
      playerSelected = 2;
      game.state.start('Play');
    });
    
    
    
    
    // this.p2.alpha = 0.5;
    
    // this.button_start = game.add.button((w - 95) * 0.5, this.p2.x + this.p2.height + 20, 'button_start', onClick_button_start, this, 2, 1, 0);
    
    function onClick_button_start() {
      game.state.start('Play');
    }
	  
		this.cursor = this.game.input.keyboard.createCursorKeys();
	},

	update: function() {
		// if (this.cursor.up.isDown || game.input.activePointer.isDown)
		//	game.state.start('Play');
    
    /*
    if (this.cursor.left.isDown) {
      this.p1_label.tint = 0xFF0000;
      this.p2_label.tint = 0xFFFFFF;
      this.p1.alpha = 1;
      this.p2.alpha = 0.5;
      playerSelected = 1;
    } 
    
    if (this.cursor.right.isDown) {
      this.p1_label.tint = 0xFFFFFF;
      this.p2_label.tint = 0xFF0000; 
      this.p1.alpha = 0.5;
      this.p2.alpha = 1;
      playerSelected = 2;
    }
    
    if (this.cursor.up.isDown) {
      game.state.start('Play');
    }
    */
    
	},

	shutdown: function() {
		game.world.removeAll();	
	}
};
