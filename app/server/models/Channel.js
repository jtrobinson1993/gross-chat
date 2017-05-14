const bcrypt = require('bcryptjs');
const Bookshelf = require('../utils/bookshelf');
const shell = require('../shell');
const tableName = 'channels';

require('./User');
require('./Message');
const Channel = Bookshelf.model('Channel', {

  tableName,

  users(){ return this.belongsToMany('User'); }
  messages(){ return this.hasMany('Message'); }

});

module.exports = {
  Model: Channel,
  Collection: Bookshelf.Collection.extend({model: Channel}),
  get QueryBuilder(){ return Bookshelf.knex(tableName) },
  get Query(){ return Bookshelf.knex.raw }
}
