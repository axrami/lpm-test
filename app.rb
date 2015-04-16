require 'sinatra'
require_relative 'sso.rb'
require 'json'
require 'pp'

get '/' do
  erb :home
end

get '/alpha' do
  erb :alphatest
end

get '/automation' do
  erb :automation
end

get '/event/?:app_id?' do
  @appId = params[:app_id] || nil
  erb :event
end

get '/le/?:app_id?' do
  @appId = params[:app_id] || nil
  if is_mobile
    erb :le
  else
    @desktop = true
    erb :le
  end
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

def url_by_env env
  if env == 'staging'
    'https://s3.amazonaws.com/look-dev-html-lib/lp_lib/liveperson-mobile.js'
  elsif env == 'production'
    'https://d3tpuxked45kzt.cloudfront.net/lp_lib/liveperson-mobile.js'
  elsif env == 'tagstaging'
    'https://tag.staging.look.io/lp_lib/liveperson-mobile.js'
  elsif env == 'tag'
    'https://tag.look.io/lp_lib/liveperson-mobile.js'
  elsif env == 'qa'
    'https://s3.amazonaws.com/lp-qa-html-lib/lp_lib/liveperson-mobile.js'
  elsif env == 'dev'
    'https://s3.amazonaws.com/look-test-html-lib/lp_lib/liveperson-mobile.js'
  else
    return nil
  end
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

get '/:env/?:app_id?' do
  @appId = params[:app_id] || nil
  @link = url_by_env params[:env]
  if is_mobile and @link != nil
    erb :index
  elsif @link != nil
    @desktop = true
    erb :index
  else
    erb :not_found
  end

end
