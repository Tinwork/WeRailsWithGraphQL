##
# @package             Models/RailsAdmin::UserAdmin
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module UserAdmin
  extend ActiveSupport::Concern

  included do
    rails_admin do
      label "User"
      label_plural "Users"
      # Icons
      navigation_icon "custom-icon-user"

      list do
        field :email
        field :username

        exclude_fields :updated_at, :created_at
      end
      edit do
        field :email
        field :username
        field :password
        field :password_confirmation
      end
    end
  end
end