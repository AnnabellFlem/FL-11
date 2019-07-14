function reverseNumber(number) {
  let strNum = '';
  let newStrNum = '';
  let numMinus = false;

  if (number < 0) {
    strNum = number * -1 + '';
    numMinus = true;
  } else {
    strNum = number + '';
  }

  for (let i = strNum.length - 1; i >= 0; i--) {
    newStrNum += strNum[i];
  }
  return numMinus ? (+newStrNum) * -1 : (+newStrNum);
}

console.log(reverseNumber(-45623));