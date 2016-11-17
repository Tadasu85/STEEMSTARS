# -*- encoding: utf-8 -*-
# stub: backbone-rails 1.2.3 ruby lib

Gem::Specification.new do |s|
  s.name = "backbone-rails"
  s.version = "1.2.3"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3.6") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Alexander Flatter"]
  s.date = "2016-02-18"
  s.description = "Ships backbone and underscore to your Rails 3.1 application through the new asset pipeline. Rails 3.0 is supported via generators."
  s.email = ["flatter@fastmail.fm"]
  s.homepage = "https://github.com/aflatter/backbone-rails"
  s.rubygems_version = "2.5.1"
  s.summary = "backbone and underscore for Rails"

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rails>, [">= 3.0.0"])
    else
      s.add_dependency(%q<rails>, [">= 3.0.0"])
    end
  else
    s.add_dependency(%q<rails>, [">= 3.0.0"])
  end
end
