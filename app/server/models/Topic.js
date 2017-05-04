const Bookshelf = require('../utils/bookshelf');

require('./Option');
const Topic = Bookshelf.model('Topic', {

  tableName: 'topics',

  options(){ return this.hasMany('Option'); }

});

module.exports = {
  Model: Topic,
  Collection: Bookshelf.Collection.extend({model: Topic})
}
