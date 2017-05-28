class CreateMenus < ActiveRecord::Migration[5.0]
  def change
    create_table :menus do |t|
      t.string :label
      #t.references :beverage, foreign_key: true

      t.timestamps
    end
  end
end
