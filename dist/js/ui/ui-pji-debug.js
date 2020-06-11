/* author :  an.hyo-ju ( anoju@cntt.co.kr ) in CNTT */
$(function(){
	headUI();
	formUI();
	tableUI();
	tabUI();
	popupUI();
	btnTopUI();
	etcUI();
	scrollItem();
});

//Cookie
function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

//resizeEnd
$(window).resize(function() {
	if(this.resizeTO) {
		clearTimeout(this.resizeTO);
	}
	this.resizeTO = setTimeout(function() {
		$(this).trigger('resizeEnd');
	},300);
});

//scrollEnd
/*$(window).scrollEnd(function(){
	console.log('scrollEnd');
},500);*/
$.fn.scrollEnd = function(callback, timeout) {
	$(this).scroll(function(){
	  var $this = $(this);
	  if ($this.data('scrollTimeout')) {
		clearTimeout($this.data('scrollTimeout'));
	  }
	  $this.data('scrollTimeout', setTimeout(callback,timeout));
	});
};

//addRemoveClass
(function($){
	$.fn.addRemoveClass = function(select,timeAdd,timeRemove){
	  var element = this;
	  var addIt = function(){
		   element.addClass(select);
		};
	  var removeIt = function(){
		   element.removeClass(select);
		};
	  setTimeout(function(){addIt();setTimeout(removeIt,timeRemove);},timeAdd);
	  return this;
	};
}(jQuery));

//head common
var headUI = function(){
	var $header = $('#header'),
		$gnbTxt = $('#gnb a'),
		$lnbTxt = $('#lnb a'),
		$title = document.title;

	if($('#pageTit').length > 0){
		var $pageTit = $('#pageTit').text(),
			$current = $.trim($pageTit);

		document.title = $pageTit + ' | ' +  $title;

		//gnb active
		var $currentIn = false;
		$gnbTxt.each(function() {
			if ( $(this).text() == $current) {
				$(this).parents('li').addClass('active');
				$header.addClass('sub');
				$currentIn = true;
			}
		});
		if($currentIn == false){
			$('#gnb').append('<h3><span>'+$current+'</span></h3>').children('ul').addClass('hide');
		}
	}

	$('.btn_gnb').click(function(e){
		e.preventDefault();
		if($('html').hasClass('gnb_open')){
			$('html').removeClass('gnb_open');
		}else{
			$('html').addClass('gnb_open');
			$('.top_section').hide();
			$('.btn_top_open').closest('li').removeClass('on');
			$('.head_top>.inner>ul>li>ul').hide();
		}
		$('#gnb>ul>li>ul').removeAttr('style');
	});
	$('#gnb').on('click',function(){
		$('html').removeClass('gnb_open');
	}).on('click','>ul',function(e) {
		e.stopPropagation();
	});

	$('.btn_mypage').click(function(e){
		e.preventDefault();
		$(this).next().stop().slideToggle();
	});

	$('#gnb>ul>li>a').on('click',function(e){
		var $winW = $(window).width();
		if($winW <= 1024 && $('html').hasClass('gnb_open')){
			e.preventDefault();
			$(this).next().stop().slideToggle();
			$(this).parent().toggleClass('on').siblings().removeClass('on').find('ul').slideUp();
		}
	});

	$(window).on('load scroll resize',function(){
		var $scrollTop = $(this).scrollTop(),
			$winH = $(window).height(),
			$wrapTop = $('#wrap').offset().top,
			$headerH = $header.outerHeight(),
			$footerH = $('#footer').outerHeight();

		// if(($wrapTop+$headerH) < $scrollTop){
		// 	$header.addClass('fixed');
		// }else{
		// 	$header.removeClass('fixed');
		// }

		$('#gnb>ul>li').removeClass('on');
		$('#gnb>ul>li>ul').removeAttr('style');
		$('#container').css({
			//'padding-top':$headerH,
			'min-height':Math.max(0,($winH-$headerH-$footerH))
		});
	});

	$('.btn_top_open').click(function(e){
		e.preventDefault();
		var $href = $(this).attr('href');

		if($(this).closest('li').hasClass('on')){
			$(this).closest('li').removeClass('on');
			$($href).show();
		}else{
			$(this).closest('li').addClass('on').siblings().removeClass('on');
			$($href).show().siblings('.top_section').hide();
		}
	});

	$('.top_section .btn_close').click(function(e){
		e.preventDefault();
		$('.btn_top_open').closest('li').removeClass('on');
		$('.top_section').hide();
	});
};

