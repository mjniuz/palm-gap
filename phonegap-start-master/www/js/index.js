/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
		function myMsgClickHandler(msg){
			console.log("Clicked On notification" + JSON.stringify(msg));
			alert(JSON.stringify(msg));
		}
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		if(PushbotsPlugin.isiOS()){
			PushbotsPlugin.initializeiOS("55c88e4717795918438b4567");
		}
		if(PushbotsPlugin.isAndroid()){
			PushbotsPlugin.initializeAndroid("55c88e4717795918438b4567", "888474954807");
		}
						
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		PushbotsPlugin.onNotificationClick(myMsgClickHandler);
    }
	
};
// notif event
	function getCookie(name){
		return localStorage.getItem(name);
	}
  
	
	function makecokies(key,val){
		//document.cookie= key+"="+val+"; expires=Thu, 6 Aug 2020 12:00:00 UTC; path=/"; 
		localStorage.setItem(key,val);
	}
	
	function delcokies(key){
		//document.cookie = key + "=;expires=Sa, 1 Aug 2015 12:00:00 UTC; path=/";
		localStorage.removeItem(key);
	}
	
	function pindahPage(link){		
		$.mobile.changePage( link, { 
			transition: "fade", 
			changeHash: true,
			allowSamePageTransition:true,
			reloadPage:false	
		});
	}
	
	
	function Opendialog(link){
		$.mobile.changePage( link, { 
			role: "dialog"
		} );
	}
	
	function changeDiv(a,b){
		$(a).html( $(b).html() ,'slow'); 
	}
	
	function isLoged(){
	var logedin = localStorage.getItem('logedin');
	var numberC = localStorage.getItem('number');
		if(logedin == 'true' && numberC > 0){
			return true;
		}else{
			return false;
		}
	}
(function($){
$(document)
.on('pageinit', function () { 
	// variable session
	
	
	$('[data-role=page]').on('pageshow', function (event, ui) {
	if(!isLoged()){
			//alert(isLoged());
			$("#" + event.target.id).find("[data-role=footer]").load("footer-logout.html", function(){
				$("#log1").off().click(function(){	
					alert('You need to log in');					
					pindahPage('#index');
				})
				$("#log2").off().click(function(){	
					alert('You need to log in');				
					pindahPage('#index');
				})
				$("#log3").off().click(function(){	
					alert('You need to log in');				
					pindahPage('#index');
				})
				$("#log4").off().click(function(){	
					alert('You need to log in');				
					pindahPage('#index');
				})
			});
		
	}else{
		$("#layout-footer").empty();
		$("#" + event.target.id).find("[data-role=footer]").load("footer.html", function(){
			
		});		
       event.preventDefault();
	}
	})
		
	$('[data-role=page]').on('pageshow', function (event, ui) {
        $("#" + event.target.id).find("[data-role=header]").load("header.html", function(){
				
        });
		/*if(isLoged() === 'false'){
			$("#" + event.target.id).find("[data-role=footer]").load("footer-logout.html", function(){
				$("#log1").off().click(function(){	
					alert('You need to log in');					
					pindahPage('#index');
				})
				$("#log2").off().click(function(){	
					alert('You need to log in');				
					pindahPage('#index');
				})
				$("#log3").off().click(function(){	
					alert('You need to log in');				
					pindahPage('#index');
				})
				$("#log4").off().click(function(){	
					alert('You need to log in');				
					pindahPage('#index');
				})
			});
		}else{
			$("#" + event.target.id).find("[data-role=footer]").load("footer.html", function(){
			
			});
		} */
		
		var pageAct = $('body').pagecontainer( 'getActivePage' ).attr( 'id' );
		if(pageAct === 'news'){
			$.getJSON( "http://news.dicoba.net/api/news/category/id/1", function( data ) {
			$(data).each(function() {
				var output = "<hr /><li class='h100'><a href='news.html?id=" + this.id_news + "'><div class='user-image pull-left'><img src='http://news.dicoba.net/media/"
				+ this.media + "' class='user-image'></div><div class='left20'><h4 class='top'>" + this.title + "</div></a></li>";
				$('#summary').off().append(output);
			});
			});
		}
    })
	
	var pageNow = $(':mobile-pagecontainer').pagecontainer('getActivePage')[0].id;
	if(isLoged() && pageNow === 'index'){
		//alert('Loged In');
		pindahPage('#dashboard');
	}
	
	$("#go-ads").off().click(function(){
		pindahPage('#ads');
	})	
	
	$("#input-confirmation").off().click(function(){
		pindahPage('#confirm-dialog');
	})
	
	$("#testCookie").off().click(function(){
		var session = localStorage.getItem('logedin') + localStorage.getItem('number');
		alert(session);
	})	
	$("#back").off().click(function(){ 
		parent.history.back();
        return false;
	})	
	$("#logout").off().click(function(){
		alert('OK Loged out');
		delcokies('logedin');
		delcokies('number');
		pindahPage('#index');
	})
	$("#cookie").off().click(function(){
		makecokies('number','081806423887');
		makecokies('logedin',true);
		alert(localStorage.getItem('logedin'));
		pindahPage('#dashboard');
    })
	$("#show").off().click(function(){
		var session = localStorage.getItem('logedin');
		alert(session);
    })
	$("#delete").off().click(function(){
		delcokies('logedin');
		delcokies('number');
		alert('Deleted');
	})
	$('#register-submit').off().click(function()
	{
		var rootUrl = 'http://palm.dicoba.net/api/';
		var origin = rootUrl + 'example/user';
		var name = $("#name").val();
		var phone = $("#phone").val();
		var dataString = 'name='+name+'&phone='+phone;
		if($.trim(name).length>0 && $.trim(phone).length>0){
		$.ajax({
		type: "POST",
		url: origin,
		data: dataString,
		cache: false,
		beforeSend: function(){ $("#register-submit").text('Connecting...');},
		success: function(data){
		if(data != "false"){
			if(data.res == "ok"){ 
				alert('Sukses, please fill the code');
				$("#result").html('Please fill this code to box bellow '+data.code);
				makecokies('number',data.phone);
				makecokies('logedin','false');
				$("#register-submit").text('Register');
				$('#register').trigger("reset");
				//$.mobile.changePage("#logedin");
			}else{
				alert('Error');
			}
		}else{
			$("#hasil").html("<span style='color:#cc0000'>Error:</span> Invalid email and password. ");
			//alert('API nya gagal');
		}
	  },
	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		alert(textStatus);	
		$("#register-submit").text('Register');
	  }
	});
	}else{
		alert('please fill all field');
	}
	return false;
	})
	
	$('#code-send').off().click(function()
	{
		var rootUrl = 'http://palm.dicoba.net/api/';
		var origin = rootUrl + 'example/codeactivation';
		
		var code = $("#code").val();
		var phoneNum = getCookie('number');
		var dataString = 'code='+code+'&phone='+phoneNum;
		if($.trim(code).length>0 && $.trim(phoneNum).length>0){
		$.ajax({
		type: "POST",
		url: origin,
		data: dataString,
		cache: false,
		beforeSend: function(){ $("#code-send").text('Connecting...');},
		success: function(data){
		if(data != "false"){
			if(data.res == "ok"){ 
				alert('Sukses, Anda sudah login');			
				makecokies('logedin','true');
				pindahPage('#dashboard');
			}else{
				alert('Error '+data.why);
			}
		}else{
			alert('API nya gagal');
		}
	  },
	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		alert(textStatus);	
	  }
	});
	}else{
		alert('please fill all field');
	}
	return false;
	})
})  
})(jQuery);
