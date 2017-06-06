class CreateBurgerIngredients < ActiveRecord::Migration[5.0]
  def change
    create_table :burger_ingredients do |t|
      t.references :burger, foreign_key: true
      t.references :ingredient, foreign_key: true

      t.timestamps
    end
  end
end
