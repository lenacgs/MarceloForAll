var credits = {
	preload: function() {
		this.game.load.image('background', 'resources/images/bg.png');
		this.game.load.image('button1', 'resources/images/voltar.PNG');
	},

	create: function() {

		//background
		this.bg = this.add.sprite(0, 0, 'background');
		this.bg.width = game_width;
		this.bg.height = game_height;

		//voltar button
		this.button1 = this.add.button(5, 575, 'button1', this.voltar, this);
		this.button1.scale.setTo(0.5, 0.5);

	},

	voltar: function() {
		this.state.start('MenuCanvas');
	}
}