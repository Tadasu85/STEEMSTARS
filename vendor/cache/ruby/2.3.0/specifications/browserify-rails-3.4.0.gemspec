# -*- encoding: utf-8 -*-
# stub: browserify-rails 3.4.0 ruby lib

Gem::Specification.new do |s|
  s.name = "browserify-rails"
  s.version = "3.4.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Henry Hsu, Cymen Vig"]
  s.date = "2016-11-22"
  s.description = "Browserify + Rails = CommonJS Heaven"
  s.email = ["hhsu@zendesk.com, cymenvig@gmail.com"]
  s.homepage = "https://github.com/browserify-rails/browserify-rails"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.5.1"
  s.summary = "Get the best of both worlds: Browserify + Rails = CommonJS Heaven"

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<railties>, ["< 5.1", ">= 4.0.0"])
      s.add_runtime_dependency(%q<sprockets>, [">= 3.5.2"])
      s.add_runtime_dependency(%q<addressable>, [">= 2.4.0"])
      s.add_development_dependency(%q<bundler>, [">= 1.3"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<rails>, [">= 0"])
      s.add_development_dependency(%q<coffee-rails>, [">= 0"])
      s.add_development_dependency(%q<mocha>, [">= 0"])
      s.add_development_dependency(%q<pry>, [">= 0"])
      s.add_development_dependency(%q<test-unit>, [">= 0"])
    else
      s.add_dependency(%q<railties>, ["< 5.1", ">= 4.0.0"])
      s.add_dependency(%q<sprockets>, [">= 3.5.2"])
      s.add_dependency(%q<addressable>, [">= 2.4.0"])
      s.add_dependency(%q<bundler>, [">= 1.3"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<rails>, [">= 0"])
      s.add_dependency(%q<coffee-rails>, [">= 0"])
      s.add_dependency(%q<mocha>, [">= 0"])
      s.add_dependency(%q<pry>, [">= 0"])
      s.add_dependency(%q<test-unit>, [">= 0"])
    end
  else
    s.add_dependency(%q<railties>, ["< 5.1", ">= 4.0.0"])
    s.add_dependency(%q<sprockets>, [">= 3.5.2"])
    s.add_dependency(%q<addressable>, [">= 2.4.0"])
    s.add_dependency(%q<bundler>, [">= 1.3"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<rails>, [">= 0"])
    s.add_dependency(%q<coffee-rails>, [">= 0"])
    s.add_dependency(%q<mocha>, [">= 0"])
    s.add_dependency(%q<pry>, [">= 0"])
    s.add_dependency(%q<test-unit>, [">= 0"])
  end
end
