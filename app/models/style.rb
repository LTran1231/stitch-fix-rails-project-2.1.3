class Style < ActiveRecord::Base
  self.inheritance_column = :_type_disabled
  has_many :items

  def self.search(query)
		where("name LIKE? OR type LIKE?", "%#{query}%", "%#{query}%")
  end

end
