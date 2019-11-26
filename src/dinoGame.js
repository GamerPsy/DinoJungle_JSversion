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

const GAME = new Phaser.Game(config)
let sol
let dino
let oeuf
let pointage
let score = 0;
let scoreText;

function preload() {
    this.load.image('dino', 'assets/dino2.png')
    this.load.image('oeuf', 'assets/oeuf.png')
    this.load.image('jungle', 'assets/jungle.png')
    this.load.image('sol', 'assets/platform.png');
    pointage = this.input.keyboard.createCursorKeys()
}

function create() {
    this.add.image(400, 300, 'jungle')
    sol = this.physics.add.staticGroup()
    sol.create(400, 620, 'sol').setScale(2).refreshBody()
    scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#fff'})
    oeuf = this.physics.add.group({
        key: 'oeuf',
        repeat: 9,
        setXY: {x: 120, y: 0, stepX: 70},
    });
    oeuf.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setCollideWorldBounds(true)
    });

    dino = this.physics.add.sprite(50, 450, 'dino');
    dino.setBounce(0.2);
    dino.setCollideWorldBounds(true);

    this.physics.add.collider(oeuf, dino);
    this.physics.add.collider(dino, sol);
    this.physics.add.collider(oeuf, sol);
    this.physics.add.overlap(dino, oeuf, collectOeuf, null, this);
}

function update() {
    switch (true) {
        case pointage.left.isDown :
            dino.setVelocityX(-160)
            break
        case pointage.right.isDown :
            dino.setVelocityX(160);
            break
        case pointage.up.isDown && dino.body.touching.down:
            dino.setVelocityY(-300);
            break
        default :
            dino.setVelocityX(0);
    }
}

function collectOeuf(dino, oeuf) {
    oeuf.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}