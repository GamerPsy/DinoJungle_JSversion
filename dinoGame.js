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

const game = new Phaser.Game(config)
let dino
let pointage

function preload()
{
    this.load.image('dino', 'assets/dino.png')
    pointage = this.input.keyboard.createCursorKeys()
}

function create()
{
    dino = this.physics.add.image(200, 200, 'dino')
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