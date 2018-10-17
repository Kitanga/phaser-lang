class Player extends Phaser.Scene {
    constructor(x, y) {
        super(x, y);
        this.init();
    }

    init() {
        ::player = :::sprite(this.x, this.y, this.key);
        ::player.camera = #camera;
        // ::player = ::#camera;
        #start('Player-2', {});
        #launch('Player-3', {});
    }
}