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
var JSON;
if (!JSON) {
    JSON = {};
}
var JSONvote;
if (!JSONvote) {
    JSONvote = {};
}
var eventtimes = null
, url = 'vote.php' ;
// url = 'http://ray.wordpress.local/wp-content/plugins/live-polls/polls-ajax.php?id=2&do=vote&answer_id=3';

/*
 * {"question_id":"2","question":"\u60a8\u6700\u559c\u6b22\u7684\u64cd\u4f5c\u7cfb\u7edf\u662f\u54ea\u4e00\u4e2a\uff1f","status":"closed","answers":[{"id":"3","text":"\u5fae\u8f6fWindows\u89c6\u7a97444","image_url":"http:\/\/ray.wordpress.local\/wp-content\/uploads\/2012\/05\/avatar.jpg","rate":"100.00%"},{"id":"4","text":"\u82f9\u679cMac OS X444","image_url":"http:\/\/ray.wordpress.local\/wp-content\/uploads\/2012\/05\/Brazil.gif","rate":"0.00%"}]}
 * 
 * */
//post vote
function postVote(voteInfo,$this) {
	$this.parents(".votebody").find(".voteresult").show();
	var postdate = voteInfo;
	var request = jQuery.ajax({
	  type: "GET",
	  url: url,
	  data: postdate
	});
	request.done(function(msg) {
		var eventtimes = null;
		JSONvote = eval('(' + msg + ')');
		var tempjsonvote = JSONvote.answers
		,	html = '<span class="resulinfo title">结果</span>'
		,	tempjson = JSON.answers
		,	spanclassName = "left";

		jQuery.each(tempjsonvote,function(i){
			//alert(this.id + "," + this.text + "," + this.image_url);
			//<span class="resulinfo title">结果</span><span class="resulinfo left winner note">70%</span><span class="resulinfo right note">30%</span>
			if (i == '1') { spanclassName = "left" ;} else { spanclassName = "right";}
			html = html + '<span class="resulinfo '+ spanclassName +' note">'+ this.rate +'</span>'
		});
		jQuery('.voteresult .resultbox').html(html);
		eventtimes = setTimeout(function(){
			$this.parents(".votebody").find(".loading").hide();
			$this.parents(".votebody").find(".resultbox").show();
		},300);
	});
}
//show vote
function showVote(voteId,$this) {
	var postdate = "id=" + voteId ;
	var request = jQuery.ajax({
	  type: "GET",
	  url: url,
	  data: postdate,
	  beforeSend: function (  ) {
    	//alert("beforeSend! " + postdate);
    	//show loading;
    	var html = '<div class="postvotebox"><span class="votedate"></span><h4 class="votetitle"></h4><div class="votenav"><a href="" class="votelink">本期结果</a></div><div class="votebody"><ul></ul><div class="voteresult"><div class="loading">loading...</div><div class="resultbox hide"><span class="resulinfo title">结果</span><span class="resulinfo left note"></span><span class="resulinfo right note"></span></div></div><div class="clearfix"></div></div></div>';
    	jQuery('.gzvotebox').html(html);
  	  }
	});
	request.done(function(msg) {
		JSON = eval('(' + msg + ')');
		apitxt = msg;
		var eventtimes = null;
		var tempjson = JSON.answers
		,html = "";

		jQuery.each(tempjson,function(){
			//alert(this.id + "," + this.text + "," + this.image_url);
			//<li class="voteitem"><a href="#" data-ref="voteid=1%26itemid=1"><img class="style01" src="1.jpg" /><span class="itemname">高富帅</span></a><div class="mark"></div></li>
			
			html = html + '<li class="voteitem"><a href="#" data-ref="id='+ JSON.question_id +'%26do=vote%26answers='+ this.id +'"><img class="style01" src="'+ this.image_url +'" /><span class="itemname">'+ this.text +'</span></a><div class="mark"></div></li>'
		});
		eventtimes = setTimeout(function(){
			jQuery('.postvotebox ul').html(html);
			jQuery('.postvotebox .votetitle').html(JSON.question);
			jQuery('.postvotebox .votedate').html(JSON.start_date);
			jQuery('.voteresult').hide();
		},300);
	});
}

//main fuction
(function( $ ){

$.fn.gzVote = function(voteId) { 
/* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */
  	showVote(voteId);
	/*$(".voteitem a").on('click', function() {
		alert(linkInfo);
		var linkInfo = $(this).attr("data-ref")
		,$this = $(this);
		alert(linkInfo);
		if (linkInfo !== ""){
			postVote(linkInfo,$this);
		}
		return false;
	});
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
	$(".voteitem a").live('click', function() {
		var linkInfo = $(this).attr("data-ref")
		,$this = $(this);
		//alert(linkInfo);
		if (linkInfo !== ""){
			postVote(linkInfo,$this);
		}
		return false;
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

};
  
})( jQuery );
