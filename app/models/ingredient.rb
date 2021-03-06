##
# Class Ingredient
#
# @package             Models
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
class Ingredient < ApplicationRecord
  # Admin
  include IngredientAdmin

  # Relations
  has_many :burger_ingredients
  has_many :burgers, through: :burger_ingredients
  has_many :condiment_ingredients
  has_many :condiments, through: :condiment_ingredients
  belongs_to :category

  # Translations
  translates :label
  accepts_nested_attributes_for :translations, allow_destroy: true
end
