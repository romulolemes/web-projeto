var MongoClient = require('mongodb').MongoClient,
assert = require('assert')
ObjectId = require('mongodb').ObjectId;

var urlDB = 'mongodb://root:cefet17web@jello.modulusmongo.net:27017/a2dosAqa';
MongoClient.connect(urlDB, function(err, db) {
  if(err){
    console.log(err);
  }else{
    console.log("Connected correctly to server.");

    db.collection('championships').find(
      // "_id": ObjectId('5764aab1bf15097e625e844b')
      {  }
    ).toArray(function(err, championships) {
      for (var index in championships){
        console.log(championships[index]);
        for(var j in championships[index].rodadas){
          console.log(championships[index].rodadas);
          for(var k in championships[index].rodadas[j]){
            console.log(championships[index].rodadas[j].partidas[k]);
          }
        }
      }
        db.close();
    });

  }
});

function testUsers(callbackSucess, callbackErro) {

}

var findUsers = function(db,callbackSucess , callbackErro) {
   var cursor = db.collection('users').find( );
   cursor.each(function(err, users) {
      assert.equal(err, null);
      if (users != null) {
         callbackSucess(users);
      } else {
         callbackErro();
      }
   });
};
