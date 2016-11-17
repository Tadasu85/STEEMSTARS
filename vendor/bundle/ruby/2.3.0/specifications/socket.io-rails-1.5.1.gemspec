# -*- encoding: utf-8 -*-
# stub: socket.io-rails 1.5.1 ruby lib

Gem::Specification.new do |s|
  s.name = "socket.io-rails"
  s.version = "1.5.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Jason Chen"]
  s.date = "2016-10-24"
  s.description = "Rails asset pipeline wrapper for socket.io"
  s.email = ["jhchen7@gmail.com"]
  s.homepage = "https://github.com/jhchen/socket.io-rails"
  s.rubygems_version = "2.5.1"
  s.summary = "Rails asset pipeline wrapper for socket.io"

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<railties>, [">= 3.1"])
    else
      s.add_dependency(%q<railties>, [">= 3.1"])
    end
  else
    s.add_dependency(%q<railties>, [">= 3.1"])
  end
end
