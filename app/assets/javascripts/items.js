var routeTo = (function(route){
	window.location.href = route;
});

var ClearanceBatch = (function(){

	var clearancingItem = (function(cssSelectorForm){
		$(cssSelectorForm).on('click', '.add_item_to_batch', function(event){
			event.preventDefault();
			$('.alert').hide();
			var $target = $(this.form);
			var url = $target.attr('action');
			var data = $target.serialize()+"&add_item=add_item";

			$.post(url, data).done(function(data){
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
				$('.flash-messages').append(error).show();			})
			
		})
	})

	return {
		clearancingItem: clearancingItem,
		saveItemsToBatch: saveItemsToBatch
	}
	
})();
// ('#tblPurchaseOrders tr.PO1').each(function(index, tr) {
//     var lines = $('td', tr).map(function(index, td) {
//         return $(td).text();
//     });
