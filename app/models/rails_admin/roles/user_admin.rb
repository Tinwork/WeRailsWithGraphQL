##
# @package             Models/RailsAdmin::UserAdmin
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module Roles
  module UserAdmin
    extend ActiveSupport::Concern

    included do
      rails_admin do
      end
    end
  end
end