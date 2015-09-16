class ItemsController < ApplicationController

	def index
		@items = Item.paginate(:page => params[:page]).order('id ASC')
		if params[:page]
		  render partial: "items", layout: false
		else
		  render :index
		end
	end

	def search
		query = params[:search]
		results = []
		results.concat(Item.search(query))
		search_by_styles = Style.search(query)
		search_by_styles.each do |style|
			results.concat(style.items)
		end
		if query.blank? || results.empty?
			flash.now[:alert] = "No result found for '#{query}'"
			render partial: "shared/flash_messages", status: 400, layout: false
		else
			@items = results.paginate(:page => params[:page])
			render partial: "items", layout: false
		end
	end

	private
	def set_item
		@item = Item.find(params[:id])
	end
end
