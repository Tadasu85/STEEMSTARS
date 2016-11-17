class FollowsController < ApplicationController
  before_action :authenticate_admin!
  before_action :authenticate_user!, only: [:secret]
  def index
    @account_id = params[:account_id].to_s.gsub(',', '.')
    @follows = []
    count = -1
    api = Radiator::FollowApi.new
    
    until count == @follows.size
      count = @follows.size
      response = api.get_following(@account_id, @follows.last, 'blog', 100)
      @follows += response.result.map(&:following)
      @follows = @follows.uniq
    end
  end
end

