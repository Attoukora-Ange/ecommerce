const passport = require("passport");
const Users = require("../../Models/Client");
const bcrypt = require("bcryptjs");
const Commande = require("../../Models/Commandes");
const Produit = require("../../Models/Produits");
const Gestion = require("../../Models/Gestion");
const Cart = require("../function").FunctionPanier;

module.exports.getIndex = async (req, res) => {
  if (req.user) {
    return res.redirect("/personnalisation");
  }
  const mon_panier = Cart.getCart();
  const all_produit = await Produit.find();
  if (mon_panier) {
    const panier = mon_panier.produits;
    const prix_total = mon_panier.prix_total;
    let nombreT = null;
    panier.forEach((nombre) => {
      nombreT += nombre.quantite;
    });
    return res.render("index", {
      titre: "Acceuil",
      nombreT,
      panier,
      prix_total,
      all_produit,
      user: req.user,
    });
  }
  res.render("index", { titre: "Acceuil", all_produit, user: req.user });
};

module.exports.getDetail_produit = async (req, res) => {
  const id = req.user;
  const id_detail = req.params.id_detail;
  const clientConnect = await Users.findById({ _id: id });
  const detailProduit = await Produit.findOne({ _id: id_detail });

  const mon_panier = Cart.getCart();
  if (mon_panier) {
    const panier = mon_panier.produits;
    const prix_total = mon_panier.prix_total;
    let nombreT = null;
    panier.forEach((nombre) => {
      nombreT += nombre.quantite;
    });
    return res.render("page_base/detail_produit", {
      titre: "Acceuil",
      nombreT,
      panier,
      prix_total,
      clientConnect,
      detailProduit,
      user: req.user,
    });
  }
  res.render("page_base/detail_produit", {
    titre: "Acceuil",
    clientConnect,
    detailProduit,
    user: req.user,
  });
};

module.exports.getPersonnalisation = async (req, res) => {
  const id = req.user;
  const clientConnect = await Users.findById({ _id: id });
  const all_produit = await Produit.find();

  const mon_panier = Cart.getCart();
  if (mon_panier) {
    const panier = mon_panier.produits;
    const prix_total = mon_panier.prix_total;
    let nombreT = null;
    panier.forEach((nombre) => {
      nombreT += nombre.quantite;
    });
    return res.render("personnalisation", {
      titre: "Personnalisation",
      all_produit,
      nombreT,
      panier,
      prix_total,
      clientConnect,
      user: req.user,
    });
  }
  res.render("personnalisation", {
    titre: "Personnalisation",
    all_produit,
    clientConnect,
    user: req.user,
  });
};

module.exports.getMes_commandes = async (req, res) => {
  const id = req.user;
  const clientConnect = await Users.findById({ _id: id });
  const Mes_commandes = await Commande.find({ id_client: id });
  const mon_panier = Cart.getCart();

  if (mon_panier) {
    const panier = mon_panier.produits;
    const prix_total = mon_panier.prix_total;
    let nombreT = null;
    panier.forEach((nombre) => {
      nombreT += nombre.quantite;
    });
    return res.render("page_client/commande", {
      titre: "Mon historique",
      Mes_commandes,
      nombreT,
      panier,
      prix_total,
      clientConnect,
      user: req.user,
    });
  }
  res.render("page_client/commande", {
    titre: "Mon historique",
    Mes_commandes,
    clientConnect,
    user: req.user,
  });
};
module.exports.getDetail_mes_commandes = async (req, res) => {
  const id = req.user;
  const id_commande = req.params.id_commande;
  const clientConnect = await Users.findById({ _id: id });
  const Mes_commandes = await Commande.find({ _id: id_commande });
  const mon_panier = Cart.getCart();

  if (mon_panier) {
    const panier = mon_panier.produits;
    const prix_total = mon_panier.prix_total;
    let nombreT = null;
    panier.forEach((nombre) => {
      nombreT += nombre.quantite;
    });
    return res.render("page_client/detail", {
      titre: "Détail historique",
      Mes_commandes,
      nombreT,
      panier,
      prix_total,
      clientConnect,
      user: req.user,
    });
  }
  res.render("page_client/detail", {
    titre: "Détail historique",
    Mes_commandes,
    clientConnect,
    user: req.user,
  });
};

