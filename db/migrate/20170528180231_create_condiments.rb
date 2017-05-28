class CreateCondiments < ActiveRecord::Migration[5.0]
  def change
    create_table :condiments do |t|
      t.string :label
      t.float :calories

      t.timestamps
    end
  end
end
