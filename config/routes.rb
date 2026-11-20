Rails.application.routes.draw do
  root "inbox#show"
  get "courier/token" => "courier_tokens#show", as: :courier_token

  get "up" => "rails/health#show", as: :rails_health_check
end
