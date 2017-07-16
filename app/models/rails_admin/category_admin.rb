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
      # Icons
      navigation_icon "custom-icon-category"

      configure :translations, :globalize_tabs

      list do
        field :id do
          column_width 50
        end
        field :translations do
          column_width 250
        end

        exclude_fields :updated_at, :created_at, :beverages, :ingredients
      end

      edit do
        field :translations do
          required true
        end

        exclude_fields :beverages, :ingredients
      end
    end
  end
end