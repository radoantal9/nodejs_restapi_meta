Game = {};

// var w = 450;
// var h = 600;
var w = 320; // window.innerWidth;
var h = 530; // window.innerHeight;
var score = 0;
var score_level_start = 0;
var best_score = 0;
var sound = false;
var playerSelected = 1;
var playID = 0;
var realm = 1;
var realms = [

    { // CLOUDS
        threshold: 3000,
        assets: {
            background: 'bg_clouds',
            platform: 'platform',
            cloud: 'cloud',
            spikes: 'spikes',
            win_message: 'Try our new \nSalami \nSnacks',
            win_icon: 'clouds_win_circle',
        }
    },

    { // ICE
        threshold: 4000,
        assets: {
            background: 'bg_ice',
            platform: 'platform_ice',
            cloud: 'snowflake',
            spikes: 'spikes_ice',
            win_message: 'Try our Italian \nTurkey Burgers',
            win_icon: 'ice_win_circle',
        }
    },

    { // BBQ
        threshold: 5000,
        assets: {
            background: 'bg_bbq',
            platform: 'platform_bbq',
            cloud: 'float_bbq',
            spikes: 'spikes_bbq',
            win_message: 'Try our \nMild Italian \nPure Pork \nSausage',
            win_icon: 'bbq_win_circle',
        }
    },

    { // KITCHEN
        threshold: 6000,
        assets: {
            background: 'bg_kitchen',
            platform: 'platform_kitchen',
            cloud: 'float_kitchen',
            spikes: 'spikes_kitchen',
            win_message: 'Try our \nMild Italian \nPure Pork \nSausage',
            win_icon: 'bbq_win_circle',
        }
    },

    { // TABLE
        threshold: 7000,
        assets: {
            background: 'bg_table',
            platform: 'platform_table',
            cloud: 'float_table',
            spikes: 'spikes_table',
            win_message: 'Try our \nMild Italian \nPure Pork \nSausage',
            win_icon: 'bbq_win_circle',
        }
    }

];

var filter;

var coupon = {
  available: false,
  displayed: false,
  captured: false,
  claimed: false,
  ignored: false
};

function rand(num){ return Math.floor(Math.random() * num) };

function createTitle(txt, icon) {
  var bar = game.add.graphics(0, 0);
  bar.beginFill(0x59afd7);
  bar.drawRect(0, 0, w, 42);
  var xPos = (this.game.device.desktop) ? 30 : 60;
  var title = game.add.text(xPos, 8, txt, { font: '18px Oswald', fill: '#fff' });
  title.setShadow(1, 1, 'rgba(0, 0, 0, 0.2)', 5);

  if (icon) {
    // bar.add
  }
}

function createGround(){
  var ground = game.add.sprite(0, 360, 'ground');
  // ground.scale.setTo(0.85, 0.85);
}

/*
var pause_ctrl = document.getElementById('control-pause');
pause_ctrl.onclick = function(){
  console.log('clicked pause');
  Phaser.GAMES[0].paused = true;
}
*/

function request(type, url, data, callback){
  var req = new XMLHttpRequest();
  req.onload = callback;
  req.open(type, url, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify(data));
}


Game.Boot = function (game) { };

Game.Boot.prototype = {
	preload: function () {
    game.stage.backgroundColor = '#87d1f2';
		game.load.image('loading', 'game/images/loading.png');
		game.load.image('loading2', 'game/images/loading2.png');
		game.load.image('orientation', 'game/images/orientation.png');
    // game.load.bitmapFont('kemco', 'fonts/kemco.png', 'fonts/kemco.xml');
	},
	create: function() {

    // game.scale.minWidth = w;
    // game.scale.minHeight = h;
    game.scale.width = w;
    game.scale.height = h;
    // game.scale.pageAlignHorizontally = true;
    // game.scale.pageAlignVertically = false;

    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

    game.scale.setScreenSize();

    game.scale.forcePortrait = true;

		if (!this.game.device.desktop) {
			// document.body.style.backgroundColor="#87d1f2";
			// game.stage.scale.forceOrientation(false, true, 'orientation');
            // game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
            // this.game.stage.scale.pageAlignHorizontally = true;
            // this.game.stage.scale.pageAlignVeritcally = true;
            // game.stage.scale.setShowAll();
            // game.stage.scale.refresh();

            // this.game.antialias = false;
            // game.smoothed = false;

        }

    // this.game.stage.scale.setScreenSize(true);

		this.game.state.start('Load');
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
	}
};

Game.Load = function (game) { };

