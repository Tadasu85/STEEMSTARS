class AddNametoUsers2 < ActiveRecord::Migration[5.0]
  def self.up
  change_table :users do |t|
    t.string :steemaccount, null: false, default: ""
  end
  end
end
