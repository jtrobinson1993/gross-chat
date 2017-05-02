const Bookshelf = require('../utils/bookshelf');

require('./Option');
module.exports = Bookshelf.model('Topic', {

  tableName: 'topics',

  options(){ return this.hasMany('Option'); }

});
