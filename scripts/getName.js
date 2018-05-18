var getName = {
	preload: function() {
		this.game.load.image('background', './resources/images/bg.png');
	}

	create: function() {
		this.bg = this.add.sprite(0, 0, 'background');
		game.add.plugin(PhaserInput.Plugin);
		var input = game.add.inputField(10, 90);
	}
}