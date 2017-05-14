const bcrypt = require('bcryptjs');
const Bookshelf = require('../utils/bookshelf');
const shell = require('../shell');
const tableName = 'messages';

require('./Channel');
require('./User');
const Message = Bookshelf.model('Message', {

  tableName,

  channel(){ return this.belongsTo('Channel'); }
  user(){ return this.belongsTo('User'); }

});

module.exports = {
  Model: Message,
  Collection: Bookshelf.Collection.extend({model: Message}),
  get QueryBuilder(){ return Bookshelf.knex(tableName) },
  get Query(){ return Bookshelf.knex.raw }
}
