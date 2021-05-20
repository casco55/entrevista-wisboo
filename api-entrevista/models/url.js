module.exports = (sequelize, type) => {
   return sequelize.define('url',{
       id: {
           type: type.INTEGER,
           primaryKey: true,
           autoIncrement: true
       },
       url: type.STRING,
   }) 
}