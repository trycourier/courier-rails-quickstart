class User < ApplicationRecord
  has_many :orders

  # The id Courier knows this user by. The send, the inbox token, and the
  # preference page all key on it, so it has to be the same string everywhere.
  def courier_id
    "user_#{id}"
  end
end
