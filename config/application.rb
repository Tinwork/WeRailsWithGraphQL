require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module App
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  
    # Autoload
    config.autoload_paths += %W(#{config.root}/app/models/graph)
    config.autoload_paths += %W(#{config.root}/app/models/eatable)

    # i18n configuration 
    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', 'views', '*', '*.yml').to_s]
    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '*', '*.yml').to_s]
    config.i18n.default_locale = :fr
    config.i18n.available_locales = [:fr, :en]  
  end
end
