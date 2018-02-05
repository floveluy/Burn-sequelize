const Sequelize = require('sequelize');

module.exports = (app) => {
    const { database, username, password,..options } = app.config.sequelize;
    app.sequelize = new Sequelize(database, username, password, options);
}