/* 폼요소 */
var formUI = function(){
	$('input, textarea').placeholder();

	//checkbox, radio
	$('.checkbox input, .radio input').focus(function(){
		$(this).parent().addClass('hover');
	}).blur(function(){
		$(this).parent().removeClass('hover');
	});

	//inputFile
	$('.inp_file > input').focus(function(){
		$(this).closest('.inp_file').find('.btn_file input').trigger('click');
	});
	$('.inp_file .btn_file .button').click(function(e){
		e.preventDefault();
		$(this).closest('.inp_file').find('.btn_file input').trigger('click');
	});
	$('.inp_file .btn_file input').change(function(){
		$(this).closest('.inp_file').find('> input').val($(this).val());
	});

	spinnerInit();
	datepickerInit();
	tooltipInit();
	selectMake();
	selectMakeUI();
	textareaAutoHeightInit('.textarea-height');
};

var spinnerInit = function(){
	//spinner
	if($('.spinner').size() > 0){
		$( '.spinner' ).spinner({
			min: 1,
			create: function( event, ui ) {
				//add custom classes and icons
				$(this)
				.next().html('<i class="icon icon-plus">더하기</i>')
				.next().html('<i class="icon icon-minus">빼기</i>');
			}
		});
	}

	//inp_spinner
	if($('.inp_spinner').length > 0){
		$('.inp_spinner').each(function(){
			var $this = $(this),
				$min = $this.data('min'),
				$max = $this.data('max'),
				$input = $this.find('.input'),
				$inputVal = $input.val(),
				$btn = $this.find('.btn');

			$input.after('<select class="select" title="수량선택"><option value="0">직접입력</option></select>');
			var $select = $this.find('.select');

			//세팅
			for(var i = $min;i <= $max;i++){
				if(i == $inputVal){
					$select.append($('<option>',{value: i, text: i, selected: 'selected'}));
				}else{
					$select.append($('<option>',{value: i, text: i}));
				}
			}
			if($inputVal == '' ||$inputVal == null){
				$input.val($min);
				$select.val($min);
			}

			//셀렉트
			$select.change(function(){
				var $val = $(this).val();
				if($val == '0'){
					$select.addClass('hide');
					$input.addClass('on').attr("readonly",false).focus();
				}else{
					$input.val($val);
				}
			});

			//숫자 입력시
			$input.change(function(){
				var $val = $(this).val();
				if($min <= $val && $val <= $max){
					$select.val($val).removeClass('hide');
					$input.removeClass('on').attr("readonly",true);
				}else{
					alert($min+'에서 '+$max+'까지만 입력 가능합니다.\n다시 입력해주세요');
					$input.val($min);
					$select.val($min);
				}
			});
			var $firstVal = '';
			$input.focusin(function(){
				$firstVal = $(this).val();
			});
			$input.focusout(function(){
				var $lastVal = $(this).val();
				if($firstVal == $lastVal){
					//console.log($firstVal,$lastVal)
					$select.val($lastVal).removeClass('hide');
					$input.removeClass('on').attr("readonly",true);
				}
			});

			//버튼 클릭
			$btn.click(function(e){
				e.preventDefault();
				var $val = $input.val(),
					$val2 = $select.val();
				if($(this).hasClass('btn_minus')){
					$val--;
					if($val < $min){
						alert('최소수량은 '+$min+'개 입니다.');
						$val = $min;
					}
				}else{
					$val++;
					if($val > $max){
						alert('최대수량은 '+$max+'개 입니다.');
						$val = $max;
					}
				}
				//var last = Math.max($min,Math.min($val,$max))

				$input.val($val);
				$select.val($val);
			});
		});
	}
};

