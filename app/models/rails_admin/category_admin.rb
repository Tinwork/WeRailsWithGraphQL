##
# @package             Models/RailsAdmin::CategoryAdmin
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module CategoryAdmin
  extend ActiveSupport::Concern

  included do
    rails_admin do
      label "Categorie"
      label_plural "Categories"

      list do
        field :id
        field :label

        exclude_fields :updated_at, :created_at, :beverages, :ingredients
      end

      edit do
        field :label do
          required true
        end
        exclude_fields :beverages, :ingredients
      end
    end
  end
end