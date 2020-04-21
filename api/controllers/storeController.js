const mongoose = require('mongoose');
const Store = mongoose.model('Stores');

exports.create_a_store =(req,res)=>{
   const new_record = new Store(req.body)
   
   

   new_record.save((err,record)=>{

     // setTimeout(()=>{  
         if(err) return res.status(400).send(err)
         res.json(record)
     // },2000)

     
   })

}

//get con parametros en params para leer un solo registro
exports.read_a_store =(req, res) =>{
 

   Store
     .findOne({ shopify_shop_id: req.params.id})
     .populate('variants')
     .exec( (err, record)=>{
        
        if (err) res.status(400).send(err)
        if(record===null) return res.status(400).json({message:'tienda no encontrada'})

        res.json(record)
     })


}