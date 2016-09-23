Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'accounts#index'
  resources :accounts, only: [:show, :index] do
    collection do
      get :find
    end
    resources :followers, only: :index
  end
  match ':controller(/:action(/:id))', :via => :get
  
  resources :follows, only: :index
end
