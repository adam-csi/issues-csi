
$(document).ready(function() {
	var stickyNavTop = $('.nav').offset().top;

	var stickyNav = function(){
		var scrollTop = $(window).scrollTop();

		if (scrollTop > stickyNavTop) {
	    $('.nav').addClass('sticky');
		} else {
	    $('.nav').removeClass('sticky');
		};

		stickyNav();

		$(window).scroll(function() {
	    stickyNav();
		});
	};
    /*
        Fullscreen background
    */
    $.backstretch("assets/img/backgrounds/1.jpg");

    /*
	    Contact form
	*/
	$('.contact-form form input[type="text"], .contact-form form textarea').on('focus', function() {
		$('.contact-form form input[type="text"], .contact-form form textarea').removeClass('input-error');
	});
	$('.dropdown-menu a').on('click', function(){
    $('.dropdown-toggle').html($(this).html() + '<span class="caret"></span>');
	})
	$('.contact-form form').submit(function(e) {
		e.preventDefault();
	    $('.contact-form form input[type="text"], .contact-form form textarea').removeClass('input-error');
	    var postdata = $('.contact-form form').serialize();
	    $.ajax({
	        type: 'POST',
	        url: 'assets/contact.php',
	        data: postdata,
	        dataType: 'json',
	        success: function(json) {
	            if(json.emailMessage != '') {
	                $('.contact-form form .contact-email').addClass('input-error');
	            }
	            if(json.subjectMessage != '') {
	                $('.contact-form form .contact-subject').addClass('input-error');
	            }
	            if(json.messageMessage != '') {
	                $('.contact-form form textarea').addClass('input-error');
	            }
	            if(json.antispamMessage != '') {
	                $('.contact-form form .contact-antispam').addClass('input-error');
	            }
	            if(json.emailMessage == '' && json.subjectMessage == '' && json.messageMessage == '' && json.antispamMessage == '') {
	                $('.contact-form form').fadeOut('fast', function() {
	                    $('.contact-form').append('<p>Thanks for contacting us! We will get back to you very soon.</p>');
	                    // reload background
	    				$.backstretch("resize");
	                });
	            }
	        }
	    });
	});


});

// var jumboHeight = $('.jumbotron').outerHeight();
// function parallax(){
//     var scrolled = $(window).scrollTop();
//     $('.bg').css('height', (jumboHeight-scrolled) + 'px');
// }
//
// $(window).scroll(function(e){
//     parallax();
// });
