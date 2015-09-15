class AddStatusToClearanceBatches < ActiveRecord::Migration
  def change
    add_column :clearance_batches, :status, :string
  end
end
