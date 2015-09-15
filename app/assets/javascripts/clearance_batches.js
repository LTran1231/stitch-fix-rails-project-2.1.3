var routeTo = (function(route){
	window.location.href = route;
});

var ClearanceBatch = (function(){

	var clearancingItem = (function(cssSelectorForm){
		$(cssSelectorForm).on('submit', function(event){
			event.preventDefault();
			$('.alert').hide();
			var $target = $(event.target);
			var url = $target.attr('action');
			var data = $target.serialize()+"&add_item=add_item";
			$.get(url, data).done(function(data){
				$('.save_items_to_new_batch').show();
				$('.displayItemWrapper tbody').append(data);
				$('#itemID').val('');
			}).fail(function(error){
				$('.flash-messages').empty();
				$('.flash-messages').append(error.responseText).show();
			})
		})
	});

	var saveItemsToBatch = (function(cssSelectorForm){
		$(cssSelectorForm).on('submit', function(event){
			event.preventDefault();
			var $target = $(event.target);
			var url = $target.attr('action');

			var itemids = [];
			$('.item_id_for_clearance').each(function(index, input){
				itemids.push($(input).html());
			});

			var data = $target.serialize()+"&itemids="+itemids;

			$.post(url, data).done(function(data){
				console.log(data);
				routeTo(location.origin);
				$('.flash-messages').empty();
				$('.flash-messages').append(data).show();

			}).fail(function(error){
				$('.flash-messages').empty();
				$('.flash-messages').append(error).show();			
			})
		})
	})

	var removeItemFromBatch = (function(cssSelectorLink){
		$(cssSelectorLink).on('click', '.remove_item_or_batch', function(event){
			event.preventDefault();
			var $target = $(this);
			var url = $target.attr('href');
			var type = "DELETE"
			// var batch_id = $target.closest('.clearance-batch-wrapper').find('h2').html().split(" ").pop();
			var item_id = $target.closest('tr').find('td').eq(0).html();

			$.ajax({
				url: url,
				type: type,
				dataType: "JSON",
				data: { item_id: item_id }
			}).done(function(data){
				$target.closest('tr').remove();
			})
		})
	})


	return {
		clearancingItem: clearancingItem,
		saveItemsToBatch: saveItemsToBatch,
		removeItemFromBatch: removeItemFromBatch,
		// deleteBatch: deleteBatch
	}
	
})();