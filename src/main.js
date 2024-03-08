/*
Name: Jason Torres
Game Name: Fix-It Felix Jr



*/

// game config
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 450 }
        }
    },
    
    pixelArt: true,
    scene: [ Menu, Instructions, Play ]
}

const game = new Phaser.Game(config)

const centerX = game.config.width / 2
const centerY = game.config.height / 2

let cursors = null