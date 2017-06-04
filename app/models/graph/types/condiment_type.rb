##
#
# @package             Models/Graph/Types::CondimentType
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module Types
  CondimentType = GraphQL::ObjectType.define do
    name "Condiment"
    description "Dished served with the burger and beverage"

    field :label, !types.String, property: :label
    field :calories, !types.Float, property: :calories
    field :ingredients, IngredientType.to_list_type
  end
end