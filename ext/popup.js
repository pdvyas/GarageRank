$(function() {
	bgPage = chrome.extension.getBackgroundPage();
	$('#test').on('click',function() {
		bgPage.test();
	});
	$('#clear').on('click',function() {
		bgPage.remove();
	});
});
