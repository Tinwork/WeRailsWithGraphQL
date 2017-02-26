class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  # Middleware for locale
  before_action :set_locale
  
  # Set locale
  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end
end
