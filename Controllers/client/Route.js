const express = require("express");
const Config = require("./Config");
const multer = require("multer");
const User = require("../../Models/Client");
const localStrategie = require("./Auth");
const Route = express.Router();
const UploadFonction = require("../function").UploadFonction();
// ********************** UPLOAD *************************

const stockage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/client");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname.split(" ").join("_"));
  },
});
const upload = multer({ storage: stockage }).single("image");

// **************************************************

Route.get("/", Config.getIndex);
Route.get("/personnalisation", LoggIn, Config.getPersonnalisation);
Route.get("/mes_commandes", LoggIn, Config.getMes_commandes);
Route.get(
  "/detail_mes_commandes/:id_commande",
  LoggIn,
  Config.getDetail_mes_commandes
);
Route.get("/panierConnect", LoggIn, Config.getPanier);
Route.get("/detail_produit/:id_detail", LoggIn, Config.getDetail_produit);
Route.get("/modifier_profil", LoggIn, Config.getModifier_profil);
Route.get("/panier", Config.getPanier);
Route.get("/connexion", Isguest, Config.getConnexion);
Route.get("/inscription", Config.getInscription);

// ********** POST *********************************

Route.post("/inscription", UploadFonction, Config.postInscription);
Route.post("/modifier_profil", UploadFonction, Config.postModi_profil);
Route.post("/add_panier/:id", Config.postAdd_panier);
Route.post("/add_panier", Config.postAdd_panier_plus);
Route.post("/reduct_panier", Config.postReduct_panier_plus);
Route.post("/panier_envoie", Config.postPanier_envoie);
Route.post("/retirer_panier", Config.postRetirer_panier);
Route.post("/connexion", Config.postConnexion);
Route.delete("/Logout", (req, res) => {
  req.logOut();
  res.redirect("/connexion");
});
// function Logout(req, res) {
//   req.logOut();
//   res.redirect("/connexion");
// }

function Isguest(req, res, next) {
  if (req.user) return res.redirect("/personnalisation");
  else next();
}

function LoggIn(req, res, next) {
  if (req.user) return next();
  else res.redirect("/connexion");
}

module.exports = Route;
