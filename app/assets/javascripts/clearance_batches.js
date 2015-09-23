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

	var sendDataToArchived = (function(modal, url, data){
		$(modal).on('click', '.submit', function(){
			$.get(url, { archived: data }).done(function(response){
				routeTo(url);
			})
		})
	})

	var sendDataToDelete = (function(modal, url, type, item_id, target){
		$(modal).on('click', '.submit', function(){
			$(modal).modal('hide');
			target.closest('tr').remove();
			$.post(url, {_method: type, item_id: item_id})
			 .done(function(response){
				console.log(response)
			})
		})
	})

	var openModalForDeleteOrArchive = (function(cssModalSelector, batchID, type, url, item_id, target){
		$(cssModalSelector).on('show.bs.modal', function(event){
			var modal = $(this);
			if (type === "DELETE") {
				modal.find('.modal-title').empty().text("Clearance Batch " + batchID);
				modal.find('.modal-body p').empty().text("Are you sure you want to delele this clearance batch");
				modal.find('.modal-footer .submit').empty().text("Delete");
				sendDataToDelete(modal, url, type, item_id, target)
			} else if (type === "ARCHIVE") {
				modal.find('.modal-title').empty().text("Clearance Batch " + batchID)
				modal.find('.modal-body p').empty().text("Are you sure you want to archive this batch? Once a clearance batch is archived, you are not allowed to edit this batch.");
				modal.find('.modal-footer .submit').empty().text("Archived");
				sendDataToArchived(modal, url, batchID);
			}
		})
	})

	var deleteBatch = (function(cssSelectorLink, cssModalSelector){
		$('.container-fluid').on('click', cssSelectorLink, function(event){
			event.preventDefault();
			var $target = $(this);
			var url = $target.data('action');
			var batchID = $target.data('batch-id');
			var type = "DELETE";
			var item_id = $target.closest('tr').find('td').eq(0).html();

			openModalForDeleteOrArchive(cssModalSelector, batchID, type, url, item_id, $target);
		})
	})

	var deleteItemFromBatch = (function(cssSelector){
		$(cssSelector).on('click', function(event){
			event.preventDefault();
			var $target = $(this);
			var url = $target.attr('href');
			var type = "DELETE";
			var item_id = $target.closest('tr').find('td').eq(0).html();

			$.post(url, {_method: type, item_id: item_id })
			.done(function(data){
				$target.closest('tr').remove();
			})
		})
	})

	var archivedBatch = (function(cssSelector, cssModalSelector){
		$('.container-fluid').on('click', cssSelector, function(event){
			event.preventDefault();
			var $target = $(this);
			var url = location.origin;
			var batchID = $target.data('action');
			var type = "ARCHIVE";

			openModalForDeleteOrArchive(cssModalSelector, batchID, type, url )

		})
	})



	return {
		getAll: getAll,
		clearancingItem: clearancingItem,
		saveItemsToBatch: saveItemsToBatch,
		deleteBatch: deleteBatch,
		deleteItemFromBatch: deleteItemFromBatch,
		archivedBatch: archivedBatch,
	}
	
})();

