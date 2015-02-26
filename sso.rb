require 'sinatra'
require 'json'

class Sso

  def self.genkey response_type
    @key = (0...50).map{ ('a'..'z').to_a[rand(26)] }.join

    if ( response_type )
      response_type = response_type
    else
      response_type = "redirect"
    end

    if (response_type == "json")
      return {:ssoKey => @key}.to_json

    elsif (response_type == "text")
      return @key

    else
      redirect_to("https://server.iad.liveperson.net/hc/P36511428?cmd=file&file=visitorWantsToChat&site=P36511428&skill=sales&referrer=http://foo/foo.htm" + "?ssoKey=" + @key)
    end
  end

  def self.genValidKey response_type
    @key = "123456789"

    if ( response_type )
      response_type = response_type
    else
      response_type = "redirect"
    end

    if (response_type == "json")
      return {:ssoKey => @key}.to_json

    elsif (response_type == "text")
      return @key

    else
      redirect_to("https://server.iad.liveperson.net/hc/P36511428?cmd=file&file=visitorWantsToChat&site=P36511428&skill=sales&referrer=http://foo/foo.htm" + "?ssoKey=" + @key)
    end
  end

  def self.validatekey ssoKey
    if (ssoKey == "123456789")
      return {:text => "VISITORVAR!tcounter=100&VISITORVAR!identifier=foo&VISITORVAR!email=exmple@email.com&VISITORVAR!accoutno=5656543&VISITORVAR!favcolor=blue"}.to_json
    else
      return "LIES"
    end

  end

end
