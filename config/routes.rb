Rails.application.routes.draw do
  
  # Admin routes
  # 
  # - Prefix : /locale => :fr | :en
  # - Routes :
  #       - GET : root_path => /  
  #       - GET : root_path => /
  #       -
  scope "(:locale)", locale: /fr|en/ do
    root :to => 'frontend/index#index'

    # Admin routes
    # 
    # - Prefix : /admin
    # - Routes :
    #       -
    #       -
    #       -
    scope '/admin' do
        get '/', to: 'adminhtml/index#index'
    end
  end

end
