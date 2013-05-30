	function angr (a, b ,c) {
		// body...
		var p = 0.5*(a + b + c);
		var s =  Math.pow((p*(p-a)*(p-b)*(p-c)),1/2);
		var h = 2*s/c;
		var t1 = (c*c + a*a - b*b )/ (2*c);
		var t2 = c - t1;
		this.div = $("<div>").css({
			'width':'0px',
			'height':'0px',
			'border-top': h + 'px rgb(250,0,255) solid',
			'border-left':t1 + 'px solid transparent',
			'border-right':t2 + 'px solid transparent'
		});

		this.html = function(){
		
			var html = this.div[0].outerHTML;
			console.log(html);
			return html;
		}
	}

	function draw(angrObj){
		document.write(angrObj.html());
	}
	draw(new angr(500,400,600));
	