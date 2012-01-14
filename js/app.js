$.GarageRank = {
	query : function(keyword,callback) {
		return queryCollection(keyword,callback);
	}	
};

var queryCollection = function(keyword,callback) {
	$.ajax({
		'type':'GET',
		'url' : $.global.GR.baseUrl +  'databases/'+ $.global.GR.uriCollection +'/collections/uris',
		'data' : {
			'apiKey' : $.global.GR.apiKey,
			'q' : '{"kw":"'+keyword+'"}'
		},
		'success' : function(data,ts,xhr) {
			callback(data)
		}
	});
	return;
};

$(function() {
	$('#searchbtn').on('click',function(e) {
		var query = $('#searchbox').val();
		$.GarageRank.query(query,function(data) {
			$('#searchResults').html(data)
		});
	});
});
