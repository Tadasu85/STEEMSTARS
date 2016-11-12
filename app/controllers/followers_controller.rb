class FollowersController < ApplicationController
  before_action :authenticate_user!, only: [:secret]
  def index
    @account_id = params[:account_id].to_s.gsub(',', '.')
    @followers = []
    count = -1
    api = Radiator::FollowApi.new
    
    until count == @followers.size
      count = @followers.size
      response = api.get_followers(@account_id, @followers.last, 'blog', 100)
      @followers += response.result.map(&:follower)
      @followers = @followers.uniq
    end
  end
end