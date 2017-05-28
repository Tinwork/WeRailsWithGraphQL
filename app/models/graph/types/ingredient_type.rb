##
#
# @package             Models/Graph/Types::BeverageType
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module Types
  IngredientType = GraphQL::ObjectType.define do
    name "Ingredient"
    description "Ingredient which composed a burger from Burger King"

    field :label, !types.String, property: :label
    field :calories, !types.Float, property: :calories
    field :category, CategoryType, 'Category associated with this ingredient'
  end
end