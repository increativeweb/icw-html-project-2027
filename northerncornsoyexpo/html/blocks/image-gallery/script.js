$( window ).resize(function() {
	onWindowResize();
});

onWindowResize();

function onWindowResize() {
	$('.screen-width-value').text($(window).width());	
}