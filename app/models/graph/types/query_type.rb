module Types
  QueryType = GraphQL::ObjectType.define do
    name 'Burger King queries'
    description 'The root of all queries'

    field :menu do
      type Types::MenuType
      description 'The person associated with a given ID'
      argument :id, !types.ID
      resolve -> (obj, args, ctx) { Menu.find(args[:id]) }
    end
  end
end
