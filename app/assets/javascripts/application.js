// This is a manifest file that'll be compiliteed into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require_tree .

$(function () {

	ClearanceBatch.getAll('#batches th a, #batches .pagination a')
  ClearanceBatch.clearancingItem('.potential-clearance-item-search form');
  ClearanceBatch.clearancingItem('.find_item_id_n_add form');
  ClearanceBatch.saveItemsToBatch('.save_items_to_new_batch form');
  ClearanceBatch.deleteBatch('.remove_batch', '.confirmModal');
  ClearanceBatch.deleteItemFromBatch('.remove_item')
  ClearanceBatch.archivedBatch('.archive-batch', '.confirmModal');

  Items.getAll('#items th a, #items .pagination a');
  Items.search('.items-search form');

})

var routeTo = (function(route){
	window.location.href = route;
});



