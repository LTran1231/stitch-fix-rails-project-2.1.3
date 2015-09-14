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

  ClearanceBatch.clearancingItem('.searchbar form');
  ClearanceBatch.saveItemsToBatch('.save_items_to_new_batch form');
  ClearanceBatch.removeItemFromBatch('.container-fluid');


  Items.getAll('.all-items');
  Items.getAll('#items th a, #items .pagination a');
  Items.search('.searchbar form');
  // Items.paginate('.container-fluid');

})

