Rails.application.routes.draw do
  root to: "clearance_batches#index"
  resources :clearance_batches
  post "potential_clearance_item" => "clearance_batches#potential_clearance_item"

  resources :items, only: [:index, :edit, :update]
  get "sellable" 		=> "items#sellable"
  get "clearanced" 	=> "items#clearanced"
  get "search" 		=> "items#search"

end
