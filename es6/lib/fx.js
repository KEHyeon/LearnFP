const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

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
L.map = curry(function* (f, iter) {
  for (const a of iter) yield f(a);
});

const takeAll = take(Infinity);
const map = curry(pipe(L.map, take(Infinity)));

L.filter = curry(function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
});

const filter = curry(pipe(L.filter, takeAll));
