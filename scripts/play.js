var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;
var platforms;
var ground;
var index = 0;
var index1 = 0;
var grannies;
var teenagers;
var points = 0;
var life;
var lifeNum = 3;
var enemies;

var play = {
    preload: function() {

        game.load.spritesheet('dude', './resources/images/marcelo.png', 120.7, 142, 8);
        game.load.image('grandma', './resources/images/grandma.png');
        game.load.image('grandpa', './resources/images/grandpa.png');
        game.load.image('background', './resources/images/playBG.jpg');
        game.load.image('ground', './resources/images/ground.png');
        game.load.image('platform', './resources/images/platform.png');
        game.load.audio('kiss', './resources/songs/Beijo.mp3');
        game.load.audio('selfie', './resources/songs/Selfie.mp3');
        game.load.audio('punch', './resources/songs/Soco.mp3');
        game.load.image('jovem1', './resources/images/jovem.png');
        game.load.image('jovem2', './resources/images/eu.png');
        game.load.image('jovem3', './resources/images/cata.png');
        game.load.image('jovem4', './resources/images/mada.png');
        game.load.image('life3', './resources/images/cheio.png');
        game.load.image('life2', './resources/images/2vidas.png');
        game.load.image('life1', './resources/images/1vida.png');
        game.load.image('life0', './resources/images/vazio.png');
        game.load.image('tino', './resources/images/tino.png');
        game.load.image('cavaco', './resources/images/cavaco.png');
        game.load.image('mano', './resources/images/mano.png');
        game.load.audio('backgroundMusic', './resources/songs/Pim Poy.wav');

    },

    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.time.desiredFps = 30;

        bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        life = game.add.sprite(700, 10, 'life3');
        life.scale.setTo(0.15);

        game.physics.arcade.gravity.y = 1000;

        ground = game.add.tileSprite(0, 550, 800, 50, 'ground');
        game.physics.arcade.enable(ground);
        ground.body.immovable = true;
        ground.collideWorldBounds = true;
        ground.body.moves = false;

        player = game.add.sprite(20, 20, 'dude');
        game.physics.enable(player, Phaser.Physics.ARCADE);

        player.body.bounce.y = 0.1;
        player.body.collideWorldBounds = true;
        player.scale.setTo(0.7);

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [4, 5, 6, 7], 10, true);

        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //platforms 
        platforms = game.add.group();

        //old people that kiss the President
        grannies = game.add.group();

        //young people that take selfies with the President
        teenagers = game.add.group();

        //mean people that kill the President
        enemies = game.add.group();

        //sounds
        this.kissSound = game.add.audio('kiss');
        this.selfieSound = game.add.audio('selfie');
        this.punchSound = game.add.audio('punch');
        this.backgroundMusic = game.add.audio('backgroundMusic');
        this.backgroundMusic.play();

        this.timer = game.time.events.loop(10000, this.bombaAtomica, this);
        this.timer = game.time.events.loop(15000, this.playSong, this);
    },    

    update: function() {

        var hitFloor = game.physics.arcade.collide(player, ground);
        var hitPlat = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(grannies, ground);
        game.physics.arcade.collide(teenagers, ground);
        game.physics.arcade.overlap(player, grannies, this.kissGrannie, null, this);
        game.physics.arcade.overlap(player, teenagers, this.takeSelfie, null, this);
        game.physics.arcade.overlap(player, enemies, this.killPresident, null, this);
        game.physics.arcade.collide(enemies, ground);
        game.physics.arcade.collide(enemies, platforms);


        if (index >= 100) {
            this.addPlat();
            index = 0;
        }

        if (index1 >= 80) {
            this.addEnemie();
            index1 = 0;
        }
 
        player.body.velocity.x = 0;

        if (cursors.left.isDown) //andar para a esquerda
        {
            if (facing != 'left')
            {
                player.animations.play('left');
                facing = 'left';
            }
            if (player.body.position.x < game.width/2) {
                bg.tilePosition.x += 7;
                ground.tilePosition.x += 7;
                platforms.forEachAlive(function(platforms) {
                    platforms.position.x += 7;
                });
                grannies.forEachAlive(function(grannies) {
                    grannies.position.x += 7;
                });
                teenagers.forEachAlive(function(teenagers) {
                    teenagers.position.x += 7;
                });
                enemies.forEachAlive(function(enemies) {
                    enemies.position.x += 7;
                });
                player.body.velocity.x = 0;
            }
            else {
                player.body.velocity.x = -300;
            }
        }
        else if (cursors.right.isDown) //andar para a direita
        {

            if (facing != 'right')
            {
                player.animations.play('right');
                facing = 'right';
            }
            if (player.body.position.x > game.width/2) {
                bg.tilePosition.x -= 7;
                ground.tilePosition.x -= 7;
                platforms.forEachAlive(function(platforms) {
                    platforms.position.x -= 7;
                });
                grannies.forEachAlive(function(grannies) {
                    grannies.position.x -= 7;
                });
                teenagers.forEachAlive(function(teenagers) {
                    teenagers.position.x -= 7;
                });
                enemies.forEachAlive(function(enemies) {
                    enemies.position.x -= 7;
                });
                player.body.velocity.x = 0;
                index++;
                index1++;
            }
            else {
                player.body.velocity.x = 300;
            }
        }
        else
        {
            if (facing != 'idle')
            {
                player.animations.stop();

                if (facing == 'left')
                {
                    player.frame = 1;
                }
                else
                {
                    player.frame = 4;
                }

                facing = 'idle';
            }
        }
        
        if (jumpButton.isDown && player.body.touching.down && (hitFloor||hitPlat))
        {
            player.body.velocity.y = -800;
            jumpTimer = game.time.now + 750;
        }
    },

    kissGrannie: function(player, grannie) {
        grannie.kill();
        this.kissSound.play();
        this.incrementPoints();
    },

    playSong: function() {
        this.backgroundMusic.play();
    },

    killPresident: function(player, yo) {
        yo.kill();
        if (lifeNum == 3) {
            this.punchSound.play();
            lifeNum--;
            life.destroy();
            life = game.add.sprite(700, 10, 'life2');
            life.scale.setTo(0.32);
        }
        else if (lifeNum == 2) {
            this.punchSound.play();
            lifeNum--;
            life.destroy();
            life = game.add.sprite(700, 10, 'life1');
            life.scale.setTo(0.32);
        }
        else if (lifeNum == 1) {
            this.punchSound.play();
            lifeNum--;
            life.destroy();
            life = game.add.sprite(700, 10, 'life0');
            life.scale.setTo(0.32);
            this.backgroundMusic.stop();
            this.savePoints();
            game.state.start('GameoverCanvas');
        }

    },

    bombaAtomica: function() {
        for (var i=0; i<5; i++) {
            this.addEnemieAt(190*i);
        }
    },

    addPlat: function() {
        var y = Math.random() * (0.4*game.height - 0.8*game.height) + 0.8* game.height;

        var plat = this.game.add.sprite(1000,y,'platform');
        game.physics.arcade.enable(plat);
        plat.enableBody = true;
        plat.body.immovable = true;
        plat.collideWorldBounds = true;
        plat.body.moves = false;
        platforms.add(plat);



        var coin = Math.random();
        if (coin <= 0.6) {
            coin = Math.random();
            if (coin <= 0.5) {
                this.addTeenager(y);
            }
            else {
                this.addGrannie(y);
            }
        }
    },

    incrementPoints: function() {
        points += 50;
    },

    takeSelfie: function(player, teenager) {
        teenager.kill();
        this.selfieSound.play();
        this.incrementPoints();
    },

    addGrannie: function(y) {

        if (Math.random() < 0.5) {
            var oldie = this.game.add.sprite(1050, y-83, 'grandpa');
        }
        else {
            var oldie = this.game.add.sprite(1100, y-83, 'grandma');
        }
   
        game.physics.arcade.enable(oldie);
        oldie.enableBody = true;
        oldie.body.collideWorldBounds = true;
        oldie.body.immovable = true;
        oldie.collideWorldBounds = true;
        oldie.body.moves = false;
        oldie.scale.setTo(0.4);
        grannies.add(oldie);
    },

    addTeenager: function(y) {
        var coin = Math.random();
        if (coin <= 0.25) {
            var teen = this.game.add.sprite(1050, y-83, 'jovem1');
        }
        else if (coin > 0.25 && coin <= 0.5) {
            var teen = this.game.add.sprite(1100, y-83, 'jovem2');
        }
        else if (coin > 0.5 && coin <= 0.75) {
            var teen = this.game.add.sprite(1100, y-83, 'jovem3');
        }
        else {
            var teen = this.game.add.sprite(1100, y-83, 'jovem4');
        }

        game.physics.arcade.enable(teen);
        teen.enableBody = true;
        teen.body.collideWorldBounds = true;
        teen.body.immovable = true;
        teen.collideWorldBounds = true;
        teen.body.moves = false;
        teen.scale.setTo(0.4);
        teenagers.add(teen);
    },

    addEnemie: function() {
        var coin = Math.random();

        if (coin <= 0.33) {
            var enemie = this.game.add.sprite(900, 0, 'mano');
        }
        else if (coin > 0.33 && coin <= 0.66) {
            var enemie = this.game.add.sprite(900, 0, 'cavaco');
        }
        else {
            var enemie = this.game.add.sprite(900, 0, 'tino');
        }

        game.physics.arcade.enable(enemie);
        enemie.enableBody = true;
        enemie.scale.setTo(0.1);
        enemie.outOfBoundsKill = true;
        enemies.add(enemie);

    },

    addEnemieAt: function(x) {
        var coin = Math.random();

        if (coin <= 0.33) {
            var enemie = this.game.add.sprite(x, 0, 'mano');
        }
        else if (coin > 0.33 && coin <= 0.66) {
            var enemie = this.game.add.sprite(x, 0, 'cavaco');
        }
        else {
            var enemie = this.game.add.sprite(x, 0, 'tino');
        }

        game.physics.arcade.enable(enemie);
        enemie.enableBody = true;
        enemie.scale.setTo(0.1);
        enemie.outOfBoundsKill = true;
        enemies.add(enemie);
    },

    render: function() {

        game.debug.text(points, 32, 32);

        // game.debug.text(game.time.physicsElapsed, 32, 32);
        // game.debug.body(player);
        // game.debug.bodyInfo(player, 16, 24);

    }
}