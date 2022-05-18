const mongoose = require("mongoose");

mongoose.connect(process.env.DATA_BASE, { useNewUrlParser: true }, (err) => {
  if (err) return console.log("Connexion à la base à echoué");
  else console.log("Connexion à la base de donnée à reussie");
});

module.exports = mongoose;
