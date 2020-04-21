//API REST pra una tabla

module.exports = (app) =>{
    const store = require('../controllers/storeController');

    app.route('/store')
        .post(store.create_a_store)

    app.route('/store/:id')
        .get(store.read_a_store)
        
}