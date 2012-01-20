$.GarageRank = {
	query : function(keyword,callback) {
		return queryCollection(keyword,callback);
	}	
};

var queryCollection = function(keyword,callback) {
	$.ajax({
		'type':'GET',
		'url' : $.global.GR.baseUrl +  'databases/'+ $.global.GR.uriDatabase +'/collections/'+$.global.GR.uriCollection,
		'data' : {
			'apiKey' : $.global.GR.apiKey,
			'q' : '{"kw":"'+keyword+'"}'
		},
		'success' : function(data,ts,xhr) {
			data=JSON.parse(data)
			callback(data)
		}
	});
	return;
};

$(function() {
	$('#searchbtn').on('click',function(e) {
		$('#searchResults').empty()
		var query = $('#searchbox').val();
		$.GarageRank.query(query,function(data) {
			$('#searchResults').append($.mk_table(data))

		});
	});

	$('#unluckybtn').on('click',function() {
		alert('However, you are unlucky enough to get this alert')
	});
});

$.mk_table = function(data) {
	var table = $('<table></table>')
	$.each(data, function(i,res) {
		var tr = $('<tr></tr>')
		var td = $('<td></td>')
		var a = $('<a></a>')
		a.attr('href',res.uri)
		a.append(res.title)
		td.append(a)
		tr.append(td)
		table.append(tr)
	});
	return table;
}
