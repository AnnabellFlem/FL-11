function isInteger(value) {
    return (value ^ 0) === value;
}

console.log(isInteger(10));