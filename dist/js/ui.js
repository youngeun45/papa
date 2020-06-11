/* author :  an.hyo-ju ( anoju@cntt.co.kr ) in CNTT */

/* 알럿 */
function alertTip(tar,txt) {
	var $this = $(tar),
		$delay = 1000,
		$speed = 300;

	if($this.length > 0){
		var $left = $this.offset().left,
			$top = $this.offset().top,
			$height = $this.outerHeight(),
			$tip = $('<div class="alert_tip" style="left:'+$left+'px;top:'+($top+$height)+'px;">'+txt+'</div>')

		$('body').append($tip);
		$tip.fadeIn($speed).delay($delay).fadeOut($speed,function(){		
			$tip.remove();
		})
		$this.addClass('error').focus().delay($delay).queue(function(next){
			$this.removeClass('error');
			next();
		});
	}
}

function loadingShow(){
	var $loading = $('<div id="loading"><p><img src="' + imgLoadingPath + '" alt="페이지를 불러오는 중입니다."/></p></div>'),
		$id = $('#loading');
	
	if($id.length == 0){
		$('body').append($loading);
	}	
}

function loadingHide(){
	var $id = $('#loading');
	$id.remove();
}

//브라우저 체크
function getBrowserType(){          
	var _ua = navigator.userAgent;
	var rv = -1;
	 
	//IE 11,10,9,8
	var trident = _ua.match(/Trident\/(\d.\d)/i);
	if( trident != null )
	{
		if( trident[1] == "7.0" ) return rv = "IE" + 11;
		if( trident[1] == "6.0" ) return rv = "IE" + 10;
		if( trident[1] == "5.0" ) return rv = "IE" + 9;
		if( trident[1] == "4.0" ) return rv = "IE" + 8;
	}
	 
	//IE 7...
	if( navigator.appName == 'Microsoft Internet Explorer' ) return rv = "IE" + 7;
	 
	/*
	var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	if(re.exec(_ua) != null) rv = parseFloat(RegExp.$1);
	if( rv == 7 ) return rv = "IE" + 7; 
	*/
	 
	//other
	var agt = _ua.toLowerCase();
	if (agt.indexOf("chrome") != -1) return 'Chrome';
	if (agt.indexOf("opera") != -1) return 'Opera'; 
	if (agt.indexOf("staroffice") != -1) return 'Star Office'; 
	if (agt.indexOf("webtv") != -1) return 'WebTV'; 
	if (agt.indexOf("beonex") != -1) return 'Beonex'; 
	if (agt.indexOf("chimera") != -1) return 'Chimera'; 
	if (agt.indexOf("netpositive") != -1) return 'NetPositive'; 
	if (agt.indexOf("phoenix") != -1) return 'Phoenix'; 
	if (agt.indexOf("firefox") != -1) return 'Firefox'; 
	if (agt.indexOf("safari") != -1) return 'Safari'; 
	if (agt.indexOf("skipstone") != -1) return 'SkipStone'; 
	if (agt.indexOf("netscape") != -1) return 'Netscape'; 
	if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
}

function todayPopup(){
	var $speed = 500;
	var popList=[];

	if($('.pop_today').length > 0){
		$('.pop_today').each(function(){
			var $id = $(this).attr('id')
			popList.push($id)
		})
	}

	$('.pop_today .pop_modal_close').click(function(e){
		var chk = $(this).closest('.pop_today').find('.todayChk'),
			$id = $(this).closest('.pop_today').attr('id');

		if (chk.is(':checked') ) {
			setCookie( $id, 'done' , 1 );
		}
		$('#'+$id).hide($speed);
	})
	
	for(var i in popList){
		if(cookiedata.indexOf(popList[i]+'=done') < 0) {					
			$('#'+popList[i]).show($speed);
		};
	}
}