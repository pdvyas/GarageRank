$.global = {};
$.global.GR = {
	baseUrl : 'https://api.mongolab.com/api/1/',
	apiKey : '4f103f24e4b04ac27016ba83',
	provider : 'mongolab',
	uriCollection : 'pdtest'
};

$.GarageRank = {
	query : function(keyword) {
		return queryCollection(keyword);
	}	
};

var queryCollection = function(keyword) {
	$.ajax({
		'type':'GET',
		'url' : $.global.GR.baseUrl +  'databases/'+ $.global.GR.uriCollection +'/collections/uris',
		'data' : {
			'apiKey' : $.global.GR.apiKey,
			'q' : '{"kw":"'+keyword+'"}'
		},
		'success' : function(data,ts,xhr) {
			console.log(data);
		}
	});
	return;
};
