const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(f(a));
  }

  return res;
});

const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);
const filter = curry((f, iter) => {
  let res = [];
  let cur;
  iter = iter[Symbol.iterator]();
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    acc = f(acc, a);
  }
  return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);
const log = console.log;

const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};
const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};
const take = curry((l, iter) => {
  let res = [];
  let cur;
  iter = iter[Symbol.iterator]();
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
});
L.map = curry(function* (f, iter) {
  let cur;
  iter = iter[Symbol.iterator]();
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    yield f(a);
  }
});
L.filter = curry(function* (f, iter) {
  let cur;
  iter = iter[Symbol.iterator]();
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) yield a;
  }
});
