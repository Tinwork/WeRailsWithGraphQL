Rails.application.routes.draw do

  # i18n routes : [EN | FR]
  #
  # - Prefix : /locale => :fr | :en
  scope "/:locale", locale: /#{I18n.available_locales.join("|")}/ do
    # Root URL
    root to: "frontend/index#index"

    # Routes defined for admin
    mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

    # Routes defined for devise
    devise_for :users
  end

  # GraphQL POST queries endpoint
  post "/graphql", to: "frontend/graphql#query"

  # Development environment
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  # Simulate MOD_REWRITE HTACCESS
  # Example : [ / ] will return [ /fr ]
  # Flag : 302 as permanent redirection
  root to: redirect("/#{I18n.default_locale}", status: 302), as: :redirected_root
  get "/*path", to: redirect("/#{I18n.default_locale}/%{path}", status: 302), constraints: {path: /(?!(#{I18n.available_locales.join("|")})\/).*/}, format: false
end


