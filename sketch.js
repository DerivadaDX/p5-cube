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
		case UP_ARROW:
			y += 10;
			select('.top').style('transform', `rotateX(-90deg) translateZ(${-y}px)`);
			select('.bottom').style('transform', `rotateX(90deg) translateZ(${-y}px)`);
			break;
		case DOWN_ARROW:
			y -= 10;
			select('.top').style('transform', `rotateX(-90deg) translateZ(${-y}px)`);
			select('.bottom').style('transform', `rotateX(90deg) translateZ(${-y}px)`);
			break;
		case RIGHT_ARROW:
			x += 10;
			select('.left').style('transform', `rotateY(90deg) translateZ(${-x}px)`);
			select('.right').style('transform', `rotateY(-90deg) translateZ(${-x}px)`);
			break;
		case LEFT_ARROW:
			x -= 10;
			select('.left').style('transform', `rotateY(90deg) translateZ(${-x}px)`);
			select('.right').style('transform', `rotateY(-90deg) translateZ(${-x}px)`);
			break;
		case ESCAPE:
			container.style('transform', rotateString(['x', 'y'], radians(0)));
			rotate = false;
			return false;
		case 32:
			rotate = !rotate;
			return false;
		default:
			break;
	}
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