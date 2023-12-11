var _ = require("partial-js");
const L = _.L;
var products = [
  {
    is_selected: true, // <--- 장바구니에서 체크 박스 선택
    name: "반팔티",
    price: 10000, // <--- 기본 가격
    sizes: [
      // <---- 장바구니에 담은 동일 상품의 사이즈 별 수량과 가격
      { name: "L", quantity: 0, price: 0 },
      { name: "XL", quantity: 0, price: 0 },
      { name: "2XL", quantity: 0, price: 2000 }, // <-- 옵션의 추가 가격
    ],
  },
  {
    is_selected: false,
    name: "후드티",
    price: 21000,
    sizes: [
      { name: "L", quantity: 0, price: -1000 },
      { name: "2XL", quantity: 1, price: 3000 },
    ],
  },
  {
    is_selected: false,
    name: "맨투맨",
    price: 16000,
    sizes: [{ name: "L", quantity: 0, price: 0 }],
  },
];

//first
var total_quantity = _.reduce(function (tq, product) {
  return _.reduce(
    product.sizes,
    function (tq, size) {
      return tq + size.quantity;
    },
    tq
  );
}, 0);
_.go(products, total_quantity, console.log);

//second
function _curryr(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (b) {
          return fn(b, a);
        };
  };
}
var _get = _curryr(function (obj, key) {
  return obj == null ? undefined : obj[key];
});
_.go(products, _.filter(_get("is_selected")), total_quantity, console.log);

//third
var total_price = _.reduce(function (tp, product) {
  return _.reduce(
    product.sizes,
    function (tp, size) {
      return tp + (product.price + size.price) * size.quantity;
    },
    tp
  );
}, 0);
_.go(products, total_price, console.log);

//last

_.go(products, _.filter(_get("is_selected")), total_price, console.log);
