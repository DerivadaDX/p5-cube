let rotate = false;
let angle = 0;
let cube;

function setup() {
	noCanvas();

	cube = new Cube();

	cube.setParent(select('.main'));
	cube.init();
}

function draw() {
	cube.refresh();
}

class Cube {
	constructor(side) {
		// sides
		this._side = side || 400;
		this._hSide = this._side / 2;
		this._qSide = this._side / 4;

		// .base
		this._base = createDiv().addClass('base');

		// #platform
		this._platform = createDiv().id('platform').addClass('container');
		this._platform.size(this._side, this._side);
		this._platform.parent(this._base);

		// .container
		this._container = createDiv().addClass('container');
		this._container.size(this._side, this._side);
		this._container.parent(this._platform);

		// .face's
		this._faces = [
			{ name: 'top', degrees: -90, coord: 'X' },
			{ name: 'bottom', degrees: 90, coord: 'X' },
			{ name: 'front', degrees: 180, coord: 'X' },
			{ name: 'back', degrees: 0, coord: 'X' },
			{ name: 'left', degrees: 90, coord: 'Y' },
			{ name: 'right', degrees: -90, coord: 'Y' }
		].map(cfg => {
			let face = createDiv().addClass('face');

			face.style('transform', `rotate${cfg.coord}(${cfg.degrees}deg) translateZ(-${this._qSide}px)`);
			face.addClass(`${cfg.name} container border`);
			face.size(this._hSide, this._hSide);
			face.parent(this._container);
			face.center();

			return face;
		});

		// rotation
		this._rotate = false;
		this._angle = 0;
	}

	setParent(el) {
		this._base.parent(el);
		this._base.size(el.width, el.height);

		this._platform.center();
		this._platform.style('transform', `translateZ(${this._qSide + this._qSide / 4}px)`);

		return this;
	}

	init() {
		addEventListener('keyup', (k) => {
			switch (k.code) {
				case 'Space':
					this._rotate = !this._rotate;
					break;
				case 'Escape':
					this._angle = 0;
					this._rotate = false;
					this._container.style('transform', this._rotateString(['x', 'y'], radians(this._angle)));
					break;
			}

			return false;
		});
	}

	refresh() {
		if (this._rotate) {
			this._container.style('transform', this._rotateString(['x', 'y'], radians(++this._angle)));
		}

		return this;
	}

	_rotateString(arr, rads) {
		let str = '';

		arr.forEach(e =>
			str += `rotate${e.toUpperCase()}(${rads}rad) `
		);

		return str;
	}
}