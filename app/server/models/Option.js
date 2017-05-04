const Bookshelf = require('../utils/bookshelf');

require('./Topic');
const Option = Bookshelf.model('Option', {

  tableName: 'options',

  topic(){ return this.belongsTo('Topic'); }

});

module.exports = {
  Model: Option,
  Collection: Bookshelf.Collection.extend({model: Option})
}
