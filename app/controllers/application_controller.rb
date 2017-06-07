##
# Class ApplicationController
#
# @package             Controllers
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  # Middleware for locale
  before_action :set_locale

  # Set locale
  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
    Rails.application.routes.default_url_options[:locale]= I18n.locale
  end

  protected

  def configure_permitted_parameters
    add_attrs = [:username, :email, :password, :password_confirmation, :remember_me]

    devise_parameter_sanitizer.permit(:sign_up, keys: add_attrs)
    devise_parameter_sanitizer.permit(:account_update, keys: add_attrs)
  end
end
