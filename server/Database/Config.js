const MongoClient = require( 'mongodb' ).MongoClient;
const url = process.env.DATABASE

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db("CCNA");
      console.log('Connect Mongo DB')
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};