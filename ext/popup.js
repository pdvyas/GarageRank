$(function() {
	$$$ = chrome.extension.getBackgroundPage();
	$('#test').on('click',function() {
		$$$.test();
	});
	$('#click').on('click',function() {
		$$$.remove();
	});
});
