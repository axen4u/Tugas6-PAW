const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nim_nod_db', 'root', 'Admr130305', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

module.exports = sequelize;
