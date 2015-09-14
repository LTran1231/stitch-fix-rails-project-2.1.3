class ItemsController < ApplicationController
	before_action :set_item, only: [:edit, :update]

	def index
		@items = Item.all.limit(20)

		# render :index, layout: false
	end


	def sellable
		@items = Item.where(status: "sellable")
		render :index
	end

	def clearanced
		@items = Item.where(status: "clearanced")
		render :index
	end

	def edit

	end

	def search
		input = params[:search]
		@items = Item.where("status LIKE? OR id LIKE?", "%#{input}%", "#{input}")
		search_by_styles = Style.where("name LIKE? OR type LIKE?", "%#{input}%", "%#{input}%")
		search_by_styles.each do |style|
			style.items.each do |item|
				@items << item
			end
		end
		if input.blank? || @items.empty?
			flash.now[:alert] = "No results found for #{input}"
			render "shared/_flash_messages", status: 400, layout: false
		else
			@items.flatten
			render "_tbody_multiple_items", layout: false
		end
	end

	def update
	end

	private
	def set_item
		@item = Item.find(params[:id])
	end
end
