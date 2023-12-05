const { count_by } = require("partial-js");
const { deep_pluck } = require("partial-js");
const { where } = require("partial-js");
const { filter } = require("partial-js");
var _ = require("partial-js");
const L = _.L;

var users = [
  { id: 101, name: "ID" },
  { id: 102, name: "BJ" },
  { id: 103, name: "PJ" },
  { id: 104, name: "HA" },
  { id: 105, name: "JE" },
  { id: 106, name: "JI" },
];

var posts = [
  { id: 201, body: "내용1", user_id: 101 },
  { id: 202, body: "내용2", user_id: 102 },
  { id: 203, body: "내용3", user_id: 103 },
  { id: 204, body: "내용4", user_id: 102 },
  { id: 205, body: "내용5", user_id: 101 },
];

var comments = [
  { id: 301, body: "댓글1", user_id: 105, post_id: 201 },
  { id: 302, body: "댓글2", user_id: 104, post_id: 201 },
  { id: 303, body: "댓글3", user_id: 104, post_id: 202 },
  { id: 304, body: "댓글4", user_id: 105, post_id: 203 },
  { id: 305, body: "댓글5", user_id: 106, post_id: 203 },
  { id: 306, body: "댓글6", user_id: 106, post_id: 204 },
  { id: 307, body: "댓글7", user_id: 102, post_id: 205 },
  { id: 308, body: "댓글8", user_id: 103, post_id: 204 },
  { id: 309, body: "댓글9", user_id: 103, post_id: 202 },
  { id: 310, body: "댓글10", user_id: 105, post_id: 201 },
];

function posts_by(attr) {
  return _.where(posts, attr);
}
var comments_by_posts = _.pipe(_.pluck("id"), function (post_ids) {
  return _.filter(comments, function (comment) {
    return _.contains(post_ids, comment.post_id);
  });
});
//1111
var f1 = _.pipe(posts_by, comments_by_posts);
// console.log(f1({ user_id: 101 }));

//2222
var commnets_to_user_names = _.map(function (comment) {
  return _.find(users, function (user) {
    return user.id == comment.user_id;
  }).name;
});

var f2 = _.pipe(f1, commnets_to_user_names, _.uniq);

// console.log(f2({ user_id: 101 }));

//3333
var f3 = _.pipe(f1, commnets_to_user_names, count_by);
// console.log(f3({ user_id: 101 }));

//44444
function comments_by(attr) {
  return _.where(comments, attr);
}
var f4 = _.pipe(comments_by, _.pluck("post_id"), function (post_ids) {
  return filter(posts, function (post) {
    return _.contains(post_ids, post.id);
  });
});
// console.log(f4({ user_id: 105 }));
//5555

var users2 = _.index_by(users, "id");
function find_user_by_id(user_id) {
  return users2[user_id];
}
var comments2 = _.go(
  comments,
  _.map(function (comment) {
    return _.extend(
      {
        user: find_user_by_id(comment.user_id),
      },
      comment
    );
  }),
  _.groupBy("post_id")
);
var posts2 = _.go(
  posts,
  _.map(function (post) {
    return _.extend(
      {
        comments: comments2[post.id] || [],
        user: find_user_by_id(post.user_id),
      },
      post
    );
  })
);
var posts3 = _.group_by(posts2, "user_id");
// console.log(posts3);

var users3 = _.map(users2, function (user) {
  return _.extend(
    {
      posts: posts3[user.id] || [],
    },
    user
  );
});
// console.log(users3);
//5-1
var user = users3[0];
// _.go(user.posts, _.pluck("comments"), _.flatten, console./log);
//console.log(_.deep_pluck(user, "posts.comments"));
//5-2

// _.go(
//   user.posts,
//   _.pluck("comments"),
//   _.flatten,
//   _.pluck("user"),
//   _.pluck("name"),
//   _.uniq,
//   console.log
// );
function check(a) {
  console.log(a);
  return a;
}
//_.go(user, deep_pluck("posts.comments.user.name"), _.uniq, console.log);

//5-4
console.log(
  _.filter(posts2, function (post) {
    return _.find(post.comments, function (comment) {
      return comment.user_id == 105;
    });
  })
);
