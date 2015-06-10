Game.Play = function (game) {

	this.debug = true;
	this.rotation_panel = document.getElementById('rotation-panel');
	thawedVelocity = undefined;
	frozen = true;

	_manager = undefined;
	getReady = undefined;
	getReadyCaption = undefined;
	getReadyCount = undefined;

	this.rotation_panel.onclick = function(){
		this.style.display = 'none';
		game.paused = false;
	}

	this.hud = null;
  this.o = undefined;
  this.speedFactor = {
      desktop: 15,
      mobile: 10
  };

	this.realmThreshold = realms[0]['threshold'];

	this.randScore = rand(2000);
	console.log('randScore', this.randScore);

};

Game.Play.prototype = {

  setupBoundsCheckingOnChildrenOfGroup: function (group) {
    for(var i=0; i < group.children.length; i++) {
        var child = group.children[i];
        child.checkWorldBounds = true;
        child.events.onOutOfBounds.add(function(child) { // console.log('OOB!', child);
          child.exists = false;
        });
      }
  },

	freeze: function(){
		frozen = true;
	},

	thaw: function(){
		console.log('thaw');

		var that = this;

		/*
		if (!this.player.alive) {
			// TODO: skip countdown here...
			console.log('thaw but dead!');
			frozen = false;
			this.player.body.allowGravity = true;
			this.player.body.velocity.y = thawedVelocity;
			thawedVelocity = undefined;
			return;
		}
		*/

		if (_manager.isTweening(getReadyCount)) {
			console.log('remove all tweens');
			_manager.removeAll();

		}

		getReadyCount.text = 3;
		getReady.visible = true;

		var t1 = game.add.tween(getReadyCount).to({alpha: 1}, 500, Phaser.Easing.Linear.None);
		var t2 = game.add.tween(getReadyCount).to({alpha: 0}, 500, Phaser.Easing.Linear.None);
		var t3 = game.add.tween(getReadyCount).to({alpha: 1}, 500, Phaser.Easing.Linear.None);
		var t4 = game.add.tween(getReadyCount).to({alpha: 0}, 500, Phaser.Easing.Linear.None);
		var t5 = game.add.tween(getReadyCount).to({alpha: 1}, 500, Phaser.Easing.Linear.None);
		var t6 = game.add.tween(getReadyCount).to({alpha: 0}, 500, Phaser.Easing.Linear.None);

		t1.chain(t2);
		t2.chain(t3);
		t3.chain(t4);
		t4.chain(t5);
		t5.chain(t6);

		t2.onComplete.add(function(){
			getReadyCount.text = '2';
			// console.log('that.player.body.velocity.y', that.player.body.velocity.y);
		});

		t4.onComplete.add(function(){
			getReadyCount.text = '1';
			// console.log('that.player.body.velocity.y', that.player.body.velocity.y);
		});

		t6.onComplete.add(function(){
				console.log('completed all tweens. thawedVelocity:', thawedVelocity);
				// thawing.destroy();
				getReady.visible = false;
				frozen = false;
				that.player.body.allowGravity = true;
				that.player.body.velocity = thawedVelocity;
				thawedVelocity = undefined;
			}, that);

		t1.start();

	},

  preload: function() {
    this.game.time.advancedTiming = true;

    if (playerSelected == 1) {
      game.load.spritesheet('player', 'game/images/character/marc.png', 60, 77);
    } else {
      game.load.spritesheet('player', 'game/images/character/angelo.png', 60, 77);
    }
  },

	create: function () {

		_manager = this.game.tweens;
		console.log('create play');
		request('post','/plays', { score: -1, level: 0 }, function() {
			console.log(this.responseText);
			playID = JSON.parse(this.responseText)['_id'];
			console.log('playID', playID);
			var couponID =  JSON.parse(this.responseText)['coupon'];
			console.log('couponID', couponID);
			coupon.id = couponID;
			console.log(coupon);
		});

		this.realmThreshold = realms[realm-1]['threshold'];
		this.realmProgress = 0;
		this.realmPassed = false;
		frozen = true;

		// this.realmTheshold = realms[realm-1]['threshold'];
		console.log('set realmTheshold:', this.realmThreshold, 'realm:', realm, 'realmProgress:', this.realmProgress);

    // var header = document.getElementById('header');
    // header.style.display = 'none';

		this.game.world.setBounds(0, -100000, w, h+100000);
		this.cursor = this.game.input.keyboard.createCursorKeys();

    this.bg = game.add.sprite(0, 0, realms[realm-1]['assets']['background']);
    this.bg.width = 320;
    this.bg.height = 480;
    this.bg.scale.setTo(0.5, 0.5);
    // this.bg.alpha = 0;
    this.bg.fixedToCamera = true;

    this.clouds = game.add.group();
	    this.clouds.createMultiple(6, realms[realm-1]['assets']['cloud']);
	    // this.clouds.setAll('outOfBoundsKill', true);
      this.setupBoundsCheckingOnChildrenOfGroup(this.clouds);

	   	if (score > best_score) {
	   		best_score = score;
	   	}

	   	if (realm == 1) {
	   		score = 0;
	   		// console.log('resetting score to 0');
	   	}

		this.platforms = game.add.group();
	    this.platforms.createMultiple(15, realms[realm-1]['assets']['platform']);
      this.game.physics.enable(this.platforms);
      // this.platforms.setAll('body.scale.x', 0.5);
      // this.platforms.setAll('body.scale.y', 0.5);
      this.platforms.setAll('body.immovable', true);
	    this.platforms.setAll('body.checkCollision.down', false);
	    this.platforms.setAll('body.checkCollision.right', false);
	    this.platforms.setAll('body.checkCollision.left', false);
      this.setupBoundsCheckingOnChildrenOfGroup(this.platforms);

		this.hearts = game.add.group();
      this.game.physics.enable(this.hearts);
	    this.hearts.createMultiple(3, 'heart');
      this.setupBoundsCheckingOnChildrenOfGroup(this.hearts);

    this.foods = game.add.group();
      this.game.physics.enable(this.foods);
	    // this.foods.createMultiple(3, 'food');
      // this.foods.create(0, 0, 'burger');
      // this.foods.create(0, 0, 'hotdog');
      // this.foods.create(0, 0, 'kebab');
      this.foods.createMultiple(1, 'burger');
      this.foods.createMultiple(1, 'hotdog');
      this.foods.createMultiple(1, 'kebab');
      this.setupBoundsCheckingOnChildrenOfGroup(this.foods);



			this.prize = game.add.sprite(-200, 0, 'prize'); // TODO: Add back in but determine where to keep (do this before adding prize platform)
			this.prize.checkWorldBounds = true;


			/*
			this.prize.events.onOutOfBounds.add(function() { console.log('OOB!', prize);
				this.exists = false;
			});
			*/


		this.spikes = game.add.group();
	    this.spikes.createMultiple(5, realms[realm-1]['assets']['spikes']);
      this.setupBoundsCheckingOnChildrenOfGroup(this.spikes);

	    // this.emitter = game.add.emitter(0, 0, 100);
	    // this.emitter.x = -100;
	    // this.emitter.on = false;
	    // this.emitter.makeParticles('heart');
      // this.emitter.makeParticles('snow');
		// this.emitter.gravity = 10;
		// this.emitter.start(false, 1000, 15, 0);
		// this.emitter.width = 50;

		this.player = this.game.add.sprite(w/2+100, h-200, 'player',1);
      this.game.physics.enable(this.player);
      this.player.smoothed = false;
      this.player.body.gravity.y = 12 * 50;
    	this.player.anchor.setTo(0.5, 1);
      // this.player.scale.setTo(1.5, 1.5);

		this.ground = this.game.add.sprite(0, h-56, 'ground');
    this.game.physics.enable(this.ground);
		// this.ground.scale.setTo(15, 1);
    this.ground.width = w;
		this.ground.body.immovable = true;
		this.ground.outOfBoundsKill = true;

		this.jump_s = game.add.audio('jump');
		this.heart_s = game.add.audio('heart');
		this.hit_s = game.add.audio('hit');
		this.music_s = game.add.audio('music');
		if (sound) this.music_s.play('', 0, 0.2, true);

	    this.maxX = h/2-20;
	    this.next_platform = 10;
	    this.next_cloud = 50;
	    this.took_heart = false;
	    this.count_update = 0;

	    this.init_level();

      var that = this;
      function handleOrientation(event) {
        that.o = event;
      }

      if (window.DeviceMotionEvent) {
        // console.log('DEVICE MOTION:', window.DeviceMotionEvent);
        window.addEventListener('deviceorientation', handleOrientation, false);
      }



        // ADD MENU (HUD)...
      hud = game.add.group();
      hud.fixedToCamera = true;

      var bar = game.add.graphics(0, 0);
      bar.beginFill(0xc21520);
      bar.drawRect(0, 0, w, 50);
      hud.add(bar);

			if (game.device.desktop) {
	      home_label = game.add.text(15, 15, 'BACK', { font: '20px Oswald', fill: '#fff' }, hud);
	      home_label.inputEnabled = true;
	      home_label.events.onInputUp.add(function(){
	        var message = 'Are you sure you want to leave the game?';
	        if (window.confirm(message)) {
	          game.state.start('Menu');
	        }
	      });
			}

      score_title = game.add.text(w * 0.5, 8, '0', { font: '10px Oswald', fill: '#fff' }, hud);
      score_title.text = 'SCORE';
      score_label = game.add.text(w * 0.5, 17, score, { font: '24px Oswald', fill: '#fff' }, hud);

      if (this.debug) this.debug_label = game.add.text(15, 60, 'fps', { font: '20px Oswald', fill: '#fff' }, hud);

      pause_label = game.add.text(w, 15, '0', { font: '20px Oswald', fill: '#fff' }, hud);
      pause_label.text = 'PAUSE';
      pause_label.inputEnabled = true;
      pause_label.events.onInputUp.add(function(){

				console.log('pause handler');

				if (_manager.isTweening(getReadyCount)) {
					console.log('we tweening here. return.')
					return;
				}

				if (!frozen) {
					that.freeze();
					// game.paused = true;
					console.log('setting pause_label to RESUME');
					pause_label.text = 'RESUME';
					pause_label.x = w - pause_label.width - 20;
					overlay = game.add.group();
					hud.add(overlay);
					overlay_bg = game.add.graphics(0, 0, overlay);
					overlay_bg.beginFill(0x000000);
					overlay_bg.alpha = 1;
					overlay_bg.drawRect(0, 50, w, h);
					pausepic = overlay.create(0, 50, 'pausepic');
					pausepic.scale.setTo(0.5, 0.5);
					paused_title = game.add.text(30, 70, 'SNACK TIME?', {font: '28px kemco', fill: '#fff', strokeThickness: 7, stroke: '#000'}, overlay);
					// marketing_title = game.add.text(30, 330, 'SNACK TIME?', {font: '20px Arial', fill: '#fff'}, overlay);
					marketing_copy = game.add.text(30, 115, 'Try our new deli meats!', {font: '14px Arial', fill: '#fff'}, overlay);
					// resume_label = game.add.text(30, 400, '0', { font: '20px Oswald', fill: '#fff' }, overlay);
					// resume_label.text = 'RESUME';

					btn_resume = overlay.create(30, 150, 'btn_resume');
					btn_resume.scale.setTo(0.5, 0.5);
				}
      });

      // console.log('marketing copy x', this.marketing_copy.x);

      // this.resume_label.x = (w - this.resume_label.width) * 0.5;
      // this.resume_label.y = (h - this.resume_label.height) * 0.5;

			var that = this;

      game.input.onDown.add(unpause, true);

      function unpause(event) {
				console.log('unpause handler');

        // if (game.paused) {
				if (frozen) {
					console.log('unpause frozen', frozen);
          pause_label.text = 'PAUSE';
          pause_label.x = w - pause_label.width - 20;

					try {
						if (overlay) {
							console.log('removing overlay...');
							hud.remove(overlay);
						}
					} catch (e) {
						console.log('error thrown trying to remove overlay');
						console.log(e);
					}


          // game.paused = false;
					that.thaw();
        } else {
        	// console.log('unpause self.');
        }
      }

			getReady = game.add.group();
			getReady.fixedToCamera = true;
			// getReady.alpha = 0;
			getReady.visible = false;

			getReadyCaption = game.add.text(0, 0, 'GET READY!', { font: '24px kemco', fill: '#fff', stroke: '#000', strokeThickness: 5 }, getReady);
			getReadyCaption.align = 'center';
			getReadyCaption.x = (w - getReadyCaption.width) * 0.5;
			getReadyCaption.y = (h - getReadyCaption.height) * 0.5 - 50;

			getReadyCount = game.add.text(0, 0, '3', { font: '120px kemco', fill: '#fff', stroke: '#000', strokeThickness: 7 }, getReady);
			getReadyCount.align = 'center';
			getReadyCount.x = (w - getReadyCount.width) * 0.5;
			getReadyCount.y = (h - getReadyCount.height) * 0.5 + 30;

			this.thaw();

    // this.level1 = game.add.bitmapText(20, 100, 'kemco', '', 20);

	},

	update: function() {

		score_title.x = (w - score_title.width) * 0.5;
		score_label.x = (w - score_label.width) * 0.5;
		pause_label.x = w - pause_label.width - 20;

		if (this.debug) this.debug_label.text = this.game.time.fps + 'fps';

		if (frozen) {
			// if (thawedVelocity == undefined && thawedVelocity != 0) {
			if (thawedVelocity == undefined) {
				thawedVelocity = this.player.body.velocity;
				console.log('non-zero thawedVelocity', thawedVelocity);
			}
			this.player.body.allowGravity = false;
			this.player.body.velocity = new Phaser.Point(0, 0);
			return;
		}

    if (this.player.alive) {
			if (this.ground.alive) game.physics.arcade.collide(this.player, this.ground);

			game.physics.arcade.collide(this.player, this.platforms);
			game.physics.arcade.overlap(this.player, this.hearts, this.take_heart, null, this);
      		game.physics.arcade.overlap(this.player, this.foods, this.take_food, null, this);
			game.physics.arcade.overlap(this.player, this.spikes, this.take_spike, null, this);
			game.physics.arcade.overlap(this.player, this.prize, this.take_prize, null, this);
		}


		if (this.player.body.y < this.game.camera.y + h/2) {
			this.move_screen_up();
			this.generate_level();
		}

		if (this.count_update == 20) {
			this.count_update = 0;
			this.platforms.forEachAlive(this.update_platform, this);
			this.hearts.forEachAlive(this.update_heart, this);
      		this.foods.forEachAlive(this.update_food, this);
			this.spikes.forEachAlive(this.update_spike, this);
		}
		else
			this.count_update += 1;

		this.player_move();

		if (!this.game.device.desktop) {

			// ACCELEROMETER
			if (typeof(this.o) === "object") {
				var gamma = this.o.gamma;
			}

			if (game.scale.incorrectOrientation) {
				game.paused = true;
				this.rotation_panel.style.display = 'block';
			} else {
				this.rotation_panel.style.display = 'none';
				game.paused = false;
			}

		}

	},

	init_level: function() {
		// console.log('init_level...');
		// this.add_platform(h-150, 100);
		// this.add_platform(h-300, 200);
		// this.add_platform(h-450, 300);
		// this.add_platform(h-550, 300);

    this.add_platform(h * 0.2, w * 0.2);
    this.add_platform(h * 0.4, w * 0.4);
    this.add_platform(h * 0.6, w * 0.6);
    this.add_platform(h * 0.8, w * 0.8);

		// this.add_cloud(h-300);
		// this.add_cloud(h-500);
    this.add_cloud(h * 0.3);
		this.add_cloud(h * 0.6);

		// this.add_platform_prize(h * 0.1); // TODO: Add back in (based on prize avail per session)
	},

	drop_coupon: function() {
		var retval = false;
		if (coupon.available) {
			if (!coupon.displayed && !coupon.captured && !coupon.claimed) {
				retval = true;
				coupon.displayed = true;
			}
		}
		return retval;
	},

	generate_level: function() { // console.log('generate_level...')
		if (this.next_platform < -this.game.camera.y) {

			if (score < 250) {
        var level = [1, 1, 1, 1, 2, 2, 2, 3, 5, 5];
      } else if (score < 500) {
        var level = [1, 1, 2, 2, 2, 3, 3, 4, 4, 5];
      } else if (score < 1000) {
        var level = [1, 2, 2, 3, 3, 3, 4, 4, 4, 5];
      } else if (score < 2000) {
        // var level = [1, 2, 3, 3, 3, 4, 4, 4, 4, 5];
				var level = [1, 2, 3, 1, 3, 2, 1, 1, 2, 5];
      } else if (score < 3000) {
        // var level = [2, 3, 3, 3, 4, 4, 4, 4, 4, 5];
				var level = [2, 3, 2, 3, 4, 2, 4, 1, 4, 5];
      } else if (score < 3500) {
				// var level = [2, 6, 3, 6, 4, 6, 3, 6, 6, 5];
				var level = [2, 6, 3, 2, 4, 2, 3, 6, 2, 5];
			} else {
        var level = [2, 3, 3, 1, 1, 4, 2, 4, 1, 4];
      }

			if (this.randScore - 100 < score && score < this.randScore + 100) {
			// if (score == this.randScore) {
				if (!coupon.available) {
					coupon.available = true; // TODO : MAKE SERVER DECIDE WHEN THESE ARE RELEASED
					// coupon.available = this.check_coupon_availability();
					console.log('set coupon to available');
				}
			} else {
				coupon.available = false;
			}

			var type = level[rand(level.length)];

			var y = this.game.camera.y-30;
			this.next_platform += rand(80)+70;

			if (this.drop_coupon()) {
				this.add_platform_prize(y);
			}

			if (type == 1)
				// this.add_platform_double(y);
        this.add_platform(y);
			else if (type == 2)
				this.add_platform(y);
			else if (type == 3)
				this.add_platform_moving(y);
			else if (type == 4) {
				if (rand(3) > 0) this.add_platform_moving(y);
				else this.add_platform(y); // this.add_platform_double(y);
				this.add_platform_spike(y-150);
				this.next_platform += 150;
			}
			else if (type == 5)
				// this.add_platform_heart(y);
        this.add_platform_food(y);
			else if (type == 6)
				this.add_platform_spike(y-150);
		}

		if (this.next_cloud < -this.game.camera.y) { // console.log('this.next_cloud', this.next_cloud);
			this.add_cloud(this.game.camera.y-70);
			this.next_cloud += 100+rand(200);
		}

	},

	display_realm_passed_message: function() {
		//game.add.
	},

	move_screen_up: function() {
		var delta = this.game.camera.y + Math.floor(h/2) - this.player.body.y;
		this.game.camera.y -= delta;

		// score = - Math.floor(this.game.camera.y/10);

		score += Math.abs(Math.floor(this.game.camera.y/10000));

    score_label.text = score;

    this.realmProgress = Math.abs(this.game.camera.y);

    // console.log(score, this.game.camera.y, this.realmProgress, this.realmThreshold);

    if (this.realmProgress > this.realmThreshold) {
    	// game.paused = true;
    	console.log('passed realm #' + realm, this.realmProgress, this.realmThreshold);

			if (this.realmPassed = false) {
				this.display_realm_passed_message();
			}

			this.realmPassed = true;

    	// game.state.start('Realm');
    }

    // if (score > )

	},

	player_move: function() { // console.log('player_move');
		if(this.player.body.y > this.game.camera.y+h+200) {
			this.music_s.stop();
			if (this.realmPassed) {
				if (realms.length <= realm) {
					game.state.start('BleepBlorp');	
					//this.take_prize(this.player, this.prize);
				} else {
					game.state.start('Realm');				
				}				
			} else {
				game.state.start('Dead');
				//this.take_prize(this.player, this.prize);
			}
			return;
		}

		if (this.player.x < 20)
			this.player.x = 20;
		else if(this.player.x > w-20)
			this.player.x = w-20;

		if (this.player.body.touching.down && this.player.scale.y == 1) {
			if (sound) this.jump_s.play('', 0, 0.15, false);

			if (this.player.scale.x == 1)
				var scale_x = 1.3;
			else
				var scale_x = -1.3;

			var tween = game.add.tween(this.player.scale).to({ y: 0.7, x: scale_x}, 150, Phaser.Easing.Linear.None).start();

			tween.onComplete.add(function(){
				if (this.player.scale.x == 1)
					this.player.scale.setTo(1, 1);
				else
					this.player.scale.setTo(-1, 1);
				this.player.body.velocity.y = -(500 * 1.2);
			}, this);
		}

	    this.player.body.velocity.x = 0;

	    // var touch_right = game.input.activePointer.isDown && game.input.activePointer.x > w/2;
	    // var touch_left = game.input.activePointer.isDown && game.input.activePointer.x < w/2;

	    // if ((this.cursor.left.isDown || touch_left) && this.player.alive) {
      if ((this.cursor.left.isDown) && this.player.alive) {
	    	this.player.frame = 0;
			this.player.body.velocity.x = -300;

	    	if (this.player.scale.x == 1)
	    		this.player.scale.setTo(-1, 1);
	    }
	    // else if ((this.cursor.right.isDown || touch_right) && this.player.alive) {
      else if ((this.cursor.right.isDown) && this.player.alive) {
	    	this.player.frame = 0;
			this.player.body.velocity.x = 300;

			if (this.player.scale.x == -1)
	    		this.player.scale.setTo(1, 1);
	    }
	    else
	    	this.player.frame = 1;

	    if (this.player.body.velocity.y > -200) {
	    	this.took_heart = false;
        this.took_food = false;
	    	// this.emitter.on = false;
	    }

	    // this.emitter.x = this.player.x;
	    // this.emitter.y = this.player.y-15;

        // ACCELEROMETER
      // !this.game.device.desktop
      if (typeof(this.o) === "object" && this.player.body) {
        var sway = Math.round(this.o.gamma * this.speedFactor.mobile * 100) / 100;
        if (sway != 0) this.player.body.velocity.x = sway;
      }

	},

	add_platform: function(y, x) {
		var platform = this.platforms.getFirstExists(false);
    // this.game.physics.enable(platform);

		if (platform) {
      // console.log('add_platform. platform:', platform);
      this.game.physics.enable(platform);
			x = typeof x !== 'undefined' ? x : rand(w-platform.width-10)+platform.width/2+5;

			platform.reset(x, y);
			platform.anchor.setTo(0.5, 0.5);
			platform.body.velocity.x = 0;

			return platform;
		}
    else console.log("plat"); // TODO: BUG #2

	},

	add_platform_double: function(y) {
    console.log('add_platform_double. y:', y);
		this.add_platform(y);
		this.add_platform(y);
	},

	add_platform_heart: function(y) {
		var p = this.add_platform(y);
		var heart = this.hearts.getFirstExists(false);
    console.log('add_platform_heart, heart:', heart);

		if (heart) {
      this.game.physics.enable(heart);
			heart.anchor.setTo(0.5, 0.5);
			heart.reset(p.x, y-29);
		}
	},

  add_platform_food: function(y) {
		var p = this.add_platform(y);
		var food = this.foods.getFirstExists(false);

		if (food) {
      this.game.physics.enable(food);
			food.anchor.setTo(0.5, 0.5);
			food.reset(p.x, y-30);
		}
	},

	add_platform_spike: function(y) {
		var p = this.add_platform(y);
    // this.add_spike(p.x, p.y+18); ///////////////////////// TODO: BUG #2
    this.add_spike(p.x, p.y + 15);
	},

	add_platform_moving: function(y) {
		var p = this.add_platform(y);

		if (rand(2) == 0)
			p.body.velocity.x = -120;
		else
			p.body.velocity.x = 120;
	},

	add_platform_prize: function(y) {
		var p = this.add_platform(y);
		game.physics.enable(this.prize);
		this.prize.anchor.setTo(0.5, 0.5);
		this.prize.reset(p.x, y-40);
	},

	add_cloud: function(y) {
		var cloud = this.clouds.getFirstExists(false);
    if (cloud) {
      if (!cloud.body) {
        this.game.physics.enable(cloud);
      }

			cloud.reset(rand(w)- cloud.width, y);

			if (rand(2) == 1) cloud.body.velocity.x = 8;
			else cloud.body.velocity.x = -8;
		}
		else console.log('cloud gone');

	},

	add_spike: function(x, y) {
		var spike = this.spikes.getFirstExists(false);
    this.game.physics.enable(spike);

		if (spike) {
			spike.body.setSize(spike.width, spike.height, 0, 0)
			spike.anchor.setTo(0.5, 0.5);
			spike.reset(x, y);
		}
		else console.log("spike");
	},

	update_platform: function(p) {
		if (p.x + p.width/2 >= w && p.body.velocity.x > 0)
			p.body.velocity.x = -120;
		else if (p.x - p.width/2 <= 0 && p.body.velocity.x < 0)
			p.body.velocity.x = 120;

		if (p.y - p.height > this.game.camera.y+h)
			p.kill();
	},

	update_heart: function(h) {
		if (h.y - h.height > this.game.camera.y+h)
			h.kill();
	},

  update_food: function(h) {
		if (h.y - h.height > this.game.camera.y+h)
			h.kill();
	},

	update_spike: function(s) {
		if (s.y - s.height > this.game.camera.y+h)
			s.kill();
	},

	update_prize: function(p) {
		if (p.y - p.height > this.game.camera.y+h)
			p.kill();
	},

	take_heart: function(player, heart) { // console.log('take_heart');
		heart.kill();
		if (sound) this.heart_s.play('', 0, 0.2, false);
		// this.emitter.on = true;
		this.player.body.velocity.y = -1200;
		this.took_heart = true;
	},

  take_food: function(player, food) { // console.log('take_food');
		food.kill();
		// if (sound) this.heart_s.play('', 0, 0.2, false);
		// this.emitter.on = true;
		this.player.body.velocity.y = -1200;
		this.took_food = true;
	},

	take_spike: function(player, spike) {
		// if(!this.took_heart || !this.took_food) {
		if (!this.took_food) {
			if (sound) this.hit_s.play('', 0, 0.4, false);
			// this.player.alive = false;
			this.player.tint = 0xFF0000;
			var tween = game.add.tween(this.player.scale).to({ y: 2, x: -2}, 1000, Phaser.Easing.Elastic.Out).start();
			tween.onComplete.add(function(){
					this.player.alive = false;
			}, this);

			// this.player.body.velocity.y = - 300;
      // this.player.body.velocity.y += 12; // DON'T KILL ME, JUST SLOW ME DOWN....
		}
	},

	take_prize: function(player, prize) { console.log('take_prize', player, prize);
		prize.kill();
		/*
		var tween = game.add.tween(this.player.scale).to({ y: 2, x: 2}, 1000, Phaser.Easing.Elastic.Out).start();
		tween.onComplete.add(function(){
				this.player.scale.setTo(1, 1);
		}, this);
		*/

		coupon.captured = true;

		var that = this;

		thawedVelocity = this.player.body.velocity;
		this.freeze();

		pause_label.text = 'RESUME';
		pause_label.x = w - pause_label.width - 20;
		overlay = game.add.group();
		hud.add(overlay);
		// overlay_bg = game.add.graphics(0, 0, overlay);
		// overlay_bg.beginFill(0x000000); // overlay_bg.beginFill(0x7dcdf2);
		// overlay_bg.drawRect(0, 50, w, h);
		bg_prize = overlay.create(0, 50, 'bg_clouds');
		bg_prize.scale.setTo(0.5, 0.5);
		win_grass = overlay.create(0, 360, 'ground');
		win_coin = overlay.create(240, 60, 'prize_zoom');
		win_coin.scale.setTo(0.8, 0.8);
		win_coin2 = overlay.create(180, 150, 'prize');
		win_guy = overlay.create(180, 200, 'player_zoom');

		marketing_title = game.add.text(30, 70, 'CONGRATULATIONS!', {font: '16px kemco', fill: '#FFF', strokeThickness
		: 7, stroke: '#000'}, overlay);
		marketing_copy = game.add.text(30, 105, 'YOU GOT A \n$1 OFF \nCOUPON', {font: 'bold 32px Arial', fill: '#FFF', lineSpacing: '36px'}, overlay);

		btn_coupon_yes = overlay.create(30, 250, 'btn_coupon_yes');
		btn_coupon_yes.scale.setTo(0.5, 0.5);
		btn_coupon_yes.inputEnabled = true;
		btn_coupon_yes.events.onInputUp.add(function(e){
			// TODO: Coupon claimed. Notify server...
			coupon.play = playID;
			request('put', '/coupons/' + coupon.id, coupon, function() {
				console.log('claiming coupon...', this.responseText);
				coupon.claimed = true;
			});
		});

		btn_coupon_no = overlay.create(30, 310, 'btn_coupon_no');
		btn_coupon_no.scale.setTo(0.5, 0.5);
		btn_coupon_no.inputEnabled = true;
		btn_coupon_no.events.onInputUp.add(function(e){
			// TODO: Coupon ignored. Release availability to another player...
			coupon.ignored = true;
			console.log('go back to game');
		});

	},

	shutdown: function() {
		console.log('play.shutdown...');
		game.world.removeAll();
	}
};
