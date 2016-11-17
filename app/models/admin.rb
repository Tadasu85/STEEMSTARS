class Admin < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  def after_sign_in_path_for
  node_rails_devise_redis_sync(@current_user)
  end
  def after_sign_out_path
  node_rails_devise_redis_clean
  end
end
