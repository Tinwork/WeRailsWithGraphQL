##
# @package             Models/Graph/Types::SizeType
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module Types
  SizeType = GraphQL::ObjectType.define do
    name "Size"
    description "Size available in our menus"

    field :id, !types.ID
    field :label, !types.String, property: :label
    field :extra, !types.Float, property: :extra_price
  end
end