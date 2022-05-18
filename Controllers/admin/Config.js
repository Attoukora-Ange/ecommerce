// const passport = require("passport");
const Users = require("../../Models/Client");
const Produit = require("../../Models/Produits");
const Archive = require("../../Models/Archive");
const Gestion = require("../../Models/Gestion");
const bcrypt = require("bcryptjs");
module.exports.getAdmin_archive = async (req, res) => {
  const id = req.user;
  const clientConnect = await Users.findById({ _id: id });
  const mon_Archive = await Archive.find();
  res.render("page_ad_produit/archiv_commande", {
    titre: "Archive",
    mon_Archive,
    clientConnect,
    user: req.user,
  });
};
module.exports.getAdmin_commande_client = async (req, res) => {
  const Commandes = await Gestion.find();
  const id = req.user;
  const clientConnect = await Users.findById({ _id: id });
  res.render("page_ad_produit/comm_client", {
    titre: "Commande client",
    Commandes,
    clientConnect,
    user: req.user,
  });
};
module.exports.getAd_detail_client = async (req, res) => {
  const id_cmd_client = req.params.id_cmd_client;
  const Commande_client = await Gestion.find({ _id: id_cmd_client });
  const id = req.user;
  const clientConnect = await Users.findById({ _id: id });
  res.render("page_ad_produit/comm_detail_client", {
    titre: "Commande client",
    Commande_client,
    clientConnect,
    user: req.user,
  });
};
module.exports.getAdmin_commande_detail = async (req, res) => {
  const id = req.user;
  const clientConnect = await Users.findById({ _id: id });
  res.render("page_ad_produit/comm_detail_client", {
    titre: "Commande detail",
    clientConnect,
    user: req.user,
  });
};
module.exports.getCreer_produit = async (req, res) => {
  const id = req.user;
  const clientConnect = await Users.findById({ _id: id });
  res.render("page_ad_produit/cre_produit", {
    titre: "Créer produit",
    clientConnect,
    user: req.user,
  });
};

module.exports.getGerer_client = async (req, res) => {
  const id = req.user;
  const clientConnect = await Users.findById({ _id: id });
  const toutClient = await Users.find().sort({ nom: 1 });
  res.render("page_ad_produit/ger_client", {
    titre: "Gerer client",
    clientConnect,
    user: req.user,
    toutClient,
  });
};

module.exports.postGerer_client = async (req, res) => {
  const id_sup = req.params.id_sup;
  await Users.findByIdAndDelete({ _id: id_sup });
  res.redirect("/admin/admin_gerer_client");
};
module.exports.postValider_commande = async (req, res) => {
  const id_comm_client = req.params.id_comm_client;
  const mon_Archive = await Gestion.findById(id_comm_client);
  const newArchive = new Archive({
    photo_client: mon_Archive.photo_client,
    nom: mon_Archive.nom,
    prenom: mon_Archive.prenom,
    email: mon_Archive.email,
    contact: mon_Archive.contact,
    nombre_produit: mon_Archive.nombre_produit,
    prix_total: mon_Archive.prix_total,
    addresse_reception: mon_Archive.addresse_reception,
  });
  newArchive.save();
  await Gestion.findByIdAndDelete({ _id: id_comm_client });

  res.redirect("/admin/admin_commande_client");
};
module.exports.postCreer_produit = (req, res) => {
  if (typeof req.file == "undefined") {
    return res.redirect("/admin/admin_creer_produit");
  }
  for (const my_body in req.body) {
    if (Object.hasOwnProperty.call(req.body, my_body)) {
      const body_valeur = req.body[my_body];
      if (body_valeur == "") {
        console.log("Une chaine est vide");
        return res.redirect("/admin/admin_creer_produit");
      }
    }
  }

  let {
    photo_produit,
    designation,
    categorie,
    marque,
    prix,
    pourcentage_reduction,
    reduction_prix,
    description,
    quantite,
  } = req.body;
  photo_produit = req.file.filename;

  reduction_prix =
    Number(prix) -
    parseInt(Number(prix) * (Number(pourcentage_reduction) / 100));
  const newProduit = new Produit({
    photo_produit,
    designation,
    categorie,
    marque,
    prix,
    pourcentage_reduction,
    reduction_prix,
    description,
    quantite,
  });
  newProduit.save((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
};
