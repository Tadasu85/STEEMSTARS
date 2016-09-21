class ApplicationController < ActionController::Base
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
