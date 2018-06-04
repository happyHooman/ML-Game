class Obstacle extends Sprite {
	constructor() {
		super({
			canvas: document.getElementById("background-layer"),
			imageSrc: "app/img/environment_sheet.png",
			width: 512,
			height: 52,
			origin: {x: 100, y: 218},
			initialPosition: {
				x: 1000,
				y: 315
			}
		});
	}
}