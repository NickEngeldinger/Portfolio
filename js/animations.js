$(document).ready(function() {
	setTimeout(function() {
		$('.content').addClass('animate');
		$('h1').addClass('animate');
	},250);
	setTimeout(function() {
		$('h1 cite').addClass('animate');
	},2000);
	setTimeout(function() {
		$('.subtitle').typed({
			strings: ['Handcrafting digital solutions in the Pacific Northwest'],
			typeSpeed: 30,
			showCursor: false		
		});
	}, 3750);
});