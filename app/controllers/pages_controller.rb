class PagesController < ApplicationController 
    before_action :authenticate_user!, only: [:secret]
    layout 'application', :except => [:secret]
    def index
    end
    def secret
    end
end