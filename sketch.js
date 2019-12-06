let container, faces;
const side = 400;
const halfSide = side / 2;
const quarterSide = halfSide / 2;

let y = quarterSide, x = quarterSide;
let rotate = false;
let angle = 0;

let cube;
function setup() {
	noCanvas();

	cube = new Cube();

	cube.setParent(select('.base'));
}

function draw() {
	if (rotate) {
		cube._container.style('transform', rotateString(['x', 'y'], radians(++angle)));
	}
}

function keyPressed() {
	switch (keyCode) {
		case 32: // SPACE
			rotate = !rotate;
			break;
		case ESCAPE:
			angle = 0;
			rotate = false;
			cube._container.style('transform', rotateString(['x', 'y'], radians(angle)));
			break;
	}

	return false;
}

function rotateString(arr, rads) {
	let str = '';

	arr.forEach(e =>
		str += `rotate${e.toUpperCase()}(${rads}rad) `
	);

	return str;
}

class Cube {
	constructor(side) {
		this._side = side || 400;
		this._hSide = this._side / 2;
		this._qSide = this._side / 4;

		// .container
		this._container = createDiv().addClass('container');
		this._container.size(this._side, this._side);

		// .face's
		this._faces = [
			{ name: 'top', degrees: -90, coord: 'X' },
			{ name: 'bottom', degrees: 90, coord: 'X' },
			{ name: 'front', degrees: 180, coord: 'X' },
			{ name: 'back', degrees: -180, coord: 'X' },
			{ name: 'left', degrees: 90, coord: 'Y' },
			{ name: 'right', degrees: -90, coord: 'Y' }
		].map(cfg => {
			let face = createDiv().addClass('face');

			face.style('transform', `rotate${cfg.coord}(${cfg.degrees}deg) translateZ(-${this._qSide}px)`);
			face.size(this._hSide, this._hSide);
			face.addClass(`${cfg.name} border`);
			face.parent(this._container);
			face.center();

			return face;
		});
	}

	setParent(el) {
		this._container.parent(el).center();
		return this;
	}
}