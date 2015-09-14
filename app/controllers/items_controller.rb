# require "will_paginate/array"

class ItemsController < ApplicationController
	before_action :set_item, only: [:edit, :update]
	layout :false, only: [:index]

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
			flash.now[:alert] = "No results found for #{query}"
			render "shared/_flash_messages", status: 400, layout: false
		end
		render "_items", layout: false

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

	# def search
	# 	query = params[:search]
	# 	@items = Item.where("status LIKE? OR id LIKE?", "%#{query}%", "#{query}")
	# 	search_by_styles = Style.where("name LIKE? OR type LIKE?", "%#{query}%", "%#{query}%")
	# 	search_by_styles.each do |style|
	# 		style.items.each do |item|
	# 			@items << item
	# 		end
	# 	end
	# 	if query.blank? || @items.empty?
	# 		flash.now[:alert] = "No results found for #{query}"
	# 		render "shared/_flash_messages", status: 400, layout: false
	# 	else
	# 		@items.flatten.paginate(:page => params[:page], :per_page => 30)
	# 		render "_items", layout: false
	# 	end
	# end

	def update
	end

	private
	def set_item
		@item = Item.find(params[:id])
	end
end
