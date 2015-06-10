Game.Prize = function (game) { };

Game.Prize.prototype = {

  create: function () {

      createTitle('Coupon Won!');

      createGround();

      var txt = 'CONGRATULATIONS! \nYOU WON A COUPON!';
      this.title = game.add.text(30, 60, txt, { font: 'bold 24px Arial', fill: '#fff' });

      this.btn_nextlevel = game.add.sprite(30, 300, 'btn_nextlevel');
      this.btn_nextlevel.scale.setTo(0.5, 0.5);
      this.btn_nextlevel.inputEnabled = true;
      this.btn_nextlevel.events.onInputUp.add(function(e){
        Prize++;
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
