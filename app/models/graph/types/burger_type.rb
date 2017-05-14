##
# @package             Types::BurgerType
# @author              Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module Types
  BurgerType = GraphQL::ObjectType.define do
    name "Burger"
    description "Burger from Burger King"

    field :id, !types.ID
  end
end