var datepickerInit = function(){
	//datepicker
	if($('.datepicker').size() > 0){
		$( '.datepicker' ).datepicker({
			closeText: '닫기',
			prevText: '이전달',
			nextText: '다음달',
			currentText: '오늘',
			monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			dateFormat: 'yy-mm-dd',
			showMonthAfterYear: true,
			showOn: 'both',
			buttonText: '기간조회',
			changeMonth: true,
			changeYear: true
		});
	}
};

var tooltipInit = function(){
	//tooltip
	$(document).tooltip({
		items:".tooltip, .tooltip-img, [data-tooltip-img]",
		track:true,
		content:function() {
			var element = $( this );
			if(element.is( "[data-tooltip-img]" ) ) {
				var img = element.data('tooltip-img'),
					alt = element.data('tooltip-alt');
				return "<img src='"+ img +"' alt='"+alt+"'/>";
			}
			if(element.hasClass("tooltip-img")){
				return element.attr("alt" );
			}
			if(element.hasClass("tooltip")){
				return element.attr("title");
			}
		}
	});
};

//셀렉트(ui-select) 만들기
var selectMake = function(){
	$("select.ui-select").each(function(){
		var classes = $(this).attr("class"),
			id      = $(this).attr("id"),
			name    = $(this).attr("name");
		if($(this).is(':visible')){
			var template  = '<div class="' + classes + '">';
				template += '<a href="#" class="ui-select-trigger">' + $(this).attr("placeholder") + '</a>';
				template += '<ul class="ui-select-options">';
				$(this).find("option").each(function(){
					template += '<li><a href="#" class="ui-select-option" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</a></li>';
				});
				template += '</ul></div>';

			$(this).wrap('<div class="ui-select-wrapper"></div>');
			$(this).hide().after(template);
		}
	});
};

//ui-select UI
var selectMakeUI = function(){
	$(document).on("click",".ui-select-trigger", function(e){
		e.preventDefault();
		$(this).closest(".ui-select").toggleClass("opened");
		$('html').one('click',function(){
			$(".ui-select").removeClass("opened");
		});
		event.stopPropagation();
	});
	$(document).on("click",".ui-select-option", function(e){
	  e.preventDefault();
	  var $val= $(this).data("value"),
		  $select = $(this).closest(".ui-select-wrapper").find("select");

	  //console.log(".ui-select-option : "+$val)
	  $select.val($val);
	  $(this).addClass("selection").parent().siblings().find(".ui-select-option").removeClass("selection");
	  $(this).closest(".ui-select").removeClass("opened").find(".ui-select-trigger").text($(this).text());
	  //console.log(".ui-select : "+$select.val())
	});
};

var textareaAutoHeightInit = function(tar){
	var $text =  $(tar);
	$text.keydown(function() {
		textareaAutoHeight($(this));
	});
	$(window).load(function(){
		$text.each(function() {
			textareaAutoHeight($(this));
		});
	});
};
var textareaAutoHeight = function(tar){
	var $el = tar,
  		$defaultHeight = 32;

  setTimeout(function(){
	$el.css({'height':$defaultHeight});

	var $scrollHeight = $el.prop('scrollHeight') + 2;//border 값때문에 +2
	$el.removeAttr('style').css({'height': + $scrollHeight + 'px'});
  },10);
};

/* TOP 버튼 */
var btnTopUI = function() {
	var settings = {
			button      : '#btnTop',
			text        : '컨텐츠 상단으로 이동',
			min         : 100,
			fadeIn      : 400,
			fadeOut     : 400,
			scrollSpeed : 800,
			easingType  : 'easeInOutExpo'
		};

   $('body').append('<a href="#" id="' + settings.button.substring(1) + '" title="' + settings.text + '">' + settings.text + '</a>');
	$(settings.button+',.btn_top' ).on('click', function( e ){
		e.preventDefault();
		$('html, body').animate({ scrollTop : 0 }, settings.scrollSpeed, settings.easingType );
	})
	.on('mouseenter', function() {
		$( settings.button ).addClass('hover');
	})
	.on('mouseleave', function() {
		$( settings.button ).removeClass('hover');
	});

	$(window).scroll(function() {
		var position = $(window).scrollTop();
		if ( position > settings.min ) { $( settings.button ).fadeIn( settings.fadeIn );  }
		else { $( settings.button ).fadeOut( settings.fadeOut );  }
	});
};

