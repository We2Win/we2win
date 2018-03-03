// Setup database and load models.
'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var db = {};
var tablename = {
  'User': '01011803',
  'Info': '02011803',
  'Content': 'sample'
}

const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user,
  CONFIG.db_password, {
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect,
    port: CONFIG.db_port,
    operatorsAliases: false
  });

// Load all the models in the model directory
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[tablename[model.name]] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[tablename[modelName]].associate) {
    db[tablename[modelName]].associate(db);
  }
});

// Export Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;