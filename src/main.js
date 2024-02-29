/*
Name: Jason Torres
Game Name: Fix-It Felix Jr



*/

// game config
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    scene: [ Menu, Play ]
}

const game = new Phaser.Game(config)

const centerX = game.config.width / 2
const centerY = game.config.height / 2