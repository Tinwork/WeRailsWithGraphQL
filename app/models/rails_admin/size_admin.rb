##
# @package             Models/RailsAdmin::SizeAdmin
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module SizeAdmin
  extend ActiveSupport::Concern

  included do
    rails_admin do
      label "Size"
      label_plural "Sizes"

      list do
        field :id
        field :label
        field :extra_price

        exclude_fields :updated_at, :created_at
      end

      edit do
        field :label do
          required true
        end
        field :extra_price do
          required true
        end
      end
    end
  end
end