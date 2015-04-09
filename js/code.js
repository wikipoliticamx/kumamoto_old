var KUMA = {
	boot:function() {
		//setTimeout(function(){ window.scrollTo(0, 1); }, 0); // Hide the address bar!
		if($('#fullpage.home').length > 0) {
			$('.navbar').addClass('home');
			KUMA.screen.boot();
			KUMA.motion.boot('cover');
			KUMA.nosotros.boot();
			KUMA.video.boot();
		} else if($('#fullpage.splash').length > 0) {
			KUMA.screen.boot();
			KUMA.motion.boot('splash');
		} else {
			var where = $('#fullpage').attr('class');
			$('.navbar').addClass(where);

			if(where == 'propuestas') {
				KUMA.propuestas.boot();
			} else if (where == 'compromisos') {
				KUMA.propuestas.boot();
			} else if (where == 'principios') {
			}
		}
		KUMA.fullPage.boot();
		KUMA.gif.boot();
	},
	fullPage: {
		boot:function() {
			if($('#fullpage.splash').length == 0) {
				KUMA.fullPage.extractAnchors();
				$('#fullpage').fullpage( KUMA.fullPage.options );
			}
		},
		extractAnchors:function() {
			var anchors = [];
			$('#menu a').each(function() {
				anchors.push( $(this).data('menuanchor') );
			});
			KUMA.fullPage.options.anchors = anchors;
		},
		options:{
			//Navigation
			menu: '#menu',
			//anchors:['firstSlide', 'secondSlide'],
			navigation: false,
			css3:true,
			animateAnchor:false,
			keyboardScrolling:true
			//navigationPosition: 'right',
			//navigationTooltips: ['firstSlide', 'secondSlide'],
			//showActiveTooltips: true,
			//slidesNavigation: true,
			//slidesNavPosition: 'bottom',
		}
	},
	// ----------------------
	// ****** NOSOTROS ******
	// ----------------------
	nosotros:{
		miembros:[
			['alaide', 'Nos dijeron que la política era de <b>otros</b> y había una sola forma de hacerla, pero tenemos todas las posiblidades al alcance de nuestra mano.', 0, 0],
			['ale', 'Tenemos que comenzar a creer que nuestra realidad es <b>transformable</b> y que se pueden construir cosas bonitas a partir de la indignación.', 0, 2],
			['armando', 'Esta campaña es nuestra mejor oportunidad para sacar a los <b>cínicos</b> del gobierno y recuperar las riendas del futuro', 0, 9],
			['alex', 'Utilizaré todas las opciones y oportunidades para ir en contra de <b>lógicas perniciosas</b>. Creando un proyecto de deseo en la realidad.', 0, 3],
			['alvaro', 'Los partidos actuales <b>no nos representan</b> y si no tomamos los ciudadanos las riendas, ellos las tomarán por nosotros.', 0, 4],
			['amairani', 'Haré todo lo que esté en mis manos para que los ciudadanos hagamos <b>propia</b> la política, y qué mejor que hacerlo con un equipo como éste.', 0, 5],
			['ana', 'Quiero demostrar que la política <b>ni apesta ni es <b>grotesca</b>. Quiero retar con una campaña modelo a todos aquellos que lo olvidaron.', 0, 7],
			['ana-gaby', '<b>Amo</b> a México mi país. Basta de tolerancia a un gobierno criminal.', 0, 6],
			['angel', 'Creo necesaria una democracia participativa y austera. El sistema actual debe cambiar, y <b>no</b> lo hará <b>solo</b>.', 0, 8],
			['benjamin', 'Soy un creyente de que el pais se construye desde la ciudadania. Me <b>motiva</b> trabajar con gente que desea un mejor Mexico.', 1, 0],
			['camila', 'Es hora de replantear lo que significa hacer política, y eso nos toca a nosotros y <b>a nadie más</b>.', 1, 1],
			['damian', 'Los partidos no nos representan, representan <b>cúpulas</b> de poder que tienen secuestrada la democracia. Llegó el momento de los independientes.', 1, 2],
			['daniel', 'Las decisiones que marcan el rumbo de nuestra ciudad, región o país, deben ser tomadas <b>por y para los ciudadanos</b>, no por los partidos.', 1, 4],
			['dani', 'Creo que es <b>responsabilidad</b> de todas las personas conscientes de la situación actual del país participar en esta lucha a lado de Kumamoto.', 1, 3],
			['darlen', 'Me gusta señalar lo que está mal pero también tomo responsabilidad construyendo para cambiarlo. Aquí encontré <b>la forma</b> y <b>las personas</b> para hacerlo.', 1, 5],
			['dulce', 'Para generar un cambio hay que hacer las cosas diferentes, y con un equipo con esta <b>pasión y calidad humana</b> vale la pena intentarlo.', 1, 7],
			['edgar-1', 'Hacer política no debería ser un estilo de vida sino una <b>práctica diaria</b> para todo aquel que se llame ciudadano.', 1, 8],
			['edgar-2', 'Este proyecto está haciendo todo lo que considero ético y correcto para actuar políticamente. No participar seria una gran <b>incongruencia</b>.', 1, 9],
			['eli', 'Creo que los grandes cambios surgen de equipos tan <b>extraordinarios</b> como el nuestro &mdash;y si perdemos, quiero perder con un equipo así.', 2, 0],
			['fatima', '&laquo;Un hombre con una idea nueva es un loco hasta que la idea triunfa&raquo; Estoy <b>loca</b>, pero segura de que se construirá un mejor gobierno.', 2, 1],
			['isa', 'Me gusta ver a la gente trabajando por el lugar donde vive. Hay una forma mejor de <b>habitar</b> la ciudad.', 2, 2],
			['joaquin', 'Creo en el poder de los ciudadanos. Creo que creando nuevas herramientas y formas de participar aportamos nuestro <b>grano de arena</b>.', 2, 4],
			['javier', 'Estamos escribiendo la <b>historia</b> de nuestra ciudad y de nuestro Estado; páginas de paz, de esperanza y de construcción.', 2, 3],
			['juan-pedro', 'Quiero hacer algo para <b>aportar</b> a la sociedad, aprender y aplicar todo al entorno en el que vivo.', 2, 5],
			['karin', 'El mal uso que se ha hecho de la política nos volvió <b>apáticos</b>, lograremos hacer una en la que ahora vuelva el <b>interés</b> de participar', 2, 6],
			['pedro', 'Las personas debemos estar al <b>centro</b> de la política, eso es la democracia y ésta es la oportunidad para volverlo realidad.', 4, 2],
			['levhita', 'La historia está hecha de la acumulación de pequeños cambios. Cambios que parecían imposibles pero pues <b>no</b>.', 2, 7],
			['lu', 'Hay que entender el espacio público, físico y simbólico como un &laquo;<b>para</b> nosotros, <b>de</b> nosotros&raquo;.', 2, 8],
			['luis-1', 'Hacer politica es volvernos <b>habitantes</b> del espacio que compartimos.', 2, 9],
			['luis-2', 'Juntos podemos recuperar el control del pais y cambiar los paradigmas que <b>secuestran</b> la política. Es nuestro deber como Ciudadanos Mexicanos.', 3, 0],
			['luis-3', 'Dando lo mejor de mí, habrá un cambio; si somos muchos, es más probable. Tirar el <b>muro</b> es prioridad, hacerlo en equipo es gusto.', 3, 1],
			['mariana', 'Sé que todos <b>de la mano</b> podemos lograr un cambio real. Actuemos juntos y logremos la politica que merecemos', 3, 3],
			//['marce', '', 3, 2],
			['mina', 'Porque quienes le estamos dando nuestro apoyo, aun siendo camaradas, lo tendremos en la mira. Y Kumamoto lo sabe y busca esa <b>crítica</b> que hace crecer.', 3, 6],
			['miguel', 'Para generar un cambio, alguien debe tirar <b>la primer ficha</b> del dominó.', 3, 5],
			['nayeli', '<b>Ser joven</b> significa ser dueños de nuestra vida, de nuestro presente y estar dispuestos a desafiar nuestro porvenir.', 3, 7],
			['pabli', 'Quiero tener la oportunidad de <b>incidir</b> en la política, de forma y fondo, desde la innovación y la acción critica.', 3, 8],
			['pablo', 'Debemos tomar todas las oportunidades posibles para cambiar nuestras realidades. Se trata de creer en nosotros mismos y <b>no en terceros</b>.', 3, 9],
			['paola', 'Estoy convencida que este proyecto es un medio de empoderamiento del ciudadano, por la <b>valentía</b> de levantar la voz y actuar', 4, 0],
			['pau', 'Tenemos que dejar a un lado la indiferencia y empezar a involucrarnos para poder tener la democracia que nos <b>merecemos</b>.', 4, 1],
			['pepe', 'El primer paso para humanizar nuestra sociedad es volver a <b>enamorarnos</b> de la política.', 4, 3],
			//['quique', 'Por re-encontrarme con ese concepto tan vapuelado hoy en dia....democracia', 0, 0],
			['roberto', 'Ocupar es más que un lema, es <b>devolver</b> la toma de decisiones a la ciudadanía sobre su futuro y la ciudad que queremos.', 4, 4],
			['rodrigo', 'Creo que debemos de crear la politica que haga posible la <b>vida en común</b>. Nuestra realidad demanda de nosotros actuar aquí y ahora.', 4, 5],
			['sofia-1', 'La política la construimos <b>todos</b> y estando informados e involucrados podremos generar verdadera política y prácticas más incluyentes y benéficas para la mayoría.', 4, 6],
			//['sofia-2', '', 4, 7],
			['susy', 'Necesitamos preguntarnos qué sigue <b>después</b> de nuestro hartazgo. Nadie lo hará por nosotros.', 4, 8],
			['diego', 'A falta de una opción digna y auténtica, ahora podemos construir una colectivamente, como <b>nunca</b> se ha intentado y cuando más necesita.', 1, 6],
			//['tanya', '', 4, 9],
			['alberto', 'Estoy aquí porque creo que mi generación se perdió en la cotidianidad y <b>conformismo</b>. Confío en Kuma y su equipo para hacer mejor las cosas.', 0, 1],
			['mariela', 'La mejor manera de acrecentar nuestra democracia es hacerla <b>nuestra</b>. De los ciudadanos. Necesitamos caminar en esa dirección aquí y ahora.', 3, 4]
		],
		emerge:function() { var i = 0;
			_(KUMA.nosotros.miembros).chain().shuffle().each(function(miembro) { i+=1; var nombre = miembro[0], xq = miembro[1];
				KUMA.motion.emerge( {el:'.screen.nosotros .galaxia a[data-name='+nombre+']', 
					duration: _([200, 300, 400, 500, 600, 700, 800, 900, 1000]).shuffle()[0],
					timeout:_([500, 1000, 1500, 2000]).shuffle()[0]
				} );
			});
		},
		boot:function() { var galaxia = $('.screen.nosotros .galaxia'), i = 0;
			_(KUMA.nosotros.miembros).chain().shuffle().first(32).each(function(miembro) { i+=1; var nombre = miembro[0], xq = miembro[1], x = miembro[2], y = miembro[3];
				galaxia.append('<a href="javascript:void(null)" data-name="'+nombre+'" data-why="'+xq+'"><span>'+nombre.replace(/\-\d/,'').replace(/-/,' ')+'</span><img src="/img/dot.png" style="background-position:'+(y*-150)+'px '+(x*-150)+'px" /></a>');
				
				var face = galaxia.find('a:last');

				if(xq) {
					new Opentip(face, '<strong>ESTOY AQUÍ PORQUE:</strong><span>'+xq, {
						target:true,
						delay:0,
						background:'#fff',
						borderColor:'#ccc',
						style:'dark',
						//'hideTrigger':'closeButton',
						tipJoint:'left',
						stem:'left', 
						stemLength:20,
						stemBase:20
					});
				}

				if(i==16) {
					$('.screen.nosotros h1').detach().insertAfter('.screen.nosotros .galaxia a:eq('+(i-1)+')')
				}
			});
		}
	},
	// --------------------
	// ****** MOTION ******
	// --------------------
	motion:{
		emerge:function(arg) {
			setTimeout(function() {
				animate({
				  el: arg.el,
				  opacity: 1,
				  duration: arg.duration | 500
				});
			}, arg.timeout);
		},
		boot:function(cover) { cover = '.screen.'+cover+' ';
			var emerge = KUMA.motion.emerge;
			setTimeout(function() {
				emerge( {el:cover+'.copy img', duration:200, timeout:500} );
				emerge( {el:cover+'h3', duration:800, timeout:800} );
				animate({el:cover+'h1.pedro', translateY:400, duration:700});
				$(cover+'img.kumafoto').css('transition', 'all 4s ease')
					.css('-webkit-filter', 'blur(0)');
			}, 200);
			setTimeout(function() {
				emerge( {el:cover+' h1.kumamoto', duration:900, timeout:100} );
			}, 500);
			setTimeout(function() {
				$(cover+'h3 strong').css('color', 'rgb(152, 95, 96)');
				animate({el:cover+'h2', translateX:'18.34em', duration:800});
				emerge( {el:'a.fb img', timeout:700} );
				emerge( {el:'a.twitter img', timeout:400} );
				emerge( {el:'a.instagram img', timeout:800} );
				animate({el:'a.principios', translateY:'-12em', duration:800});
				animate({el:'a.compromisos', translateY:'-12em', duration:600});
				animate({el:'a.propuestas', translateY:'-12em', duration:1200});
				animate({el:'.kitkumamoto', translateX:-400, duration:1200});
			}, 1500);
			setTimeout(function() {
				$(cover+'img.kumafoto, '+cover+'h3 span').css('transition', 'none');
			}, 4000);
		}
	},
	propuestas:{
		boot:function() {
			$('a.leer-mas').click(KUMA.propuestas.toggleLeerMas);
		},
		toggleLeerMas:function() {
			var text = $(this).parents('.text');

			if(text.hasClass('leer-mas')) {
				text.removeClass('leer-mas');
			} else {
				text.addClass('leer-mas');
			}
		}
	},
	gif:{
		boot:function() {
			$('.video').each(function() { var that = $(this);
				var w = that.width(),
					prop = 720/1280; // height / width

				that.find('img').css({
					height: that.height(),
					left: (w-(that.height*prop))/2
				});
			});
		}
	},
	// -------------------
	// ****** VIDEO ******
	// -------------------
	video: {
		boot:function() {
			$('.screen.video .sidebar .thumbs img').click(KUMA.video.load);
			$('.screen.video .sidebar .thumbs img:first').addClass('active');
			$('.screen.video .sidebar .soundToggle').click(KUMA.video.soundToggle);
		},
		height:700,
		width:500,
		ready:function() { var p = KUMA.player;
			p.playVideo();
			p.pauseVideo();
		},
		soundToggle:function() { var p = KUMA.player;
			if(p.isMuted()) {
				p.unMute();
				$(this).addClass('unmuted').removeClass('muted');
			} else {
				p.mute();
				$(this).addClass('muted').removeClass('unMuted');
			}
		},
		play:function() { var p = KUMA.player;
			if(p) {
				p.playVideo();
				if($('.soundToggle.muted').length > 0) {
					console.log('mute');
					p.mute() 
				}
			}
		},
		pause:function() { var p = KUMA.player;
			if(p) {
				p.pauseVideo();
				if($('.soundToggle.unMuted').length > 0) {
					console.log('unmute');
					KUMA.player.unMute() 
				}
			}
		},
		change:function(state) {
			KUMA.video.state = state;
			if(state.data == 0) {
				var next = $('.screen.video .thumbs img.active').next();
				if(next) {
					next.click();
				} else {
					$('.screen.video iframe').css('opacity', 0);
				}
			}
		},
		load:function() {
			$('.screen.video iframe').css('opacity', 1);
			KUMA.player.loadVideoById( $(this).attr('data-youtube') );
			$('.screen.video .thumbs img').removeClass('active');
			$(this).addClass('active');
		}
	},
	scroll:{
		boot:function() {
			// init controller
			var controller = new ScrollMagic.Controller(),
				emerge = KUMA.motion.emerge,
				scenes = {};

			// COVER
			scenes['cover'] =  new ScrollMagic.Scene({
				triggerElement: '.screen.cover .redes',
				reverse: true
			}).on("enter", function(e) {
				KUMA.video.pause();
			});

			// VIDEO
			scenes['video'] =  new ScrollMagic.Scene({
				triggerElement: '.screen.video .sidebar',
				reverse: true
			}) .on("enter", function(e) {
				KUMA.video.play();
			});


			// VIDEO copy
			scenes['videoCopy'] = new ScrollMagic.Scene({
				triggerElement: '.screen.video .',
				triggerHook: 'onEnter'
			}).on("enter", function(e) {
				emerge( {el:'.screen.video h1 .los', duration:300, timeout:200} );
				emerge( {el:'.screen.video h1 .muros', duration:600, timeout:500} );
				emerge( {el:'.screen.video h1 .si', duration:600, timeout:1000} );
				emerge( {el:'.screen.video h1 .caen', duration:600, timeout:1500} );
				emerge( {el:'.screen.video p', duration:900, timeout:500} );
				$('.screen.video p strong').css('color', 'rgb(152, 95, 96)');
			});

			// NOSOTROS
			scenes['nosotros'] = new ScrollMagic.Scene({
				triggerElement: '.screen.nosotros'
			}).on("enter", function(e) {
				KUMA.nosotros.emerge();
				KUMA.video.pause();
			});

			// MEDIOS
			scenes['medios'] = new ScrollMagic.Scene({
				triggerElement: '.screen.medios'
			}).on("enter", function(e) {
				animate({el:'.screen.medios .medio.maspormas', translateX:1500, duration:800});
				animate({el:'.screen.medios .medio.milenio', translateX:-1500, duration:600});
				animate({el:'.screen.medios .medio.informador', translateX:1500, duration:1200});
				$('.medios .citas strong').css('color', 'rgb(200, 112, 114)');
				setTimeout(function() {
					animate({el:'.screen.medios .carton', translateX:300, duration:1200});
				}, 2000);
				_($('.screen.medios .logos a')).chain().shuffle().each(function(logo) {
					emerge( {el:logo, 
						duration: _([200, 300, 400, 500, 600, 700, 800, 900, 1000]).shuffle()[0],
						timeout:_([500, 1000, 1500, 2000]).shuffle()[0]
					} );
				});
			});

			// ACERCA DE
			scenes['acercade'] = new ScrollMagic.Scene({
				triggerElement: '.screen.acercade'
			}).on("enter", function(e) {
				emerge( {el:'.screen.acercade h1', duration:600, timeout:500} );
				$('.screen.acercade p strong').css('color', 'rgb(200, 112, 114)');
				$('.screen.acercade p b').css('color', '#379088');
				$('.screen.acercade img.soy-pedro').css('-webkit-filter', 'grayscale(0)');
			});

			// MAPA
			scenes['mapa'] = new ScrollMagic.Scene({
				triggerElement: '.screen.mapa'
			}).on("enter", function(e) {
				animate({el:'.screen.mapa .copy', translateX:-360, duration:600});
				$('.screen.mapa .copy').css('right', 'grayscale(0)');
			});

			_(scenes).each(function(scene, name) {
				scene.addTo( controller );
			});
		}
	},
	// -------------------
	// ****** SCREEN ******
	// -------------------
	screen:{
		adjust:function() {
			var h          = $(window).height(),
				 w          = $(window).width(),
				 photoProp  = 6016 / 4016, // width/height
				 screenProp = w/h,
				 //stillProp  = 1280 / 720; // no more black bars
				 stillProp  = 1280 / 720, // no more black bars
				 em = (w/140);
			$('body').css('font-size', em+'px');
			var wCover = w*1.3,
				 hCover = wCover*(1/photoProp);

			//console.log('hCover', hCover);
			//console.log('h', h);
			//console.log('w', w);
			//console.log('photoProp', photoProp);
			//console.log('screenProp', screenProp);
			
			var delta = (1/screenProp) * 30 * 2.3,
				widthTest = (h*photoProp) - (delta*em);

			//console.log('w:', w);
			//console.log('widthTest:', widthTest);
			if( (hCover < h) && (widthTest > w) ) { //portrait
				img = { width: 'auto', height:'100%', right:'-'+delta+'em', left:'auto', top:0 };
				$('.screen.splash, .screen.cover').addClass('portrait');
			} else { //landscape
				if(widthTest <= w) {
					img = { width:(wCover*1.2)+'px', height:(hCover*1.2)+'px', right:'auto', left:'-15em', top:'-13em' };
				} else {
					img = { width:wCover+'px', height:hCover+'px', right:'auto', left:0, top:0};
				}
				$('.screen.splash, .screen.cover').removeClass('portrait');
			}

			$('.screen, .screen.acercade .copy, .screen.acercade .foto').css('height', h);
			$('.screen.nosotros').css('line-height', h+'px');
			$('.screen.cover, .screen.splash').css({
				//height: (hCover < h ? hCover : h)
				//height: (hCover < h ? : '100%' : h)
			}).find('img.kumafoto').css( img );

			KUMA.video.height = h*0.65;
			KUMA.video.width = KUMA.video.height*stillProp;

			$('#ytplayer').css({
				height: KUMA.video.height,
				width: KUMA.video.width,
				left:((w-KUMA.video.width)/2) - 20
			});
			$('.screen.video .theater').css('height', KUMA.video.height + parseInt($('#ytplayer').css('top')));
			$('.screen.video .sidebar').css('width', (w - KUMA.video.width)/2);

			if($('#fullpage.home').length > 0) {
				KUMA.scroll.boot();
			}
		},
		boot:function() {
			KUMA.screen.adjust();
			$(window).resize( KUMA.screen.adjust );
		}
	}
};
$( KUMA.boot );