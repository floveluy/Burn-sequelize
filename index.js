const { readdirSync } = require('fs');
const Sequelize = require('sequelize');

module.exports = (app) => {
    const { database, username, password, ...options } = app.config.sequelize;
    app.sequelize = new Sequelize(database, username, password, options);

}


function loadModel(app) {
    const index = __dirname.indexOf('node_modules');
    if (index > 0) {
        const currentDir = __dirname.substr(0, index);
        readdirSync(currentDir + '/model').forEach((filename) => {
            const module = require(currentDir + '/model/' + filename).default;


        })

    } else {
        readdirSync('./model').forEach((filename) => {
            const moduleFunction = require('./model/' + filename).default;
            const model = moduleFunction(app);
        })
    }
}

loadModel();