##
# @package             Models/Graph/Types::UserType
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module Types
  UserType = GraphQL::ObjectType.define do
    name "User"
    description "User from Burger King"

    field :id, !types.ID
    field :email, !types.String, property: :email
    field :username, !types.String, property: :username
    field :friends, UserType.to_list_type, property: :friends
  end
end