let container, faces;
const side = 400;
const hSide = side / 2;
const qSide = hSide / 2;

let y = qSide, x = qSide;
let rotate = false;
let angle = 0;

function setup() {
	container = select('.container');
	faces = selectAll('.face');

	prepareContainer();
	prepareFaces();
}

function draw() {
	if (rotate) {
		angle++;
		container.style('transform', rotateString(['x', 'y'], radians(angle)));
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
		face.size(hSide, hSide);
		face.center();
	});

	select('.top').style('transform', `rotateX(-90deg) translateZ(-${qSide}px)`);
	select('.bottom').style('transform', `rotateX(90deg) translateZ(-${qSide}px)`);

	select('.back').style('transform', `translateZ(-${qSide}px)`);
	select('.front').style('transform', `rotateX(180deg) translateZ(-${qSide}px)`);

	select('.left').style('transform', `rotateY(90deg) translateZ(-${qSide}px)`);
	select('.right').style('transform', `rotateY(-90deg) translateZ(-${qSide}px)`);
}