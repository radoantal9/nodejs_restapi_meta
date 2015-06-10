Game.HowToPlay = function (game) { };

Game.HowToPlay.prototype = {

	create: function () {
	  
    createTitle('How to Play');
    
    var txt = 'Bacon ipsum dolor sit amet t-bone andouille ribeye sausage prosciutto kielbasa, turducken short ribs pork belly. Pork pork belly spare ribs, frankfurter doner sirloin corned beef tenderloin cow turducken andouille tri-tip beef pancetta bacon. Turkey turducken spare ribs tongue frankfurter. Filet mignon andouille prosciutto pork chop porchetta. Prosciutto pork chop shoulder leberkas ground round kielbasa. \n\nVenison salami tri-tip, cow rump pig sausage pork chop andouille brisket tail strip steak. Tail filet mignon prosciutto, salami flank pork chop ribeye bresaola meatball pig pastrami swine drumstick. Ham ball tip sirloin capicola beef ribs. Ribeye chuck capicola pork loin fatback tail drumstick sirloin swine short loin hamburger biltong bresaola.';
    
    this.copy = game.add.text(50, 70, txt, { font: '12px Arial', fill: '#000' });
    this.copy.wordWrap = true;
    this.copy.wordWrapWidth = 200;
    
		this.cursor = this.game.input.keyboard.createCursorKeys();
	},

	update: function() {
		if (this.cursor.up.isDown || game.input.activePointer.isDown)
			game.state.start('Menu');
	},

	shutdown: function() {
		game.world.removeAll();	
	}
};
