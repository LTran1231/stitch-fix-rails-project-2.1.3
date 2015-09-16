source "https://rubygems.org"

gem "rails", "~> 4"
gem "sass-rails"
gem "uglifier"
gem "coffee-rails"
gem "jquery-rails"
gem "bootstrap-sass"
gem "awesome_print"
gem "font-awesome-rails"
gem 'will_paginate'

group :production do
  gem 'thin'
  gem 'pg'
end


group :test, :development do
	gem 'sqlite3'
	gem 'pry-byebug'
  gem "rspec-rails"
  gem "factory_girl_rails"
  gem "capybara"
  gem "database_cleaner", git: "git@github.com:bmabey/database_cleaner.git"
  gem "ruby_css_lint"
  gem "selenium-webdriver"
end
