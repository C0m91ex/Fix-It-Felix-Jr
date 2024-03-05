class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('FelixJr', './assets/img/felixtest.png');
        this.load.image('platform', './assets/img/platform.png');
    }

    create() {
        // Create player character
        this.player = this.physics.add.sprite(200, 300, 'FelixJr');

        // Set up physics for the player
        this.physics.world.setBounds(0, 0, 800, 600);
        this.player.setCollideWorldBounds(true);

        // Create platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 500, 'platform').setScale(2).refreshBody();

        // Add collisions between player and platforms
        this.physics.add.collider(this.player, this.platforms);

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
        }
    }
}