class PagesController < ApplicationController 
    before_action :authenticate_user!, only: [:secret]
    def index
    end
    def secret
        render :head => true
    end
    def tech
    end
end