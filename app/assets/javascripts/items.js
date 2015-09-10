var addItemToBatch = (function(){
	$('.searchbar form').on('submit', function(event){
		event.preventDefault();
		$('.alert').hide();
		var $target = $(event.target)
		var url = $target.attr('action')
		var data = $target.serialize();
		$.post(url, data).done(function(data){
			$('.displayItemWrapper tbody').append(data);
			$('.displayItemWrapper tbody').val('');
		}).fail(function(error){
			console.log(error);
			$('.alert').empty();
			$('.alert').append(error.responseText).show();
		})
	})
})