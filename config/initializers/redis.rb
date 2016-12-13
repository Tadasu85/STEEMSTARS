require 'redis'
# config/initializers/redis.rb
uri = URI.parse(ENV["REDISTOGO_URL"])
REDIS = Redis.new(:host => crestfish.redistogo.com, :port => 10950, :password => uri.password)