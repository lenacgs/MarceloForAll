var game, game_width = 800, game_height = 600;

game = new Phaser.Game(game_width, game_height, Phaser.CANVAS, 'canvasMarcelo');

game.state.add('InitialCanvas', initial);
game.state.add('AnimationCanvas', animation);
game.state.add('MenuCanvas', menu);
game.state.add('CreditsCanvas', credits);
game.state.add('HelpCanvas', help);
game.state.add('RankingCanvas', ranking);
game.state.add('PlayCanvas', play);

game.state.start('InitialCanvas');
//game.state.start('InitialCanvas');
