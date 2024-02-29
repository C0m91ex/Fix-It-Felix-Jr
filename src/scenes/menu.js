class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.image('logo', './assets/Fix-It_Felix_Jr._Logo.png')
    }

    create() {
       // this.keySpace = this.input.keyboard.addKey(Phaser.Inpu.Keyboard.Keycodes.SPACE)

        logo = this.add.image(centerX, centerY, 'logo').setOrigin(0.5)
        logo.setScale(.5)
    }

    update() {
        //if(this.keySpace.isDown) {
            //this.scene.start("playScene")
        //}
    }
}