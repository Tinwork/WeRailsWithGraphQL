##
# @package             Types::BeverageType
# @author              Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module Types
  BeverageType = GraphQL::ObjectType.define do
    name "Beverage"
    description "Beverage from Burger King"

    field :id, !types.ID
    field :name, !types.String, property: :name
  end
end