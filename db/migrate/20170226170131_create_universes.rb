class CreateUniverses < ActiveRecord::Migration[5.0]
  def change
    create_table :universes do |t|
      t.string :libelle
      t.string :size
      t.text :thumbnail

      t.timestamps
    end
  end
end
