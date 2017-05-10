const Bookshelf = require('../utils/bookshelf');
const tableName = 'topics';

require('./Option');
require('./Vote');
const Topic = Bookshelf.model('Topic', {

  tableName,

  options(){ return this.hasMany('Option'); },
  votes(){ return this.hasMany('Vote'); }

});

module.exports = {
  Model: Topic,
  Collection: Bookshelf.Collection.extend({model: Topic}),
  get QueryBuilder(){ return Bookshelf.knex(tableName) },
  get Query(){ return Bookshelf.knex.raw }
}
