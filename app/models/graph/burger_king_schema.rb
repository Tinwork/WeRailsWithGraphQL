##
# @package             Models/Graph/Types::QueryType
# @author              Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
BurgerKingSchema = GraphQL::Schema.define do
  ##
  # Define our main schema as BurgerKingSchema
  # Composed by types :
  # --> Menu
  # --> Beverage
  ##
  query Types::QueryType
end