Game.Load.prototype = {
	preload: function () {

    preload_label = game.add.text(0, (h * 0.5) - 40, 'Loading...', { font: '32px kemco', fill: '#fff', stroke: '#000', strokeThickness: 5 });
    preload_label.x = (w - preload_label.width) * 0.5;

		preloading2 = game.add.sprite(w/2, h/2+15, 'loading2');
		preloading2.x -= preloading2.width/2;
		preloading = game.add.sprite(w/2, h/2+19, 'loading');
		preloading.x -= preloading.width/2;
		game.load.setPreloadSprite(preloading);

    game.load.image('logo', 'game/images/1-preplayscreen-Logo_agents.png');

		game.load.image('heart', 'game/images/heart.png');
    game.load.image('burger', 'game/images/food/burger.png');
    game.load.image('hotdog', 'game/images/food/hotdog.png');
    game.load.image('kebab', 'game/images/food/kebab.png');



		game.load.image('player_zoom', 'game/images/player_zoom.png');
	  // game.load.spritesheet('player', 'images/character/marc.png', 60, 77);

    game.load.spritesheet('p1', 'game/images/character/marc.png', 60, 77);
    game.load.spritesheet('p2', 'game/images/character/angelo.png', 60, 77);

    game.load.spritesheet('button_start', 'game/images/buttons/button_sprite_sheet.png', 193, 71);

		game.load.image('line', 'game/images/line.png');
    game.load.image('snow', 'game/images/snow.jpg');

		game.load.spritesheet('mute', 'game/images/mute.png', 28, 18);

    game.load.image('pausepic', 'game/images/pausepic.jpg');

    game.load.image('clouds_intro', 'game/images/1-preplayscreen-Clouds.png');
    game.load.image('character_intro', 'game/images/1-preplayscreen-Character.png');

    game.load.image('p1static', 'game/images/Marc-static.png');
    game.load.image('p2static', 'game/images/Angelo-static.png');

    game.load.image('facebook', 'game/images/4-GameShare-Facebook.png');
    game.load.image('instagram', 'game/images/4-GameShare-Instagram.png');
    game.load.image('twitter', 'game/images/4-GameShare-Twitter.png');
    game.load.image('email', 'game/images/4-GameShare-Email.png');

    game.load.image('btn_mainmenu', 'game/images/button-mainmenu.png');
    game.load.image('btn_playagain', 'game/images/button-playagain.png');
    game.load.image('btn_nextlevel', 'game/images/button-nextlevel.png');
    game.load.image('btn_resume', 'game/images/2-ingamePause-Resume.png');
    game.load.image('btn_coupon_yes', 'game/images/6-CouponWin-MailCoupon.png');
    game.load.image('btn_coupon_no', 'game/images/6-CouponWin-NoThanks.png');

    game.load.image('circleimage', 'game/images/circleimage.png');

    game.load.image('ground', 'game/images/3-leaderboard-Grass.png');

    // LEVEL CLOUDS
    game.load.image('bg_clouds', 'game/images/Background-game2.jpg');
    game.load.image('cloud', 'game/images/cloud1.png');
    game.load.image('platform', 'game/images/platform.png');
    game.load.image('spikes', 'game/images/spikes.png');
    game.load.image('clouds_win_circle', 'game/images/circleimage.png')

    // LEVEL ICE
    game.load.image('bg_ice', 'game/images/bg_ice.png');
    game.load.image('snowflake', 'game/images/snowflake.png');
    game.load.image('platform_ice', 'game/images/platform_ice.png');
    game.load.image('spikes_ice', 'game/images/spikes_ice.png');
    game.load.image('ice_win_circle', 'game/images/salami.png');

    // LEVEL BBQ
    game.load.image('bg_bbq', 'game/images/levels/bbq/bg_bbq.png');
    game.load.image('float_bbq', 'game/images/levels/bbq/smoke.png');
    game.load.image('platform_bbq', 'game/images/levels/bbq/platform_bbq.png');
    game.load.image('spikes_bbq', 'game/images/levels/bbq/spikes_bbq.png');
    game.load.image('bbq_win_circle', 'game/images/sausage.png');

    // LEVEL PICNIC
    game.load.image('bg_picnic', 'game/images/levels/picnic/bg_picnic.png');
    game.load.image('float_picnic', 'game/images/levels/picnic/plate.png');
    game.load.image('platform_picnic', 'game/images/levels/picnic/platform_picnic.png');
    game.load.image('spikes_picnic', 'game/images/levels/picnic/spikes_picnic.png');

    // LEVEL KITCHEN
    game.load.image('bg_kitchen', 'game/images/levels/kitchen/bg_kitchen.png');
    game.load.image('float_kitchen', 'game/images/levels/kitchen/steam.png');
    game.load.image('platform_kitchen', 'game/images/levels/kitchen/platform_kitchen.png');
    game.load.image('spikes_kitchen', 'game/images/levels/kitchen/spikes_kitchen.png');

    // LEVEL TABLE
    game.load.image('bg_table', 'game/images/levels/table/bg_wood.png');
    game.load.image('float_table', 'game/images/levels/table/napkin.png');
    game.load.image('platform_table', 'game/images/levels/table/platform_wood.png');
    game.load.image('spikes_table', 'game/images/levels/table/spikes_wood.png');

    // WIN
    game.load.image('bg_win', 'game/images/bg_win.png'); 
    game.load.image('btn_main_menu', 'game/images/btn_main_menu.png');

    // PRIZE
    game.load.image('prize', 'game/images/6-CouponWin-Coin1.png');
    game.load.image('prize_zoom', 'game/images/6-CouponWin-Coin3.png');


    /*
		game.load.audio('dead', 'sounds/dead.wav');
		game.load.audio('jump', 'sounds/jump.wav');
		game.load.audio('heart', 'sounds/heart.wav');
		game.load.audio('music', 'sounds/music.wav');
		game.load.audio('hit', 'sounds/hit.wav');
    */

    // game.load.script('filter', 'js/filters/Gray.js');

    // this.load.bitmapFont('minecraftia', 'fonts/minecraftia.png', 'fonts/minecraftia.xml');

	},
	create: function () {
		game.state.start('Menu');
	}
};
