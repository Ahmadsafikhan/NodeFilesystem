const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());

// Route to get all users
app.get("/users", (req, res) => {
  const users = getUsersFromFile();
  res.json(users);
});

app.post("/users", (req, res) => {
  const { name, age, id } = req.body;

  //   if (!name || !age || !id) {
  //     return res.status(400).send("Please provide name, age, and ID for the user.");
  //   }

  const users = getUsersFromFile();
  const newUser = { name, age, id };
  users.push(newUser);
  saveUsersToFile(users);

  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userData = {
    name: req.query.name,
    age: parseInt(req.query.age),
    id: userId,
  };

  const jsonData = [];
  try {
    jsonData = fs.readFileSync("./users.json", "utf-8");
    objJson = JSON.parse(jsonData);
  } catch (err) {
    return res.status(500).send("Error reading users.json.");
  }

  const userIndex = objJson.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    objJson[userIndex] = userData;
    fs.writeFileSync("./users.json", JSON.stringify(objJson), "utf-8");
    res.send("User data updated successfully!");
  } else {
    res.status(404).send("User not found.");
  }
});

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

app.listen(4001, () => {
  console.log("Server running on 4001");
});
