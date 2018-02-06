const { readdirSync } = require('fs');
const Sequelize = require('sequelize');

module.exports = (app) => {
    const { database, username, password, ...options } = app.config.sequelize;
    app.Sequelize = new Sequelize(database, username, password, options);
    app.model = app.Sequelize.model
    loadModel(app, 'app/model');
}

function loadModel(app, prefixUrl) {
    const index = __dirname.indexOf('node_modules');
    if (index > 0) {
        const currentDir = __dirname.substr(0, index);
        var modelObject = {};
        readdirSync(currentDir + prefixUrl).forEach((filename) => {
            const moduleFunction = require(currentDir + prefixUrl + '/' + filename).default;
            const model = moduleFunction(app);
            const modelName = filename.split('.')[0];
            modelObject[modelName] = model;
        })

        Object.defineProperty(app.context, 'model', {
            value: modelObject,
            configurable: false,
            writable: false
        })

    }
}