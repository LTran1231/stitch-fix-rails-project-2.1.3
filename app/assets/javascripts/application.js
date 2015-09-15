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
//= require jquery
//= require bootstrap-sprockets
//= require bootstrap
//= require_tree .

$(function () {
	// Navbar.linkToItems('.navbar a');

	ClearanceBatch.getAll('#batches th a, #batches .pagination a')
  ClearanceBatch.clearancingItem('.potential-clearance-item-search form');
  ClearanceBatch.clearancingItem('.find_item_id_n_add form');
  ClearanceBatch.saveItemsToBatch('.save_items_to_new_batch form');
  ClearanceBatch.removeItemFromBatch('.container-fluid');

  // Items.getAll('.all-items');
  Items.getAll('#items th a, #items .pagination a');
  Items.search('.items-search form');

})

var routeTo = (function(route){
	window.location.href = route;
});

var Navbar = (function(){
	var linkToItems = (function(cssSelector){
		$(cssSelector).on('click', function(event){
			event.preventDefault();

			var route = $(event.target).attr('href');
			routeTo(route);

		})
	})

	return {
		linkToItems: linkToItems
	}
})();

