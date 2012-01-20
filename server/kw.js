var database = 'garage';
var collection = 'testuri'
var mongo = require('mongoskin');
var request = require('request')
var _ = require('underscore')
var db = mongo.db('localhost/'+database)

var getNonIndexedURLs = function(callback) {
	db.collection(collection)
	.find({kw:{$exists : false}})
	.toArray(function(err,urls) {
		if(err) {
			console.log('error in getNotIndexURLs');
		}
		else
		{
			if(urls.length==0)
			{
				return;
			}
			callback(urls);
		}
	});
}

var getBody = function(url,callback) {
	request(url,function(error, response, body){
		if(!error && response.statusCode == 200) {
			callback(body);
			console.log(body);
		}
		else
		{
			console.log(error);
			console.log(response.statusCode);
		}
	});
}
var parseBody = function(body) {
	kw = body.replace(/<(?:.|\n)*?>/gm, '')
	kw = kw.split(' ')
	return kw;
}
var update = function(url,kw) {
	db.collection(collection)
	.update({_id:url._id},{$set:{'kw':kw}})
}

var putKeywords = function(url,database,collection) {
	getBody(url,function(body) {
		var kw = parseBody(body);
		update(url,kw);
	});
	
}

var doProcessURL = function() {
	getNonIndexedURLs(function(urls) {
		for(i=0;i<urls.length;i++) 
		{
			putKeywords(urls[i])
		}
	});
}

doProcessURL()
