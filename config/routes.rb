Rails.application.routes.draw do
  resources :clearance_batches, only: [:index, :new, :create]
  root to: "clearance_batches#index"
  resources :items
  # post "get_item" => "items#get_item"
  post "potential_clearance_item" => "clearance_batches#potential_clearance_item"

end
