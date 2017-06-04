##
# Class Condiment
#
# @package             Models
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
class Condiment < ApplicationRecord
  # Relations
  has_many :condiment_ingredients
  has_many :ingredients, through: :condiment_ingredients

  # Admin
  include CondimentAdmin
end
