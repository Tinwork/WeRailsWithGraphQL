##
# @package             Models/RailsAdmin::IngredientAdmin
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module IngredientAdmin
  extend ActiveSupport::Concern

  included do
    rails_admin do
      label "Ingredient"
      label_plural "Ingredients"

      configure :category, :belongs_to_association

      list do
        field :label
        # TODO ajouter grammes
        field :calories
        field :category
        exclude_fields :created_at , :updated_at, :burgers, :condiments
      end

      edit do
        field :label do
          required true
        end
        field :calories do
          required true
        end
        field :category

        exclude_fields :burgers, :condiments
      end
    end
  end
end