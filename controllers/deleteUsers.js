const fs = require("fs");

function deleteUser(req, res) {
  const userId = parseInt(req.params.id);
  const users = getUsersFromFile();
  const updatedUsers = users.filter((user) => user.id !== userId);
  saveUsersToFile(updatedUsers);

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
  deleteUser,
};
