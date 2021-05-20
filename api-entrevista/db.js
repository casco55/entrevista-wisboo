/* requerir sequelize */
const Sequelize = require('sequelize');

/* requerir archivo de modelos url */
const UrlModel = require('./models/url');


/* datos de conexión a bbdd */
const sequelize = new Sequelize('urls','root','mysql',{
    host: 'localhost',
    dialect: 'mysql'
});

/* Constante Url del codemo sequelize */
const Url = UrlModel(sequelize, Sequelize);

/* sincronización con tablas manipuladas por la api */
sequelize.sync({force: false})
.then( () => {
    console.log('Tablas sincronizadas')
})

module.exports = {
    Url
}
