##
# Class Category
#
# @package             Models
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
class Category < ApplicationRecord
  # Relations
  has_many :ingredients
  has_many :beverages

  # Rails Admin
  include CategoryAdmin

  def display_name
    "Volume #{self.label}"
  end
end
