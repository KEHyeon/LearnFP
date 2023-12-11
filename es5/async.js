var _ = require("partial-js");
const L = _.L;
function square(a) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(a * a);
    }, 500);
  });
}

function square2(a, i) {
  console.log(i);
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(a * a);
    }, 500);
  });
}
// _.go(square(10), square, square, console.log);

var list = [2, 3, 4];
new Promise(function (resolve) {
  (function recur(res) {
    if (list.length == res.length) return resolve(res);
    square(list[res.length]).then(function (val) {
      res.push(val);
      recur(res);
    });
  })([]);
});

_.go(list, _.map(square), _.map(square), _.map(square));

for (let i = 0; i < 3; i++) {
  square2(list[i], i).then(() => {
    console.log(i);
  });
}
