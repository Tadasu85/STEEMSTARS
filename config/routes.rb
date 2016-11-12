Rails.application.routes.draw do
  get '/secret', to: 'pages#secret', as: :secret
  resources :widgets
  root to: 'accounts#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :accounts, only: [:show, :index] do
    collection do
      get :find
    end
    resources :followers, only: :index
    resources :follows, only: :index
  end
  match ':controller(/:action(/:id))', :via => :get
  
    
end
