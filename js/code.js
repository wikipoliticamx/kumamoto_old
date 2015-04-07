var KUMA = {
	boot:function() {
		setTimeout(function(){ window.scrollTo(0, 1); }, 0); // Hide the address bar!
		//$('#fullpage').fullpage({});
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
			KUMA.gif.boot();
			if(where =~ 'propuestas') {
				KUMA.propuestas.boot();
			} else if (where =~ 'compromisos') {
				KUMA.propuestas.boot();
			}
		}
	},
	// ----------------------
	// ****** NOSOTROS ******
	// ----------------------
	nosotros:{
		miembros:[
			['alaide', 'Nos dijeron que la política era de otros y había una sola forma de hacerla, pero tenemos todas las posiblidades al alcance de nuestra mano.', 0, 0],
			['ale', 'Tenemos que comenzar a creer que nuestra realidad es transformable y que se pueden construir cosas bonitas a partir de la indignación.', 0, 2],
			['armando', 'Esta campaña es nuestra mejor oportunidad para sacar a los cínicos del gobierno y recuperar las riendas del futuro', 0, 9],
			['alex', 'Utilizaré todas las opciones y oportunidades para ir en contra de lógicas perniciosas. Creando un proyecto de deseo en la realidad.', 0, 3],
			['alvaro', 'Los partidos actuales no nos representan y si no tomamos los ciudadanos las riendas, ellos las tomarán por nosotros.', 0, 4],
			['amairani', 'Haré todo lo que esté en mis manos para que los ciudadanos hagamos propia la política, y qué mejor que hacerlo con un equipo como éste.', 0, 5],
			['ana', 'Quiero demostrar que la política ni apesta ni es grotesca. Quiero retar con una campaña modelo a todos aquellos que lo olvidaron.', 0, 7],
			['ana-gaby', 'Yo estoy aquí porque amo a México mi país. Basta de tolerancia a un gobierno criminal.', 0, 6],
			['angel', 'Creo necesaria una democracia participativa y austera. El sistema actual debe cambiar, y no lo hará solo.', 0, 8],
			['benjamin', 'Soy un creyente de que el país se construye desde la ciudadanía. Me inspiró y me motivó ver gente que trabaja por una mejor política sin ninguna pretensión mas que la de aportar su grano de arena.', 1, 0],
			['camila', 'Es hora de replantear lo que significa hacer política, y eso nos toca a nosotros y a nadie más.', 1, 1],
			['damian', 'Los partidos no nos representan, representan cúpulas de poder que tienen secuestrada la democracia. Llegó el momento de los independientes.', 1, 2],
			['daniel', 'Las decisiones que marcan el rumbo de nuestra ciudad, región o país, deben ser tomadas por y para los ciudadanos, no por los partidos.', 1, 4],
			['dani', 'Creo que es responsabilidad de todas las personas conscientes de la situación actual del país participar en esta lucha a lado de Kumamoto.', 1, 3],
			['darlen', 'Me gusta señalar lo que está mal pero también tomo responsabilidad construyendo para cambiarlo. Aquí encontré la forma y las personas para hacerlo.', 1, 5],
			['dulce', '', 1, 7],
			['edgar-1', 'Hacer política no debería ser un estilo de vida sino una práctica diaria para todo aquel que se llame ciudadano.', 1, 8],
			['edgar-2', 'Este proyecto está haciendo todo lo que considero ético y correcto para actuar políticamente. No participar seria una gran incongruencia.', 1, 9],
			['eli', 'Creo que los grandes cambios surgen de equipos tan extraordinarios como el nuestro &mdash;y si perdemos, quiero perder con un equipo así.', 2, 0],
			['fatima', '"Un hombre con una idea nueva es un loco hasta que la idea triunfa" Estoy loca, pero segura de que se construirá un mejor gobierno.', 2, 1],
			['isa', 'Me gusta ver a la gente trabajando por el lugar donde vive. Hay una forma mejor de habitar la ciudad.', 2, 2],
			['joaquin', '', 2, 4],
			['javier', 'Estamos escribiendo la historia de nuestra ciudad y de nuestro Estado; páginas de paz, de esperanza y de construcción.', 2, 3],
			['juan-pedro', 'Quiero hacer algo para aportar a la sociedad, aprender y aplicar todo al entorno en el que vivo.', 2, 5],
			['karin', 'El mal uso que se ah hecho de la política nos volvió apáticos, lograremos hacer una en la que ahora vuelva el interés de participar', 2, 6],
			['pedro', 'Las personas debemos estar al centro de la política, eso es la democracia y ésta es la oportunidad para volverlo realidad.', 4, 2],
			['levhita', 'La historia está hecha de la acumulación de pequeños cambios. Cambios que parecían imposibles pero pues no.', 2, 7],
			['lu', 'Hay que entender el espacio público, físico y simbólico como un "para nosotros, de nosotros."', 2, 8],
			['luis-1', 'Hacer politica es volvernos habitantes del espacio que compartimos.', 2, 9],
			['luis-2', 'Juntos podemos recuperar el control del pais y cambiar los paradigmas que secuestran la política. Es nuestro deber como Ciudadanos Mexicanos.', 3, 0],
			['luis-3', 'Dando lo mejor de mí, habrá un cambio; si somos muchos, es más probable. Tirar el muro es prioridad, hacerlo en equipo es gusto.', 3, 1],
			['mariana', 'Sé que todos de la mano podemos lograr un cambio real. Actuemos juntos y logremos la politica que merecemos', 3, 3],
			['marce', '', 3, 2],
			['mina', '', 3, 6],
			['miguel', '', 3, 5],
			['nayeli', 'Ser joven significa ser dueños de nuestra vida, de nuestro presente y estar dispuestos a desafiar nuestro porvenir.', 3, 7],
			['pabli', 'Quiero tener la oportunidad de incidir en la política, de forma y fondo, desde la innovación y la acción critica.', 3, 8],
			['pablo', 'Debemos tomar todas las oportunidades posibles para cambiar nuestras realidades. Se trata de creer en nosotros mismos y no en terceros.', 3, 9],
			['paola', 'Estoy convencida que este proyecto es un medio de empoderamiento del ciudadano, por la valentía de levantar la voz y actuar', 4, 0],
			['pau', 'Tenemos que dejar a un lado la indiferencia y empezar a involucrarnos para poder tener la democracia que nos merecemos.', 4, 1],
			['pepe', 'El primer paso para humanizar nuestra sociedad es volver a enamorarnos de la política.', 4, 3],
			//['quique', '', 0, 0],
			['roberto', 'Ocupar es más que un lema, es devolver la toma de decisiones a la ciudadanía sobre su futuro y la ciudad que queremos.', 4, 4],
			['rodrigo', 'Creo que debemos de crear la politica que haga posible la vida en común. Nuestra realidad demanda de nosotros actuar aquí y ahora.', 4, 5],
			['sofia-1', 'La política la construimos todos los ciudadanos sin importar tu profesión creo que bajo esta perspectiva podremos desconstruir discursos y prácticas dominantes que sólo benefician a pocos y estando informados e involucrados podremos generar verdadera política y prácticas más incluyentes y benéficas para la mayoría.', 4, 6],
			['sofia-2', '', 4, 7],
			['susy', 'Necesitamos preguntarnos qué sigue después de nuestro hartazgo. Nadie lo hará por nosotros.', 4, 8],
			['diego', 'A falta de una opción digna y auténtica, ahora podemos construir una colectivamente, como nunca se ha intentado y cuando más necesita.', 1, 6],
			['tanya', '', 4, 9],
			['alberto', 'Estoy aquí porque creo que mi generación se perdió en la cotidianidad y conformismo. Confío en Kuma y su equipo para hacer mejor las cosas.', 0, 1],
			['mariela', 'La mejor manera de acrecentar nuestra democracia es hacerla nuestra. De los ciudadanos. Necesitamos caminar en esa dirección aquí y ahora.', 3, 4]
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
				galaxia.append('<a href="javascript:void(null)" data-name="'+nombre+'" data-why="'+xq+'"><span>'+nombre.replace(/\-\d/,'').replace(/-/,' ')+'</span><img src="img/dot.png" style="background:url(img/nosotros/sprite-nosotros-400kb.jpg) '+(y*-150)+'px '+(x*-150)+'px" /></a>');
				
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
				animate({el:' h2', translateX:'18.34em', duration:800});
				emerge( {el:'a.fb img', timeout:700} );
				emerge( {el:'a.twitter img', timeout:400} );
				emerge( {el:'a.instagram img', timeout:800} );
				animate({el:'a.principios', translateY:-140, duration:800});
				animate({el:'a.compromisos', translateY:-140, duration:600});
				animate({el:'a.propuestas', translateY:-140, duration:1200});
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
				KUMA.player.pauseVideo();
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
				$('.screen.splash').addClass('portrait');
			} else { //landscape
				if(widthTest <= w) {
					img = { width:(wCover*1.2)+'px', height:(hCover*1.2)+'px', right:'auto', left:'-15em', top:'-13em' };
				} else {
					img = { width:wCover+'px', height:hCover+'px', right:'auto', left:0, top:0};
				}
				$('.screen.splash').removeClass('portrait');
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
