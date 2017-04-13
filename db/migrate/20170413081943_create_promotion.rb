class CreatePromotion < ActiveRecord::Migration[5.0]
  def change
    create_table :promotions do |t|
      t.string :name
      t.numeric :discount
      t.string :code
      t.datetime :start_time
      t.datetime :end_time
      t.boolean :permanent
      t.timestamps
    end
  end
end
