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
	dynamicSelect.empty().append('<option value="">Canvas #</option>')
	var nodeData;

	//console.log(getUniqueInt(2, 4));
	var uId = getUniqueInt(2, 4);;
	var canvasCont = $('#canvasCont');
	canvasCont.empty();

	for (var i = 0; i < uId; i++) {
		canvasCont.append('<div id="#canvasbox'+(i+1)+'" class="canvasbox"></div>');
		dynamicSelect.append('<option id="customSelectOption'+(i+1)+'" value="'+(i+1)+'">Canvas '+(i+1)+'</option>');

	}

	var storejson = jsondata;
	for (var i = 0; i < storejson.length; i++) {	
		
		if ( i == 0 || i == 1 || i == ( storejson.length - 2 ) ||  i == ( storejson.length - 1 )  ) {
			nodeData = storejson[i];
			//console.log('index =>'+i+'; nodeData =>'+nodeData);
			// console.log(nodeData[id])
			// for ( key in nodeData ){
			// 	console.log( 'key =>'+key+'; keyValue =>'+nodeData[key]);

			// }

			var dynamicOption = '<option value="" data-id="'+nodeData['id']+'" data-albumId="'+nodeData['albumId']+'" data-title="'+nodeData['title']+'" data-url="'+nodeData['url']+'" data-thumbnailUrl="'+nodeData['thumbnailUrl']+'"></option>';
			dynamicSelect.append(dynamicOption);
		}
	}
	dynamicSelect.css('display','inline-block');
	$("#canvasInsert").css('display','inline-block');
}

function getUniqueInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(function () {
	if ($('#canvas').length > 0) {
		//canvas();
		$("#canvasGenrate").on('click', function(){
			canvas();
		})
	}
});