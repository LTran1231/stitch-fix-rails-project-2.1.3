class Style < ActiveRecord::Base
  self.inheritance_column = :_type_disabled
  has_many :items

  def self.search(query)
		where("name ILIKE '%#{query}%' OR type ILIKE '%#{query}%'")
  end

end
