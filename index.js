const fs = require("fs");
const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Route to get the create form
app.get("/users/create", (req, res) => {
  res.render("create-user");
});

// Route to get the update form
app.get("/users/:id/update", (req, res) => {
  const userId = parseInt(req.params.id);
  const users = getUsersFromFile();
  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).send("User not found.");
  }
console.log(user)
  res.render("update-user", { user });
});



// Route to handle user creation
app.post("/users", (req, res) => {
  const { name, age, id } = req.body;
  const users = getUsersFromFile();
  const newUser = { name, age: parseInt(age), id: parseInt(id) };
  users.push(newUser);
  saveUsersToFile(users);

  res.redirect("/users");
});




// Route to handle user updates
app.put("/users/:id", (req, res) => {
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

// Route to get all users
app.get("/users", (req, res) => {
  const users = getUsersFromFile();
  res.render("user-list", { users });
});

app.listen(4001, () => {
  console.log("Server running on 4001");
});
