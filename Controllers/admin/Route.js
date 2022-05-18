const express = require("express");
const Config = require("./Config");
const Route = express.Router();
const UploadFonction = require("../function").UploadFonctionProduit();

Route.get("/admin_archive", LoggIn, Config.getAdmin_archive);
Route.get("/admin_commande_client", LoggIn, Config.getAdmin_commande_client);
Route.get(
  "/comm_ad_detail_client/:id_cmd_client",
  LoggIn,
  Config.getAd_detail_client
);
Route.get("/admin_creer_produit", LoggIn, Config.getCreer_produit);
Route.get("/admin_gerer_client", LoggIn, Config.getGerer_client);

Route.post("/admin_creer_produit", UploadFonction, Config.postCreer_produit);
Route.delete("/valider_commande/:id_comm_client", Config.postValider_commande);
Route.delete("/supprimer/:id_sup", Config.postGerer_client);

module.exports = Route;

function LoggIn(req, res, next) {
  if (req.user) return next();
  else res.redirect("/connexion");
}
