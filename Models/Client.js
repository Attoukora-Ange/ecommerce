const mongoose = require("mongoose");
const clientSchema = mongoose.Schema({
  photo_client: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  date_naissance: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  ville_actuelle: {
    type: String,
    required: true,
  },
  commune_actuelle: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date_inscription: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("client", clientSchema);
