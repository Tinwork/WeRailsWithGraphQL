Rails.application.routes.draw do
  
  scope "(:locale)", locale: /fr|en/ do
    root :to => 'frontend/index#index'

    
  end

end
