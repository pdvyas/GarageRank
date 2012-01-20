
var getHistory = function(cb) {
	var nowTime = Date.now()
	var startTime = Number(localStorage.getItem('last_sync'))
	if(startTime)
	{
		chrome.history.search({text:'',startTime:startTime},cb)
	}
	else
	{
		chrome.history.search({text:''},cb)
	}
	localStorage.setItem('last_sync',nowTime)
}

var global = {};
global.GR = { 
	baseUrl : 'http://localhost:3000/',
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
		url : global.GR.baseUrl +  'databases/'+ global.GR.uriDatabase +'/collections/'+global.GR.uriCollection,
		type : 'DELETE',
		contentType : "application/json",
		success : function() {
			alert('Deleted from server')
		}
	});

}
