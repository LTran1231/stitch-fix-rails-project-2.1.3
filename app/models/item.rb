class Item < ActiveRecord::Base

  CLEARANCE_PRICE_PERCENTAGE  = BigDecimal.new("0.75")

  belongs_to :style
  belongs_to :clearance_batch

  scope :sellable, -> { where(status: 'sellable') }

  def clearance!
    update_attributes!(status: 'clearanced', 
                       price_sold: style.wholesale_price * CLEARANCE_PRICE_PERCENTAGE)
  end

  def reverse_clearanced!
  	update_attributes!(status: 'sellable',
  										 clearance_batch_id: nil,
  										 price_sold: nil,
  										 )
  end

end
