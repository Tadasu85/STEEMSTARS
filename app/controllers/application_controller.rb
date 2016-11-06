class ApplicationController < ActionController::Base
  respond_to :html, :json
  before_action :configure_permitted_parameters, if: :devise_controller?
  

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end
  respond_to :js, :json
  protect_from_forgery with: :exception
  helper_method :api, :follow_api
  private
  def api
    @@API ||= Radiator::Api.new
  end
  def follow_api
    @@FOLLOW_API ||= Radiator::FollowApi.new
  end
end

