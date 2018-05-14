var animation = {
	preload: function() {

	},

	create: function() {
		timer = this.time.create();

		timerEvent = timer.add(3*Phaser.Timer.SECOND, this.endTimer, this);
		timer.start();
	},

	endTimer: function() {
		timer.stop();
		this.state.start('MenuCanvas');
	}
}