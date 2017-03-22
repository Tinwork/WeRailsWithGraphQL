
QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'The root of all queries'

  field :universe do
    type types[PersonType]
    description 'Everyone in the Universe'
    resolve -> (obj, args, ctx) { Person.all }
  end
end

Schema = GraphQL::Schema.define do
   query QueryType
end