class CreateEatableTable < ActiveRecord::Migration[5.0]
  def change
    create_table :eatables do |t|
      t.string :name
      t.string :type
      t.numeric :price
      t.numeric :calories
      t.string :thumbnail
      t.timestamp
    end
  end
end