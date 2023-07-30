const fs = require("fs");

function showUsers(req, res) {
  const users = getUsersFromFile();
  res.render("user-list", { users });
}

function getUsersFromFile() {
  try {
    const data = fs.readFileSync("users.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

module.exports = {
  showUsers,
};
