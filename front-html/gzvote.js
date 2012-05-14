
/* ===================================================
 * gzvote.js v0.0.1
 * http://
 * ===================================================
 * Copyright 2012 Green Zetta.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
//set up API

var JSONvote;
if (!JSONvote) {
    JSONvote = {};
}
var eventtimes = null
, url = "vote.php";


//post vote
function postVote(voteInfo,voteitemId) {
	//alert(voteitemId);
	jQuery( '#'+ voteitemId +' .votebody').find('.voteresult').show();
	var postdate = voteInfo
	, newUrl = url ;//+ '?randomNum=' + Math.round(Math.random()*10000) + '&';
	var request = jQuery.ajax({
	  type: "POST",
	  url: newUrl ,
	  data: postdate
	});
	//alert(newUrl);
	request.done(function(msg) {
		var eventtimes = null;
		JSONvote = eval('(' + msg + ')');
		var tempjsonvote = JSONvote.answers
		,	html = '<span class="resulinfo title">结果</span>'
		//,	tempjson = JSON.answers
		,	spanclassName = "left";

		jQuery.each(tempjsonvote,function(i){
			//alert(this.id + "," + this.text + "," + this.image_url);
			//<span class="resulinfo title">结果</span><span class="resulinfo left winner note">70%</span><span class="resulinfo right note">30%</span>
			if (i == '1') { spanclassName = "left" ;} else { spanclassName = "right";}
			html = html + '<span class="resulinfo '+ spanclassName +' note">'+ this.rate +'</span>';
		});
		jQuery( '#'+ voteitemId +' .voteresult .resultbox').html(html);
		eventtimes = setTimeout(function(){
			jQuery( '#'+ voteitemId +' .votebody').find('.loading').hide();
			jQuery( '#'+ voteitemId +' .votebody').find('.resultbox').show();
		},300);
	});
}
//show vote
function showVote(voteId,$this) {
	var JSON;
	if (!JSON) {
	    JSON = {};
	}
	var postdate = "id=" + voteId 
	,	newUrl = url + '?randomNum=' + Math.round(Math.random()*10000) + '&';;
	var request = jQuery.ajax({
	  type: "POST",
	  url: newUrl,
	  data: postdate,
	  beforeSend: function (  ) {
    	//show loading;
    	var html = '<div class="gzvotebox" id="zettavote'+ voteId +'"><div class="postvotebox"><span class="votedate"></span><h4 class="votetitle"></h4><div class="votenav"><a href="" class="votelink">本期结果</a></div><div class="votebody"><ul></ul><div class="voteresult"><div class="loading">loading...</div><div class="resultbox hide"><span class="resulinfo title">结果</span><span class="resulinfo left note"></span><span class="resulinfo right note"></span></div></div><div class="clearfix"></div></div></div></div>';
    	jQuery('body').append(html);
  	  }
	});
	request.done(function(showmsg) {
		JSON = eval('(' + showmsg + ')');
		var apitxt = showmsg;
		var eventtimes = null;
		var tempjson = JSON.answers
		,	html = ''
		,	resul = '<span class="resulinfo title">结果</span>' 
		,	spanclassName = "left";

		jQuery.each(tempjson,function(){
			//<li class="voteitem"><a href="#" data-ref="voteid=1%26itemid=1"><img class="style01" src="1.jpg" /><span class="itemname">高富帅</span></a><div class="mark"></div></li>
			html = html + '<li class="voteitem"><a href="#" data-ref="id='+ JSON.question_id +'&do=vote&answer_id='+ this.id +'"><img class="style01" src="'+ this.image_url +'" /><span class="itemname">'+ this.text +'</span></a><div class="mark"></div></li>';
			resul = resul + '<span class="resulinfo '+ spanclassName +' note">'+ this.rate +'</span>';
		});
		eventtimes = setTimeout(function(){
			jQuery('#zettavote'+ voteId +' ul').html(html);
			jQuery('#zettavote'+ voteId +' .votetitle').html(JSON.question);
			//alert(apitxt);
			jQuery('#zettavote'+ voteId +' .votedate').html(JSON.start_date);
			if ( JSON.status != "open"){
				jQuery('#zettavote'+ voteId +' .voteresult .resultbox').html(resul);
				jQuery('#zettavote'+ voteId +' .loading').hide();
				jQuery('#zettavote'+ voteId +' .resultbox').show();
			} else {
				jQuery('#zettavote'+ voteId +' .voteresult').hide();
			}
		},300);
		
	});
	JSON = {};
}



//main fuction
(function( $ ){

$.fn.gzVote = function(voteId) { 
/* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */
  	//alert('js!');
        
    showVote(voteId);


	/*$(".voteitem a").on('click', function() {
		var linkInfo = $(this).attr("data-ref")
		,	$this = $(this)
		,	voteitemId = $this.parents(".gzvotebox").attr("id");;
		//alert(linkInfo);
		if (linkInfo !== ""){
			postVote(linkInfo,voteitemId);
		}
		return false;
	});*/

	/*
	$(".voteitem img").on({
		hover: function(){
			var linkInfo = $(this).parents("a").attr("data-ref")
			,$this = $(this)
			,$linkItem = $this.parents(".voteitem")
			, $allItem = $this.parents(".votebody").find(".voteitem");
			
			$linkItem.addClass("blue");
			$allItem.addClass("notfuct");
			$linkItem.removeClass("notfuct");
		},
		mouseleave: function(){
			var $this = $(this)
			,$linkItem = $this.parents(".voteitem")
			, $allItem = $this.parents(".votebody").find(".voteitem");

			$allItem.removeClass("notfuct");
		  }
		});
	*/
	$(".voteitem a").die().live('click', function() {
		var linkInfo = $(this).attr("data-ref")
		,	$this = $(this)
		,	voteitemId = $this.parents(".gzvotebox").attr("id");;
		//alert(linkInfo);
		if (linkInfo !== ""){
			postVote(linkInfo,voteitemId);
		}
		//return false;
	});
	
	$(".voteitem img").live('hover', function() {
		var linkInfo = $(this).parents("a").attr("data-ref")
		,$this = $(this)
		,$linkItem = $this.parents(".voteitem")
		, $allItem = $this.parents(".votebody").find(".voteitem");
		
		$linkItem.addClass("blue");
		$allItem.addClass("notfuct");
		$linkItem.removeClass("notfuct");

	});
	$(".voteitem img").live('mouseout', function() {
		var $this = $(this)
		,$linkItem = $this.parents(".voteitem")
		//,$allItem = $(".voteitem");
		, $allItem = $this.parents(".votebody").find(".voteitem");

		$allItem.removeClass("notfuct");
		$linkItem.removeClass("notfuct").removeClass("blue");
	});	

	/*('.voteitem').on('click', 'a', function(event) {
	    alert("aa!");
	    event.preventDefault();
	    console.log('item anchor clicked');
	});*/

};
  
})( jQuery );
