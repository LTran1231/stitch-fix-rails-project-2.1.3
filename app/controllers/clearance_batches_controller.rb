class ClearanceBatchesController < ApplicationController
  before_action :set_clearance_batch, only: [:show, :edit]

  def index
    @clearance_batches  = ClearanceBatch.paginate(:page => params[:page])
  end

  def show 
    @total_amount_sold = @items.inject(0) { |sum, item| sum + item.price_sold }
  end

  def new
  end

  def edit
    
  end


  def potential_clearance_item
    clearancing_status = ClearancingService.process_item(params[:itemID])
    if clearancing_status.item_id_to_clearance
      item = clearancing_status.item_id_to_clearance
      render partial: "items/tbody_single_item", locals: {item: item}, layout: false
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
    end
      render "shared/_flash_messages", layout: false
  end

  def update
    clearancing_status = ClearancingService.process_item(params[:itemID])
    if !clearancing_status.item_id_to_clearance.nil? 
      Item.transaction do
        clearance_batch = ClearanceBatch.find(params[:id]) 
        item = clearancing_status.item_id_to_clearance
        item.clearance!
        clearance_batch.items << item
        clearance_batch.save!
      end
      render "items/_tbody_single_item", locals: { item: clearancing_status.item_id_to_clearance }, layout: false
    else
      flash.now[:alert] = clearancing_status.error
      render "shared/_flash_messages", status: 400, layout: false
    end
    

  end

  def destroy
    @clearance_batch = ClearanceBatch.find(params[:id])
    item_id = params[:item_id].to_i
    if item_id.is_a?(Integer) && item_id != 0
      item = @clearance_batch.items.find(params[:item_id])
      item.reverse_clearanced!
      render :nothing => true, :status => 204
    else
      @clearance_batch.items.each do |item|
        item.reverse_clearanced!
      end
      @clearance_batch.destroy!
      render :nothing => true, :status => 204
    end

  end

  private

  def set_clearance_batch
    @clearance_batch = ClearanceBatch.find(params[:id])
    @items = @clearance_batch.items
  end

end
