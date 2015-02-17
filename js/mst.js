var tmplId  = document.getElementById('work-template').innerHTML,
	tmpl    = Handlebars.compile(tmplId),
	imgSrc  = 'http://lorempixel.com/300/200',
	context = {
				workSamples: [
					{ 	title: 'Motorvana',
						alt: 'Motorvana.com redesign',
						src: imgSrc
					},{
					 title: 'Shattered Crystal',
				alt: 'shatteredcrystal.com development',
				src: imgSrc
			}
	]},
	output  = tmpl(context);

document.getElementById('work-list').innerHTML = output;