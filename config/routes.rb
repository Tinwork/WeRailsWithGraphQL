Rails.application.routes.draw do
  devise_for :users
  root to: 'frontend/index#index'

  post '/graphql', to: 'frontend/graphql#query'

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
end
