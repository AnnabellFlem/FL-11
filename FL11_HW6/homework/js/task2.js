const arr = prompt('Enter 3 numbers (a, b, c) for triangle separated by commas',
    'Type here');
if (arr !== null) {
    let sides = arr.split(',');
    if (sides.length === 3) {
        sides = sides.map(x => parseInt(x, 10));
        const isExist = sides[0] + sides[2] > sides[1] &&
            sides[0] + sides[1] > sides[2] &&
            sides[1] + sides[2] > sides[0];
        if (!isExist) {
            console.log('Triangle doesn’t exist');
        } else if (sides[0] === sides[1] &&
            sides[1] === sides[2]) {
            console.log('Eequivalent triangle');
        } else if (sides[0] === sides[1] ||
            sides[1] === sides[2] ||
            sides[2] === sides[0]) {
            console.log('Isosceles triangle');
        } else {
            console.log('Normal triangle');
        }
    } else {
        console.log('Invalid input data. Please try again.');
    }
}