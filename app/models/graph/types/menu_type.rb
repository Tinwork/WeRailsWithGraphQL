##
# @package             Types::MenuType
# @author              Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module Types
  MenuType = GraphQL::ObjectType.define do
    name "Menu"
    description "One of the greatest menu from Burger King"

    field :id, !types.ID
  end
end