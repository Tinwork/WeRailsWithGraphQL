module Types
  MenuType = GraphQL::ObjectType.define do
    name "Menu"
    description "One of the greatest menu from Burger King"

    field :id, !types.ID
  end
end