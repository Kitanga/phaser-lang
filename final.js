class Player extends Phaser.Scene {
    constructor(x, y) {
        super(x, y);
        this.init();
    }

    init() {
        this.player = this.add.sprite(this.x, this.y, this.key);
        this.player.camera = this.cameras.main;
        this.scene.start('Player-2', {});
        this.scene.launch('Player-3', {});
    }
}