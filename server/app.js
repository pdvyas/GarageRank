var express = require('express');
var request = require('request');
var app = express.createServer();
var mongo = require('mongoskin');
var host = 'localhost';
var port = '27017';
var db;
var collection;
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));
app.get('/databases/:database/collections/:collection',function(req,res) {
	mongo.db(host+':'+port+'/'+req.params.database)
	.collection(req.params.collection)
	.find({kw:req.query['q']})
	.toArray(function(err,items) {
		if(err)
		{
			console.log(err)
			res.send(500);
		}
		else
		{
			res.send(JSON.stringify(items))
		}
	});
});

app.post('/databases/:database/collections/:collection',function(req,res) {
	var body = req.body;
	mongo.db(host+':'+port+'/'+req.params.database)
	.collection(req.params.collection)
	.insertAll(body,function(err, obj) {
		if(err)
		{
			console.log(err);
			res.send(500);
		}
		else
		{
			res.send('msg:ok');
		}
	});
});

app.delete('/databases/:database/collections/:collection',function(req,res) {
	mongo.db(host+':'+port+'/'+req.params.database)
	.collection(req.params.collection)
	.remove({});
});

var getNonIndexedURLs = function(callback) {
	db.collection(collection)
	.find({kw:{$exists : false}})
	.toArray(function(err,urls) {
		if(err) {
			console.log('error in getNotIndexURLs');
		}
		else
		{
			callback(urls);
		}
	});
}

var getBody = function(url,callback) {
	request(url,function(error, response, body){
		if(!error && response.statusCode == 200) {
			callback(body);
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

var putKeywords = function(url) {
	getBody(url,function(body) {
		var kw = parseBody(body);
		update(url,kw);
	});
	
}

var doProcessURL = function(database,coll) {
	db = mongo.db(host+'/'+database)
	collection = coll;
	getNonIndexedURLs(function(urls) {
		for(i=0;i<5;i++) 
		{
			putKeywords(urls[i])
		}
	});
}

app.listen(3000);
