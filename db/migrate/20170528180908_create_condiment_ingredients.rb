class CreateCondimentIngredients < ActiveRecord::Migration[5.0]
  def change
    create_table :condiment_ingredients do |t|
      t.references :condiment, foreign_key: true
      t.references :ingredient, foreign_key: true

      t.timestamps
    end
  end
end
