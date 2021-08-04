const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { readFile, writeFile } = require("fs").promises;

const log = require("../Util/logger");
require("dotenv").config();
const { ACCESS_TOKEN } = process.env;

const port = 3000;
const app = express();
app.use(express.json());

const getUsers = async () => {
  const { users } = JSON.parse(await readFile("./Util/user.json", "utf-8"));
  return users;
};

function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post("/login", async (req, res) => {
  if (!req.body.name || !req.body.password)
    return res
      .status(400)
      .json({ message: "Please provide a name and password" });

  const users = await getUsers();
  const user = users.find((user) => user.name === req.body.name);

  if (!user) return res.status(400).json({ message: "User not found" });

  try {
    if (bcrypt.compare(req.body.password, user.password)) {
      const username = { name: req.body.name };
      const accessToken = jwt.sign(username, ACCESS_TOKEN);
      res
        .status(200)
        .json({ message: "Login successful!", token: accessToken });
    } else {
      res.status(400).json({ message: "Wrong credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
});

app.post("/greetings", authToken, (req, res) => {
  res.status(200).json({ message: `Hello user '${req.user.name}'` });
});

/* for testing with Thunder Client...*/
/* app.post("/register", async (req, res) => {
  try {
    const hasPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = { name: req.body.name, password: hasPassword };
    const users = await getUsers();
    users.push(newUser);

    await writeFile("./Util/user.json", JSON.stringify({ users }));

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
}); */

app.listen(3000, () => {
  log.info(`server listening at http://localhost:${port}`);
});
