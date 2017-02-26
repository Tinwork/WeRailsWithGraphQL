# type Query {
#   hero: Character
#   human(id: String!): Human
#   droid(id: String!): Droid
# }
module Types
  QueryType = GraphQL::ObjectType.define do
    name "Query"
    description "The query root for this schema"
  end
end
