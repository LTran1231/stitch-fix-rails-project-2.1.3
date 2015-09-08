Rails.application.routes.draw do
  resources :clearance_batches, only: [:index, :create]
  root to: "clearance_batches#index"
end
