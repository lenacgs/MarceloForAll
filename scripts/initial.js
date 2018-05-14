var initial = {
	preload: function() {
		//carregamento de ficheiros necessários
		this.game.load.image('background', 'resources/images/bg.png');
		this.game.load.image('button', 'resources/images/button1.png');
		this.game.load.audio('music', 'resources/songs/Intro.mp3');
		this.game.load.image('mute', 'resources/images/soundoff.png');
		this.game.load.image('unmute', 'resources/images/soundon.png');
		
	},

	create: function() {
		//background
		this.bg = this.add.sprite(0, 0, 'background');
		this.bg.width = game_width;
		this.bg.height = game_height;

		//"começar" button
		this.button1 = this.add.button(500, 270, 'button', this.startAnimation, this);
		this.button1.scale.setTo(0.6, 0.6);

		//audio
		this.music = game.add.audio('music');
		this.music.play();

		//mute & unmute button
		this.buttonUnmute = this.add.button(740, 540, 'unmute', this.mute, this);
		this.buttonUnmute.width = 70;
		this.buttonUnmute.height = 70;
		this.buttonMute = this.add.button(740, 540, 'mute', this.unmute, this);
		this.buttonMute.width = 70;
		this.buttonMute.height = 70;
		this.buttonMute.visible = false;


	},

	startAnimation: function() {
		this.music.stop();
		this.state.start('AnimationCanvas');
	},

	mute: function() {
		this.buttonUnmute.visible = false;
		this.buttonMute.visible = true;
		this.game.sound.mute = true;
	},

	unmute: function() {
		this.buttonMute.visible = false;
		this.buttonUnmute.visible = true;
		this.game.sound.mute = false;
	}
}