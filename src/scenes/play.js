class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.playerlives = 3;
        this.lifeIcons = [];

    }

    preload() {
        // load in images
        this.load.image('platform', './assets/img/platform.png')
        this.load.image('platform2', './assets/img/platform2.png')        
        this.load.image('building', './assets/img/building.png')
        this.load.image('lifeIcon', './assets/img/icon.png')
        this.load.image('door', './assets/img/door.png')
        this.load.spritesheet('balcony', './assets/img/balcony.png', {
            frameWidth: 48,
            frameHeight: 48
        })
        this.load.spritesheet('window', './assets/img/window.png', {
            frameWidth: 32,
            frameHeight: 48
        })
        this.load.spritesheet('Ralph', './assets/img/RalphSpriteSheet.png', {
            frameWidth: 64,
            frameHeight: 64
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

        // adding ralph 
        this.npc = this.add.sprite(500, 106, 'Ralph', 5).setScale(1.75)


        // window states
        this.anims.create({
            key: 'fixed',
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('window', {
                frames: [ 0 ]
            })
        })
        this.anims.create({
            key: 'halfbroken',
            frameRate: 1,
            frames: this.anims.generateFrameNames('window', {
                frames: [ 1 ]
            })
        })
        this.anims.create({
            key: 'broken',
            frameRate: 1,
            frames: this.anims.generateFrameNames('window', {
                frames: [ 2 ]
            })
        })

        //adding the windows layer
        this.window = this.physics.add.staticGroup();
        // fourth level
        this.window = this.add.sprite(400, 273, 'window').setScale(2).play('fixed')
        this.window = this.add.sprite(225, 273, 'window').setScale(2).play('fixed')
        this.window = this.add.sprite(300, 273, 'window').setScale(2).play('fixed')
        this.window = this.add.sprite(500, 273, 'window').setScale(2).play('fixed')
        this.window = this.add.sprite(575, 273, 'window').setScale(2).play('fixed')

        // third level
        this.window = this.add.sprite(400, 373, 'window').setScale(2).play('fixed')
        this.window = this.add.sprite(225, 373, 'window').setScale(2).play('fixed')
        this.window = this.add.sprite(300, 373, 'window').setScale(2).play('fixed')
        this.window = this.add.sprite(500, 373, 'window').setScale(2).play('fixed')
        this.window = this.add.sprite(575, 373, 'window').setScale(2).play('fixed')

        // second level
        this.balcony = this.add.sprite(400, 490, 'balcony', 0).setScale(2.5)
        this.window = this.add.sprite(225, 488, 'window').setScale(2).play('broken')
        this.window = this.add.sprite(300, 488, 'window').setScale(2).play('fixed')
        this.window = this.add.sprite(500, 488, 'window').setScale(2).play('fixed')
        this.window = this.add.sprite(575, 488, 'window').setScale(2).play('fixed')

        //first level
        this.window = this.add.sprite(225, 588, 'window').setScale(2).play('fixed')
        this.window = this.add.sprite(300, 588, 'window').setScale(2).play('fixed')
        this.window = this.add.sprite(500, 588, 'window').setScale(2).play('fixed')
        this.window = this.add.sprite(575, 588, 'window').setScale(2).play('fixed')


        // Create player character
        this.player = this.physics.add.sprite(200, 300, 'FelixJr', 0).setScale(1.5);
        this.player.setSize(20, 34)
        

        // adding in audio
        this.jumpsound = this.sound.add('jump')
        this.jumpsound.volume = .5

        // Set up physics for the player
        this.physics.world.setBounds(0, 0, 800, 700);
        this.player.setCollideWorldBounds(true);
        this.player.body.onOverlap = true

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
            frameRate: 2,
            repeat: false,
            frames: this.anims.generateFrameNumbers('FelixJr', {
                start: 1,
                end: 0
            })
        })
        this.anims.create({
            key: 'fix',
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('FelixJr', {
                frames: [ 0, 4, 0]
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
        this.physics.add.collider(this.player, this.platforms);

        // Set up keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.overlap(this.player,this.window)

        // creating life counters
        this.lifeIcon = this.add.sprite(785, 15, 'lifeIcon').setScale(2)

        for (let i = 0; i < this.playerlives; i++) {
            const life = this.add.sprite(this.lifeIcon.x - (i + 1) * (this.lifeIcon.width + 10), this.lifeIcon.y, 'lifeIcon').setScale(2)
            this.lifeIcons.push(life)
        }

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

        // Player passing through floor 
        if (this.cursors.down.isDown) {
            this.player.body.checkCollision.down = false;
        } else {
            this.player.body.checkCollision.down = true;
        }

        // Player jumping
        if (this.cursors.up.isDown && this.player.body.onFloor()) {
            this.jumpsound.play()
            this.player.setVelocityY(-330);
            this.player.anims.play('jump', true)
        }

        // Change window state when player overlaps and presses space
        this.player.body.debugBodyColor = this.player.body.touching.none ? 0x0099ff : 0xff9900;

        this.physics.overlap(this.player, this.window, (player, window) => {
            if (this.cursors.space.isDown) {
                console.log('space is pressed')
                if (window.anims.currentAnim.key === 'fixed') {
                    console.log('window is fixed')
                    window.anims.play('fixed')
                } else if (window.anims.currentAnim.key === 'halfbroken') {
                    console.log('fully fixed window')
                    window.anims.play('fixed')
                } else if (window.anims.currentAnim.key === 'broken') {
                    console.log('partially fixed window')
                    window.anims.play('halfbroken')
                }
            }
        })

        if (this.cursors.space.isDown) {
            this.player.anims.play('fix', true)
        }
    }

    updateLifeIcons() {
        while (this.lifeIcons.length > this.playerlives) {
            this.lifeIcons.pop().destroy()
        }

        while (this.lifeIcons.length < this.playerlives) {
            const life = this.add.sprite(this.lifeIcon.x - (this.lifeIcons.length + 1) * (this.lifeIcon.width + 10), this.lifeIcon.y, 'lifeIcon').setScale(2)
            this.lifeIcons.push(life)
        }
    }

}