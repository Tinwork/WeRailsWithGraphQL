##
# @package             Types::QueryType
# @author              Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module Types
  QueryType = GraphQL::ObjectType.define do
    name 'Burger King queries'
    description 'The root of all queries'

    ## Define all the fields allowed for query search
    # --> menu
    # --> beverage
    ##
    field :menu, MenuType, field: Fields::FetchField.build(type: MenuType, model: Menu)
    field :beverage, BeverageType, field: Fields::FetchField.build(type: BeverageType, model: Beverage)
    #field :burger, BurgerType, field: Fields::FetchField.build(type: BurgerType, model: Burger)
  end
end
