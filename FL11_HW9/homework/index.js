function getNumbers(string) {
  let regex = /\d/g;
  let result = string.match(regex);
  if (result) {
    return result;
  } else {
    return [];
  }
}; 

//console.log(getNumbers('string')); // returns [] 
//console.log(getNumbers('n1um3ber95')); // returns [1,3,9,5] 



function showFormattedDate(date) {
    const day = date.getDate();
    const year = date.getFullYear();
    Date.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   
    return `Date: ${Date.shortMonths[date.getMonth()]} ${day} ${year}`;
   }
   
   console.log(showFormattedDate(new Date('2019-01-27T01:10:00')));

   function canConvertToDate(string) {
    let parseDate = Date.parse(string);
    if (isNaN(parseDate)) {
      return false;
    }  else {
      return true;
    }
    //return false ? isNaN(parseDate) : true
  }
  
  console.log(canConvertToDate('2016-13-18T00:00:00')); // false
  console.log(canConvertToDate('2016-03-18T00:00:00')); // true

  
  function daysBetween(date1, date2) {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
    }
    
    console.log(daysBetween(new Date('2016-03-18T00:00:00'), new Date('2016-04-19T00:00:00')));  // 32
    
