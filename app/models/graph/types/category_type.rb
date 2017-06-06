##
# @package             Models/Graph/Types::CategoryType
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module Types
  CategoryType = GraphQL::ObjectType.define do
    name "Category"
    description "Category of ingredients"

    field :label, !types.String, property: :label
  end
end