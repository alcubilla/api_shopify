const mongoose = require('mongoose');
const Variant = mongoose.model('Variants');
const Store = mongoose.model('Stores');

// '/store/:id/review_variants'
exports.review_variants = async (req,res) => {

    //id de la tienda : req.params.id
    //variants: req.body.variants
    
    if(req.body.variants && req.body.variants.length > 0){
        //hay variantes
        let variants_ids = []
        const store = await Store.findOne({ shopify_shop_id: req.params.id})
        for(let i=0; i<req.body.variants.length; i++){
            const variant = req.body.variants[i]
            const existVariant =await Variant.findOne( { variant_id: variant.variant_id})
            
            if (existVariant){
               await existVariant.update(variant) 
               variants_ids.push(existVariant._id)
            }else{
                const newVariant = new Variant({ ...variant, store:store._id})
                await newVariant.save()
                variants_ids.push(newVariant._id)
            }

        }

        //actualizo datos
        store.status = 'en_revision'
        store.variants = variants_ids
        await store.save() 

        const new_store = await Store.findOne({ shopify_shop_id: req.params.id}).populate('variants')



        res.json({
            message: 'Productos recibidos exitosamente',
            store: new_store
        })
        


    }else{
        res.status(400).json({message: 'Variantes no encontradas'})
    }



    
}