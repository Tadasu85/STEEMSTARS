class AccountsController < ApplicationController
  before_action :authenticate_user!, only: [:secret]
    def index
    end
    
    def show
      @id = params[:id].to_s.gsub(',', '.')
      @accounts = api.get_accounts([@id])
      
      if !!@accounts.result
        @account = @accounts.result.first
      end
      
      redirect_to accounts_path if @account.nil?
    end
    
    def find
        account_name = params[:account_name].to_s.gsub('.', ',')
        redirect_to account_followers_url(account_id: account_name)
    end
end