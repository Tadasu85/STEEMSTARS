Rails.application.routes.draw do
  authenticated :user do
    root :to => "pages#secret"
  end
  root to: 'pages#index'
  resources :pages do
  end
  get :secret, to: 'pages#secret', as: :secret
  resources :widgets
    devise_for :users
    devise_for :admins
  get :currentUser, to: 'current_user#index'
  resources :accounts, only: [:show, :index] do
    collection do
      get :find
    end
    resources :followers, only: :index
    resources :follows, only: :index
  end
#match ':controller(/:action(/:id))', :via => :get
end
