const mongoose = require('mongoose');
const produitSchema = mongoose.Schema({
    photo_produit:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    categorie:{
        type:String,
        required:true
    },
    marque:{
        type:String,
        required:true
    },
    prix:{
        type:Number,
        required:true
    },
    pourcentage_reduction:{
        type:Number,
        required:true
    },
    reduction_prix:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    quantite:{
        type:Number,
        required:true
    },
})

module.exports = mongoose.model('produit', produitSchema);