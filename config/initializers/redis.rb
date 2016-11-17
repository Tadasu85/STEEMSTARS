require 'redis'
$redis = Redis.new(:host => 'https://steemstars-tadasu85.c9users.io', :port=> 6379)
# config/initializers/redis.rb
location = ENV["REDISCLOUD_URL"] || 'redis://127.0.0.1:6379/0'
uri = URI.parse(location)
$redis = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)