/* table */
var tableUI = function(){
	$('table').on('change','.tbl-chk-all',function(){
		var $table = $(this).closest('table'),
			$chk = $table.find('tbody .tbl-chk');

		if($(this).prop('checked')){
			$chk.prop('checked', true).closest('tr').addClass('on');
		}else{
			$chk.prop('checked', false).closest('tr').removeClass('on');
		}
	});
	$('table').on('change','.tbl-chk',function(){
		var $table = $(this).closest('table'),
			$thChk = $table.find('.tbl-chk-all'),
			$tdChk = $table.find('.tbl-chk'),
			$length = $tdChk.length,
			$checked = $tdChk.filter(":checked").length;

		if( $length == $checked){
			$thChk.prop('checked', true);
		}else{
			$thChk.prop('checked', false);
		}

		if($(this).prop('checked')){
		   $(this).closest('tr').addClass('on');
		}else{
		   $(this).closest('tr').removeClass('on');
		}
	});

	//trClick
	$('.tr_click').on('click','tbody tr',function(){
		var $chk = $(this).find('.tbl-chk');

		$(this).toggleClass('on');
		if($chk.length > 0){
			$chk.trigger('click');
		}
	}).on('click','.tbl-chk, a, button, select, input, select',function(e) {
		e.stopPropagation();
	});
};

/* Tab */
var tabUI = function(){
	var $tab = $('.ui-tabmenu'),
		$wrap = $('.tab_wrap');

	$tab.on('click','a',function(e) {
		e.preventDefault();
		if(!$(this).parent().hasClass('on')){
			var href = $(this).attr('href');
			$(href).addClass('on').siblings('.tab_cont').removeClass('on');
			$(this).parent().addClass('on').siblings().removeClass('on');
			$(this).parents('.m_tabmenu').removeClass('tab_open');
			if($(this).closest('.pop_bg').length > 0){
				var $popId = $(this).closest('.pop_bg').attr('id');
				if($('#'+$popId).is(':visible')){
					popPositin('#'+$popId,300);
				}
			}
		}else{
			$(this).parents('.m_tabmenu').toggleClass('tab_open');
		}
	});

	$(window).load(function(){
		var speed = 500,
			$href = location.href,
			$tabId = $.url($href).param('tabId'),
			$tabIdx = $.url($href).param('tabIdx'),
			$SclId = $.url($href).param('scrollId'),
			$id = $('#'+$SclId),
			$fixedTop = $('#header').outerHeight();

		if($tab.length > 0){
			$tab.each(function(index, element) {
				var $this = $(this),
					$thisId = $this.attr('id');
				if($thisId == $tabId && $tabIdx > 0){
					$this.children('li').eq($tabIdx).find('a').trigger('click');
				}else if($thisId == $SclId && $tabIdx > 0){
					$this.children('li').eq($tabIdx).find('a').trigger('click');
				}else{
					$this.children('li').eq(0).find('a').trigger('click');
				}
			});
		}

		if($id.length > 0 && $id.is(':visible')){
			var $top = $id.offset().top;
			$('html, body').animate({'scrollTop':$top-$fixedTop},speed);
		}

		if($wrap.length > 0){
			$(window).scroll(function(){
				var $scrollTop = $(this).scrollTop(),
					$fixedTop = $('#header').outerHeight();

				$wrap.each(function(index, element){
					var $this = $(this),
						$top2 = $this.offset().top,
						$st = Math.floor($top2);
					if($st <= $scrollTop){
						$this.addClass('fixed');
					}else{
						$this.removeClass('fixed');
					}
				});
			});
		}
	});

	$('.rdo_tabmenu .radio input').change(function(){
		var $val = $(this).val();
		$('#'+$val).addClass('on').siblings('.rdo_cont').removeClass('on');
	});

	if($('.rdo_tabmenu').length > 0){
		$('.rdo_cont').eq(0).addClass('on');
	}

	$('.ui-m-tabmenu').on('click','a',function(e) {
		if($(this).parent().hasClass('on')){
			e.preventDefault();
			$(this).closest('.ui-m-tabmenu').toggleClass('m_tab_open');
		}
	});
};

