const fs = require("fs");

function updateUsers(req, res) {
  const userId = parseInt(req.params.id);
  const userData = {
    name: req.body.name,
    age: parseInt(req.body.age),
    id: userId,
  };

  let jsonData = [];
  try {
    jsonData = fs.readFileSync("./users.json", "utf-8");
    objJson = JSON.parse(jsonData);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error reading users.json.");
  }

  const userIndex = objJson.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    objJson[userIndex] = userData;
    fs.writeFileSync("./users.json", JSON.stringify(objJson), "utf-8");
    res.redirect("/users");
  } else {
    res.status(404).send("User not found.");
  }
}

module.exports = {
  updateUsers,
};
