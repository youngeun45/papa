	//모바일 전자정부 대처 테스트용 	
	/**
	function MDHBasic_SEMP_request(param , callback){
		$.ajax({ 
				url: "http://175.197.192.26/CAFERO/mobile.do"
				,data: param
				,type: "post"
				,dataType: "jsonp"
				,crossDomain: true
				,jsonp:  "callback"
				,contentType: "application/x-www-form-urlencoded;charset=utf-8"
				,success:  function(data){
					callback(data);
				},error:function(xhr,status,error){
					alert("code : " + xhr.status + "\r\nmessage : " + xhr.reponseText ); 
				}
			}); 
	
	}	
	**/
	
	//var httpURL= "http://112.172.217.140/CAFERO/mobile.do"
	var httpURL= "/get.do"	
	//기본 데이터 	
	var params = '';	
	
	//일반 WEB용 JSONP
	function JSONP_requestaa(param , callback){
		
		$.ajax({ 
				url: httpURL
				,data: param
				,type: "get"
				,dataType: "text"
				,contentType: "application/x-www-form-urlencoded;charset=utf-8"
				,success:  function(data){
					
					//data = data.replaceAll("\\r","");
					//data = data.replaceAll("\\n","");
					callback(data);
				},error:function(xhr,status,error){
					alert("code : " + xhr.status + "\r\nmessage : " + xhr.reponseText ); 
				}
			}); 
	}	

	//일반 WEB용 JSONP
	function JSONP_request(param , callback, async){
		if(typeof async !== 'undefined'){
			async = true;
		}
		$.ajax({ 
				url: httpURL
				,data: param
				,type: "post"
				,dataType: "jsonp"
				,crossDomain: true
				,async : async
				,jsonp:  "callback"
				,contentType: "application/x-www-form-urlencoded;charset=utf-8"
				,success:  function(data){
					if(callback != null) {
						//console.log(typeof yescallback);
						if(typeof callback === "function"){
							callback(data);
						} else {
							eval(callback);
						}
					}
				},error:function(xhr,status,error){
					/*alert("code : " + xhr.status + "\r\nmessage : " + xhr.reponseText );*/
					console.log("code : " + xhr.status + "\r\nmessage : " + xhr.reponseText );
				}
			}); 
	
	}
	
	

	
	function JSONPTEST(strUrl, param , callback){
		$.ajax({ 
				url: strUrl
				,data: param
				,type: "post"
				,dataType: "jsonp"
				,crossDomain: true
				,jsonp:  "callback"
				,contentType: "application/x-www-form-urlencoded;charset=utf-8"
				,success:  function(data){
					callback(data);
				},error:function(xhr,status,error){
					alert("code : " + xhr.status + "\r\nmessage : " + xhr.reponseText ); 
				}
			}); 
	
	}		