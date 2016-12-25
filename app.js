let app = require('./config/app_config')();
let db = require('./config/db_config');


app.listen(app.get('port'));
