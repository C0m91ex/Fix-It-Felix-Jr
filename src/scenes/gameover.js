class GameOver extends Phaser.Scene {
    constructor() {
        super("gameoverScene")
    }

    preload() {
        this.load.bitmapFont('gem_font', './assets/font/gem.png', './assets/font/gem.xml')
    }

    create() {
        this.add.bitmapText(centerX, 200, 'gem_font', 'GAME OVER', 100).setOrigin(0.5)
        this.add.bitmapText(centerX, 600, 'gem_font', 'Press SPACE to restart', 18).setOrigin(0.5)

        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            window.location.reload()
        }
    }
}
