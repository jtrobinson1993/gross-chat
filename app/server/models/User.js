const bcrypt = require('bcryptjs');
const Bookshelf = require('../utils/bookshelf');

require('./Vote');
require('./Option');
const User = Bookshelf.model('User', {

  tableName: 'users',

  initialize(){
    this.on('creating', async (model, attrs, options) => {
      this.set('password', await bcrypt.hash(this.get('password'), 10));
    });
  },

  votes(){ return this.hasMany('Option').through('Vote'); },

  authenticate(password){
    return bcrypt.compare(password, this.get('password'));
  }

});

module.exports = {
  Model: User,
  Collection: Bookshelf.Collection.extend({model: User})
}
