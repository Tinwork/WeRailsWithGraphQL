##
# @package             Models/Graph/Types::BeverageType
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module Types
  BeverageType = GraphQL::ObjectType.define do
    name "Beverage"
    description "Beverage from Burger King"

    field :id, !types.ID
    field :label, !types.String, property: :label
    field :calories, !types.Float, property: :calories
    field :ice, !types.Boolean, property: :ice
    field :category, CategoryType, 'Category associated with this ingredient'
  end
end