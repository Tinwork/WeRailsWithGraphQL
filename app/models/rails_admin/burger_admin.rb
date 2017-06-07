##
# @package             Models/RailsAdmin::BurgerAdmin
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module BurgerAdmin
  extend ActiveSupport::Concern

  included do
    rails_admin do
      label "Burger"
      label_plural "Burgers"
      # Icons
      navigation_icon "custom-icon-burgers"

      list do
        field :id do
          column_width 50
        end
        field :label do
          column_width 250
        end
        field :ingredients do
          column_width 250
        end

        exclude_fields :created_at , :updated_at
      end

      edit do
        field :label do
          required true
        end
        field :ingredients do
          partial 'form/input/field_checkbox'
        end
        exclude_fields :menus
      end
    end
  end
end