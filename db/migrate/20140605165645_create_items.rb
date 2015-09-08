class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :size
      t.string :color
      t.string :status
      t.decimal :price_sold
      t.timestamp :sold_at
      t.belongs_to :style

      t.timestamps
    end
  end
end
