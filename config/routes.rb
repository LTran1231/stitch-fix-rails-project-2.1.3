Rails.application.routes.draw do
  resources :clearance_batches, only: [:index, :create]
  root to: "clearance_batches#index"
  resources :items
  post "find_items" => "items#find_items"

end
