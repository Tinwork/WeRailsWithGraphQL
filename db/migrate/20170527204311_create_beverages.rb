class CreateBeverages < ActiveRecord::Migration[5.0]
  def change
    create_table :beverages do |t|
      t.string :label
      t.boolean :ice
      t.float :calories

      t.timestamps
    end
  end
end
