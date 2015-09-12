require 'csv'
require 'ostruct'
class ClearancingService
  class << self

    def process_item(itemID)
      clearancing_status = create_clearancing_status
      potential_item_id = itemID.to_i
      clearancing_error = what_is_the_clearancing_error?(potential_item_id)
      if clearancing_error
        clearancing_status.error = clearancing_error
      else
        item = Item.find(potential_item_id)
        clearancing_status.item_id_to_clearance = item
      end
      clearancing_status
    end

    def saving_items(itemids)
      clearancing_status = create_clearancing_status
      clearancing_status.item_ids_to_save = itemids.split(',')
      clearance_items!(clearancing_status) 
    end



  private

    def clearance_items!(clearancing_status)
      if clearancing_status.item_ids_to_save.any? 
        Item.transaction do
          clearancing_status.clearance_batch.save!
          clearancing_status.item_ids_to_save.each do |item_id|
            item = Item.find(item_id)
            item.clearance!
            clearancing_status.clearance_batch.items << item
          end
        end
      end
      clearancing_status
    end

    def what_is_the_clearancing_error?(potential_item_id)
      if potential_item_id.blank? || potential_item_id == 0 || !potential_item_id.is_a?(Integer)
        return "Item id #{potential_item_id} is not valid"      
      end
      if Item.where(id: potential_item_id).none?
        return "Item id #{potential_item_id} could not be found"      
      end
      if Item.sellable.where(id: potential_item_id).none?
        return "Item id #{potential_item_id} could not be clearanced"
      end

      return nil
      
    end

    def create_clearancing_status
      OpenStruct.new(
        clearance_batch: ClearanceBatch.new,
        item_ids_to_save: nil,
        item_id_to_clearance: nil,
        error: nil)
    end

  end
end
