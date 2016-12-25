let express = require('express');
let routers = require('../app/routers/Post');
let bodyParser = require('body-parser');

module.exports = function(){
    let app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use('/api/v1', routers);
    app.set('port', process.env.PORT || 3000);

    return app;
}
