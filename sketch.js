let container, faces;
const side = 400;
const halfSide = side / 2;
const quarterSide = halfSide / 2;

let y = quarterSide, x = quarterSide;
let rotate = false;
let angle = 0;

function setup() {
	container = select('.container');
	faces = selectAll('.face');

	prepareFixedSquares();
	prepareContainer();
	prepareFaces();
}

function draw() {
	if (rotate) {
		container.style('transform', rotateString(['x', 'y'], radians(++angle)));
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

function prepareContainer() {
	container.size(side, side);
	container.center();
}

function prepareFaces() {
	faces.forEach(face => {
		face.size(halfSide, halfSide);
		face.center();
	});

	select('.top').style('transform', `rotateX(-90deg) translateZ(-${quarterSide}px)`);
	select('.bottom').style('transform', `rotateX(90deg) translateZ(-${quarterSide}px)`);

	select('.back').style('transform', `translateZ(-${quarterSide}px)`);
	select('.front').style('transform', `rotateX(180deg) translateZ(-${quarterSide}px)`);

	select('.left').style('transform', `rotateY(90deg) translateZ(-${quarterSide}px)`);
	select('.right').style('transform', `rotateY(-90deg) translateZ(-${quarterSide}px)`);
}

function prepareFixedSquares() {
	selectAll('.fixed-square').forEach((fs) => fs.size(side, side));
	select('#fs_2').style('transform', 'rotateY(90deg)');
}