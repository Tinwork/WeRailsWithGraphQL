##
# Class Beverage
#
# @package             Models
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
class Beverage < ApplicationRecord
  # Relations
  belongs_to :category

  # Admin
  include BeverageAdmin
end
