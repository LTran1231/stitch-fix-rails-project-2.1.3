class Item < ActiveRecord::Base

  CLEARANCE_PRICE_PERCENTAGE  = BigDecimal.new("0.75")

  belongs_to :style
  belongs_to :clearance_batch

  scope :sellable, -> { where(status: 'sellable') }


  def clearance!
    update_attributes!(status: 'clearanced', 
                       price_sold: calculate_clearance_discount)
  end

  def reverse_clearanced!
  	update_attributes!(status: 'sellable',
  										 clearance_batch_id: nil,
  										 price_sold: nil,
  										 )
  end

  def self.search(input)
    results = where("status LIKE? OR id LIKE?", "%#{input}%", "#{input}")
    styles = Style.where("name LIKE? OR type LIKE?", "%#{input}%", "%#{input}%")
    styles.each do |style|
      style.items.each do |item|
        results << item
      end
    end
    results
  end

  private
  
  def calculate_clearance_discount
    discounted_price = self.style.wholesale_price * CLEARANCE_PRICE_PERCENTAGE 
    style_type = self.style.type
    if style_type == "Pants" || style_type == "Dress"
      price_sold = [discounted_price, 5.0].max
    else 
      price_sold = [discounted_price, 2.0].max
    end
  end

end
