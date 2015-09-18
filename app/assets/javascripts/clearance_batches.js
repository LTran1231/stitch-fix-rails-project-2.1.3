var ClearanceBatch = (function(){

	var getAll = (function(cssSelectorLink){
		$(document).on('click', cssSelectorLink, function(event){
			event.preventDefault();
			var $target = $(event.target);
			var url = $target.attr('href');


			$.get(url).done(function(response){
				$('#batches').empty()
				$('#batches').append(response);

			})

		})
	})

	var clearancingItem = (function(cssSelectorForm){
		$(cssSelectorForm).on('submit', function(event){
			event.preventDefault();
			$('.alert').hide();
			var $target = $(event.target);
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
			var type = "DELETE";
			var item_id = $target.closest('tr').find('td').eq(0).html();

			$.ajax({
				url: url,
				type: type,
				dataType: "JSON",
				data: { item_id: item_id }
			})
			.done(function(data){
				$target.closest('tr').remove();
			})
		})
	})

	var confirmedSendData = (function(modal, url, data){
		$(modal).on('click', '.submit', function(){
			$.get(url, { archived: data }).done(function(response){
				routeTo(url);
			})
		})
	})

	var openModalConfirmAction = (function(OpenModal){
		$(document).on('show.bs.modal', OpenModal, function(event){
			console.log("hi")
			var $target = $(event.relatedTarget);
			var data = $target.data('action');
			var modal = $(this);
			var url = location.origin;
			
			modal.find('.modal-title').text("Clearance Batch "+data)
			modal.find('.modal-body p').text("Are you sure you want to archive this batch? Once a clearance batch is archived, you are not allowed to edit this batch.");
			modal.find('.modal-footer .submit').text("Archived");

			confirmedSendData(modal, url, data);

		})
	})



	return {
		getAll: getAll,
		clearancingItem: clearancingItem,
		saveItemsToBatch: saveItemsToBatch,
		removeItemFromBatch: removeItemFromBatch,
		openModalConfirmAction: openModalConfirmAction,
	}
	
})();

