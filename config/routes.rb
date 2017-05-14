Rails.application.routes.draw do

  # Admin routes
  #
  # - Prefix : /locale => :fr | :en
  scope "(:locale)", locale: /fr|en/ do
    mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  end

  # GraphQL POST queries
  post '/graphql', to: 'frontend/graphql#query'

  # Development environment
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
end