/* 알럿 */
var alertTip = function(tar,txt) {
	var $this = $(tar),
		$delay = 2000,
		$speed = 300;

	if($this.length > 0){
		var $left = $this.offset().left,
			$top = $this.offset().top,
			$width = $this.outerWidth(),
			$height = $this.outerHeight(),
			$tip = $('<div class="alert_tip" style="left:'+$left+'px;top:'+($top+$height)+'px;max-width:'+$width+'px">'+txt+'</div>');

		$('body').append($tip);
		$tip.fadeIn($speed).delay($delay).fadeOut($speed,function(){
			$tip.remove();
		});
		$this.addClass('error').focus().delay($delay).queue(function(next){
			$this.removeClass('error');
			next();
		});
	}
};

//팝업
var $popSpeed = 300,
	$popEase = 'easeOutQuart',
	$popOpenBtn = '';
var popupUI = function(){
	$('.pop_open').on('click',function(e) {
		e.preventDefault();
		var $pop = $(this).attr('href');
		popOpen($pop,this);
	});
	$('.pop_close').on('click',function(e) {
		e.preventDefault();
		var $pop = $(this).closest('.pop_bg');
		popClose($pop);
	});

	$('.pop_bg').on('click',function(){
		var $pop = $(this);
		if(!$pop.hasClass('close_none')){popClose($pop);}
	}).on('click','.pop_wrap',function(e) {
		e.stopPropagation();
	});

	$(window).on('load',function(){
		$('.pop_open').each(function(){
			if($(this).hasClass('pop_load')){
				$(this).trigger('click');
			}
		});
	});
};
var popOpen = function(tar,btn){
	var $visible = $('.pop_bg:visible').size();

	if(btn != null || btn != window)$popOpenBtn = $(btn);
	if($visible > 0){
		$(tar).css('z-index','+='+$visible);
	}else{
		$('body').addClass('hidden');
	}
	$(tar).fadeIn($popSpeed,function(){
		if(btn != null)$(this).attr({'tabindex':0}).focus();
	});
	
	popPositin(tar,$popSpeed);
	$(window).on('resizeEnd',function(){
		popPositin(tar,$popSpeed);
	});
};
var popClose = function(tar){
	var $visible = $('.pop_bg:visible').size();
	if($visible == 1){
		$('body').removeClass('hidden');
	}
	$(tar).find('.pop_wrap').animate({'margin-top':0},$popSpeed,function(){
		$(this).removeAttr('style');
	});
	$(tar).fadeOut($popSpeed,function(){
		$(tar).removeAttr('style tabindex');
		if($popOpenBtn != ''){
			if($popOpenBtn != window){
				$popOpenBtn.focus();
			}
			$popOpenBtn = '';
		}
	});
};
var popPositin = function(tar,speed){
	setTimeout(function(){
		var $wrapH = $(tar).height(),
			$pop = $(tar).find('.pop_wrap'),
			$popH = $pop.outerHeight(),
			$mT = Math.max(0,($wrapH-$popH)/2);
	
		if(speed > 100){
			$pop.stop().animate({'margin-top':$mT},speed);
		}else{
			$pop.css({'margin-top':$mT});
		}
	},10);
};

