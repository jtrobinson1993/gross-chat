const bcrypt = require('bcryptjs');
const Bookshelf = require('../utils/bookshelf');

require('./Vote');
module.exports = Bookshelf.model('User', {

  tableName: 'users',

  initialize(){
    this.on('creating', async (model, attrs, options) => {
      this.set('password', await bcrypt.hash(this.get('password'), 10));
    });
  },

  authenticate(password){
    return bcrypt.compare(password, this.get('password'));
  },

  votes(){ return this.hasMany('Vote'); }

});
