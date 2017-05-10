const config = require('./config');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: config.database_host,
    user: config.database_user,
    password: config.database_password,
    database: config.database_name
  }
});

module.exports = require('bookshelf')(knex).plugin('registry');
