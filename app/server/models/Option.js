const Bookshelf = require('../utils/bookshelf');

require('./Topic');
module.exports = Bookshelf.model('Option', {

  tableName: 'options',

  topic(){ return this.belongsTo('Topic'); }

});
