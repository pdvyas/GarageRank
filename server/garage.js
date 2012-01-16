// TODO : config file

var request = require('request');
var mongo = require('mongoskin');   

var uriToKeyWords = function(uri,callback){
    var kw;
    request(uri,function(error, response, body){
                if(!error && response.statusCode == 200) {
                    kw = body.replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, "");
                    kw = kw.split(" ");
                    callback(uri,kw);
                }else{
                    console.log(error);
                    console.log(response.statusCode);
                }
            });
    //return an array of keywords
};

var getNotIndexed = function(callback){
    var uris;
     mongo.db('mongodb://hacknight:hacknight@dbh70.mongolab.com:27707/garageranks')
         .collection('uris')
         .find({kw:{$exists:false}})
         .toArray(
            function(err,item){        
                //console.log(item.length+" documents returned");
                uriToKeyWords(item[0].uri,callback); 
            });
}

// uriToKeyWords('http://blog.depold.com/post/2073407414/deploying-a-node-js-web-application-with-express-and',function(){});
getNotIndexed(function(uri,kw){
//    console.log(kw);
//    console.log(uri);

     mongo.db('mongodb://hacknight:hacknight@dbh70.mongolab.com:27707/garageranks')
         .collection('uris')
         .update({"uri":uri},{"kw":kw},function(error,count){
             if(error)
             {
                 console.log(error);

            }
            else
             {
                console.log(count+" edited"); 
             }
         });
});
