class ItemsController < ApplicationController
	before_action :set_item, only: [:edit, :update]

	# def get_item
	# 	input = params[:itemID].to_i
	# 	if !input.blank? || input != 0 || !input.is_a(Integer)
	# 		@item = Item.find(input)
	# 	else
	# 		flash[:alert] = "Invalid item id"
	# 	end
	# 	redirect_to "clearance_batches_path"
	# end

	def index
		@items = Item.all
	end

	def edit

	end

	def update
	end

	private
	def set_item
		@item = Item.find(params[:id])
	end
end
