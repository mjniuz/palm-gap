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
 
	var rootUrl = 'http://palm.dicoba.net/';
	
	
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
			PushbotsPlugin.initializeiOS("55d165de17795918468b4569");
		}
		if(PushbotsPlugin.isAndroid()){
			PushbotsPlugin.initializeAndroid("55d165de17795918468b4569", "492376382151");
		}					
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
		
		makecokies('uuid',device.uuid);
		sendUUID(device.uuid,device.model,device.platform,device.version);
		PushbotsPlugin.onNotificationClick(myMsgClickHandler);	
        console.log('Received Event: ' + id);
    }
	
};
// notif event
	function myMsgClickHandler(msg){
		console.log("Clicked On notification" + JSON.stringify(msg));
		alert(JSON.stringify(msg));
	}
	function sendUUID(uuid,model,platform,version){
		var origin = rootUrl + 'api/example/uuidReg';
		var dataString = 'uuid='+uuid+'&model='+model+'&platform='+platform+'&version='+version;
		$.ajax({
			type: "POST",
			url: origin,
			data: dataString,
			cache: false,
			success: function(data){
				if(data.res == "ok"){ 
					//alert(data.why);
				}else{
					//alert(data.why);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert('Error gak sukses '+textStatus+errorThrown+XMLHttpRequest);
			}
		});
	}
	
	function getMyName(number){
		var origin = rootUrl + 'api/example/myname';
		var dataString = 'mynumber='+number;
		$.ajax({
			type: "POST",
			url: origin,
			data: dataString,
			cache: false,
			success: function(data){
				if(data.res == "ok"){ 
					$('#MyName').html(data.why);
				}else{
					$('#MyName').html('error get Name');
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert('Error '+textStatus+errorThrown+XMLHttpRequest);
			}
		});
	}
	function getCookie(name){
		return localStorage.getItem(name);
	}
  
	
	function makecokies(key,val){
		localStorage.setItem(key,val);
	}
	
	function delcokies(key){
		localStorage.removeItem(key);
	}
	
	function pindahPage(link,reload){
		if(reload !== undefined){		
		$.mobile.changePage( link, { 
			transition: "fade", 
			changeHash: true,
			allowSamePageTransition:true,
			reloadPage:true	
		});			
		}else{		
		$.mobile.changePage( link, { 
			transition: "fade", 
			changeHash: true,
			allowSamePageTransition:true,
			reloadPage:false	
		});
		}
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
	function getAdsAjax(){
		$('#loadingAds').addClass('loading');	
		$("#MyAdsList").html('');	
		var number = getCookie('number');
		var origin = rootUrl + 'api/example/myads';
		var dataString = 'number='+number;
		$.ajax({
			type: "POST",
			url: origin,
			data: dataString,
			cache: false,
			success: function(data){
				$(data.why).off().each(function() {
					//console.log(data.why);
					var output = "<tr id='adsID_"+ this.idads +"'><td><div style='float:left;'><a class='btn btn-default' id='deleteAds' ads-delete-id='"+this.idads+"' href='#'>Delete</a></div>" 
					+ "<a id='getAdsDetail' href='#' data-ads='"+ this.idads + "'><div class='user-image'><img src='"+rootUrl+"media/"
					+ this.img + "' width='100%;' height='100%;'></div><div class='left20'><h4 class='top'>" + this.title + "</div></a></td></tr>";
					$('#MyAdsList').unbind().off().append(output);		
				}); 
				$('#loadingAds').removeClass('loading');		
			}
		}); 
	}
	function adsAjax(id){
			$("#adsDetailResult").html('');	
			$("#theAdsIMG").html('');	
			$.getJSON( rootUrl+"api/example/adsdetail/id/"+id, function( data ) {
				$('#loading').addClass('loading');	
				$(data).off().each(function() {
					var output = "<h4 style='color:green;'>"+this.title+"</h4><p>"+ this.desc +"</p><br /><p>By: "+ this.name+ " - "+ this.phone +"</p>";
					var titleDetail =  "<img src='"+rootUrl+"media/"+ this.img + "' width='100%;' height='200px;' class='thumbnails'>";
					$('#adsDetailResult').unbind().off().append(output);		
					$('#theAdsIMG').unbind().off().append(titleDetail);
					$('#loading').removeClass('loading');	
				}); 	
			}); 	
	}
	function delAdsAjax(id){
		$('#loadingAds').addClass('loading');
		var origin = rootUrl + 'api/example/delads';
		var dataString = 'idads='+id;
		$.ajax({
			type: "POST",
			url: origin,
			data: dataString,
			cache: false,
			success: function(data){
				// sukses hapus
				$('#loadingAds').removeClass('loading');		
			}
		}); 
	}
	function getAdsListAjax(){
		$('#loadingSpecialAds').addClass('loading');	
		$("#AdsList").html('');	
		var origin = rootUrl + 'api/example/adslist';
		$.ajax({
			type: "GET",
			url: origin,
			data: '',
			cache: false,
			success: function(data){
			if(data.why != 'false'){
				$(data.why).off().each(function() {
					var output = "<hr /><li class='h100'><a id='getAdsDetail' href='#'  data-ads='"+ this.idads + "'><div class='user-image'><img src='"+rootUrl+"media/"
					+ this.img + "' class='user-image'></div><div class='left20'><h4 class='top'>" + this.title + "<p style='float:left;'><br /><i class='fa fa-angle-left green'></i></p><br><br><br>"
					+ "<p style='float:left;'>"+ this.date +"</p> </div></a></li>";
					$('#AdsList').unbind().off().append(output);		
				}); 
			}else{
				$('#AdsList').unbind().off().html('<center><span>Nothing here</span></center>');		
			}
				$('#loadingSpecialAds').removeClass('loading');		
			}
		}); 
	}
	function newsAjax(id){
		if(id == undefined){
			$('#loading').addClass('loading');	
			$("#summary").html('');	
			$.getJSON( rootUrl+"api/news/category/id/1", function( data ) {
				$(data).off().each(function() {
					var output = "<hr /><li class='h100'><a id='newsDetail' href='#' data-news='"+ this.id_news + "'><div class='user-image'><img src='"+rootUrl+"media/"
					+ this.media + "' class='user-image'></div><div class='left20'><h4 class='top'>" + this.title + "</div></a></li>";
					$('#summary').unbind().off().append(output);		
				}); 
				$('#loading').removeClass('loading');		
			}); 
		}else{			
			$("#newsDetailResult").html('');	
			$("#theIMG").html('');	
			$.getJSON( rootUrl+"api/news/content/id/"+id, function( data ) {
				$('#loading').addClass('loading');	
				$(data).off().each(function() {
					var output = "<h4 style='color:green;'>"+this.title+"</h4><p>"+ this.content +"</p>";
					var titleDetail =  "<img src='"+rootUrl+"media/"+ this.media + "' width='100%;' height='200px;' class='thumbnails'>";
					$('#newsDetailResult').unbind().off().append(output);		
					$('#theIMG').unbind().off().append(titleDetail);
					$('#loading').removeClass('loading');	
				}); 	
			}); 
		}
	}
	
	
(function($){
$(document)
.ready(function() {
	$('[data-role=page]').on('pageshow', function (event, ui) {
		var pageAct = $('body').pagecontainer( 'getActivePage' ).attr( 'id' );
		/*if(pageAct === 'news'){
			newsAjax();		
		} */
		
		if(pageAct == 'newsDetailPage'){
			newsAjax(getCookie('newsDetailId'));		
		}
		if(pageAct == 'adsDetailPage'){
			adsAjax(getCookie('AdsDetailId'));		
		}
		if(pageAct == 'ads'){
			$('#Mynumber').val(getCookie('number'));
		}
		if(pageAct == 'MyProfile'){
			getMyName(getCookie('number'));
			getAdsAjax();
			$('#MyNumber').html(getCookie('number'));
		}
		if(pageAct == 'specialAds'){
			getAdsListAjax();
		}
	})
})
.on('click', '#newsDetail' ,function() {
	makecokies('newsDetailId',$(this).attr('data-news'));
	pindahPage('#newsDetailPage');
})

.on('click', '#deleteAds' ,function() {
	var ok = confirm("Are you sure want to delete this ads?");
	if(ok == true){
		delAdsAjax($(this).attr('ads-delete-id'));
		var adsid = '#adsID_' + $(this).attr('ads-delete-id');		
		$(adsid).hide('slow');
	}
})
.on('click', '#getAdsDetail' ,function() {
	makecokies('AdsDetailId',$(this).attr('data-ads'));
	pindahPage('#adsDetailPage');
})
.on('click', '#goNews' ,function() {
	pindahPage('#newsPage');
	newsAjax();
})
.on('submit', '#newads' ,function(e) {
		var origin = rootUrl + 'api/example/newads';
		if($.trim($('#titleads').val()).length>0){
		$.ajax({
		type: "POST",
		url: origin,
		data: new FormData(this),      
		processData: false,
		contentType: false,
		beforeSend: function(){ $("#processads").html('<progress></progress>'); 
								$("#newads-submit").prop('disabled', true);
							},
		success: function(data){
			if(data.res == "ok"){ 
				alert('Sukses, Image Sukses');
				$("#processads").html('');
				$("#newads-submit").removeAttr('disabled');
				$('#newads').trigger("reset");
				pindahPage('#MyProfile');
			}else{
				alert('Please fill all field');
				$("#processads").html('');
				$("#newads-submit").removeAttr('disabled');
			}
	  },
	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		alert(textStatus);	
		$("#register-submit").text('Register');
	  }
	});
	e.preventDefault();
	}else{
		alert('please fill all field');
	}
	return false;
})
.on('pageinit', function () { 
	// variable session
	
	$('[data-role=page]').on('pageshow', function (event, ui) {
		var pageAct = $('body').pagecontainer( 'getActivePage' ).attr( 'id' );
		if(isLoged() && pageAct === 'index'){
			alert('Loged In');
			pindahPage('#dashboard');
		}
		
	if(!isLoged()){
			//alert(isLoged());
			$("#" + event.target.id).find("[data-role=footer]").off().load("footer-logout.html", function(){
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
		$("#layout-footer").off().empty();
		$("#" + event.target.id).find("[data-role=footer]").off().load("footer.html", function(){
			
		});		
	}
		event.preventDefault();
		$("#" + event.target.id).find("[data-role=header]").off().load("header.html", function(){    });		
	})
	
	$("#go-ads").off().click(function(){
		pindahPage('#ads');
	})	
	
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
		makecokies('number','6281806423887');
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
		var origin = rootUrl + 'api/example/user';
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
				$("#result").html('Success, Please check your SMS inbox, Response ID: '+data.code);
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
		var origin = rootUrl + 'api/example/codeactivation';
		
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
			$('#codesend').trigger("reset");
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
  
	
	.bind( "mobileinit", function(event) {
    $.extend($.mobile.zoom, {locked:true,enabled:false})
})  
})(jQuery);
