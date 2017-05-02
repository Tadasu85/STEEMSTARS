class CreateUsers < ActiveRecord::Migration[2.3]
  def change
    create_table :users do |t|
      t.string :user
      t.timestamps
    end
  end
end
