# -*- encoding: utf-8 -*-
# stub: realtime 0.1.0 ruby lib

Gem::Specification.new do |s|
  s.name = "realtime"
  s.version = "0.1.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Mike Atlas", "Ahmad Abdel-Yaman (@ayaman)", "Nick Prokesch (@prokizzle)"]
  s.date = "2016-01-24"
  s.description = "Provides a simple Realtime framework for Rails applications."
  s.email = ["mike.atlas@gmail.com"]
  s.homepage = "http://mikeatlas.github.io/realtime-rails/"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.5.1"
  s.summary = "Realtime support for Rails applications."

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rails>, [">= 4.0"])
    else
      s.add_dependency(%q<rails>, [">= 4.0"])
    end
  else
    s.add_dependency(%q<rails>, [">= 4.0"])
  end
end