var etcUI = function(){
	//sel_list
	$(document).on('click','.sel_list > a',function(e) {
		e.preventDefault();
		$(this).parent().toggleClass('on');
		$('html').one('click',function(){
			$(".sel_list").removeClass("on");
		});
		event.stopPropagation();
	});
	$(document).on('click','.sel_list .option',function(e) {
		if(!$(this).hasClass('link')){
			e.preventDefault();
			var $html = $(this).html();
			$(this).parent().addClass('selected').siblings().removeClass('selected');
			$(this).closest('.sel_list').removeClass('on').children('a').html($html);
		}
	});

	//메뉴
	$('.btn_option_toggle').click(function(e){
		e.preventDefault();
		$(this).closest('.toggle_wrap').toggleClass('on');
	});
	$('.menu_list2 .item input[type=radio]').change(function(e){
		$(this).closest('li').addClass('on').siblings().removeClass('on');
	});

	//faq_list
	$('.faq_list').on('click','> dt > a',function(e) {
		e.preventDefault();
		$(this).parent('dt').toggleClass('on').siblings('dt').removeClass('on');
		$(this).parent().next().slideToggle(300).siblings('dd').slideUp(300);
	});
	$('.faq_list').on('click','>li> p>a',function(e){
		e.preventDefault();
		$(this).parent().next('div').slideToggle(300).parent().toggleClass('on').siblings('li').removeClass('on').children('div').slideUp(300);
	});

	// 숫자 업시키는 클래스 .countUp
	if($('.countUp').length > 0){
		$(window).load(function(){
			$('.countUp').counterUp({
				delay:10,
				time:1000
			});
		});
	}

	//btn_scroll
	$('.btn_scroll').click(function(e){
		e.preventDefault();
		var $speed = 500,
			$href = $(this).attr('href'),
			$id = $($href),
			$fixedTop = $('#header').outerHeight();

		if($id.length > 0 && $id.is(':visible')){
			var $top = $id.offset().top;
			//console.log($top);
			$('html,body').animate({'scrollTop':$top},$speed);
		}
	});

	if($('.ui-height').length > 0)sameHeight('.ui-height');
};

var sameHeight = function(tar){
	$(window).on('load resize',function(){
		var $tar = $(tar),
			$heightArry = [];
		$tar.each(function(){
			$(this).css('height','auto');
			var $height = $(this).height();
			$heightArry.push($height);
		});
		//console.log($heightArry)
		var $maxHeight = Math.max.apply(null, $heightArry);
		//console.log($maxHeight)
		$tar.css('height',$maxHeight);
	});
};

var scrollItem = function(){
  var $elements = $.find('*[data-animation]'),
	  $window = $(window);

  if($elements.length > 0){
	  $(window).on('scroll resize', checkInView);
	  $(window).trigger('scroll');
  }

  function checkInView() {
	var $winHeight = $window.height(),
		$scrollTop = $window.scrollTop(),
		$winBottom = ($scrollTop + $winHeight);

	$.each($elements, function() {
	  var $el = $(this),
		  $elHeight = $($el).outerHeight(),
		  $elTop = $($el).offset().top,
		  $elBottom = ($elTop + $elHeight),
		  $animationClass = $el.data('animation'),
		  $delay = $el.data('delay'),
		  $duration = $el.data('duration');

	  if(!$el.hasClass('animated')){
		if($delay>0){
			$el.css({
				'-webkit-animation-delay':delay+'ms',
				'animation-delay':delay+'ms'
			});
		}
		if($duration>0){
			$el.css({
				'-webkit-animation-duration':duration+'ms',
				'animation-duration':duration+'ms'
			});
		}

		$el.addClass('animated');
	  }

	  if (($elBottom >= $scrollTop) && ($elTop <= $winBottom)) {
		$el.addClass($animationClass);
	  } else {
		$el.removeClass($animationClass);
	  }
	});
  }
};

var scrollOn = function (tar, navi, range){
	$(window).bind('load scroll resize',function(){
		var winH = $(window).height(),
			scrollTop = $(this).scrollTop(),
			center = scrollTop+(winH/2),
			start = center-(range/2),
			end = center+(range/2);

		$(tar).each(function(e){
			var secH = $(this).outerHeight(),
				secS = $(this).offset().top,
				secE = secS+secH;

			if(secS <= end && secE >= start){
				$(this).addClass('on');
			}else{
				$(this).removeClass('on');
			}

			if(center >= secS){
				$(navi).eq(e).addClass('on').siblings().removeClass('on');
			}
		});

		subSwiper.swipeTo($('.sub_menu .swiper-slide.on').index());
	});
};

