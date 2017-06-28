class IngredientTranslations < ActiveRecord::Migration[5.0]
  def change
    reversible do |dir|
      dir.up do
        Ingredient.create_translation_table!({
           :label => :string
         }, {
           :migrate_data => true
         })
      end

      dir.down do
        Ingredient.drop_translation_table! :migrate_data => true
      end
    end
  end
end
