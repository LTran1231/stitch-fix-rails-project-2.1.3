var Items = (function(){

	var getAll = (function(cssSelectorLink){
		$(document).on('click', cssSelectorLink, function(event){
			event.preventDefault();
			var $target = $(event.target);
			var url = $target.attr('href');

			$.get(url).done(function(data){
				console.log(data);
				$('#items').empty()
				$('#items').append(data);
			})

		})
	})

	var search = (function(cssSelectorForm){
		$(document).on('submit', cssSelectorForm, function(event){
			event.preventDefault();
			var $target = $(event.target);
			var url = $target.attr('action');
			var data = $target.serialize();
			$('.flash-messages').empty();


			$.get(url, data).done(function(response){
				$('#items').empty();
				$('#items').append(response);
				$('#search').val("");

			}).fail(function(error){
				$('.flash-messages').append(error.responseText).show();
			})
		})
	})


	return {
		getAll: getAll,
		search: search,
	}

})();