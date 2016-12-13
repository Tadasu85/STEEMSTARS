require 'redis'
# config/initializers/redis.rb
uri = URI.parse(ENV["REDISTOGO_URL"])
REDIS = Redis.new(:url => uri)

