RailsAdmin.config do |config|

  config.authenticate_with do
    warden.authenticate! scope: :user
  end

  config.current_user_method(&:current_user)

  config.show_gravatar = true

  config.actions do
    dashboard
    index
    new
    #export
    bulk_delete
    show
    edit
    delete
    show_in_app
  end

  # config.model "User" do
  #     list do
  #       field :email
  #       field :password
  #     end
  #   end

  config.included_models = %w(Menu Burger Beverage Condiment Ingredient Category Size User)

  config.label_methods.unshift(:label)

  require Rails.root.join('lib', 'rails_admin.rb')
end
