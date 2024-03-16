class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene")
    }

    preload() {
        this.load.image('directionalKeys', './assets/img/directionalkeys.png')
        this.load.image('spacebar', './assets/img/spacebar.png')
        this.load.bitmapFont('gem_font', './assets/font/gem.png', './assets/font/gem.xml')
        this.load.audio('select', './assets/audio/select.wav')
    }

    create() {
        this.add.bitmapText(centerX, 50, 'gem_font', '* Instructions *', 18).setOrigin(0.5)
        this.add.image(150, 200, 'directionalKeys').setScale(3)
        this.add.bitmapText(500, 150, 'gem_font', 'Use (left arrow) and (right arrow) to move left and right', 18).setOrigin(0.5)
        this.add.bitmapText(500, 200, 'gem_font', 'Use (up arrow) to jump', 18).setOrigin(0.5)
        this.add.bitmapText(500, 250, 'gem_font', 'Use (down arrow) to drop down', 18).setOrigin(0.5)
        this.add.image(150, 350, 'spacebar').setScale(3)
        this.add.bitmapText(500, 350, 'gem_font', 'While over a window use (Spacebar) to fix the window ', 18).setOrigin(0.5)
        this.add.bitmapText(centerX, 500, 'gem_font', '* Credits *', 18).setOrigin(0.5)
        this.add.bitmapText(centerX, 550, 'gem_font', 'All visual assets created by Jason Torres using Aseprite', 18).setOrigin(0.5)
        this.add.bitmapText(centerX, 575, 'gem_font', 'All audio assets found on pixabay.com', 18).setOrigin(0.5)
        this.add.bitmapText(centerX, 700, 'gem_font', 'Press UP to return to the menu', 18).setOrigin(0.5)

        this.selectsound = this.sound.add('select')
        this.selectsound.volume = .5

        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.selectsound.play()
            this.scene.start("menuScene")
        }
    }
}
