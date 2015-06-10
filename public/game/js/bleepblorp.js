Game.BleepBlorp = function (game) { };

Game.BleepBlorp.prototype = {

  create: function () {
     
      var score1 = score;

      realm = 1;
      game.score = 0;
      request('put','/plays/' + playID, { score: score, level: realm }, function() {
        console.log(this.responseText);
      });

      var hud = game.add.group();
      hud.fixedToCamera = true;      
      
      var overlay = game.add.group();
      hud.add(overlay);

      // overlay_bg = game.add.graphics(0, 0, overlay);
      // overlay_bg.beginFill(0x000000); // overlay_bg.beginFill(0x7dcdf2);
      // overlay_bg.drawRect(0, 50, w, h);
      var bg_win = overlay.create(0, 8, 'bg_win'); 
      bg_win.scale.setTo(0.5, 0.5);

      var bar = game.add.graphics(0, 0);
      bar.beginFill(0xc21520);
      bar.drawRect(0, 0, w, 50);
      hud.add(bar);

      var score_title = game.add.text(w * 0.5, 8, '0', { font: '10px Oswald', fill: '#fff' }, hud);
      score_title.text = 'SCORE';
      var score_label = game.add.text(w * 0.5, 17, score1, { font: '24px Oswald', fill: '#fff' }, hud);
      score_title.x = (w - score_title.width) * 0.5;
      score_label.x = (w - score_label.width) * 0.5;

      var txt = 'CONGRATS!';
      marketing_title = game.add.text(100, 95, txt, {font: '16px kemco', fill: '#FFF', strokeThickness
      : 7, stroke: '#000'}, overlay);
      marketing_copy = game.add.text(50, 125, 'YOU\'VE CONQUERED', {font: 'bold 20px Arial', fill: '#FFF', lineSpacing: '36px'}, overlay);
      logo = overlay.create(55, 170, 'logo')
      logo.scale.setTo(0.75, 0.75);

      btn_main_menu = overlay.create(18, 470, 'btn_main_menu');
      btn_main_menu.scale.setTo(0.53, 0.53);
      btn_main_menu.inputEnabled = true;
      btn_main_menu.events.onInputUp.add(function(e){
        // TODO: Coupon claimed. Notify server...
        coupon.play = playID;      
        game.state.start('Menu');
      });

      prize = overlay.create(33, 177, 'prize');      
      prize.scale.setTo(0.6, 0.6);
      prize = overlay.create(247, 177, 'prize');      
      prize.scale.setTo(0.6, 0.6);

      prize = overlay.create(-15, 247, 'prize');      
      prize.scale.setTo(0.8, 0.8);
      prize = overlay.create(287, 247, 'prize');      
      prize.scale.setTo(0.8, 0.8);

      prize = overlay.create(63, 307, 'prize');      
      prize.scale.setTo(0.36, 0.36);
      prize = overlay.create(237, 307, 'prize');      
      prize.scale.setTo(0.36, 0.36);

      txt = 'Come back tomorrow for even more chances\n to'
      game.add.text(20, 355, txt, { font: 'bold 13px Arial', fill: '#000' });
      txt = 'WIN the GRAND PRIZE of $1,000\n'
      game.add.text(40, 368, txt, { font: 'bolder 15px Arial', fill: '#000' });
      txt = 'plus coupons for MarcAngelo producs like our\n scrumptious sausages, salamis and burgers!'
      game.add.text(20, 385, txt, { font: 'bold 13px Arial', fill: '#000' });

      this.facebook = game.add.sprite(260, 465, 'facebook');
      this.facebook.scale.setTo(0.42, 0.42);
      this.facebook.inputEnabled = true;
      this.facebook.events.onInputUp.add(function(e){
        var win = window.open('https://www.facebook.com/marcangelofoods', '_blank');  
        win.focus();
          console.log('share w/ facebook');
      });

      this.twitter = game.add.sprite(200, 465, 'twitter');
      this.twitter.scale.setTo(0.42, 0.42);
      this.twitter.inputEnabled = true;
      this.twitter.events.onInputUp.add(function(e){
        var win = window.open('https://twitter.com/MarcAngeloFoods?lang=en', '_blank');  
        win.focus();
          console.log('share w/ twitter');
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
