var tourList = new Array();
(function(){

	angular.module('tour',[])
	.directive('ngTour',function(){
		return {
			restrict:'EACM',
			link:function(scope,element,attr){
				console.log(scope);
				console.log(element.html());
				console.log(attr);
				console.log()
				//alert('a');
			}
		}
	})
	.directive('tourStep',function(){
		return {
			restrict:'EACM',
			transclude: true,
			templateUrl:'../src/template/tour.html',
			link:function(scope,element,attr){
				scope.attr = attr;
				console.log(element.html());
				tourList.push(attr);
			}
		}
	})
	;
})();