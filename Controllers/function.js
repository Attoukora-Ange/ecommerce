const multer = require("multer");
module.exports.UploadFonction = () => {
  // ********************** UPLOAD *************************

  const stockage = multer.diskStorage({});
  // const stockage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, "public/images/client");
  //   },
  //   filename: (req, file, cb) => {
  //     cb(null, Date.now() + "_" + file.originalname.split(" ").join("_"));
  //   },
  // });

  return multer({ storage: stockage }).single("image");
};

// ********************** UPLOAD *************************
module.exports.UploadFonctionProduit = () => {

  const stockage = multer.diskStorage({});
//   const stockages = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "public/images/produits");
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + "_" + file.originalname.split(" ").join("_"));
//     },
//   });

  return multer({ storage: stockage }).single("image");
};
// **************************************************

let cart = null;

module.exports.FunctionPanier = class Cart {
  static save(produit) {
    if (cart) {
      const existingIndex = cart.produits.findIndex((p) => p.id == produit.id);
      if (existingIndex >= 0) {
        const existProduit = cart.produits[existingIndex];
        existProduit.quantite += 1;
        cart.prix_total += produit.reduction_prix;
      } else {
        produit.quantite = 1;
        cart.produits.push(produit);
        cart.prix_total += produit.reduction_prix;
      }
    } else {
      cart = { produits: [], prix_total: 0 };
      produit.quantite = 1;
      cart.produits.push(produit);
      cart.prix_total = produit.reduction_prix;
    }
  }
// *********************************************
static saveReduct(produit) {
  if (cart) {
    const existingIndex = cart.produits.findIndex((p) => p.id == produit.id);
    if (existingIndex >= 0) {
      const existProduit = cart.produits[existingIndex];
      existProduit.quantite -= 1;
      cart.prix_total -= produit.reduction_prix;
    } 
  } 
}


// ************************************************
  static getCart() {
    return cart;
  }

  static retirerPanier(produitId){
    const isExisting = cart.produits.findIndex(p => p.id == produitId.id);
    if (isExisting >= 0) {
      const deleteProduit = cart.produits[isExisting];
      cart.prix_total -= deleteProduit.reduction_prix * deleteProduit.quantite;
      cart.produits.splice(isExisting, 1)
    }
  }

};
