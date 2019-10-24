	/*
  this section is for your stylesheet
  header nav #wt_object {
    position: absolute;
    width: 30px;
    height: 30px;
    background: red;
    border-radius: 50%;
    top: 10px;
    display: none;
    transition: left 0.25s ease-out;
    /* transition-delay: .05s; */
}
*/

//Down Section is for your js file
  
  
  if(menuBall){ menuBall() ; }

	//calling menuBall on window change
	$(window).resize(function(){
		if(menuBall){ menuBall() ; }
	})

	document.querySelector('header nav').addEventListener('touchstart', function(e){
		followCursor();
		setTimeout(function(){
			activeMenuPositionFunc();
		},400)
	});	

	function activeMenuPositionFunc(){
		$('header nav ul li').hide().show();
		let activeMenuPosition = $('header nav ul li.current_page_item').position();

		if(activeMenuPosition){
			if($('header nav ul li.current_page_item').hasClass('wt_event')){
				activeMenuPosition.left = activeMenuPosition.left + 30;
			}else if($('header nav ul li.current_page_item').hasClass('wt_member')){
				activeMenuPosition.left = activeMenuPosition.left - 20;
			}

			$('header nav #wt_object').css('left' , activeMenuPosition.left).show();
		}
	}

	function followCursor(e) {
		
		var s = document.getElementById('wt_object');
		var e = e || window.event;
		if(e.touches){
			s.style.left = (e.touches[0].clientX - 15) + 'px';
		}else{
			s.style.left = (e.clientX - 15) + 'px';
		}	
	}

	function menuBall(){
		activeMenuPositionFunc();

		$('header nav').hover(function(){
			document.querySelector( 'header nav' ).addEventListener( 'mousemove' , followCursor ) ;
		},function(){
			let activeMenuPosition = $('header nav ul li.current_page_item').position();
			if($('header nav ul li.current_page_item').hasClass('wt_event')){
				activeMenuPosition.left = activeMenuPosition.left + 30;
			}else if($('header nav ul li.current_page_item').hasClass('wt_home')){
				activeMenuPosition.left = activeMenuPosition.left - 8;
			}
			$('header nav #wt_object').css('left' , activeMenuPosition.left);
		});
	}
