const config = require('./config');
const mongoose = require('mongoose');

const auth = config.nosql_database_user && config.nosql_database_password ?
  `${config.nosql_database_user}:${config.nosql_database_password}@` : '';

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${auth}${config.nosql_database_host}/${config.nosql_database_name}`, {
  server: {
    socketOptions: {
      keepAlive: 120
    }
  }
});

module.exports = mongoose;
