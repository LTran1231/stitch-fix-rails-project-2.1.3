var Items = (function(){

	var getAll = (function(cssSelectionLink){
		$('.side-nav').on('click', cssSelectionLink, function(event){
			event.preventDefault();
			var $target = $(event.target);
			var url = $target.attr('href');

			$.get(url).done(function(data){
				console.log(data);
				$('.container-fluid').empty()
				$('.container-fluid').append(data);
			})

		})
	})

	var search = (function(cssSelectionForm){
		$(cssSelectionForm).on('submit', function(event){
			event.preventDefault();
			var $target = $(event.target);
			var url = $target.attr('action');
			var data = $target.serialize();

			$.get(url, data).done(function(response){
				debugger
				console.log(response);
				$('#itemsTable tbody').empty();
				$('#itemsTable tbody').append(response);

			}).fail(function(error){
				console.log(error);
				$('.flash-messages').empty();
				$('.flash-messages').append(error.responseText).show();
			})
		})
	})



	return {
		getAll: getAll,
		search: search
	}



})();