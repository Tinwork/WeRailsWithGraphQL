##
# @package             Models/RailsAdmin::MenuAdmin
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module MenuAdmin
  extend ActiveSupport::Concern

  included do
    rails_admin do
      label "Menu"
      label_plural "Menus"

      list do
        field :id
        field :label
        field :burger

        exclude_fields :updated_at, :created_at
      end

      edit do
        field :label do
          required true
        end
        field :burger do
          required true
        end
      end
    end
  end
end