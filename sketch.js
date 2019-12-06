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
	// cube.show();
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
			container.style('transform', rotateString(['x', 'y'], radians(angle)));
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
		this._halfSide = this._side / 2;
		this._quarterSide = this._side / 4;

		this._container = createDiv().size(this._side, this._side).addClass('container');

		this._faces = [
			'top', 'bottom',
			'front', 'back',
			'left', 'right'
		].map(faceType => createDiv().size(this._halfSide, this._halfSide).addClass(`face ${faceType} border`).parent(this._container));

		

	select('.top').style('transform', `rotateX(-90deg) translateZ(-${this._quarterSide}px)`);
	select('.bottom').style('transform', `rotateX(90deg) translateZ(-${this._quarterSide}px)`);

	select('.back').style('transform', `translateZ(-${this._quarterSide}px)`);
	select('.front').style('transform', `rotateX(180deg) translateZ(-${this._quarterSide}px)`);

	select('.left').style('transform', `rotateY(90deg) translateZ(-${this._quarterSide}px)`);
	select('.right').style('transform', `rotateY(-90deg) translateZ(-${this._quarterSide}px)`);
	}

	setParent(el) {
		this._container.parent(el).center();
		this._faces.forEach(f => f.center());
		return this;
	}

	show() {
		this._container.show();
	}
}