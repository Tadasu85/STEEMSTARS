class PagesController < ApplicationController 

  def index
    @user = User.all
  end

end