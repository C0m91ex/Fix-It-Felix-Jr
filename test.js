// this example is partly based on https://phaser.io/examples/v3/view/physics/arcade/basic-platform


class Dude extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'dude');
      this.scene = scene;
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setCollideWorldBounds(true);
      this.body.setSize(20, 32).setOffset(6,16);
     
      this.isOnPlatform = false;
      this.onPlatform = null;
      
      this.cursors = this.scene.input.keyboard.createCursorKeys();
    } 
  
    update() {
      this.handleInput();
    }
  
    handleInput() {
      if (this.cursors.left.isDown) {
        this.setVelocityX(-160)
        this.anims.play('left', true)
      } else if (this.cursors.right.isDown) {
        this.setVelocityX(160)
        this.anims.play('right', true)
      } else {
        this.setVelocityX(0)
       switch (this.body.facing) {
          case Phaser.Physics.Arcade.FACING_LEFT:
            this.anims.play('idle-left', true);
            break;
          case Phaser.Physics.Arcade.FACING_RIGHT:
             this.anims.play('idle-right', true);
            break;
          default:
            this.anims.play('idle-front', true);
        }
      }
   
      if ((this.cursors.up.isDown && this.body.touching.down)) {
        this.setVelocityY(-400);
        if (this.isOnPlatform) {
          this.onPlatform.body.checkCollision.up = true;
          this.isOnPlatform = false;
          this.onPlatform = null;
        }
      }
      if ((this.cursors.down.isDown && this.isOnPlatform)) {
        this.onPlatform.body.checkCollision.up = false;
        
      }
    }
  
  }
  
  
  class GameScene extends Phaser.Scene {
    constructor() {
      super('gameScene');
   
    }
   
    preload () {
      this.load.setBaseURL('https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/src/games/firstgame/');
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
     
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
  
   create () {
     this.createAnims();
     this.add.image(400, 300, 'sky');
     
     this.platforms = this.physics.add.staticGroup();
     this.platforms.create(400, 568, 'ground').setScale(2).refreshBody(); // this is the ground
     this.platforms.create(500, 250, 'ground').setOrigin(0).refreshBody();
     this.add.text(550,260,"Normal Colliding Platform")
  
     this.platforms.create(0,450, 'ground').setOrigin(0).refreshBody()
       .body.checkCollision.down = false;
     this.add.text(50,460,"Jump Through from Bottom Platform");
     this.platforms.create(300, 350, 'ground').setOrigin(0).refreshBody()
       .body.checkCollision.down = false;
     this.add.text(350,360,"Jump Through from Bottom Platform");
  
     this.passThruPlatforms = this.physics.add.staticGroup();
     this.passThruPlatforms.create(0, 250, 'ground').setOrigin(0).refreshBody()
       .body.checkCollision.down = false;
     this.add.text(50, 260,"Push Down Arrow Key to Fall Through");
     this.walkPastPlatform = this.physics.add.staticSprite(550, 510, 'ground')
        .setOrigin(0).setScale(1,0.5).refreshBody();
     this.walkPastPlatform.body.checkCollision.down = false;
     this.walkPastPlatform.body.checkCollision.left = false;
     this.add.text(600, 510,"Walk Past Platform");
     
     this.player = new Dude(this, 500, 450);
  
     this.physics.add.collider(this.player, this.platforms);
     this.physics.add.collider(this.player, this.walkPastPlatform);
     this.physics.add.collider(this.player, this.passThruPlatforms, this.onPlatform);
     this.text1 = this.add.text(0,0,'');
     this.text2 = this.add.text(300,0,'');
   }
  
    update () {
      this.player.update();
      this.text1.setText([  
        JSON.stringify(Phaser.Utils.Objects.Pick(this.player.body,['blocked', 'velocity','facing']),null,2),
         "DeltaX()"+this.player.body.deltaX(),
        "DeltaY()"+this.player.body.deltaY(),
        
      ]);
      this.text2.setText([  
        JSON.stringify(Phaser.Utils.Objects.Pick(this.player.body,['allowGravity','touching', 'embedded','position']),null,2),
        "IsOnPlatform="+this.player.isOnPlatform
      ]);
    }
  
    onPlatform(player, platform) {  
      // this call back is only used for "passThru" platform, since need to change collider property
      player.isOnPlatform = true;
      player.onPlatform = platform;
    }
    
     createAnims() {
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'idle-front',
        frames: [ { key: 'dude', frame: 4 } ],
      });
      this.anims.create({
        key: 'idle-left',
        frames: [ { key: 'dude', frame: 0 } ],
      });
      this.anims.create({
        key: 'idle-right',
        frames: [ { key: 'dude', frame: 5 } ],
      });
    }
    
  }
  
  const config = {
    width: 800,
    height: 600,
    physics: { 
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
        debug: true
      }
    },
    scene: [GameScene]
  };
  
  const game = new Phaser.Game(config);