module Types
  QueryType = GraphQL::ObjectType.define do
    name "Query"
    description "The query root for this schema"
    
    field :universe do
      type types[UniverseType]
      description 'Everyone in the Universe'
      resolve -> (obj, args, ctx) { Universe.all }
    end
  end
end
