class ItemsController < ApplicationController
	before_action :set_item, only: [:edit, :update]

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
