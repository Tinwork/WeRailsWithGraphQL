class CategoryTranslations < ActiveRecord::Migration[5.0]
  def change
    reversible do |dir|
      dir.up do
        Category.create_translation_table!({
             :label => :string
         }, {
             :migrate_data => true
         })
      end

      dir.down do
        Category.drop_translation_table! :migrate_data => true
      end
    end
  end
end
