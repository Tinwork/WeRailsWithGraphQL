
UniverseType = GraphQL::ObjectType.define do
  name 'Universe'
  description 'Universe to describe'

  field :id, !types.ID
  field :libelle, !types.String, property: :libelle
  field :size, !types.String, property: :size
  field :planets, -> { types[PlanetType] }, 'Some planet to show off'
end

PlanetType = GraphQL::ObjectType.define do
  name 'Planet'
  description 'Planet to describe'

  field :id, !types.ID
  field :libelle, !types.String, property: :libelle
  field :satelittes, -> { types[SatelitteType] }, 'Some satellites to show off'
end

SatelitteType = GraphQL::ObjectType.define do
  name 'Satelitte'
  description 'Satelitte to describe'

  field :id, !types.ID
  field :libelle, !types.String, property: :libelle
  field :size, !types.String, property: :size
end

QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'The root of all queries'

  field :universe do
    type UniverseType
    description 'The person associated with a given ID'
    argument :id, !types.ID
    resolve -> (obj, args, ctx) { Universe.find(args[:id]) }
  end

  field :planets do
    type PlanetType
    description 'The person associated with a given ID'
    argument :id, !types.ID
    resolve -> (obj, args, ctx) { Planet.find(args[:id]) }
  end
end

Schema = GraphQL::Schema.define do
   query QueryType
end