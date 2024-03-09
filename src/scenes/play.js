class Play extends Phaser.Scene {
    constructor() {
        super("playScene");

        this.isOnPlatform = false;
        this.onPlatform = null;
    }

    preload() {
        // load in images
        this.load.image('platform', './assets/img/platform.png')
        this.load.image('platform2', './assets/img/platform2.png')        
        this.load.image('building', './assets/img/building.png')
        this.load.image('door', './assets/img/door.png')
        this.load.spritesheet('balcony', './assets/img/balcony.png', {
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet('window', './assets/img/window.png', {
            frameWidth: 32,
            frameHeight: 48
        })
        this.load.spritesheet('FelixJr', './assets/img/FelixSpriteSheet.png', {
            frameWidth: 48,
            frameHeight: 48
        })

        // load in audio
        this.load.audio('jump', './assets/audio/jump.wav')
    }

    create() {

        // adding building pieces
        this.add.image(400, 431, 'building').setScale(2.5)
        this.add.image(400, 620, 'door').setScale(2.5)


        //adding the windows  

        // fourth level
        this.window = this.add.sprite(400, 273, 'window', 0).setScale(2)
        this.window = this.add.sprite(225, 273, 'window', 0).setScale(2)
        this.window = this.add.sprite(300, 273, 'window', 0).setScale(2)
        this.window = this.add.sprite(500, 273, 'window', 0).setScale(2)
        this.window = this.add.sprite(575, 273, 'window', 0).setScale(2)

        // third level
        this.window = this.add.sprite(400, 373, 'window', 0).setScale(2)
        this.window = this.add.sprite(225, 373, 'window', 0).setScale(2)
        this.window = this.add.sprite(300, 373, 'window', 0).setScale(2)
        this.window = this.add.sprite(500, 373, 'window', 0).setScale(2)
        this.window = this.add.sprite(575, 373, 'window', 0).setScale(2)

        // second level
        this.balcony = this.add.sprite(400, 490, 'balcony', 0).setScale(2.5)
        this.window = this.add.sprite(225, 488, 'window', 0).setScale(2)
        this.window = this.add.sprite(300, 488, 'window', 0).setScale(2)
        this.window = this.add.sprite(500, 488, 'window', 0).setScale(2)
        this.window = this.add.sprite(575, 488, 'window', 0).setScale(2)

        //first level
        this.window = this.add.sprite(225, 588, 'window', 0).setScale(2)
        this.window = this.add.sprite(300, 588, 'window', 0).setScale(2)
        this.window = this.add.sprite(500, 588, 'window', 0).setScale(2)
        this.window = this.add.sprite(575, 588, 'window', 0).setScale(2)

        // Create player character
        this.player = this.physics.add.sprite(200, 300, 'FelixJr', 0).setScale(1.5);
        this.player.setSize(20, 34)
        

        // adding in audio
        this.jumpsound = this.sound.add('jump')
        this.jumpsound.volume = .5

        // Set up physics for the player
        this.physics.world.setBounds(0, 0, 800, 700);
        this.player.setCollideWorldBounds(true);

        // Felix Jr. animations
        this.anims.create({
            key: 'idle',
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('FelixJr', {
                start: 0,
                end: 0
            })
        })
        this.anims.create({
            key: 'jump',
            frameRate: 5,
            repeat: false,
            frames: this.anims.generateFrameNumbers('FelixJr', {
                start: 0,
                end: 1
            })
        })

        this.player.on('animationcomplete', function (animation, frame, player) {
            if (animation.key === 'jump' && player.body.onFloor()) {
                player.anims.play('idle'); // Play the idle animation when the jump animation completes and the player is on the ground
            }
        })

        // Create platforms
        this.platforms = this.physics.add.staticGroup();
        // fourth level
        this.platforms.create(400, 310, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        this.platforms.create(225, 310, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        this.platforms.create(300, 310, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        this.platforms.create(500, 310, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        this.platforms.create(575, 310, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        // third level
        this.platforms.create(400, 410, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        this.platforms.create(225, 410, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        this.platforms.create(300, 410, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        this.platforms.create(500, 410, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        this.platforms.create(575, 410, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        // second level
        this.platforms.create(400, 535, 'platform2').setScale(2.5).refreshBody().body.checkCollision.down = false;
        this.platforms.create(225, 525, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        this.platforms.create(300, 525, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        this.platforms.create(500, 525, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        this.platforms.create(575, 525, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        // first level 
        this.platforms.create(225, 625, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        this.platforms.create(300, 625, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        this.platforms.create(500, 625, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;
        this.platforms.create(575, 625, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;


        // Add collisions between player and platforms
        this.physics.add.collider(this.player, this.platforms, this.onPlatform);

        // Set up keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // Player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        // Player jumping
        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.jumpsound.play()
            this.player.setVelocityY(-330);
            this.player.anims.play('jump', true)
        }
        this.handleInput();
    }

    handleInput() {
        if ((this.cursors.down.isDown && this.isOnPlatform)) {
            this.onPlatform.body.checkCollision.up = false;
            
          }
    }

    onPlatform(player, platform) {  
        // this call back is only used for "passThru" platform, since need to change collider property
        player.isOnPlatform = true;
        player.onPlatform = platform;
    }
}