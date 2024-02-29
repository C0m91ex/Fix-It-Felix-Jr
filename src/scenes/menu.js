class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {

    }

    create() {
        this.keySpace = this.input.keyboard.addKey(Phaser.Inpu.Keyboard.Keycodes.SPACE)
    }

    update() {
        if(this.keySpace.isDown) {
            this.scene.start("playScene")
        }
    }
}