class GameRunner {
	constructor() {
		let me = this;
		me.currentSpeed = 4;
		me.points = 0;
		me.acceleration = 0.001;
		me.background = new Background();
		me.biker = new Biker();
		me.obstacle = new Obstacle();
		me.initializeTrail();
		me.init()
	}

	start() {
		let me = this;
		if (!me.isRunning) {
			me.isRunning = true;
			me.startEventHandler();
			me.moveObstacles();
			me.gameOverHandler();
		}
	}

	init() {
		this.startEventHandler();
	}

	gameOverHandler(){
		let me = this;
		let handlerFunc = function (e) {
			if (e.keyCode === 81) {
				me.gameOver();
			}
		};
		me.GOHandler = handlerFunc.bind(me);
		window.addEventListener('keydown', me.GOHandler)
	}

	startEventHandler() {
		let me = this;
		let handlerFunc = function (e) {
			if (e.keyCode === 32 || e.keyCode === 38) {
				me.start()
			}
		};
		if (!me.handler){
			me.handler = handlerFunc.bind(me);
		}

		if (!me.isRunning) {
			window.addEventListener('keydown', me.handler);
		} else {
			window.removeEventListener('keydown', me.handler);
		}
	}

	initializeTrail(){
		this.tile_1 = new Trail(0);
		this.tile_2 = new Trail(512);

		this.tile_1.render();
		this.tile_2.render();
	}

	moveObstacles() {
		let me = this;
		me.points++;
		me.currentSpeed += me.acceleration;
		me.obstacle.render();
		me.obstacle.cPos.x = me.obstacle.cPos.x > -me.obstacle.width ? me.obstacle.cPos.x - me.currentSpeed : 1000;
		me.animID = window.requestAnimationFrame(function () {
			me.moveObstacles();
		});
	}

	gameOver() {
		console.log('game over');
		window.cancelAnimationFrame(this.animID);
		this.biker.animate('crash');
	}
}

let game = new GameRunner();