class AddClearanceBatchesTable < ActiveRecord::Migration
  def up
    create_table :clearance_batches do |t|
      t.timestamps
    end
    add_column :items, :clearance_batch_id, :integer, null: true
    add_index :items, :clearance_batch_id
  end

  def down
    remove_column :items, :clearance_batch_id
    drop_table :clearance_batches
  end
end
