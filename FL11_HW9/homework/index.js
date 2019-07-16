function getNumbers(string) {
  const regex = /\d/g;
  let result = string.match(regex) || [];

  for (let i = 0; i < result.length; i++) {
    result[i] = +result[i];
  }

  return result;
}

function findTypes(...args) {
  const types = [];

  for (let i = 0; i < args.length; i++) {
    let type = typeof args[i];
    types[type] = (types[type] || 0) + 1;
  }
  return types;
}


function executeforEach(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = func(arr[i]);
  }
}

function mapArray(arr, func) {
  executeforEach(arr, func);
  return arr;
}

function filterArray(arr, func) {
  const src = [...arr];
  const result = [];
  executeforEach(arr, func);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      result.push(src[i]);
    }
  }
  return result;
}

function showFormattedDate(date) {
  const day = date.getDate();
  const year = date.getFullYear();
  Date.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `Date: ${Date.shortMonths[date.getMonth()]} ${day} ${year}`;
}

function canConvertToDate(string) {
  const parseDate = Date.parse(string);
  return !isNaN(parseDate);
}

function daysBetween(date1, date2) {
  const diffTime = Math.abs(Date.parse(date2) - Date.parse(date1));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function getAmountOfAdultPeople(data) {
  const now = new Date();
  const age = 18;
  const leapdays = age / 4;

  const a = filterArray(data, function (el) {
    return daysBetween(now, el.birthday) > 365 * age + leapdays;
  });

  return a.length;
}

function keys(obj) {
  const result = [];
  for (let o in obj) {
    if (obj.hasOwnProperty(o)) {
      result.push(o);
    }
  }
  return result;
}

function values(obj) {
  const result = [];
  for (let o in obj) {
    if (obj.hasOwnProperty(o)) {
      result.push(obj[o]);
    }
  }
  return result;
}
