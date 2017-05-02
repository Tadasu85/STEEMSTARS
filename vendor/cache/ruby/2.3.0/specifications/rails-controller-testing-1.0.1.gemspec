# -*- encoding: utf-8 -*-
# stub: rails-controller-testing 1.0.1 ruby lib

Gem::Specification.new do |s|
  s.name = "rails-controller-testing"
  s.version = "1.0.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Rails Core Team"]
  s.date = "2016-08-16"
  s.homepage = "https://github.com/rails/rails-controller-testing"
  s.licenses = ["MIT"]
  s.required_ruby_version = Gem::Requirement.new(">= 2.2.1")
  s.rubygems_version = "2.5.1"
  s.summary = "Extracting `assigns` and `assert_template` from ActionDispatch."

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<actionpack>, ["~> 5.x"])
      s.add_runtime_dependency(%q<actionview>, ["~> 5.x"])
      s.add_runtime_dependency(%q<activesupport>, ["~> 5.x"])
      s.add_development_dependency(%q<railties>, ["~> 5.x"])
      s.add_development_dependency(%q<sqlite3>, [">= 0"])
    else
      s.add_dependency(%q<actionpack>, ["~> 5.x"])
      s.add_dependency(%q<actionview>, ["~> 5.x"])
      s.add_dependency(%q<activesupport>, ["~> 5.x"])
      s.add_dependency(%q<railties>, ["~> 5.x"])
      s.add_dependency(%q<sqlite3>, [">= 0"])
    end
  else
    s.add_dependency(%q<actionpack>, ["~> 5.x"])
    s.add_dependency(%q<actionview>, ["~> 5.x"])
    s.add_dependency(%q<activesupport>, ["~> 5.x"])
    s.add_dependency(%q<railties>, ["~> 5.x"])
    s.add_dependency(%q<sqlite3>, [">= 0"])
  end
end
