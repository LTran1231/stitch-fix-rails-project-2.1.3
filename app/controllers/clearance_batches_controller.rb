class ClearanceBatchesController < ApplicationController

  def index
    @clearance_batches  = ClearanceBatch.all
    p "*" * 100
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

    

  #   p "~" * 100
  #   clearancing_status = ClearancingService.process_item(params[:itemID])
  #   clearance_batch    = clearancing_status.clearance_batch
  #   alert_messages     = []
  #   if clearance_batch.persisted?
  #     flash[:notice]  = "#{clearance_batch.items.count} items clearanced in batch #{clearance_batch.id}"
  #   else
  #     alert_messages << "No new clearance batch was added"
  #   end
  #   if clearancing_status.errors.any?
  #     alert_messages << "#{clearancing_status.errors.count} item ids raised errors and were not clearanced"
  #     clearancing_status.errors.each {|error| alert_messages << error }
  #   end
  #   flash[:alert] = alert_messages.join("<br/>") if alert_messages.any?
  #   redirect_to action: :index
  # end

end
