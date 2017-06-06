class CreateBurgers < ActiveRecord::Migration[5.0]
  def change
    create_table :burgers do |t|
      t.string :label

      t.timestamps
    end
  end
end
