function stopScrolling( touchEvent ) { touchEvent.preventDefault(); }
//document.addEventListener( 'touchstart' , stopScrolling , false );
document.addEventListener( 'touchmove' , stopScrolling , false );

$(document).ready(function(){

	$('#catalogo .content-info').height($(window).height());
	$(window).resize(function(){
		$('#catalogo .content-info, #magazine, .turn-page p-temporal, .turn-page-wrapper, .page').height($(window).height());
	});


	$('a.menu').each(function(){
		var $t = $(this);
		var href = $t.data('goto');
		if( typeof($(href).data('page')) == 'number' ){
			$(this).data('page',$(href).data('page'));
			//$("#magazine").turn("page",$(href).data('page'));
		}

		/*if( typeof(css_class) == 'string'){
			$("#magazine").turn("page",page);
		}*/
	}).click(function(){
		if( typeof($(this).data('page')) == 'number' ){
			$("#magazine").turn("page",$(this).data('page'));
		}
	});

	var mag = $('#magazine');
	
	// initiazlie turn.js on the #magazine div
	mag.turn({display: 'single', elevation: 0});


	var page_hash = parseInt(window.location.hash.replace('#',''));

	if( typeof(page_hash) == 'number' ){
		$("#magazine").turn("page",page_hash);
	}

	// turn.js defines its own events. We are listening
	// for the turned event so we can center the magazine

	var paginas = $('.hoja').length+1;
	mag.bind('turning', function(e, page, pageObj) {
		
		if(page == 1 && $(this).data('done')){
			$('#site-buttons a.paged.prev').css('display','none');
		} else {
			$('#site-buttons a.paged.prev').css('display','block');
		}

		/*if( page == paginas ){
			$('#site-buttons a.paged.next').css('display','none');
		} else {
			$('#site-buttons a.paged.next').css('display','block');
		}*/

		$('.turn-page-wrapper').removeClass('ui-page').removeClass('ui-body-c');
	});

	mag.bind('turned', function(e, page, pageObj) {
		$('.turn-page-wrapper').removeClass('ui-page').removeClass('ui-body-c');
		attachPDFviewer();
	});

	$('a.paged').click(function(){
		if( $(this).hasClass('next') ){
			$("#magazine").turn("next");
		} else {
			$("#magazine").turn("previous");
		}
	});

	setTimeout(function(){
		// Leave some time for the plugin to
		// initialize, then show the magazine
		mag.fadeTo(500,1);
		$('.turn-page-wrapper').removeClass('ui-page').removeClass('ui-body-c');
	},1000);


	$(window).bind('keydown', function(e){
		
		// listen for arrow keys
		//console.log(e.keyCode);
		if (e.keyCode == 37){
			mag.turn('previous');
		}
		else if (e.keyCode==39){
			mag.turn('next');
		}

	});

	var attachPDFviewer = function(){

		$(".openpdf").click(function(){
	    	var ver_pdf = $(this).data('pdf');
	    	$.fancybox.open([
	    		{ href: 'pdf.html#'+ver_pdf }
	    		],{
				    padding : 0,
				    width: 800,
				    height: 600,
				    type: 'iframe'  
				});
	    	return false;
		});

		$(".ilink").click(function(){
	    	if( typeof($(this).data('page')) == 'number' ){
				$("#magazine").turn("page",$(this).data('page'));
			}
		});
	}


});