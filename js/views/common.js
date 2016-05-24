$(document).ready(function(){

	var totalPage,currentPage;
	$(window).mousemove(function () {
		if ($(window).scrollTop() >=100) {
			$("div.nav-bar").addClass("fixed-top");
		}else{
			$("div.nav-bar").removeClass("fixed-top");
		}
	});
	window.initSubNavbar = function(){
		var eleStr = "<span class='glyphicon glyphicon-chevron-down chevron-down'></span><span class='glyphicon glyphicon-chevron-up chevron-up display-none'></span>";
		$(".sub-nav li.has-sub").prepend(eleStr);
		$(".sub-nav li.has-sub >ul").addClass("display-none");
		$("ul.second-nav >li.second-nav-li").first().addClass("active");
		$("ul.second-nav >li.second-nav-li").first().find("ul.third-nav li.third-nav-li").first().addClass("active");
		var firstNavHtml = $(".nav-bar ul.nav-main >li.active").find("a").first().prop('outerHTML');
		$("#first-nav-text").html(firstNavHtml);
		var secondNavHtml = $("ul.second-nav >li.second-nav-li").first().find("a").first().prop('outerHTML');
		var thirdNavHtml = $("ul.second-nav >li.second-nav-li").first().find("ul.third-nav li.third-nav-li a").first().prop('outerHTML');
		var navHtml = thirdNavHtml ?  secondNavHtml + "&nbsp;&nbsp;•&nbsp;" + thirdNavHtml.replace(/\&gt\;/,"") : secondNavHtml;
		$("#sub-nav-text").html(navHtml);
		$(".sub-nav li.has-sub").on("click",function(e){
			e.stopPropagation();
			var targetLi = e.target.nodeName == "A"||"SPAN" ? $(e.target).parent() : $(e.target);
			if(targetLi.hasClass("has-sub")){
				$(this).find("span.glyphicon").stop().toggleClass("display-none");
				$(this).find("ul").stop().slideToggle("display-none");
			}
		});
		$(".sub-nav li").on("click",function(e){
			e.stopPropagation();
			var targetLi = $(this);
			var htmlText = "";
			if($(this).hasClass("has-sub")){
				return;
			}else if($(this).hasClass("third-nav-li")){                //三级菜单点击响应
//				parentText = $(this).parents("li.second-nav-li").find("a").first().text();$(this)
				$("ul.second-nav").find("li").removeClass("active");
				$(this).parents("li.second-nav-li").addClass("active");
				$(this).addClass("active");
				parentHtml = $(this).parents("li.second-nav-li").find("a").first().prop('outerHTML');
				htmlText = parentHtml +"&nbsp;&nbsp;•&nbsp;"+ $(this).find("a").first().prop('outerHTML').replace(/\&gt\;/,"");
			}else{
				$("ul.second-nav").find("li").removeClass("active");    //二级菜单点击响应
				$(this).addClass("active");
				htmlText = $(this).find("a").first().prop('outerHTML');   
			}

			$("#sub-nav-text").html(htmlText);
		});
	};
	window.initPagination = window.setPagination = function(totalpage,currentpage){
		totalPage = totalpage;
		currentPage = currentpage;
		var fixedDiff = 5;
		var preDiff = currentPage - 1;
		var nextDiff = totalPage - currentPage;
		var start=0,end=totalPage;
		var preSpotShow = false,nextSpotShow = false;
		if(currentPage == 1){
			$("ol.pagination #prePage").addClass("disable");
		}else if(currentPage == totalPage){
			$("ol.pagination #nextPage").addClass("disable");
		}else{
			$("ol.pagination #prePage").removeClass("disable");
			$("ol.pagination #nextPage").removeClass("disable");
		}
		if(fixedDiff>=totalPage){
			start = 1;
			end = totalPage;
		}else{
			if(currentPage - Math.floor(fixedDiff/2)>0){
				start = currentPage - Math.floor(fixedDiff/2);
				end = start + fixedDiff - 1;
			}else if(currentPage - Math.floor(fixedDiff/2)<=0){
				start = 1;
				end = start + fixedDiff - 1;
			}
			if(currentPage + Math.floor(fixedDiff/2)>totalPage){
				end = totalPage;
				start = end - fixedDiff +1;
			}
		}

		if(start>1){
			$("ol.pagination #preSpot").show();
		}else{
			$("ol.pagination #preSpot").hide();
		}
		if(end<totalPage){
			$("ol.pagination #nextSpot").show();
		}else{
			$("ol.pagination #nextSpot").hide();
		}
		var liStr = "";
		for(var i= start;i<=end;i++){
			liStr = liStr + '<li class="page" data-index="'+ i +'"><a href="javascript:void(0);" data-index="'+ i +'">'+ i +'</a></li>' ;
		}
		$("ol.pagination li.page").remove();
		$(liStr).insertAfter("ol.pagination #preSpot");
		$("ol.pagination li[data-index='"+ Number(currentPage)+"']").addClass("active");

	}
	$("ol.pagination").on("click","li",function(e){
		e.preventDefault();
		if($(this).hasClass("disable"))
			return;
		var selectPage = Number($(this).attr("data-index"));
		if(selectPage == 0){
			if(currentPage != 1){
				currentPage--;
			}
		}else if(selectPage == -1){
			if(currentPage !=totalPage){
				currentPage++;
			}
		}else{
			currentPage = selectPage;
		}
		setPagination(totalPage,currentPage);
	});
	$("#pageSubmit").on("click",function(){
		var page = Number($("#inputPage").val());
		if(page<1 ||page > totalPage){
			alert("输入页数超出范围,请重新输入!");
			return;
		}
		currentPage = Number(page);
		setPagination(totalPage,currentPage);
	});
	
});