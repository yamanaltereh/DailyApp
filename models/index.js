'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// const config = require('config');
// const Sequelize = require('sequelize');

// // DB connection
// var dbConfig = config.get('dbConfig');
// const sequelize = new Sequelize(dbConfig.get('dbName'), '', '', {
//   host: dbConfig.get('host'),
//   port: dbConfig.get('port'),
//   dialect: 'postgres',
//   database: dbConfig.get('dbName'),
//   pool: {
//     max: 1,
//     min: 0,
//     idle: 10000
//   }
// });

// // load models
// var models = [
//   'Project',
//   'User'
// ];
// models.forEach(function(model) {
//   module.exports[model] = sequelize.import(__dirname + '/' + model);
// });

// // describe relationships
// (function(m) {
//   m.Project.belongsTo(m.User);
//   m.User.hasMany(m.Project);
// })(module.exports);

// // export connection
// module.exports.sequelize = sequelize;
