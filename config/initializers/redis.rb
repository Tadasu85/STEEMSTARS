require 'redis'
# config/initializers/redis.rb
Redis::Settings.configure do |config|
uri = URI.parse(ENV.fetch("REDISTOGO_URL", "redis://localhost:6379/"))
REDIS = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
config.connection = $redis
end
