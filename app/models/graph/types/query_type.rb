##
# @package             Models/Graph/Types::QueryType
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
module Types
  QueryType = GraphQL::ObjectType.define do
    name 'Burger King queries'
    description 'The root of all queries'

    ## Define all the fields allowed for query search
    # --> menu[id]
    # --> menus
    ##
    field :menu, MenuType, field: Fields::FetchField.build(type: MenuType, model: Menu)
    field :beverage, BeverageType, field: Fields::FetchField.build(type: BeverageType, model: Beverage)
    field :condiment, CondimentType, field: Fields::FetchField.build(type: CondimentType, model: Condiment)
    field :size, SizeType, field: Fields::FetchField.build(type: SizeType, model: Size)

    field :kings do
      type MenuType.to_list_type
      description "All the dishes from Burger King"
      resolve -> (obj, args, ctx) do
          Menu.all
      end
    end

    field :beverages do
      type BeverageType.to_list_type
      description "All the dishes from Burger King"
      resolve -> (obj, args, ctx) do
        Beverage.all
      end
    end

    field :condiments do
      type CondimentType.to_list_type
      description "All the dishes from Burger King"
      resolve -> (obj, args, ctx) do
        Condiment.all
      end
    end
  end
end
