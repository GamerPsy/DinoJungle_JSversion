const config = {
    width : 800,
    height : 600,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400}
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
}

const GAME = new Phaser.Game(config)
let dino
let oeuf
let pointage

function preload()
{
    this.load.image('dino', 'assets/dino.png')
    this.load.image('oeuf', 'assets/oeuf.png')
    this.load.image('jungle', 'assets/jungle.png')
    pointage = this.input.keyboard.createCursorKeys()
}

function create()
{
    this.add.image(400, 300, 'jungle')
    oeuf = this.physics.add.image(400, 200, 'oeuf')
    oeuf.body.collideWorldBounds = true
    dino = this.physics.add.image(50, 250, 'dino')
    dino.body.collideWorldBounds = true
}

function update()
{
    dino.setVelocityX(0)

    if(pointage.up.isDown){
        dino.setVelocity(0, -300)
    }
    if(pointage.left.isDown){
        dino.setVelocity(-200, 0)
    }
    if(pointage.right.isDown){
        dino.setVelocity(200, 0)
    }
}