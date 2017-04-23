class CreateBeverages < ActiveRecord::Migration[5.0]
  def change
    create_table :beverages do |t|
      t.string :name
      t.string :type
      t.numeric :price
      t.numeric :calories
      t.boolean :ice
      t.string :thumbnail
      t.timestamps
    end
  end
end
