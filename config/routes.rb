Rails.application.routes.draw do
   # resources :todos
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :todos
    end
  end

end


