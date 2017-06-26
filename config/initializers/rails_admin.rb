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

  config.included_models = %w(Menu Burger Beverage Condiment Ingredient Ingredient::Translation Category Category::Translation Size User)
  config.label_methods.unshift(:label)

  require Rails.root.join('lib', 'rails_admin.rb')

  config.model 'Ingredient::Translation' do
    visible false
    configure :locale, :hidden do
      help ''
    end
    include_fields :locale, :label
  end

  config.model 'Category::Translation' do
    visible false
    configure :locale, :hidden do
      help ''
    end
    include_fields :locale, :label
  end

end
