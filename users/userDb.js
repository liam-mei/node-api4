const db = require("../data/dbConfig.js");

module.exports = {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove
};

function get() {
  return db("users");
}

function getById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getUserPosts(userId) {
  return db("posts as p")
    .join("users as u", "u.id", "p.user_id")
    .select("p.id", "p.text", "u.name as postedBy")
    .where("p.user_id", userId);
}

function insert(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return getById(ids[0]);
    })
    // .catch(err => {
    //   console.log("insert Error:", err)
    //   db("users")
    //     .where({ name: user.name })
    //     .first()
    //     .then(user => console.log("asasdfasdf"))
    //     return {error: "name already exists", err, existingUser: user}
    // });
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("users")
    .where("id", id)
    .del();
}
