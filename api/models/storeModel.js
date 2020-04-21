const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name: {
        type: String,
        require : 'Por favor ingresa nombre'
    },
    email: {
        type: String,
        require : 'Por favor ingresa email'
    },
    shop_owner: {
        type: String,
        require : 'Por favor ingresa el nombre del propietario'
    },

    telephone:{
        type: String,
        require : 'Por favor ingresa el nombre del telefono'
    },

    shopify_shop_id: {
        type: Number,
        required: 'Por favor ingresa el nombre del id de la tienda de Shopify'
    },

    myshopify_domain:{
        type: String,
        required: 'Por favor ingresa el nombre del dominio'
    },

    status:{
        type: String,
        enum: ['en_espera', 'en_revision'],
        default: 'en_espera'
    },

    variants:[{
        type: Schema.Types.ObjectId,
        ref:'Variants'
    }],

    created_date:{
        type: Date,
        default: Date.now
    }


})

module.exports = mongoose.model('Stores', StoreSchema);