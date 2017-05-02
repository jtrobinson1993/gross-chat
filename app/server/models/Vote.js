const Bookshelf = require('../utils/bookshelf');

require('./User');
require('./Option');
module.exports = Bookshelf.model('Vote', {

  tableName: 'votes',

  user(){ return this.belongsTo('User'); },
  option(){ return this.belongsTo('Option'); }

});
