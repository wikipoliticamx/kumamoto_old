var KUMA = {
	boot:function() {
		var where = KUMA.data.where = $('#fullpage').attr('class');
		$('.header .where div.'+where).addClass('active');

		KUMA.screen.boot();
		KUMA.fullPage.boot();
		KUMA.motion.boot(where);

		$('#veda').click(function() {
			$(this).hide();
		});

		$('.navbar a.'+where).addClass('active');
		if(where == 'home') {
			KUMA.nosotros.boot();
			KUMA.video.boot();
		} else {
			if(where == 'propuestas') {
				KUMA.expand.boot();
			} else if (where == 'compromisos') {
				KUMA.expand.boot();
			} else if (where == 'principios') {
			}
		}
	},
	// ----------------------
	// ****** FULL PAGE ******
	// ----------------------
	fullPage: {
		boot:function() { var o = KUMA.fullPage.options;
			if( !_(['kit', 'privacidad']).contains(KUMA.data.where) ) {
				KUMA.fullPage.extractAnchors();
				o.afterLoad = KUMA.fullPage.onEnter;
				o.onLeave = KUMA.fullPage.onLeave;
				//if(KUMA.mobileNotIpad && (KUMA.data.where == 'home')) {
					//o.autoScrolling = false;
				//}
				$('#fullpage').fullpage( o );
			} else {
				$('#goodbye').hide();
				$('html, body').css('overflow', 'visible');
			}
		},
		extractAnchors:function() { var anchors = [];
			$('#menu a').each(function() {
				anchors.push( $(this).data('menuanchor') );
			});
			KUMA.fullPage.options.anchors = anchors;
		},
		scroll:{
			home:{
				once:function(section){ var emerge = KUMA.motion.emerge;
					if(section == 'video') {
						emerge( {el:'.screen.video h1 .los', duration:300, timeout:200} );
						emerge( {el:'.screen.video h1 .muros', duration:600, timeout:500} );
						emerge( {el:'.screen.video h1 .si', duration:600, timeout:1000} );
						emerge( {el:'.screen.video h1 .caen', duration:600, timeout:1500} );
						emerge( {el:'.screen.video p', duration:900, timeout:500} );
						$('.screen.video p strong').css('color', 'rgb(152, 95, 96)');
						KUMA.mobile && $('#veil').show();
					} else if(section == 'nosotros') {
						KUMA.nosotros.emerge();
					} else if(section == 'lo-que-se-dice-de-nosotros') {
						animate({el:'.screen.medios .medio.yonofui', translateX:'96em', duration:800});
						animate({el:'.screen.medios .medio.milenio', translateX:'-96em', duration:600});
						animate({el:'.screen.medios .medio.informador', translateX:'96em', duration:1200});
						$('.medios .citas strong').css('color', 'rgb(200, 112, 114)');
						if( !_(['portrait', 'tallNarrow']).contains( $('body').data('orientation') )) {
							setTimeout(function() {
								animate({el:'.screen.medios .carton, .screen.medios .ferrizStill', translateX:'-26em', duration:1200});
							}, 2000);
						}
						_($('.screen.medios .logos a')).chain().shuffle().each(function(logo) {
							emerge( {el:logo, 
								duration: _([200, 300, 400, 500, 600, 700, 800, 900, 1000]).shuffle()[0],
								timeout:_([500, 1000, 1500, 2000]).shuffle()[0]
							} );
						});
					} else if(section == 'nos-asesoran') {
						//animate({el:'.screen.asesores .left p', translateX:'60em', duration:1200});
						//animate({el:'.screen.asesores .right p', translateX:'-60em', duration:1200});
						$('.left, .right').find('.asesor').each(function() {
							var frase = $(this).find('p').text();
							if(KUMA.mobileNotIpad) {
								new Opentip($(this).find('.card'), frase, KUMA.nosotros.faceStyle);
							}
						});
					} else if(section == 'soy-pedro') {
						emerge( {el:'.screen.acercade h1', duration:600, timeout:500} );
						$('.screen.acercade p strong').css('color', 'rgb(200, 112, 114)');
						$('.screen.acercade p b').css('color', '#379088');
						//$('.screen.acercade img.soy-pedro').css('-webkit-filter', 'grayscale(0)');
					} else if(section == 'distrito-10') {
						animate({el:'.screen.mapa .copy', translateX:'-35em', duration:600});
					}
				},
				always:function(section) {
					if(section == 'inicio') {
					} else if(section == 'video') {
						(!KUMA.mobile) && KUMA.video.play();
					}
				}
			}
		},
		onEnter:function(section, index) { 
			var screen = $('.screen:eq('+(index-1)+')');
			KUMA.fullPage.updateTitle(section);
			if(KUMA.data.where == 'home') {
				if(!screen.data('already')) { //first time
					KUMA.fullPage.scroll.home.once(section);
					screen.data('already', true);
					Ps.initialize ( $('.video .thumbs')[0] );
				}
				KUMA.fullPage.scroll.home.always(section);
			} else if( _(['principios', 'propuestas', 'compromisos']).contains(KUMA.data.where) ) {
				var url = KUMA.data.root+KUMA.data.where+'/'+section+'/';
				if((!screen.data('already'))) { //first time
					KUMA.fbContainer = screen.find('.fb-container');
					KUMA.fbContainer.html(
						'<div class="fb-like" data-href="'+url+'" data-width="100%" data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div>'+
						'<div class="fb-comments" data-href="'+url+'" data-width="100%" data-numposts="15" data-colorscheme="light"></div>'
					).after(
						'<div class="fb-phrase">Esta candidatura independiente<br> se construye con <strong>tus ideas</strong>.<br> <small>Comenta aquí sobre '+($('#menu a.active').data('frase')||'')+'.</small></div>');
					if (typeof FB !== 'undefined') {
						FB.XFBML.parse( KUMA.fbContainer[0] );
					}
					if(screen.find('.fb').length > 0) {
						Ps.initialize ( screen.find('.fb')[0] );
					}
					screen.data('already', true);
				}
			}
			KUMA.fullPage.sayGoodbye(section);
		},
		updateTitle:function(section) {
			var title = $('#menu [data-menuanchor='+section+'] strong').text();
			document.title = title + ' | '+ KUMA.data.originalTitle;
		},
		sayGoodbye:function(section) {
			var sections = KUMA.fullPage.options.anchors;
			//console.log('goodbye!', section);
			if(section == sections[sections.length-1]) {
				$('#goodbye').addClass('emerge');
			} else {
				$('#goodbye').removeClass('emerge');
			}
		},
		onLeave:function(anchor, index, slideIndex, direction) {
			var sections = KUMA.fullPage.options.anchors, 
				section = sections[anchor-1];
			ga('send', 'pageview', location.pathname + location.hash);
			//console.log('leaving section', section);
			//console.log('leaving index', index);
			//console.log('leaving anchor', anchor);
			if(section == 'video') {
				KUMA.video.pause();
			} else if((section == 'nosotros') || (section == 'asesores')) {
				_(Opentip.tips).each(function(tip) { tip.hide(); });
			}
		},
		options:{
			//Navigation
			menu: '#menu',
			//autoScrolling:false,
			//anchors:['firstSlide', 'secondSlide'],
			//navigation: true,
			//navigationPosition:'right',
			css3:true,
			animateAnchor:false,
			verticalCentered: false,
			recordHistory:true,
			//scrollOverflow:true,
			//scrollBar:true, //this shouldn't break everything but it does!
			keyboardScrolling:true,
			//loopHorizontal:true
			//responsive:900,
			fixedElements:'#goodbye'
		}
	},
	// ----------------------
	// ****** NOSOTROS ******
	// ----------------------
	nosotros:{
		miembros:[
			['alaide', 'Nos dijeron que la política era de <b>otros</b> y había una sola forma de hacerla, pero tenemos todas las posibilidades al alcance de nuestra mano.', 0, 0],
			['ale', 'Tenemos que comenzar a creer que nuestra realidad es <b>transformable</b> y que se pueden construir cosas bonitas a partir de la indignación.', 0, 2],
			['armando', 'Esta campaña es nuestra mejor oportunidad para sacar a los <b>cínicos</b> del gobierno y recuperar las riendas del futuro', 0, 9],
			['alex', 'Utilizaré todas las opciones y oportunidades para ir en contra de <b>lógicas perniciosas</b>. Creando un proyecto de deseo en la realidad.', 0, 3],
			['alvaro', 'Los partidos actuales <b>no nos representan</b> y si no tomamos los ciudadanos las riendas, ellos las tomarán por nosotros.', 0, 4],
			['amairani', 'Haré todo lo que esté en mis manos para que los ciudadanos hagamos <b>propia</b> la política, y qué mejor que hacerlo con un equipo como éste.', 0, 5],
			['ana', 'Quiero demostrar que la política <b>ni apesta ni es grotesca</b>. Quiero retar con una campaña modelo a todos aquellos que lo olvidaron.', 0, 7],
			['ana-gaby', '<b>Amo</b> a México mi país. Basta de tolerancia a un gobierno criminal.', 0, 6],
			['angel', 'Creo necesaria una democracia participativa y austera. El sistema actual debe cambiar, y <b>no</b> lo hará <b>solo</b>.', 0, 8],
			['benjamin', 'Soy un creyente de que el pais se construye desde la ciudadania. Me <b>motiva</b> trabajar con gente que desea un mejor Mexico.', 1, 0],
			['camila', 'Es hora de replantear lo que significa hacer política, y eso nos toca a nosotros y <b>a nadie más</b>.', 1, 1],
			['damian', 'Los partidos no nos representan, representan <b>cúpulas</b> de poder que tienen secuestrada la democracia. Llegó el momento de los independientes.', 1, 2],
			['daniel', 'Las decisiones que marcan el rumbo de nuestra ciudad, región o país, deben ser tomadas <b>por y para los ciudadanos</b>, no por los partidos.', 1, 4],
			['dani', 'Creo que es <b>responsabilidad</b> de todas las personas conscientes de la situación actual del país participar en esta lucha a lado de Kumamoto.', 1, 3],
			['darlen', 'Me gusta señalar lo que está mal pero también tomo responsabilidad construyendo para cambiarlo. Aquí encontré <b>la forma</b> y <b>las personas</b> para hacerlo.', 1, 5],
			['david', 'Estoy cansado de la situación que atraviesa nuestro país, pero todavía más de ser un simple espectador.', 5, 0],
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
			['marce', 'Porque la política trabajando con ellos es un ejercicio colectivo de <b>generosidad</b>.', 3, 2],
			['mina', 'Porque quienes le estamos dando nuestro apoyo, aun siendo camaradas, lo tendremos en la mira. Y Kumamoto lo sabe y busca esa <b>crítica</b> que hace crecer.', 3, 6],
			['miguel', 'Para generar un cambio, alguien debe tirar <b>la primer ficha</b> del dominó.', 3, 5],
			['nayeli', '<b>Ser joven</b> significa ser dueños de nuestra vida, de nuestro presente y estar dispuestos a desafiar nuestro porvenir.', 3, 7],
			['pabli', 'Quiero tener la oportunidad de <b>incidir</b> en la política, de forma y fondo, desde la innovación y la acción critica.', 3, 8],
			['pablo', 'Debemos tomar todas las oportunidades posibles para cambiar nuestras realidades. Se trata de creer en nosotros mismos y <b>no en terceros</b>.', 3, 9],
			['paola', 'Estoy convencida que este proyecto es un medio de empoderamiento del ciudadano, por la <b>valentía</b> de levantar la voz y actuar.', 4, 0],
			['pau', 'Tenemos que dejar a un lado la indiferencia y empezar a involucrarnos para poder tener la democracia que nos <b>merecemos</b>.', 4, 1],
			['pepe', 'El primer paso para humanizar nuestra sociedad es volver a <b>enamorarnos</b> de la política.', 4, 3],
			['roberto', 'Ocupar es más que un lema, es <b>devolver</b> la toma de decisiones a la ciudadanía sobre su futuro y la ciudad que queremos.', 4, 4],
			['rodrigo', 'Creo que debemos de crear la politica que haga posible la <b>vida en común</b>. Nuestra realidad demanda de nosotros actuar aquí y ahora.', 4, 5],
			['sofia-1', 'La política la construimos <b>todos</b> y estando informados e involucrados podremos generar verdadera política y prácticas más incluyentes y benéficas para la mayoría.', 4, 6],
			['susy', 'Necesitamos preguntarnos qué sigue <b>después</b> de nuestro hartazgo. Nadie lo hará por nosotros.', 4, 8],
			['diego', 'A falta de una opción digna y auténtica, ahora podemos construir una colectivamente, como <b>nunca</b> se ha intentado y cuando más se necesita.', 1, 6],
			['alberto', 'Estoy aquí porque creo que mi generación se perdió en la cotidianidad y <b>conformismo</b>. Confío en Kuma y su equipo para hacer mejor las cosas.', 0, 1],
			['mariela', 'La mejor manera de acrecentar nuestra democracia es hacerla <b>nuestra</b>. De los ciudadanos. Necesitamos caminar en esa dirección aquí y ahora.', 3, 4]
		],
		emerge:function() { var i = 0;
			_(KUMA.nosotros.miembros).chain().shuffle().each(function(miembro) { i+=1; var nombre = miembro[0], xq = miembro[1];
				KUMA.motion.emerge( {el:'.screen.nosotros .galaxia div.wiki[data-name='+nombre+']', 
					duration: _([200, 300, 400, 500, 600, 700, 800, 900, 1000]).shuffle()[0],
					timeout:_([500, 1000, 1500, 2000]).shuffle()[0]
				} );
			});
		},
		faceStyle:{ 
			target:true,
			delay:0,
			background:'#fff',
			borderColor:'#ccc',
			style:'dark',
			//'hideTrigger':'closeButton',
			tipJoint:'left',
			stem:'left', 
			stemLength:20,
			stemBase:20,
			group:'nosotros'
		},
		boot:function() { var galaxia = $('.screen.nosotros .galaxia'), i = 0;
			_(KUMA.nosotros.miembros).chain().shuffle().each(function(miembro) { i+=1; var nombre = miembro[0], xq = miembro[1], x = miembro[2], y = miembro[3];
				galaxia.append('<div class="wiki" data-name="'+nombre+'" data-why="'+xq+'"><span>'+nombre.replace(/\-\d/,'').replace(/-/,' ')+'</span><img src="/img/dot.png" style="background-position:'+(y*-150)+'px '+(x*-150)+'px" data-x="'+x+'" data-y="'+y+'" /></div>');
				var face = galaxia.find('div.wiki:last');
				if(xq) {
					new Opentip(face, '<strong>ESTOY AQUÍ PORQUE:</strong><span>'+xq, KUMA.nosotros.faceStyle);
				}

				if(i==20) {
					$('.screen.nosotros h1').detach().insertAfter('.screen.nosotros .galaxia div.wiki:eq('+(i-1)+')')
				}
			});
			KUMA.nosotros.adjust();
			var egg = "&laquo;I was raised up believing I was somehow unique / Like a snowflake distinct among snowflakes, unique in each way you can see / And now after some thinking, I'd say I'd rather be / A functioning cog in some great machinery serving something beyond me&raquo;"
//'Sobre cuándo se es ya parte innegable de esta red de voluntarios que es la wiki, Franco de Vita debió haber cantado algo así como:<br /><br /> &laquo;Si le he dado todo lo que tengo,<br /> <nobr>hasta quedar en deuda conmigo misme,</nobr><br /> y todavía preguntas, si soy wiki,<br /> tú de que vas.<br /><br /> Si no hay un minuto de mi tiempo,<br /> que no me pase por el pensamiento,<br /> y todavía preguntas si soy wiki.&raquo;';
			new Opentip($('.screen.nosotros h1 img'), egg, {style:'glass'});
		},
		adjust:function() { var galaxia = $('.screen.nosotros .galaxia');
			var prop =  {normal:0.84, shortWide:0.72, portrait:1.2, boxy:0.84, tallNarrow:1.44}[$('body').data('orientation')]; // faceSide / 12.5em
				scale = (KUMA.data.em/12)*prop,
				w = 1500, //sprite width
				h = 900; //sprite height

			galaxia.find('div.wiki img').each(function() { var img = $(this), x = img.data('x'), y = img.data('y');
				img.css( {
					'background-size':(w*scale)+'px '+(h*scale)+'px',
					'background-position':(y*-150*scale)+'px '+(x*-150*scale)+'px'
				});
			});

			var orientedI = {normal:19, shortWide:19, portrait:20, boxy:19, tallNarrow:18}[$('body').data('orientation')];
			if( galaxia.find('div.wiki').length > 0) {
				$('.screen.nosotros h1').detach().insertAfter(galaxia.find('div.wiki:eq('+(orientedI)+')'));
			}

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
		cover:function() { var c = $('.screen:first');
			var emerge = KUMA.motion.emerge;
			setTimeout(function() {
				emerge( {el:c.find('.copy img'), duration:200, timeout:500} );
				emerge( {el:c.find('h3'), duration:800, timeout:800} );
				animate({el:c.find('h1.pedro'), translateY:'3.33em', duration:700});
				$(c.find('img.kumafoto')).css('transition', 'all 4s ease')
					.css('-webkit-filter', 'blur(0)');
			}, 200);
			setTimeout(function() {
				emerge( {el:c.find('h1.kumamoto'), duration:900, timeout:100} );
			}, 500);
			setTimeout(function() {
				c.find('h3 strong').css('color', 'rgb(152, 95, 96)');
				animate( {el:c.find('h2'), translateX:'18.34em', duration:800});
				emerge(  {el:c.find('a.fb img'), timeout:700} );
				emerge(  {el:c.find('a.twitter img'), timeout:400} );
				emerge(  {el:c.find('a.instagram img'), timeout:800} );
				animate( {el:c.find('a.principios'), translateY:'-12em', duration:800});
				animate( {el:c.find('a.compromisos'), translateY:'-12em', duration:600});
				animate( {el:c.find('a.propuestas'), translateY:'-12em', duration:1200});
				animate( {el:c.find('.kitkumamoto'), translateX:'-33em', duration:1200});
			}, 1500);
			setTimeout(function() {
				c.find('img.kumafoto, h3 span').css('transition', 'none');
			}, 4000);
		},
		rest:function() { var c = $('.screen:first');
			animate( {el:c.find('a.principios'), translateY:'-12em', duration:800});
			animate( {el:c.find('a.compromisos'), translateY:'-12em', duration:600});
			animate( {el:c.find('a.propuestas'), translateY:'-12em', duration:1200});
		},
		boot:function(where) { var m = KUMA.motion;
			if((where == 'home') || (where == 'splash')) {
				m.cover();
			} else {
				m.rest();
			}
		}
	},
	mobile: /(iPad|iPhone|iPod|Android)/g.test( navigator.userAgent ),
	mobileNotIpad: /(iPhone|iPod|Android)/g.test( navigator.userAgent ),
	// -------------------
	// ****** VIDEO ******
	// -------------------
	video: {
		boot:function() { var v = $('.screen.video');
			v.find('.thumbs img').click(KUMA.video.load);
			v.find('.thumbs img:first').addClass('active');
			if(KUMA.mobile) {
				v.find('.soundToggle').click('');
				$('#veil').show().click(function() { 
					$(this).hide();
				}); //hack to fix scrolling on mobile
			} else {
				v.find('.soundToggle').click(KUMA.video.soundToggle);
				$(window).blur( KUMA.video.blur );
			}
			v.find('.replay').click(function() {
				KUMA.video.load.call( v.find('.thumbs img.active')[0] );
			});
		},
		youtube:function() {
			// Load the IFrame Player API code asynchronously.
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/player_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			window.onYouTubeIframeAPIReady = function()  {
				var firstThumb = $('.screen.video .sidebar .thumbs img:first');
				KUMA.video.updateMeta( firstThumb );
				KUMA.player = new YT.Player('ytplayer', {
					videoId: firstThumb.data('youtube'),
					playerVars:{
						controls:'0',
						showinfo:'0',
					},
					events:{
						onReady:KUMA.video.ready,
						onStateChange:KUMA.video.change
					}
				});
			}
		},
		height:700,
		width:500,
		ready:function() { var p = KUMA.player;
			if(!KUMA.mobile) {
				p.playVideo();
				p.pauseVideo();
				KUMA.video.afterReady && KUMA.video.afterReady();
			}
		},
		blur:function() { var p = KUMA.player;
			if(typeof p != 'undefined') {
				p.pauseVideo();
				(!KUMA.mobile) && p.unMute();
			}
		},
		soundToggle:function() { var p = KUMA.player;
			if(p.isMuted()) {
				(!KUMA.mobile) && p.unMute();
				$(this).addClass('unMuted').removeClass('muted');
			} else {
				(!KUMA.mobile) && p.mute();
				$(this).addClass('muted').removeClass('unMuted');
			}
		},
		_play:function() { var p = KUMA.player;
			p.playVideo();
			if($('.soundToggle.muted').length > 0) {
				(!KUMA.mobile) && p.mute();
			}
		},
		play:function() { var p = KUMA.player;
			if(typeof p != 'undefined') {
				KUMA.video._play();
			} else {
				KUMA.video.afterReady = KUMA.video._play;
			}
		},
		pause:function() { var p = KUMA.player;
			if(typeof p != 'undefined') {
				p.pauseVideo();
				if($('.soundToggle.unMuted').length > 0) {
					(!KUMA.mobile) && KUMA.player.unMute();
				}
			}
		},
		change:function(state) {
			KUMA.video.state = state;
			if(state.data == 0) { //ended
				var next = $('.screen.video .thumbs img.active').next()[0];
				if(next) {
					next.click();
				} else {
					$('#ytplayer').css('visibility', 'hidden');
				}
			} else if(state.data == 1) { //playing
				if(!KUMA.player.isMuted()) {
					$('.screen.video .soundToggle').addClass('unMuted').removeClass('muted');
				}
				KUMA.mobile && $('#veil').show();
			} else if(state.data == -1) { //unstarted
				//weird that I need to do this now, I didn't used to need to
				if( KUMA.video.afterLoad ) {
					KUMA.player.playVideo();
					KUMA.video.afterLoad = false;
				}
			}
		},
		updateMeta:function(thumb) {
			$('.screen.video .theater .date a').text( thumb.attr('title') ).add('.screen.video .theater .fb').
					attr('href', thumb.data('fb'));
		},
		load:function() {
			$('#ytplayer').css('visibility', 'visible');
			KUMA.player.loadVideoById( $(this).attr('data-youtube') );
			$('.screen.video .thumbs img').removeClass('active');
			KUMA.video.updateMeta( $(this) );
			KUMA.video.afterLoad = true;
			$(this).addClass('active');
		}
	},
	// -------------------
	// ****** EXPAND leer mas ******
	// -------------------
	expand:{
		boot:function() {
			$('p:has(span.hidden),li:has(span.hidden)').addClass('mas').append(function() {
				$(this).append(
					'<a href="javascript:void(null)" class="leer-mas">'+
						'<span class="mas">+<span class="label"> LEER MÁS</span></span>'+
						'<span class="menos">-<span class="label"> LEER MENOS</span></span>'+
					'</a>'
				).click(KUMA.expand.toggle);
			});
		},
		toggle:function() { var that = $(this);
			KUMA.that = that;
			if(that.hasClass('mas')) {
				that.parents('.screen').find('p, li').each(function() {
					if($(this).hasClass('menos')) { 
						$(this).removeClass('menos').addClass('mas');
					}
				});
				that.removeClass('mas').addClass('menos');
			} else {
				that.removeClass('menos').addClass('mas');
			}
		}
	},
	data:{
		em:12,
		prop:{}
	},
	// -------------------
	// ****** SCREEN ******
	// -------------------
	screen:{
		maxCenterWithinContainer:function(img, container){ var css;
			if(typeof container == 'undefined') {
				container = $(window);
			}

			var prop = img.width()/img.height();
			//if(img.attr('src').match(/robert/)) {
				//console.log('ch', container.height());
				//console.log('cw', container.width());
				//console.log('iw', img.width());
				//console.log('ih', img.height());
			//}

			if( (container.height()*prop) >= container.width()) {
				css = {
					height: container.height(),
					width:'auto',
					left: (container.width()-(container.height()*prop))/2,
					top:0
				};
			} else {
				css = {
					height: 'auto',
					width: container.width(),
					left:0,
					top: (container.height()-(container.width()*(1/prop)))/2
				};
			}

			img.css(css);
		},
		cover:function() {
			var data = KUMA.data, v = KUMA.video, em = KUMA.data.em;
			data.prop.homeVideo = 1280 / 720; // w/h no more black bars

			KUMA.screen.detect.coverOrientation();

			$('.screen, .screen.acercade .copy, .screen.acercade .foto').css('height', data.h);
			$('.screen.nosotros').css('line-height', data.h+'px');
			$('.screen.cover, .screen.splash').find('img.kumafoto').css( img );

			v.height = data.h*0.65;
			v.width = v.height * data.prop.homeVideo;
			
			if(v.width > data.w) {
				v.width = data.w * 0.95;
				v.height = v.width * (1/data.prop.homeVideo);
			}

			$('#ytplayer, #veil').css({
				height: v.height,
				width: v.width,
				left:((data.w-v.width)/2)
			});

			$('.screen.video .fb').css({
				left:((data.w-v.width)/2)-(1*em),
				top:v.height+(0.5*em)
			});

			var sidebarWidth = (data.w - v.width)/2
			$('.screen.video .date').css('padding-right', sidebarWidth+30);
			var ytplayerBottom = v.height + parseInt($('#ytplayer').css('top'));

			if( _(['boxy', 'portrait', 'tallNarrow']).contains( $('body').data('orientation') ) ) {
				$('#veda div').css('font-size','2.5em');
				$('#veda span.close').css('padding-bottom','0.5em');
				$('.screen.video .sidebar').css('top', ytplayerBottom + (1*em));
				ytplayerBottom += (8*em)*1;
				$('.screen.video .sidebar').css('width', '100%');
				$('#ytplayer').css('left', $('#ytplayer').css('left')+20+(2*em));
			} else {
				$('#veda div').css('font-size','1.2em');
				$('#veda span.close').css('padding-bottom','0');
				$('.screen.video .sidebar').css('top', 0);
				$('.screen.video .sidebar').css('width', sidebarWidth);
			}

			if( _(['boxy']).contains( $('body').data('orientation') ) ) {
				$('#veda div').css('font-size','2em');
				$('#veda span.close').css('padding-bottom','0.5em');
			}
			
			$('.screen.video .theater').css('height', ytplayerBottom);
		},
		propuestas:function() {
			$('.video, .text, .fb, .screen').css('height', KUMA.data.h);
			$('.screen .video').each(function() {
				KUMA.screen.maxCenterWithinContainer($(this).find('img'), $(this)); 
			});
			KUMA.screen.maxCenterWithinContainer($('img.ciudad'), $('.screen.ciudad'));
			KUMA.screen.maxCenterWithinContainer($('img.gobierno'), $('.screen.gobierno'));
		},
		detect:{
			coverOrientation:function() { var data = KUMA.data;
				data.prop.coverPhoto  = 6016 / 4016; // w/h

				var wCover = data.w*1.3,
					hCover = wCover*(1/data.prop.coverPhoto),
					delta = (1/data.prop.screen) * 30 * 2.3,
					widthTest = (data.h * data.prop.coverPhoto) - (delta* data.em);

				//console.log('delta', delta);
				//console.log('wCover', wCover);
				//console.log('hCover', hCover);
				//console.log('em', data.em);
				//console.log('h', data.h);
				//console.log('prop cover', data.prop.cover);
				//console.log('widthTest', widthTest);

				//set Portrait
				if( (hCover < data.h) && (widthTest > data.w) ) { //portrait
					img = { width: 'auto', height:'100%', right:'-'+delta+'em', left:'auto', top:0 };
					$('.screen.splash, .screen.cover').addClass('portrait');
				} else { //landscape
					if(widthTest <= data.w) {
						img = { width:(wCover*1.2)+'px', height:(hCover*1.2)+'px', right:'auto', left:'-15em', top:'-13em' };
					} else {
						img = { width:wCover+'px', height:hCover+'px', right:'auto', left:0, top:0};
					}
					$('.screen.splash, .screen.cover').removeClass('portrait');
				}
			},
			portraitLandscape:function() { var data = KUMA.data;
				var orientations = 'shortWide normal boxy portrait tallNarrow',
					clear = function() {
						$('body').removeClass(orientations);
					},
					prop = data.prop.screen;
				if(KUMA.mobileNotIpad) {
					$('body').addClass('mobileNotIpad');
				} else {
					$('body').removeClass();
				}
				clear();
				if(prop >= 1.815) { //1366/696;
					//console.log('shortWide!', prop);
					$('body').addClass('shortWide').data('orientation', 'shortWide');
				} else if(prop >= 1.5) { //base
					//console.log('normal!', prop);
					$('body').addClass('normal').data('orientation', 'normal');
				} else if(prop >= 1) {
					//console.log('boxy!', prop);
					$('body').addClass('boxy').data('orientation', 'boxy');
				} else if(prop >= 0.7) {
					//console.log('portrait!', prop);
					$('body').addClass('portrait').data('orientation', 'portrait');
				} else {
					//console.log('tallNarrow!', prop);
					$('body').addClass('tallNarrow').data('orientation', 'tallNarrow');
				}
				//KUMA.fullPage.boot();
				//$('.screen.acercade h1').html( $('body').data('orientation') +' '+prop );
			}
		},
		adjust:function() { var where = KUMA.data.where, data = KUMA.data, screen = KUMA.screen;
			data.w = $(window).width();
			data.h = $(window).height();
			data.em = data.w/140; // 12 is the base
			data.prop.screen = data.w/data.h;

			$('body').css('font-size', data.em+'px');

			screen.detect.portraitLandscape();

			$('.screen').css('height', data.h);
			if((where == 'home') || (where == 'splash')) {
				screen.cover();
				screen.maxCenterWithinContainer($('.yo-kuma .foto img'), $('.yo-kuma .foto'));
				screen.maxCenterWithinContainer($('.screen.mapa a.mapa img'), $('.screen.mapa'));
			} else {
				var fbWidth = Math.min(Math.max(data.w*0.3, 450), 545);
				if(where == 'propuestas') {
					screen.propuestas();
					//$('.screen .fb').css('width', fbWidth );
					//$('.screen .text').css('width', ((data.w - fbWidth)*0.6)-5 );
					//$('.screen .video').css('width', ((data.w - fbWidth)*0.4)-5 );

				} else if(where == 'compromisos') {

					screen.maxCenterWithinContainer($('img.kuma-benji'), $('.screen.bienvenida'));
				} else if(where == 'principios') {
				}
				if(_(['principios', 'propuestas', 'compromisos']).contains(where)) {
					if($('body').data('orientation') != 'tallNarrow') {
						$('.screen .fb').css('width', fbWidth );
						$('.screen .text').css('width', data.w-fbWidth-5 );
					} else {
						$('.screen .fb').css('width', 0);
						$('.screen .text').css('width', '100%' );
					}
				}
			}
			KUMA.nosotros.adjust();

			$('.screen').css('visibility', 'visible');
		},
		boot:function() {
			KUMA.screen.adjust();
			$(window).resize( KUMA.screen.adjust );
		}
	}
};
$( KUMA.boot );
