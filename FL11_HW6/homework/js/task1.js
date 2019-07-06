const arr = prompt('Enter numeric values (a1, a2, b1, b2, c1, c2) separated by commas',
    'Type here');
if (arr !== null) {
    let pointsArr = arr.split(',');
    if (pointsArr.length === 6) {
        pointsArr = pointsArr.map(x => parseInt(x, 10));
        const avgPointX = (pointsArr[0] + pointsArr[2]) / 2;
        const avgPointY = (pointsArr[1] + pointsArr[3]) / 2;

        console.log(avgPointX === pointsArr[4] && avgPointY === pointsArr[5]);
    } else {
        console.log('Invalid input data. Please try again.'); 
    }
}