const Bookshelf = require('../utils/bookshelf');
const tableName = 'votes';

require('./User');
require('./Option');
require('./Topic');
const Vote = Bookshelf.model('Vote', {

  tableName,

  user(){ return this.belongsTo('User'); },
  option(){ return this.belongsTo('Option'); },
  topic(){ return this.belongsTo('Topic'); }

});

module.exports = {
  Model: Vote,
  Collection: Bookshelf.Collection.extend({model: Vote}),
  get QueryBuilder(){ return Bookshelf.knex(tableName) },
  get Query(){ return Bookshelf.knex.raw }
}
