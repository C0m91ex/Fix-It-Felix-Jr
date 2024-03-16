class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.image('logo', './assets/img/Fix-It_Felix_Jr._Logo.png')
        this.load.bitmapFont('gem_font', './assets/font/gem.png', './assets/font/gem.xml')
        this.load.audio('select', './assets/audio/select.wav')
    }

    create() {

        this.add.image(575, 300, 'logo').setOrigin(0.5)
        this.add.bitmapText(centerX, 600, 'gem_font', 'Press SPACE to start', 18).setOrigin(0.5)
        this.add.bitmapText(centerX, 625, 'gem_font', 'Press UP for instructions / credits', 18).setOrigin(0.5)

        this.selectsound = this.sound.add('select')
        this.selectsound.volume = .5

        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.selectsound.play()
            this.scene.start("playScene")
        }
        if(Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.selectsound.play()
            this.scene.start("instructionsScene")
        }
    }
}