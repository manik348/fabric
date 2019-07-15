function canvas(){

	var jqxhr = $.getJSON( "https://jsonplaceholder.typicode.com/photos", function(d) {
	  //console.log( "success" + d );
	  datprocess(d)
	})
	  .done(function() {
	    //console.log( "second success" );
	  })
	  .fail(function() {
	    //console.log( "error" );
	  })
	  .always(function() {
	    //console.log( "complete" );
	  });
	 
	 
	jqxhr.complete(function() {
	  //console.log( "second complete" );
	});

}

function datprocess(jsondata){
	//console.log(jsondata.length);
	var dynamicSelect = $('#customSelect');
	dynamicSelect.empty().append('<option value="0">Canvas #</option>')
	var nodeData;

	//console.log(getUniqueInt(2, 4));
	var uId = getUniqueInt(2, 4);;
	var canvasCont = $('#canvasCont');
	canvasCont.empty();

	for (var i = 0; i < uId; i++) {
		canvasCont.append('<div id="canvasbox'+(i+1)+'" class="canvasbox"><span class="canvasLabel">'+(i+1)+'</span></div>');
		dynamicSelect.append('<option id="customSelectOption'+(i+1)+'" value="'+(i+1)+'">Canvas '+(i+1)+'</option>');
	}

	var storejson = jsondata;
	
	$("#canvasInsert").on('click', function(){
		var selectedCanvas = dynamicSelect.val();
		if( selectedCanvas != 0 ){
			insertIntoCanvas(storejson, selectedCanvas);
		}
	})

	dynamicSelect.css('display','inline-block');
	$("#canvasInsert").css('display','inline-block');
}

function insertIntoCanvas(storejson, canvasNumber){
	var rNode = getUniqueInt(3, 4997);
	for (var i = 0; i < storejson.length; i++) {	
		//debugger;
		if ( i == 0 || i == 1 || i == ( storejson.length - 2 ) ||  i == ( storejson.length - 1 ) || i == rNode  ) {
			nodeData = storejson[i];
			var thumbnailUrl = '', title = '', url = '';

			if ( isOdd( nodeData['id'] ) == 'odd' ) {
				thumbnailUrl = '<img src="'+ nodeData["thumbnailUrl"] +'" />';
				//$('#canvasbox'+canvasNumber).append(thumbnailUrl);
				$('#canvasbox'+canvasNumber).html(thumbnailUrl);
			}

			if ( isOdd( nodeData['id'] ) == 'even' ) {
				title = '<h4>'+ nodeData["title"] +'</h4>';
				//$('#canvasbox'+canvasNumber).append(title);
				$('#canvasbox'+canvasNumber).html(title);
			}

			if( nodeData['albumId'] >= 100 ){
				url = '<p>'+ nodeData["url"] +'</p>';
				//$('#canvasbox'+canvasNumber).append(url);
				$('#canvasbox'+canvasNumber).html(url);
			}
			//console.log('index =>'+i+'; nodeData =>'+nodeData);
			// console.log(nodeData[id])
			// for ( key in nodeData ){
			// 	console.log( 'key =>'+key+'; keyValue =>'+nodeData[key]);

			// }

			//var dynamicOption = '<option value="" data-id="'+nodeData['id']+'" data-albumId="'+nodeData['albumId']+'" data-title="'+nodeData['title']+'" data-url="'+nodeData['url']+'" data-thumbnailUrl="'+nodeData['thumbnailUrl']+'"></option>';
			/*if (thumbnailUrl != '') {
				$('#canvasbox'+canvasNumber)
			}
			if (title != '') {
				$('#canvasbox'+canvasNumber)
			}*/
		}
	}
}

function getUniqueInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isOdd(num) { 
	//return num % 2;
	if ( (num % 2) == 0 ) {
		return 'even';
	} else {
		return 'odd';
	}
}

$(function () {
	if ($('#canvas').length > 0) {
		//canvas();
		$("#canvasGenrate").on('click', function(){
			canvas();
		})
		
	}
});