##
# Class Burger
#
# @package             Models
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
class Burger < ApplicationRecord
  # Relations
  has_many :menus
  has_many :burger_ingredients
  has_many :ingredients, through: :burger_ingredients
end
