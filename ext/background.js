
var getHistory = function(cb) {
	chrome.history.search({text:''},cb)
}

var global = {};
global.GR = { 
	baseUrl : 'https://api.mongolab.com/api/1/',
	apiKey : '4f103f24e4b04ac27016ba83',
	provider : 'mongolab',
	uriDatabase : 'pdtest',
	uriCollection : 'testuri'
};

var history;
test = function () {
getHistory(function(his) {
	history = his;
	history = JSON.stringify(history);
	$.ajax({
		url : global.GR.baseUrl +  'databases/'+ global.GR.uriDatabase +'/collections/'+global.GR.uriCollection +'?apiKey='+global.GR.apiKey,
		type : 'POST',
		data : history,
		contentType : "application/json",
		success : function() {
			alert('synced with server')
		}
	});
});
}

remove = function() {
	$.ajax({
		url : global.GR.baseUrl +  'databases/'+ global.GR.uriDatabase +'/collections/'+global.GR.uriCollection +'?apiKey='+global.GR.apiKey,
		type : 'DELETE',
		contentType : "application/json",
		success : function() {
			alert('Deleted from server')
		}
	});

}
