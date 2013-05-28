var tourList = new Array();
(function(){

	angular.module('tour',[])
	.directive('ngTour',function(){
		return {
			restrict:'EACM',
			link:function(scope,element,attr){
				console.log(scope);
				console.log(element);
				console.log(attr);
				console.log()
				//alert('a');
			}
		}
	})
	.directive('tourStep',function(){
		return {
			restrict:'EACM',
			link:function(scope,element,attr){
				tourList.push(attr);
			}
		}
	})
	;
})();