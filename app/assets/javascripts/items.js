var Items = (function(){

	var getAll = (function(cssSelectorLink){
		$(document).on('click', cssSelectorLink, function(event){
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

	var search = (function(cssSelectorForm){
		$(document).on('submit', cssSelectorForm, function(event){
			event.preventDefault();
			var $target = $(event.target);
			var url = $target.attr('action');
			var data = $target.serialize();

			$.get(url, data).done(function(response){

				console.log(response);
				$('#items').empty();
				$('#items').append(response);

			}).fail(function(error){
				console.log(error);
				$('.flash-messages').empty();
				$('.flash-messages').append(error.responseText).show();
			})
		})
	})


	return {
		getAll: getAll,
		search: search,
	}

})();