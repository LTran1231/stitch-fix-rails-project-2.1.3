var ClearanceBatch = (function(){

	var clearancingItem = (function(cssSelectorForm){
		$(cssSelectorForm).on('click', '.add_item_to_batch', function(event){
			event.preventDefault();
			$('.alert').hide();
			var $target = $(this.form);
			var url = $target.attr('action');
			var data = $target.serialize()+"&add_item=add_item";
			$.post(url, data).done(function(data){
				$('.displayItemWrapper tbody').append(data);
				$('#itemID').val('');
			}).fail(function(error){
				console.log(error);
				$('.alert').empty();
				$('.alert').append(error.responseText).show();
			})
		})
	});

	var saveItemsToBatch = (function(){
		$('.save_items_to_new_batch form').on('submit', function(event){
			event.preventDefault();
			var $target = $(event.target);
			var url = $target.attr('action');

			// var data = $('.item_id_for_clearance').contents();
			

			// $(".item_id_for_clearance").val() || [];

			var itemids = [];
			$('.item_id_for_clearance').each(function(index, input){
				itemids.push($(input).html());
			});

			var data = $target.serialize()+"&itemids="+itemids;

			// for(var index = 0; index < data.length; index++ ){
			// 	var itemids = (data[index]) + " "
			// 	return itemids;
			// }

			$.post(url, data).done(function(data){
				console.log(data);

			})
			
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
