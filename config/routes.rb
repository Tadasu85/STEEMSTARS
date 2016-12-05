Rails.application.routes.draw do
  root to: 'pages#secret'
  
  get :secret, to: 'pages#secret', as: :secret
  
  resources :widgets
  
  devise_for :users
  devise_for :admins
  get :currentUser, to: 'current_user#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :accounts, only: [:show, :index] do
    collection do
      get :find
    end
    resources :followers, only: :index
    resources :follows, only: :index
  end
  
  match ':controller(/:action(/:id))', :via => :get
  resources :pages do
  end
    
end
