class CreateSizes < ActiveRecord::Migration[5.0]
  def change
    create_table :sizes do |t|
      t.string :label
      t.float :extra_price

      t.timestamps
    end
  end
end
