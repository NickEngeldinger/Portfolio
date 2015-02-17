//I need to precompile these and the footer (any that should be loaded on page load )
var linkSource = $('#link-template').html(),
	linkTemplate = Handlebars.compile(linkSource),
	linkData = {
		links: [
			{
				name: 'screen',
				content: 'My Work'
			},{
				name: 'idea',
				content: 'Who Am I?'
			},{
				name: 'mail',
				content: 'Contact Me'
			}
	]};
$('.nav').html(linkTemplate(linkData));

function  injectContent(templSrc, dataSrc, targetEl, callback) {
	var templRequest = $.ajax({url: templSrc}),
		jsonRequest = $.ajax({url: dataSrc});

	$.when(templRequest, jsonRequest)
		.done(function(templResponse, jsonResponse) {
			var template = Handlebars.compile(templResponse[0]),
				tmplData = $.parseJSON(jsonResponse[0]);
			$(targetEl).html(template(tmplData));
			if (callback) callback();
		});
}

function initCarousel() {
	var dts = $('dt'),
		dds = $('dd'), 
		pgCtrl = $('.page-controls'),
		page = 0;

	for (var i=0; i < dts.length; i++) {
		$(dts[i]).addClass('page-' + i);
		$(dds[i]).addClass('page-' + i);
		$(pgCtrl[i]).addClass('pageNum-' + i);
	}
	$('.page-' + page).css('left', '0');
	$('.page-number').html('1');
	var totalPages = $('.solutions dt').length;
	$('.total-pages').html(totalPages);
	$('.work-samples').animate({height: '800px'});
}

function moveCarousel(direction) {
	var pageClasses = [],
		totalPages = $('.solutions dt').length,
		lastPage = totalPages - 1,
		pageCtrl = $('.page-controls');

	pageClasses = pageCtrl.attr('class').split(' ');
	
	for (var i=0; i < pageClasses.length; i++) {
		var pageClassName = pageClasses[i].slice(0,8);

		if (pageClassName === 'pageNum-') {
			var pageNum = parseInt(pageClasses[i].slice(8,9)),
				nextPage = pageNum + 1,
				prevPage = pageNum - 1,
				next = $('.next'),
				prev = $('.prev');
			
			$('.page-' + pageNum)
				.removeClass('show')
				.addClass('hide');
			pageCtrl.removeClass('pageNum-' + pageNum);

			if (direction === 'next') {
				$('.page-' + pageNum).animate({
					left: '-2000px' 
				}, 2000);
				$('.page-' + nextPage).animate({
					right: '0'
				}, 2000);
				prev.removeClass('hide');
				if (nextPage === lastPage) {
					next.addClass('hide');
				} else {
					next.removeClass('hide');
				}
				pageCtrl.addClass('pageNum-' + nextPage);
				$('.page-number').html(nextPage + 1);
			}
			else if (direction === 'prev') {
				$('.page-' + pageNum)
					.css('left', 'auto')
					.animate({
						right: '-2000px',
				}, 2000);
				$('.page-' + prevPage).animate({
					left: '0'
				}, 2000)
				next.removeClass('hide');
				if(prevPage === 0) {
					prev.addClass('hide');
				} else {
					prev.removeClass('hide');
				}
				pageCtrl.addClass('pageNum-' + prevPage);
				$('.page-number').html(prevPage + 1);
			}
		}
	}
}

function showFullImg(imgSrc) {
	var modalBg = $('<div>'),
		modalBody = $('<div>'),
		modalClose = $('<a>'),
		modalImg = $('<img>'),
		scrollDistance = $(window).scrollTop();

	modalImg.attr('src', imgSrc);

	modalClose
		.addClass('modal-close')
		.html('close')
		.attr('href','#');
	

	modalBody
		.addClass('modal-body')
		.append(modalClose)
		.append(modalImg);

	modalBg
		.height($(window).height())
		.addClass('modal-bg')
		.css('top', scrollDistance)
		.append(modalBody);
	
	$('body').append(modalBg);
}

$('.work-samples')
	.on('click', 'img', function(ev) {
		var src = $(ev.target).attr('src');
		showFullImg(src);
	})
	.on('click', '.next', function(ev) {
		moveCarousel('next');
	})
	.on('click', '.prev', function(ev) {
		moveCarousel('prev');
	})
	.on('click', '.return-work', function() {
		$('html,body').animate({
        	scrollTop: '1420px'
    	}, 1000, function() {
    		$('.work-samples')
    			//.empty()
    			.animate({height: '0'}, 500, function() {
    				$('.work-samples').empty();
    			});
    	});
});

$('body').on('click', '.modal-close', function(ev) {
	ev.preventDefault();
	$('.modal-bg').remove();
});

$('.my-work').on('click', 'a', function(ev){
	ev.preventDefault();
	var slide = $(ev.target).attr('class'),
		el = $('.work-samples'),
		templatePath = '/templates/work-samples.handlebars',
		dataPath = '/data/' + slide + '.json';
	$('.work-samples').animate(
		{height: '800px'}, 
		750, 
		injectContent(templatePath, dataPath, el, initCarousel));
	$('html,body').animate({
        scrollTop: '2050px'
    }, 1000);
});

$('.nav').on('click', '.screen', function(ev) {
	ev.preventDefault();
	var el = $('.my-work'),
		templatePath = "/templates/work.handlebars",
		dataPath = "/data/work.json";
	injectContent(templatePath, dataPath, el);
	$('html,body').animate({
        scrollTop: '1420px'
    }, 1500);
});