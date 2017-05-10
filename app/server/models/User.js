const bcrypt = require('bcryptjs');
const Bookshelf = require('../utils/bookshelf');
const shell = require('../shell');
const tableName = 'users';

require('./Vote');
require('./Option');
const User = Bookshelf.model('User', {

  tableName,

  initialize(){
    this.on('creating', async (model, attrs, options) => {
      try {
        this.set('password', await bcrypt.hash(this.get('password'), 10));
      } catch (e) {
        shell.trace(e);
      }
    });
  },

  votes(){ return this.hasMany('Option').through('Vote'); },

  authenticate(password){
    return bcrypt.compare(password, this.get('password'));
  }

});

module.exports = {
  Model: User,
  Collection: Bookshelf.Collection.extend({model: User}),
  get QueryBuilder(){ return Bookshelf.knex(tableName) },
  get Query(){ return Bookshelf.knex.raw }
}
