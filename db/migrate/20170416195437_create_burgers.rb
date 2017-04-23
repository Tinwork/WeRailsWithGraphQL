class CreateBurgers < ActiveRecord::Migration[5.0]
  def change
    create_table :burgers do |t|
      t.string :name
      t.string :type
      t.numeric :price
      t.numeric :calories
      t.json :composition
      t.string :thumbnail
      
      t.timestamps
    end
  end
end
