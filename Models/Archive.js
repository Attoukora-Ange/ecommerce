const mongoose = require("mongoose");
const archiveSchema = mongoose.Schema({
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
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  nombre_produit: {
    type: String,
    required: true,
  },
  prix_total: {
    type: String,
    required: true,
  },
  addresse_reception: {
    type: String,
    required: true,
  },
  date_archive: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("archive", archiveSchema);
