require 'sinatra'
require_relative 'sso.rb'
require 'json'
require 'pp'
require 'net/http'
require 'uri'

class VisitReporter

  def self.tryAccount
    uri = URI("https://stats.look.io/render/?width=586&height=308&_salt=1434573508.173&from=00%3A00_20150501&until=23%3A59_20150531&target=stats_counts.property.Web.0363eef2.funnel.1&format=json")

    Net::HTTP.start(uri.host, uri.port,
                    :use_ssl => uri.scheme == 'https',
                    :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |http|

      request = Net::HTTP::Get.new uri.request_uri
      request.basic_auth 'lookio', 'look@uthere'

      response = http.request request

      puts response
      puts response.body
      @account = response.body
      return @account
    end
  end

end