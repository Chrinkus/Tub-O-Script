// Date object exercises

// no args - current date and local time
var currentLocal = new Date();
//> Wed Jul 22 2015 13:47:57 GMT-0500 (CDT)

// single numeric arg - number of milliseconds after unixtime
// adjusted for local time-zone
var singleNum = new Date(1000);
//> Wed Dec 31 1969 18:00:01 GMT-0600 (CST)

// two numeric args - year, month
var twoNum = new Date(1979, 1);
//> Thu Feb 01 1979 00:00:00 GMT-0600 (CST)

// three+ args - finer time - year, month, day, hour, minutes, seconds, milliseconds
var threePlus = new Date(1979, 1, 27, 2, 31);
//> Tue Feb 27 1979 02:31:00 GMT-0600 (CST)

// getTime() method returns number of milliseconds since Jan 01 1970
var currentMilli = new Date().getTime();
// the Date.now() also returns a millisecond quantity for current time
var altCurrentMilli = Date.now();
// (both)> 1437591668181
var birthMilli = new Date(1979, 1, 27).getTime();
//> 288943200000

// passing a string
// RFC 2822
//console.log(new Date('Sep 13 2013'));
//console.log(new Date('September 13 2013'));
//console.log(new Date('2013 Sep 13'));
//console.log(new Date('13 Sep 2013'));
//console.log(new Date('13 2013 September'));
//console.log(new Date('2013 9 13')); // ('2013 13 9') returns Invalid
//(all)> Fri Sep 13 2013 00:00:00 GMT-0500 (CDT)

// ISO8601
// calculates date in UTC(GMT) then converts to local
console.log(new Date('2013-09-13'));
//> Thu Sep 12 2013 19:00:00 GMT-0500 (CDT)
console.log(new Date('2013-09-13GMT-05:00')); // w/w/o ws before GMT
//> Fri Sep 13 2013 00:00:00 GMT-0500 (CDT)

// EJS - date from a string
function findDate(string) {
    var dateTime = /(\d{1,2})-(\d{1,2})-(\d{4})/;
    var match = dateTime.exec(string);
    return new Date(Number(match[3]),
                    Number(match[2]),
                    Number(match[1]));
}
console.log(findDate("30-1-2003"));
//> Sun Mar 02 2003 00:00:00 GMT+0100 (CET)
