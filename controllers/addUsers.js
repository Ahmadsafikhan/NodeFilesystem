const fs = require("fs");

function createUser(req, res) {
  const { name, age, id } = req.body;
  const users = getUsersFromFile();
  const newUser = { name, age: parseInt(age), id: parseInt(id) };
  users.push(newUser);
  saveUsersToFile(users);

  res.redirect("/users");
}

function getUsersFromFile() {
  try {
    const data = fs.readFileSync("users.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveUsersToFile(users) {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
}

module.exports = {
  createUser,
};
