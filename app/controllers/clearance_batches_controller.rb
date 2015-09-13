class ClearanceBatchesController < ApplicationController

  def index
    @clearance_batches  = ClearanceBatch.all
  end

  def new
  end

  def potential_clearance_item
    clearancing_status = ClearancingService.process_item(params[:itemID])
    if clearancing_status.item_id_to_clearance
      item = clearancing_status.item_id_to_clearance
      render "_display_item", locals: {item: item}, layout: false
    else
      flash[:notice] = nil
      flash.now[:alert] = clearancing_status.error
      render "shared/_flash_messages", status: 400, layout: false
    end
  end

  def create

    clearancing_status = ClearancingService.saving_items(params[:itemids])
    clearance_batch = clearancing_status.clearance_batch
    if clearance_batch.persisted?
      flash.now[:notice] = "#{clearance_batch.items.count} items clearanced in batch #{clearance_batch.id}"
    else
      flash.now[:alert] = "No new clearance batch was added"
      # render "shared/_flash_messages", status: 400, layout: false 
    end
      render "shared/_flash_messages", layout: false
  end

end
