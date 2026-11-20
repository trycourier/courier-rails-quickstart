source "https://rubygems.org"

gem "rails", "~> 8.1"
gem "propshaft", "~> 1.3"
gem "importmap-rails", "~> 2.2"
gem "sqlite3", "~> 2.1"
gem "puma", ">= 6.0"

# The Courier Ruby SDK. The gem is trycourier, the library is courier.
gem "trycourier", "~> 7.1", require: "courier"

gem "tzinfo-data", platforms: %i[ windows jruby ]

group :development do
  # Loads .env into ENV, so COURIER_API_KEY reaches the app and bin/rails tasks.
  gem "dotenv", "~> 3.1"
end
