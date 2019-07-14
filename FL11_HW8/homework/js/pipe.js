function pipe(number, ...args) {
    let res = number;
    for (let i = 0; i < args.length; i++) {
        res = args[i](res);
    }
    return res;
}

function addOne(x) {
    return x + 1;
}

console.log(pipe(1, addOne));
console.log(pipe(1, addOne, addOne)); 