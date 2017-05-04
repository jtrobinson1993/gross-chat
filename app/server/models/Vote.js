const Bookshelf = require('../utils/bookshelf');

require('./User');
require('./Option');
const Vote = Bookshelf.model('Vote', {

  tableName: 'votes',

  user(){ return this.belongsTo('User'); },

  option(){ return this.belongsTo('Option'); }

});

module.exports = {
  Model: Vote,
  Collection: Bookshelf.Collection.extend({model: Vote})
}
