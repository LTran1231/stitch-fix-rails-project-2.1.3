# Problem

We need to clearance inventory from time to time.  Certain items don't sell through to our clients, so every month, we collect certain unsold items and sell them to a third party vendor for a portion of their wholesale price.

This repository is a bare-bones application that meets that need, but it's in need of some enhancements, which we'd like you provide.

# Vocabulary

_Items_ refer to individual pieces of clothing.  So, if we have two of the exact same type of jeans, we have two items.  Items are grouped by _style_, so
the two aforementioned items would have the same style.

Important data about an item is:

* size
* color
* status - sellable, not sellable, sold, clearanced
* price sold
* date sold

A style's important data is:

* wholesale price
* retail price
* type - pants, shirts, dresses, skirts, other
* name

The _users_ of this application are warehouse employees (not developers).  They have a solid understanding the business process they must carry out and look to our software to support them.

# Requirements

This application currently handles the clearance task in a very basic way. A spreadsheet containing a list of item ids is uploaded and those items are clearanced as a batch. Items can only be sold at clearance if their status is 'sellable'. When the item is clearanced, we sell it at 75% of the wholesale price, and record that as "price sold".

You should be able to play around with the app by uploading the CSV file in this repository.

We'd like you to make some improvements, specifically:

- We're selling some items for less than we'd like, so we want to set a minimum price for items whose clearance discount is too low.  For pants and dresses, ensure they don't sell for less than $5. For all other items the minimum price is $2.
- The vendor buying the items on clearance needs to know what they've just purchased, so please provide a report for each batch about what items were clearanced.
- Users should be able to browse items and see them grouped by status or by batch.
- Finally, we'd like to avoid requiring that users create a spreadsheet and upload it, and instead handle this process directly in the app.  Since they can scan an item's barcode into any text field (as if typed directly by a keyboard), we'd like to try allowing them to create batches and clearancing them simply by entering item IDs. We'd want to support both methods of clearancing batches for the time being.  You can assume the barcode scanner works just like a computer keyboard, so if your solution works by entering text with a keyboard, it will be fine for the purposes described here, i.e. don't worry about barcodes.

# Tech Specs:

- Rails 4.2
- Ruby 2.2
- SQLite preferred, Postgres OK
- Anything can be changed if you think it's needed, including database schema, Rails config, whatever

# Some other guidance

This is evaluating your product thinking as well as coding and testing ability.  We want to see that you:

* Have thought about the user experience of the product
* Are willing to refactor when necessary
* Will test at an appropriate level

If you need to make an assumption about a vague requirement, feel free, just state what it is.
