var tourCtrl = new (function () {
	var touringIndex = 0;
	this.tourList = new Array();
	this.next = function(){
		this.tourList[touringIndex].hide();
		touringIndex ++ ;
		if(touringIndex>=this.tourList.length){
			touringIndex = 0;
		}
		this.tourList[touringIndex].show();
		this.updateInfo();
	};
	this.prev = function(){
		this.tourList[touringIndex].hide();
		touringIndex -- ;
		if(touringIndex<0){
			touringIndex = this.tourList.length - 1;
		}
		this.tourList[touringIndex].show();
		this.updateInfo();
	};
	this.start = function(){
		touringIndex = 0;
		this.tourList[0].show();
		this.updateInfo();
	};
	this.stop = function(){
		this.tourList[touringIndex].hide();
		$(".touringMask").remove();
	};
	this.updateInfo = function(){
		var tour = this.tourList[touringIndex];
		tour.find('#touringIndex').text(touringIndex + 1);
		tour.find('#tourLength').text(this.tourList.length);
		$(".touringMask").remove();
		var mask = $("<div class='touringMask'>").appendTo($('html'));

	};
});
(function(){

	angular.module('tour',[])
	.directive('ngTour',function(){
		return {
			restrict:'EACM',
			link:function(scope,element,attr){
				tourCtrl.start();
			}
		}
	})
	.directive('tourStep',function(){
		(function($){
			$.fn.triangular = function (c, a, b,  d, color) {
				// body...
				var p = 0.5*(a + b + c);
				var s =  Math.pow((p*(p-a)*(p-b)*(p-c)),1/2);
				var h = 2*s/c;
				var t1 = (c*c + a*a - b*b )/ (2*c);
				var t2 = c - t1;

				this.css({
					'width':'0px',
					'height':'0px'
				});

				this.div = this;

				switch(d){
					case "N":
						this.div.css({
							'border-bottom': h + 'px ' + color + ' solid',
							'border-left':t1 + 'px solid transparent',
							'border-right':t2 + 'px solid transparent'
						});   
						break;
					case "S":
						this.div.css({
							'border-top': h + 'px ' + color + ' solid',
							'border-left':t1 + 'px solid transparent',
							'border-right':t2 + 'px solid transparent'
						});   
						break;
					case "E":
						this.div.css({
							'border-left': h + 'px ' + color + ' solid',
							'border-top':t1 + 'px solid transparent',
							'border-bottom':t2 + 'px solid transparent'
						}); 
					    break;
					case "W":
						this.div.css({
							'border-right': h + 'px ' + color + ' solid',
							'border-top':t1 + 'px solid transparent',
							'border-bottom':t2 + 'px solid transparent'
						}); 
					    break;
					default:
						this.div.css({
							'border-top': h + 'px ' + color + ' solid',
							'border-left':t1 + 'px solid transparent',
							'border-right':t2 + 'px solid transparent'
						});   
				}


				

				this.html = function(){
				
					var html = this.div[0].outerHTML;
					console.log(html);
					return html;
				}

				return this.div;
			}
		})(jQuery);
		return {
			restrict:'EACM',
			transclude: true,
			template:'\
				<div>\
					<div ng-transclude></div>\
					<div class="tour-wrapper">\
							\
						<div class="tour-skin">\
							<div class="tour-arrow triangular" ></div>\
							<div class="tour-content">\
								<div>\
									<div  class="close-tip">	<a href="" id="close">X</a></div>\
									<div  class="tour-link"></div>\
								</div>\
								<div class="tour-btn">\
									<div class="prev">回退</div>\
									<div class="next">前进</div>\
								</div>\
								<div>stepInfo: <span id="touringIndex">1</span>/<span id="tourLength">5</span></div>\
							</div>\
						</div>\
					</div>\
				\
				',
			link:function(scope,element,attr){
				scope.attr = attr;
				var tour = element.find(".tour-wrapper");
				tour.hide();
				
				if(attr.text!=undefined){
					tour.find(".tour-link").html(attr.text);
				}else if(attr.link!=undefined){
					var iframe = $("<iframe>").attr("src",attr.link).css({
						'border':'0px'
					});
					iframe.appendTo(tour.find(".tour-link"));
				}else{
					//console.log('error,,你啥也没指定啊！！')
				}
				

				tour.find("#close").click(function(){
					tourCtrl.stop();
				});
				tour.find(".prev").click(function(){
					tourCtrl.prev();
				});
				tour.find(".next").click(function(){
					tourCtrl.next();
				});

				console.log(attr);

				tour.find(".triangular").triangular(20,20,20,'N','#eee');

				tourCtrl.tourList.push(tour);
				//element.find(".tour-wrapper").hide();
			}
		}
	});
})();