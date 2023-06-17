const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt"); // hashing passwords
// const { use } = require("passport");

function initialize(passport, getUserByEmail, getUserById) {
  //function to auth users
  const authenticateUsers = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user === null) {
      return done(null, false, { message: "No user found with that email" });
    } else {
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        ///if auth went well
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(
    new LocalStrategy({ usernameField: "email" }, authenticateUsers)
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialize;
