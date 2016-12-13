require 'redis'
# config/initializers/redis.rb

uri = URI.parse(ENV.fetch("REDISTOGO_URL", "redis://localhost:6379/"))
REDIS = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
Redis::Settings.configure do |config|
  config.connection = $redis
end