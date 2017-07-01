##
# @package             Models/Graph/Types::BurgerType
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module Types
  BurgerType = GraphQL::ObjectType.define do
    name "Burger"
    description "Burger from Burger King"

    field :id, !types.ID
    field :label, !types.String, property: :label
    field :ingredients, IngredientType.to_list_type

    default_relay true
  end
end