const mongoose = require("mongoose");
const commandeSchema = mongoose.Schema({
  id_client: {
    type: String,
    required: true,
  },
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
  addresse_reception: {
    type: String,
    required: true,
  },
  photo_produit: {
    type: Array,
    required: true,
  },
  designation: {
    type: Array,
    required: true,
  },
  categorie: {
    type: Array,
    required: true,
  },
  marque: {
    type: Array,
    required: true,
  },
  prix: {
    type: Array,
    required: true,
  },
  pourcentage_reduction: {
    type: Array,
    required: true,
  },
  reduction_prix: {
    type: Array,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  quantite: {
    type: Array,
    required: true,
  },
  prix_total: {
    type: String,
    required: true,
  },
  nombre_produit: {
    type: String,
    required: true,
  },
  date_commande: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("gestion", commandeSchema);