var multiSwiper = function (tar){
	var sliders = [];
	$(tar).each(function(i, element){
		var $list = $(this).find('.swiper-container'),
			$prev = $(this).find('.ui-prev'),
			$next = $(this).find('.ui-next'),
			$pagination = $(this).find('.pagination'),
			$length = $list.find('.swiper-slide').length;

		//console.log($length);

		$list.addClass('ui-swipe-s'+i);
		if($prev.length > 0){
			$prev.addClass('ui-swipe-l'+i);
		}
		if($next.length > 0){
			$next.addClass('ui-swipe-r'+i);
		}
		if($pagination.length > 0){
			$pagination.addClass('ui-swipe-p'+i);
		}
		var slider = new Swiper('.ui-swipe-s'+i, {
			slidesPerView:'auto',
			calculateHeight:true,
			pagination:'.ui-swipe-p'+i,
			paginationClickable : true,
			resizeReInit:true,
			onInit:function(swiper){
				var wid = $(swiper.container).width(),
					wid2 = $(swiper.container).find('.swiper-wrapper').width();
				//console.log(wid,wid2,i)
				$('.ui-swipe-l'+i).addClass('disabled');
				if(wid >= wid2){
					$('.ui-swipe-r'+i).addClass('disabled');
				}
			},
			onSlideChangeStart: function(swiper){
				var $i = swiper.activeIndex,
					$l = swiper.visibleSlides.length;
				//console.log($i,$l);
				if($i == 0){
					$('.ui-swipe-l'+i).addClass('disabled');
				}else{
					$('.ui-swipe-l'+i).removeClass('disabled');
				}
				if(($i+$l) == $length){
					$('.ui-swipe-r'+i).addClass('disabled');
				}else{
					$('.ui-swipe-r'+i).removeClass('disabled');
				}
			}
		});

		sliders.push(slider);

		$('.ui-swipe-l'+i).click(function(e){
			e.preventDefault();
			sliders[i].swipePrev();
		});
		$('.ui-swipe-r'+i).click(function(e){
			e.preventDefault();
			sliders[i].swipeNext();
		});
	});
};

var loadingShow = function(){
	var $loading = $('<div id="loading"><div><i></i></div><div><i></i></div><div><i></i></div><div><i></i></div><div><i></i></div><div><i></i></div><div><i></i></div><div><i></i></div></div>'),
		$id = $('#loading');

	if($id.length == 0){
		$('body').append($loading);
	}
};

var loadingHide = function(){
	var $id = $('#loading');
	$id.remove();
};

var todayPopup =function(){
	var $speed = 500;
	var popList=[];

	if($('.pop_today').length > 0){
		$('.pop_today').each(function(){
			var $id = $(this).attr('id');
			popList.push($id);
		});
	}

	$('.pop_today .pop_modal_close').click(function(e){
		var chk = $(this).closest('.pop_today').find('.todayChk'),
			$id = $(this).closest('.pop_today').attr('id');

		if (chk.is(':checked') ) {
			setCookie( $id, 'done' , 1 );
		}
		$('#'+$id).hide($speed);
	});

	for(var i in popList){
		if(cookiedata.indexOf(popList[i]+'=done') < 0) {
			$('#'+popList[i]).show($speed);
		}
	}
};

//모바일 에이전트 구분
var isMobile = {
	Android: function () {
			 return navigator.userAgent.match(/Android/i) == null ? false : true;
	},
	BlackBerry: function () {
			 return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
	},
	IOS: function () {
			 return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
	},
	Opera: function () {
			 return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
	},
	Windows: function () {
			 return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
	},
	any: function () {
			 return (isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() || isMobile.Opera() || isMobile.Windows());
	}
};

//안드로이드 버전체크
var ua = navigator.userAgent;
if( ua.indexOf("Android") >= 0 ){
  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8));
}

//날짜구하기
var toTimeString = function (date) { //formatTime(date)
	var year  = date.getFullYear();
	var month = date.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
	var day   = date.getDate();
	var hour  = date.getHours();
	var min   = date.getMinutes();

	if (("" + month).length == 1) { month = "0" + month; }
	if (("" + day).length   == 1) { day   = "0" + day;   }
	if (("" + hour).length  == 1) { hour  = "0" + hour;  }
	if (("" + min).length   == 1) { min   = "0" + min;   }

	return ("" + year + month + day + hour + min );
};
var getCurrentTime = function() {
	return toTimeString(new Date());
};
var $nowDateFull = parseInt(getCurrentTime()),					//날짜,시간,분까지 모두 포함
	$nowDateHour = parseInt(getCurrentTime().substring(0,10)),	//날짜,시간까지만 포함
	$nowDate = parseInt(getCurrentTime().substring(0,8));		//날짜만 포함