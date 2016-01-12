require 'sinatra'
require 'sinatra/activerecord'
require_relative 'sso.rb'
require_relative 'visit.rb'
require 'json'
require 'pp'
require 'net/http'

set :port, 80


# for heroku app redirect
#
# get '*/*' do
#   @requestPath = request.path_info
#   redirect "http://web-mobile-test.liveperson.io/" + @requestPath
# end

post '/test-result' do
  request.body.rewind
  @request_payload = JSON.parse request.body.read
  out_file = File.new("views/test_results/#{Time.now.utc.iso8601}.txt", "w")
  out_file.puts(@request_payload)
  out_file.close
end

get '/visit' do
  @accounts = VisitReporter.getAccounts()
  erb :visit
end

get '/' do
  erb :home
end

get '/alpha/?:app_id?' do
  @appId = params[:app_id] || nil
  erb :alphatest
end

get '/webconnect' do
  erb :webconnect
end

get '/automation' do
  erb :automation
end

get '/results' do
  erb :results
end

post '/automation' do
  puts 'post received'
end

get '/event/?:app_id?' do
  @appId = params[:app_id] || nil
  erb :event
end

get '/apk' do
  erb :apk
end

get '/demo' do
  erb :demo
end

get '/sso' do
  "sso test endpoint '/sso/genValidKey' or '/sso/genkey' LP account P36511428 sso/sso"
end

get '/sso/genValidKey' do
  response_type = params[:response_type]
  Sso.genValidKey response_type
end

get '/sso/genkey' do
  response_type = params[:response_type]
  Sso.genkey response_type
end

get '/sso/validatekey' do
  ssoKey = params[:ssoKey]
  Sso.validatekey ssoKey
end

post '/hello' do
  @name = params[:user_name]
  return "hello #{@name}"
end

def url_by_env env
  if env == 'staging-vpc'
    'dispatch-vpc.staging.look.io'
  elsif env == 'staging'
    'https://s3.amazonaws.com/look-dev-html-lib/lp_lib/liveperson-mobile.js'
  elsif env == 'production'
    'https://d3tpuxked45kzt.cloudfront.net/lp_lib/liveperson-mobile.js'
  elsif env == 'tagstaging'
    'https://tag.staging.look.io/lp_lib/liveperson-mobile.js'
  elsif env == 'tag'
    'https://tag.look.io/lp_lib/liveperson-mobile.js'
  elsif env == 'qa'
    'https://s3.amazonaws.com/look-dev-html-lib/lp_lib/liveperson-mobile.js'
  elsif env == 'dev'
    'https://s3.amazonaws.com/look-test-html-lib/lp_lib/liveperson-mobile.js'
  elsif env == 'local'
    'https://s3.amazonaws.com/look-dev-html-lib/lp_lib/liveperson-mobile.js'
  else
    return nil
  end
end

def get_custom_version env, version
  if env == 'staging'
    "https://s3.amazonaws.com/look-dev-html-lib/v.1.6.#{version}/lp_lib/liveperson-mobile.js"
  elsif env == 'production'
    "https://s3.amazonaws.com/lookio-html-lib/v.1.6.#{version}/lp_lib/liveperson-mobile.js"
  end

end

def get_domain env
  if env == 'staging'
    'tag.staging.look.io'
    # "s3.amazonaws.com/look-dev-html-lib";
  elsif env == 'production'
    'tag.look.io'
    # "s3.amazonaws.com/lookio-html-lib";
  end
end

def addVersion domain, version
  domain + "/v.1.6.#{version}"
end

def is_mobile
  mobile_regex = /iPhone|iPad|Android/
  matches_mobile = request.env["HTTP_USER_AGENT"] =~ mobile_regex
  if matches_mobile.is_a?(Integer)
    return true
  else
    return false
  end

end

get '/le/:env/?:app_id?' do
  @version = params[:version] || nil
  @appId = params[:app_id] || nil
  @env = params[:env] || nil
  if @version != nil
    domain = get_domain params[:env]
    @link = addVersion domain, @version
  else
    @link = get_domain params[:env]
  end

  if is_mobile
    erb :le
  else
    @desktop = true
    erb :le
  end
end

get '/:env/?:app_id?' do
  @appId = params[:app_id] || nil
  @version = params[:version] || nil
  @env = params[:env] || nil
  if @version != nil
    @link = get_custom_version params[:env], @version
  else
    @link = url_by_env params[:env]
  end

  if params[:env] == 'local'
    @local = true
  end

  if is_mobile and @link != nil
    erb :index
  elsif @link != nil
    @desktop = true
    erb :index
  else
    erb :not_found
  end

end
