const MongoClient = require( 'mongodb' ).MongoClient;
const url = process.env.DATABASE



module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      var _db  = client.db();
      console.log('Connect Mongo DB')
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};