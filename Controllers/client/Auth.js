const localStrategie = require("passport-local").Strategy;
const passport = require("passport");
const Users = require("../../Models/Client");
const bcrypt = require("bcryptjs");

passport.use(
  new localStrategie({ usernameField: "email" }, (email, password, done) => {
    Users.findOne({ email }).then(async (User) => {
      if (!User) return done(null, false, { msg: "Utilisateur n'existe pas" });
      const Verif = await bcrypt.compare(password, User.password);
      if (!Verif)
        return done(null, false, { msg: "Mot de passe est incorrecte" });
      console.log(User + " " + Verif);
      done(null, User);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user.id);
  });
});

module.exports = passport;
