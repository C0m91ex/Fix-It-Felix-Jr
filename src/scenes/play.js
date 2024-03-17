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
        this.load.image('brick', './assets/img/brick.png')
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
        this.load.audio('fixsound', './assets/audio/fix.wav')
        this.load.audio('backgroundmusic', './assets/audio/backgroundmusic.wav')
        this.load.audio('gameover', './assets/audio/gameover.wav')
        this.load.audio('victory', './assets/audio/victory.wav')
        this.load.audio('music', './assets/audio/backgroundmusic.wav')
    }

    create() {

        // adding building pieces
        this.add.image(400, 431, 'building').setScale(2.5)
        this.add.image(400, 620, 'door').setScale(2.5)

        // adding background music
        this.music = this.sound.add('music')
        this.music.loop = true
        this.music.volume = .3
        this.music.play()

        // adding ralph 
        this.npc = this.add.sprite(centerX, 106, 'Ralph', 5).setScale(1.75)
        this.anims.create({
            key: 'wreck',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('Ralph', {
                frames: [ 5, 6, 7, 8, 9, 6, 7, 8, 9, 5]
            })
        })


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
        this.windowGroup = this.physics.add.staticGroup();
        // fourth level
        this.addwindow(400, 273, 'halfbroken')
        this.addwindow(225, 273, 'halfbroken')
        this.addwindow(300, 273, 'broken')
        this.addwindow(500, 273, 'halfbroken')
        this.addwindow(575, 273, 'halfbroken')

        // third level
        this.addwindow(400, 373, 'halfbroken')
        this.addwindow(225, 373, 'halfbroken')
        this.addwindow(300, 373, 'broken')
        this.addwindow(500, 373, 'halfbroken')
        this.addwindow(575, 373, 'broken')

        // second level
        this.balcony = this.add.sprite(400, 490, 'balcony', 0).setScale(2.5)
        this.addwindow(225, 488, 'halfbroken')
        this.addwindow(300, 488, 'broken')
        this.addwindow(500, 488, 'halfbroken')
        this.addwindow(575, 488, 'halfbroken')

        //first level
        this.addwindow(225, 588, 'halfbroken')
        this.addwindow(300, 588, 'broken')
        this.addwindow(500, 588, 'halfbroken')
        this.addwindow(575, 588, 'broken')


        // Create player character
        this.player = this.physics.add.sprite(650, 700, 'FelixJr', 0).setScale(1.5);
        this.player.setSize(20, 34)
        

        // adding in audio
        this.jumpsound = this.sound.add('jump')
        this.jumpsound.volume = .5

        this.fixsound = this.sound.add('fixsound')
        this.fixsound.volume = .5

        this.gameoversound = this.sound.add('gameover')
        this.gameoversound.volume = .5
        
        this.victorysound = this.sound.add('victory')
        this.victorysound.volume = .5

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

        this.bricks = this.physics.add.group()
        
        this.spawnBrickTimer = this.time.addEvent({
            delay: 2500,
            loop: true,
            callback: function() {
                this.npc.anims.play('wreck')
                this.time.delayedCall(500, function() {
                    this.createBricks()
                }, [], this)
            }, 
            callbackScope: this
        })

        // Add overlap
        this.physics.add.overlap(this.player, this.window, this.handleWindowInteraction, null, this)

        // Add collisions 
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.player, this.window)
        this.physics.add.collider(this.player, this.bricks, this.handleBrickCollision, null, this)

        // Set up keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.overlap(this.player,this.window)

        // creating life counters
        this.lifeIcon = this.add.sprite(1000, 1000, 'lifeIcon').setScale(2)

        this.updateLifeIcons()

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
            this.player.setVelocityY(-330)
            this.player.anims.play('jump', true)
        }



        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.interactWithWindow()
        }

        if (this.cursors.space.isDown) {
            this.fixsound.play()
            this.player.anims.play('fix', true)
        }

        // checking if player runs out of lives
        if (this.playerlives <= 0) {
            this.music.pause()
            this.gameoversound.play()
            this.scene.start('gameoverScene')
        }

        if (this.checkForVictory()) {
            this.music.pause()
            this.victorysound.play()
            this.scene.start('victoryScene')
        }
    }

    addwindow(x, y, initialState) {
        const window = this.windowGroup.create(x, y, 'window').setScale(2)
        window.anims.play(initialState)
        return window
    }

    interactWithWindow() {
        const overlappingWindows = this.windowGroup.getChildren().filter(window => this.physics.overlap(this.player, window))

        if (overlappingWindows. length > 0) {
            const window = overlappingWindows[0]

            switch (window.anims.currentAnim.key) {
                case 'fixed':
                    window.anims.play('fixed')
                    break
                case 'halfbroken':
                    window.anims.play('fixed')
                    break
                case 'broken':
                    window.anims.play('halfbroken')
                    break
                default:
                    break
            }
        }
    }

    handleWindowInteraction(player, window) {
        if(Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.interactWithWindow()
        }
    }


    updateLifeIcons() {
        this.lifeIcons.forEach(icon => icon.destroy())
        this.lifeIcons = []
    
        const startX = 785
        const startY = 15
        const spacing = 1 
        const iconWidth = 40 
        for (let i = 0; i < this.playerlives; i++) {
            const life = this.add.sprite(startX - i * (spacing + iconWidth), startY, 'lifeIcon').setScale(2)
            this.lifeIcons.push(life)
        }
    }

    loseLife() {
        this.playerlives--
        this.updateLifeIcons()
    }

    createBricks() {
        const xPositions = [225, 300, 400, 500, 575]
        const startY = 175

        const randomIndex = Phaser.Math.RND.integerInRange(0, xPositions.length - 1)
        const x = xPositions[randomIndex]

        const brick = this.bricks.create(x, startY, 'brick').setScale(2)
        brick.body.setVelocityY(75)
        brick.body.allowGravity = false
    }

    handleBrickCollision(player, brick) {
        this.loseLife()
        brick.destroy()
    }

    checkForVictory() {
        let allFixed = true;
        this.windowGroup.getChildren().forEach(window => {
            if (window.anims.currentAnim.key !== 'fixed') {
                allFixed = false;
            }
        });
        return allFixed;
    }

}