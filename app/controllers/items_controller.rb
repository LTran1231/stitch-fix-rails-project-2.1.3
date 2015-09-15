class ItemsController < ApplicationController
	before_action :set_item, only: [:edit, :update]
	layout :false, only: [:search, :index]

	def index
		@items = Item.paginate(:page => params[:page]).order('id ASC')

	end

	def search
		query = params[:search]
		@items = Item.search(query)
		styles = Style.search(query)
		styles.each do |style|
			@items.concat(style.items)
		end
		
		if query.blank? || @items.empty?
			flash.now[:alert] = "No result found for '#{query}'"
			render partial: "shared/flash_messages", status: 400
		else
			render partial: "items"
		end

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
