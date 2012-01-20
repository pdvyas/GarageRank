
var getHistory = function(cb) {
	startTime = localstorage.getItem('last_sync')
	if(startTime)
	{
		chrome.history.search({text:'',startTime:startTime},cb)
	}
	else
	{
		chrome.history.search({text:''},cb)
	}
}

var global = {};
global.GR = { 
	baseUrl : 'http://175.41.215.201:3000/',
	apiKey : '4f103f24e4b04ac27016ba83',
	provider : 'mongolab',
	uriDatabase : 'garage',
	uriCollection : 'testuri'
};

test = function () {
getHistory(function(history) {
	history = JSON.stringify(history);
	$.ajax({
		url : global.GR.baseUrl +  'databases/'+ global.GR.uriDatabase +'/collections/'+global.GR.uriCollection,
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
