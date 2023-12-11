function square1(a) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(a * a);
    }, 500);
  });
}
function square2(a) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(a * a);
    }, 300);
  });
}
function square3(a) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(a * a);
    }, 100);
  });
}
async function test() {
  for (let i = 0; i < 3; i++) {
    if (i == 0) {
      console.log(await square1(i));
    }
    if (i == 1) {
      console.log(await square2(i));
    }
    if (i == 2) {
      console.log(await square3(i));
    }
  }
  console.log("------------------");
  for (let i = 0; i < 3; i++) {
    if (i == 0) {
      square1(i).then((res) => console.log(res, i));
    }
    if (i == 1) {
      square2(i).then((res) => console.log(res, i));
    }
    if (i == 2) {
      square3(i).then((res) => console.log(res, i));
    }
  }
}
test();
