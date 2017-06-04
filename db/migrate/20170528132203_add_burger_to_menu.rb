class AddBurgerToMenu < ActiveRecord::Migration[5.0]
  def change
    add_reference :menus, :burger, foreign_key: true
  end
end
