var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.persistUser = function persistUser(user) {
var objectToBeInserted = user;
MongoClient.connect(url, function(err,db) {
    if(err) throw err;
    var dbo = db.db("studentdb");

    dbo.collection("users").insertOne(objectToBeInserted, function(err,res) {
        if(err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});
}

exports.deleteUser = function deleteUser(user) {
    var objectToBeDeleted = user;
    MongoClient.connect(url, function(err,db) {
        if(err) throw err;
        var dbo = db.db("studentdb");
    
        dbo.collection("users").deleteOne(objectToBeDeleted, function(err,res) {
            if(err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
    }
    exports.findUser = function deleteUser(user,callback,res) {
        var objectToBeFound = {
            "username": user.username
        };
        MongoClient.connect(url, function(err,db) {
            if(err) throw err;
            var dbo = db.db("studentdb");
            dbo.collection("users").find({"username":user.username}).toArray(function(err, result) {
                if(err) throw err;
                console.log('Asc');
                console.log(result);
                db.close();
                callback(result,res);
            });
        }); 
            
        }

exports.findAllUser = function deleteUser(callback,res) {
        
MongoClient.connect(url, function(err,db) {
    if(err) throw err;
    var dbo = db.db("studentdb");
dbo.collection("users").find().toArray(function(err, result) {
 if(err) throw err;
 console.log('Asc');
 console.log(result);
    db.close();
    callback(result,res);
  });
 }); 
                
}

    exports.updateUser = function updateUser(user) {
        var objectUpdate = { $set: user};
        MongoClient.connect(url, function(err,db) {
            if(err) throw err;
            var dbo = db.db("studentdb");
           let oldUser = {"username":user.username}
            dbo.collection("users").updateOne(oldUser, objectUpdate, function(err,res) {
                if(err) throw err;
                console.log("1 document updated");
                db.close();
            });
        });
        }
