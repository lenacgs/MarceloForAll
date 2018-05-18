var menu = {
	preload: function() {
		this.game.load.image('background', 'resources/images/bg.png');
		this.game.load.image('button1', 'resources/images/ajuda.png');
		this.game.load.image('button2', 'resources/images/sair.png');
		this.game.load.image('button3', 'resources/images/voltar.png');
		this.game.load.image('button4', 'resources/images/class.png');
		this.game.load.image('button5', 'resources/images/creditos.png');
		this.game.load.image('button6', 'resources/images/jogar.png');
		this.game.load.audio('music', 'resources/songs/Intro.mp3');
		this.game.load.image('mute', './resources/images/mute.png');
		this.game.load.image('unmute', './resources/images/unmute.png');
	}, 

	create: function() {

		//background
		this.bg = this.add.sprite(0, 0, 'background');
		this.bg.width = game_width;
		this.bg.height = game_height;

		//audio
		this.music = game.add.audio('music');
		this.music.play();

		//mute & unmute button
		this.buttonUnmute = this.add.button(760, 560, 'unmute', this.mute, this);
		this.buttonUnmute.scale.setTo(0.6);
		this.buttonMute = this.add.button(760, 560, 'mute', this.unmute, this);
		this.buttonMute.scale.setTo(0.6);
		this.buttonMute.visible = false;

		//ajuda button
		this.button1 = this.add.button(550, 230, 'button1', this.startHelp, this);
		this.button1.scale.setTo(0.7);

		//sair button
		this.button2 = this.add.button(550, 360, 'button2', this.sair, this);
		this.button2.scale.setTo(0.7);

		//voltar button
		this.button3 = this.add.button(5, 570, 'button3', this.voltar, this);
		this.button3.scale.setTo(0.7);

		//classificações button
		this.button4 = this.add.button(550, 275, 'button4', this.startRankings, this);
		this.button4.scale.setTo(0.7);

		//creditos button
		this.button5 = this.add.button(560, 320, 'button5', this.startCredits, this);
		this.button5.scale.setTo(0.8);

		//jogar button
		this.button6 = this.add.button(550, 185, 'button6', this.startPlay, this);
		this.button6.scale.setTo(0.7);


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
	},

	startHelp: function() {
		this.music.stop();
		this.state.start('HelpCanvas');
	},

	voltar: function() {
		this.music.stop();
		this.state.start('InitialCanvas');
	},

	sair: function() {
		this.game.destroy();
	},

	startCredits: function() {
		this.music.stop();
		this.state.start('CreditsCanvas');
	},

	startRankings: function() {
		this.music.stop();
		this.state.start('RankingCanvas');
	},

	startPlay: function() {
		this.music.stop();
		this.state.start('PlayCanvas');
	}
}