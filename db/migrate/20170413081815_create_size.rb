class CreateSize < ActiveRecord::Migration[5.0]
  def change
    create_table :sizes do |t|
      t.string :name
      t.numeric :extra_price
      t.timestamps
    end
  end
end
