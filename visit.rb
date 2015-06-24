require 'sinatra'
require_relative 'sso.rb'
require 'json'
require 'pp'
require 'net/http'
require 'uri'

class VisitReporter

  def self.getAccounts

    uri = URI("https://stats.look.io/render/?width=586&height=308&_salt=1434573508.173&from=00%3A00_20150501&until=23%3A59_20150531&target=stats_counts.property.Web.*.funnel.1&format=json")
    # uri = URI("https://stats.look.io/render/?width=586&height=308&_salt=1434573360.489&from=00%3A00_20150617&until=23%3A59_20150617&target=stats_counts.property.Web.0363eef2.funnel.1&format=json")
    Net::HTTP.start(uri.host, uri.port,
                    :use_ssl => uri.scheme == 'https',
                    :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |http|

      request = Net::HTTP::Get.new uri.request_uri
      request.basic_auth 'lookio', 'look@uthere'

      response = http.request request

      # return response.body
      json = JSON.parse(response.body)
      self.parseJson json

    end
  end

  def self.parseJson json
    accounts = []
    json.each do |i|
      total = 0
      i['datapoints'].each do |d|
        if d[0] != nil
          total += d[0]
        end
      end
      acc = []
      acc.push(i['target'])
      acc.push(total)
      accounts.push(acc)
    end
    return accounts.sort_by! { |k| k[1] }.reverse!
  end

end
