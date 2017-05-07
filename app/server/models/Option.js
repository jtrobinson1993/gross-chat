const Bookshelf = require('../utils/bookshelf');
const tableName = 'options';

require('./Topic');
require('./User');
require('./Vote');
const Option = Bookshelf.model('Option', {

  tableName,

  topic(){ return this.belongsTo('Topic'); },
  voters(){ return this.belongsToMany('User').through('Vote'); }

});

module.exports = {
  Model: Option,
  Collection: Bookshelf.Collection.extend({model: Option}),
  get QueryBuilder(){ return Bookshelf.knex(tableName) },
  get Query(){ return Bookshelf.knex.raw }
}
