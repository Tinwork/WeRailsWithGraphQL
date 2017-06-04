##
# @package             Models/RailsAdmin::CondimentAdmin
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module CondimentAdmin
  extend ActiveSupport::Concern

  included do
    rails_admin do
      label "Condiment"
      label_plural "Condiments"


      list do
        field :id
        field :label
        field :calories
        field :ingredients

        exclude_fields :updated_at, :created_at
      end

      edit do
        field :label do
          required true
        end
        field :calories do
          required true
        end
        field :ingredients do
          required true
        end
      end
    end
  end
end