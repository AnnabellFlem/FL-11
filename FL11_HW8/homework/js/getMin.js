function getMin(...args) {
    let len = args.length;
    let min = Infinity;
    while (len--) {
        if (args[len] < min) {
            min = args[len];
        }
    }
    return min;
}

console.log(getMin(10, 1111, 111));