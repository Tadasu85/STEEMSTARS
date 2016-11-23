require 'redis'
# config/initializers/redis.rb
location = ENV["https://steemstars-tadasu85.c9users.io"] || 'redis://127.0.0.1:6379/0'
uri = URI.parse(location)
$redis = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
