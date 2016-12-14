require 'redis'
# config/initializers/redis.rb
location = ENV["REDISCLOUD_URL"] || 'redis://127.0.0.1:6379/0'
uri = URI.parse(location)
REDIS = Redis.new(:url => uri)

