##
# Class Category
#
# @package             Models
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
class Category < ApplicationRecord
  # Rails Admin
  include CategoryAdmin

  # Relations
  has_many :ingredients
  has_many :beverages

  # Translations
  translates :label
  accepts_nested_attributes_for :translations, allow_destroy: true

  def display_name
    "Volume #{self.label}"
  end
end
