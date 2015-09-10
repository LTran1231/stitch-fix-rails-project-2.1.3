class ClearanceBatchesController < ApplicationController

  def index
    @clearance_batches  = ClearanceBatch.all
    p "*" * 100
  end

  def potential_clearance_item
    input_status = ClearancingService.new.process_item(params[:itemID])
    if input_status.nil?
      item = Item.find(params[:itemID])
      render "_display_item", locals: {item: item}, layout: false
    else
      input_status
    end
    # find item by id and add to potential batch
  end

  def create
    p "~" * 100
    clearancing_status = ClearancingService.new.process_file(params[:itemID])
    clearance_batch    = clearancing_status.clearance_batch
    alert_messages     = []
    if clearance_batch.persisted?
      flash[:notice]  = "#{clearance_batch.items.count} items clearanced in batch #{clearance_batch.id}"
    else
      alert_messages << "No new clearance batch was added"
    end
    if clearancing_status.errors.any?
      alert_messages << "#{clearancing_status.errors.count} item ids raised errors and were not clearanced"
      clearancing_status.errors.each {|error| alert_messages << error }
    end
    flash[:alert] = alert_messages.join("<br/>") if alert_messages.any?
    redirect_to action: :index
  end

end
