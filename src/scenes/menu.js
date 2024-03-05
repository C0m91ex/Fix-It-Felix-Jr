class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.image('logo', './assets/img/Fix-It_Felix_Jr._Logo.png')
        this.load.bitmapFont('gem_font', './assets/font/gem.png', './assets/font/gem.xml')
    }

    create() {

        this.add.image(575, 300, 'logo').setOrigin(0.5)
        this.add.bitmapText(centerX, 600, 'gem_font', 'Press SPACE to start', 18).setOrigin(0.5)
        this.add.bitmapText(centerX, 625, 'gem_font', 'Press I for instructions', 18).setOrigin(0.5)

        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start("playScene")
        }
    }
}