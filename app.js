if (process.env.NODE_ENV !== "production") {
  //if we're not yet deploying
  require("dotenv").config();
}

//listening
const express = require("express");
const app = express();
const port = 3e3;
const bcrypt = require("bcrypt"); // hashing passwords
const initializePassport = require("./passport-config");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const users = [];

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

//posting from register form
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, //dont resave session when nothing has changed
    saveUninitialized: false, //save nothing else if nothing has changes already
  })
);

app.use(passport.initialize());
app.use(passport.session());

//configuring the login post functionality
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

//configuring the register post functionality
app.post("/register", async (req, res) => {
  try {
    const hashed_password = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashed_password,
    });

    console.log(users);
    res.redirect("/login");
  } catch (error) {
    console.log("error");
    res.redirect("/register");
  }
});

// app.use(express.static('public'))

app.listen(port, listenPort());

function listenPort() {
  console.info(`listening on port ${port}`);
}

//retrieving dirs
let dirs = ["", "css ", "js"];
dirs.forEach((element) => {
  app.use(`${element}`, express.static(__dirname + `public/${element}`));
});

// app.get('',(req,res)=>{res.sendFile(__dirname +'/views/index.html')})

//routes
app.set("views", "./views");
app.set("view engine", "ejs");

let views = ["index", "login", "register"];

views.forEach((element) => {
  app.get(`/${element}`, (req, res) => {
    res.render(element);
  });
});

// app.get(`/register`, (req, res) => {
//   res.render('register', { messages: messages });
// });
