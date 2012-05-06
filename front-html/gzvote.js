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
var eventtimes = null
, url = 'vote.json' ;
//post vote
function postVote(voteInfo,$this) {
	$this.parents(".votebody").find(".voteresult").show();
	var postdate = voteInfo;
	var request = jQuery.ajax({
	  type: "POST",
	  url: url,
	  data: postdate
	});
	request.done(function(msg) {
		var eventtimes = null;
		eventtimes = setTimeout(function(){
			$this.parents(".votebody").find(".loading").hide();
			$this.parents(".votebody").find(".resultbox").show();
		},300);
	});
}
//main fuction
!function( $ ) {
 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */
	$(".voteitem a").live('click', function() {
		var linkInfo = $(this).attr("data-ref")
		,$this = $(this);
		if (linkInfo !== ""){
			postVote(linkInfo,$this);
		}
		return false;
	});
	$(".voteitem img").live('hover', function() {
		var linkInfo = $(this).parents("a").attr("data-ref")
		,$this = $(this)
		,$linkItem = $this.parents(".voteitem")
		//,$allItem = $(".voteitem");
		, $allItem = $this.parents(".votebody").find(".voteitem");
		//var eventtimes = null;
		//eventtimes = setTimeout(function(){
			$linkItem.addClass("blue");
			$allItem.addClass("notfuct");
			$linkItem.removeClass("notfuct");
		//},40);
	});
	$(".voteitem img").live('mouseout', function() {
		var $this = $(this)
		,$linkItem = $this.parents(".voteitem")
		//,$allItem = $(".voteitem");
		, $allItem = $this.parents(".votebody").find(".voteitem");

		$allItem.removeClass("notfuct");
		$linkItem.removeClass("notfuct").removeClass("blue");
	});	
	$(".votebody").live('mouseout', function() {
		var $this = $(this);
		var eventtimes = null;
		eventtimes = setTimeout(function(){
			//$this.find(".notfuct").removeClass("notfuct");
			//$this.find(".blue").removeClass("blue");
		},20);
	});
}( window.jQuery );