module.exports.getModifier_profil = async (req, res) => {
  const id = req.user;
  const clientConnect = await Users.findById({ _id: id });

  res.render("page_base/mod_profil", {
    titre: "modifier_profil",
    clientConnect,
    user: req.user,
  });
};
module.exports.getConnexion = (req, res) => {
  res.render("page_base/connexion", { titre: "Connexion", user: req.user });
};
module.exports.getInscription = (req, res) => {
  res.render("page_base/inscription", { titre: "Inscription", user: req.user });
};
module.exports.getPanier = async (req, res) => {
  const mon_panier = Cart.getCart();

  if (req.user) {
    if (mon_panier) {
      const panier = mon_panier.produits;
      const prix_total = mon_panier.prix_total;
      let nombreT = null;
      panier.forEach((nombre) => {
        nombreT += nombre.quantite;
      });
      const id = req.user;
      const clientConnect = await Users.findById({ _id: id });
      return res.render("page_base/panier", {
        titre: "Panier",
        nombreT,
        panier,
        prix_total,
        clientConnect,
        user: req.user,
      });
    } else {
      const id = req.user;
      const clientConnect = await Users.findById({ _id: id });
      return res.render("page_base/panier", {
        titre: "Panier",
        clientConnect,
        user: req.user,
      });
    }
  }

  if (mon_panier) {
    if (req.use) {
      const panier = mon_panier.produits;
      const prix_total = mon_panier.prix_total;
      let nombreT = null;
      panier.forEach((nombre) => {
        nombreT += nombre.quantite;
      });
      return res.render("page_base/panier", {
        titre: "Panier",
        nombreT,
        panier,
        prix_total,
        clientConnect,
        detailProduit,
        user: req.user,
      });
    }
    return res.render("page_base/panier", { titre: "Panier", user: req.user });
  }
  res.render("page_base/panier", { titre: "Panier", user: req.user });
};

module.exports.getAllproduit = async (req, res) => {
  if (req.user) {
    const id = req.user;
    const clientConnect = await Users.findById({ _id: id });
    console.log(clientConnect);
    return res.render("all_produit", {
      titre: "All_produit",
      clientConnect,
      user: req.user,
    });
  }
  const all_produit = await Produit.find();
  res.render("all_produit", {
    titre: "All_produit",
    user: req.user,
    all_produit,
  });
};

module.exports.postAdd_panier = async (req, res) => {
  const id = req.params.id;
  const Add_panier = await Produit.findById({ _id: id });
  Cart.save(Add_panier);
  res.redirect("/panier");
};
module.exports.postAdd_panier_plus = async (req, res) => {
  const id = req.body.plus;
  const Add_panier = await Produit.findById(id);
  Cart.save(Add_panier);
  res.redirect("/panier");
};
module.exports.postReduct_panier_plus = async (req, res) => {
  const id = req.body.plus;
  const Reduct_panier = await Produit.findById(id);
  Cart.saveReduct(Reduct_panier)
  const qte = Cart.getCart();
  const ma_qte = qte.produits.length;
  for (let i = 0; i < ma_qte; i++) {
    if (qte.produits[i].quantite <= 0) {
      Cart.retirerPanier(Reduct_panier);
    } 
  }
  
  res.redirect("/panier");
};
module.exports.postRetirer_panier = async (req, res) => {
  const id_retirer = req.body.id_sup;
  const produit = await Produit.findById({ _id: id_retirer });
 
 Cart.retirerPanier(produit)
  res.redirect("/panier");
};
module.exports.postPanier_envoie = async (req, res) => {
  const addresse_reception = req.body.addresse_reception;
  if (addresse_reception == "") return res.redirect("/panier");

  let mon_panier = Cart.getCart();
  if (mon_panier.produits.lenght <= 0) return res.redirect("/panier");
  if (mon_panier) {
    let panier = mon_panier.produits;
    const prix_total = mon_panier.prix_total;
    let nombreT = null;
    panier.forEach((nombre) => {
      nombreT += nombre.quantite;
    });

    let photo_produit = [];
    let designation = [];
    let categorie = [];
    let marque = [];
    let prix = [];
    let pourcentage_reduction = [];
    let reduction_prix = [];
    let montant = [];
    let description = [];
    let quantite = [];

    panier.forEach((element) => {
      photo_produit.push(element.photo_produit);
      designation.push(element.designation);
      categorie.push(element.categorie);
      marque.push(element.marque);
      prix.push(element.prix);
      pourcentage_reduction.push(element.pourcentage_reduction);
      reduction_prix.push(element.reduction_prix);
      montant.push(element.montant);
      description.push(element.description);
      quantite.push(element.quantite);
    });

    const clientInfo = await Users.findById(req.user);
    const ma_Gestion = new Gestion({
      id_client: req.user,
      photo_client: clientInfo.photo_client,
      nom: clientInfo.nom,
      prenom: clientInfo.prenom,
      date_naissance: clientInfo.date_naissance,
      email: clientInfo.email,
      contact: clientInfo.contact,
      ville_actuelle: clientInfo.ville_actuelle,
      commune_actuelle: clientInfo.commune_actuelle,
      addresse_reception,
      photo_produit,
      designation,
      categorie,
      marque,
      prix,
      pourcentage_reduction,
      reduction_prix,
      montant,
      description,
      quantite,
      prix_total: prix_total,
      nombre_produit: nombreT,
    });

    const commande = new Commande({
      id_client: req.user,
      photo_client: clientInfo.photo_client,
      nom: clientInfo.nom,
      prenom: clientInfo.prenom,
      date_naissance: clientInfo.date_naissance,
      email: clientInfo.email,
      contact: clientInfo.contact,
      ville_actuelle: clientInfo.ville_actuelle,
      commune_actuelle: clientInfo.commune_actuelle,
      addresse_reception,
      photo_produit,
      designation,
      categorie,
      marque,
      prix,
      pourcentage_reduction,
      reduction_prix,
      montant,
      description,
      quantite,
      prix_total: prix_total,
      nombre_produit: nombreT,
    });

    commande.save();
    console.log("Commande ajouté à la base de donnée commande");
    panier.produit = [];
    mon_panier.produits = [];
    mon_panier.prix_total = 0;

    ma_Gestion.save();
    // res.send("Commande envoyée");
    setTimeout(() =>{res.redirect('/mes_commandes')}, 500)
  }
};

