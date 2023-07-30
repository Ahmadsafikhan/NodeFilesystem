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

const { createUser } = require("./controllers/addUsers");
const { updateUsers } = require("./controllers/updateUsers");
const { showUsers } = require("./controllers/showUsers");
const { deleteUser } = require("./controllers/deleteUsers");

// Function to read users from file
function getUsersFromFile() {
  try {
    const data = fs.readFileSync("users.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

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

  res.render("update-user", { user });
});
// Route to handle user creation
app.post("/users", createUser);

// Route to handle user updates
app.put("/users/:id", updateUsers);

// Route to get all users
app.get("/users", showUsers);

app.delete("/users/:id", deleteUser);

app.listen(4001, () => {
  console.log("Server running on 4001");
});
