##
# @package             Models/RailsAdmin::BeverageAdmin
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module BeverageAdmin
  extend ActiveSupport::Concern

  included do
    rails_admin do
      label "Beverage"
      label_plural "Beverages"

      list do
        field :id do
          column_width 50
        end
        field :label do
          column_width 200
        end
        field :calories do
          column_width 200
          pretty_value do
            value.to_s + 'G'
          end
        end
        field :category do
          column_width 200
        end

        exclude_fields :created_at , :updated_at
      end

      edit do
        field :label do
          required true
        end
        field :calories do
          required true
        end
        field :category do
          required true
        end
      end
    end
  end
end