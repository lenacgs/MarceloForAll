var gameover = {
	preload: function() {
		this.game.load.image('background', './resources/images/gameover.png');
		this.game.load.audio('music', './resources/songs/Perder.mp3');
	},

	create: function() {
		this.bg = this.add.sprite(0, 0, 'background');
		this.music = this.add.audio('music');
		this.music.play();
	}
}