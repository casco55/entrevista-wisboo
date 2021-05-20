const Sequelize = require('sequelize');

const UrlModel = require('./models/url');

const sequelize = new Sequelize('urls','root','mysql',{
    host: 'localhost',
    dialect: 'mysql'
});

const Url = UrlModel(sequelize, Sequelize);

sequelize.sync({force: false})
.then( () => {
    console.log('Tablas sincronizadas')
})

module.exports = {
    Url
}
