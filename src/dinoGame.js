const config = {
    width: 800,
    height: 600,
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

function preload() {
    this.load.image('dino', 'assets/dino.png', {frameWidth: 100, frameHeight: 100})
    this.load.image('jungle', 'assets/jungle.png')
    pointage = this.input.keyboard.createCursorKeys()
}

function create() {
    this.add.image(0, 0, 'jungle').setOrigin(0, 0)
    dino = this.physics.add.image(50, 250, 'dino')
    dino.body.collideWorldBounds = true
}

function update() {
    dino.setVelocityX(0)

    switch (true) {
        case pointage.up.isDown :
            dino.setVelocity(0, -300)
            break
        case pointage.left.isDown :
            dino.setVelocity(-200, 0)
            break
        case pointage.right.isDown :
            dino.setVelocity(200, 0)
            break
    }
}