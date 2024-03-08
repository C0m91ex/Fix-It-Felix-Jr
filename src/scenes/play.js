class Play extends Phaser.Scene {
    constructor() {
        super("playScene");

        this.isOnPlatform = false;
        this.onPlatform = null;
    }

    preload() {
        //this.load.image('FelixJr', './assets/img/felixtest.png');
        this.load.image('platform', './assets/img/platform.png');
        this.load.spritesheet('FelixJr', './assets/img/FelixSpriteSheet.png', {
            frameWidth: 48,
            frameHeight: 48
        });
    }

    create() {
        // Create player character
        this.player = this.physics.add.sprite(200, 300, 'FelixJr', 0);

        // Set up physics for the player
        this.physics.world.setBounds(0, 0, 800, 600);
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
        this.platforms.create(400, 500, 'platform').setScale(2).refreshBody().body.checkCollision.down = false;

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