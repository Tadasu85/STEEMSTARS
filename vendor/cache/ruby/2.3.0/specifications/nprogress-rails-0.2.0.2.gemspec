# -*- encoding: utf-8 -*-
# stub: nprogress-rails 0.2.0.2 ruby lib

Gem::Specification.new do |s|
  s.name = "nprogress-rails"
  s.version = "0.2.0.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Carlos Alexandro Becker"]
  s.date = "2016-08-05"
  s.description = "This is a gem for the rstacruz' nprogress implementation. It's based on version nprogress 0.2.0."
  s.email = ["caarlos0@gmail.com"]
  s.homepage = "https://github.com/caarlos0/nprogress-rails"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.5.1"
  s.summary = "Slim progress bars for Ajax'y applications. Inspired by Google, YouTube, and Medium."

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<bundler>, ["~> 1.3"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<sass-rails>, [">= 0"])
      s.add_development_dependency(%q<sass>, [">= 0"])
    else
      s.add_dependency(%q<bundler>, ["~> 1.3"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<sass-rails>, [">= 0"])
      s.add_dependency(%q<sass>, [">= 0"])
    end
  else
    s.add_dependency(%q<bundler>, ["~> 1.3"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<sass-rails>, [">= 0"])
    s.add_dependency(%q<sass>, [">= 0"])
  end
end
