class AddCategoryToBeverage < ActiveRecord::Migration[5.0]
  def change
    add_reference :beverages, :category, foreign_key: true
  end
end