module.exports.postConnexion = passport.authenticate("local", {
  successRedirect: "/personnalisation",
  failureRedirect: "/connexion",
  failureFlash: true,
});

module.exports.postModi_profil = async (req, res) => {
  const id_mod = req.user;
  let {
    nom,
    prenom,
    date_naissance,
    email,
    contact,
    ville_actuelle,
    commune_actuelle,
    password,
  } = req.body;

  if (typeof req.file == "undefined") {
    return res.redirect("/modifier_profil");
  }
  for (const my_body in req.body) {
    if (Object.hasOwnProperty.call(req.body, my_body)) {
      const body_valeur = req.body[my_body];
      if (body_valeur == "") {
        console.log("Une chaine est vide");
        return res.redirect("/modifier_profil");
      }
    }
  }
  let image = req.file.filename;
  photo_client = image;
  const hashPassword = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, hashPassword);

  await Users.findByIdAndUpdate(
    { _id: id_mod },
    {
      photo_client,
      nom,
      prenom,
      date_naissance,
      email,
      contact,
      ville_actuelle,
      commune_actuelle,
      password,
    }
  );
  res.redirect("/personnalisation");
};
module.exports.postInscription = async (req, res) => {
  let {
    nom,
    prenom,
    date_naissance,
    email,
    contact,
    ville_actuelle,
    commune_actuelle,
    password,
    conf_password,
  } = req.body;

  const error_msg = [];

  if (typeof req.file == "undefined"){
    const msg = 'Veuillez entrer une photo';
    error_msg.push(msg);
    console.log(error_msg)
    req.flash(error_msg);
    return res.redirect("/inscription");
  } 
  
  for (const my_body in req.body) {
    if (Object.hasOwnProperty.call(req.body, my_body)) {
      const body_valeur = req.body[my_body];
      if (body_valeur == "") {
        const msg = 'Veuillez renseigner le champs ' + my_body;
        error_msg.push(msg);
        console.log(error_msg)
        req.flash(error_msg);
        return res.redirect("/inscription");
      }
             
    }
  }

  if (password != conf_password) {
    const msg = 'Confirmation de mot de passe incorrect';
    error_msg.push(msg);
    console.log(error_msg)
    req.flash(error_msg);
    return res.redirect("/inscription")
  }
  

  

  await Users.findOne({ email }).then(async (emailExiste) => {
    if (emailExiste) {
      console.log("Email existe deja veuillez changer de email");
      return res.redirect("/inscription");
    }

    let image = req.file.filename;
    photo_client = image;
    const hashPassword = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, hashPassword);

    const newUser = new Users({
      photo_client,
      nom,
      prenom,
      date_naissance,
      email,
      contact,
      ville_actuelle,
      commune_actuelle,
      password,
    });
    newUser.save((err) => {
      if (err) console.log(err);
      console.log("Client créé avec success");
      res.redirect("/connexion");
    });
  });
};
