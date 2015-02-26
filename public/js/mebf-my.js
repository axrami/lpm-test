// ATT FILE TO REPRODUCE POTENTAL ISSUE

<!-- start Mixpanel -->
(function(f, b) {
if (!b.__SV) {
var a, e, i, g;
window.mixpanel = b;
b._i = [];
b.init = function(a, e, d) {
    function f(b, h) {
        var a = h.split(".");
        2 == a.length && (b = b[a[0]], h = a[1]);
        b[h] = function() {
            b.push([h].concat(Array.prototype.slice.call(arguments, 0)))
        }
    }
    var c = b;
    "undefined" !== typeof d ? c = b[d] = [] : d = "mixpanel";
    c.people = c.people || [];
    c.toString = function(b) {
        var a = "mixpanel";
        "mixpanel" !== d && (a += "." + d);
        b || (a += " (stub)");
        return a
    };
    c.people.toString = function() {
        return c.toString(1) + ".people (stub)"
    };
    i = "disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");

    for (g = 0; g < i.length; g++) f(c, i[g]);
    b._i.push([a, e, d])
};
b.__SV = 1.2;
a = f.createElement("script");
a.type = "text/javascript";
a.async = !0;
a.src = "//cdn.mxpnl.com/libs/mixpanel-2.2.min.js";
e = f.getElementsByTagName("script")[0];
e.parentNode.insertBefore(a, e)
}
})(document, window.mixpanel || []);

mixpanel.init("0d56da8c63a83cc4ea6e70c369a98596");
<!-- end Mixpanel -->

//isDebugEnabled controls the entire site.
var isDebugEnabled = true;

function debug(msg, level) {
    if (window.isDebugEnabled) {
        var d = new Date();
        level = level || 'info';
        console.log(level + ' - [' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDay() + " | " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() +
            "] " + '- ' + msg);
    }
};

function chatButtonState(acct, skill) {

    var button = document.getElementById(acct + "-" + skill + "-chatButton");

    if (button) {
        // //debugger;
        if (LPMobile.getEnabled(acct, skill) == 1) {
            $(button).prop("disabled",false);
            $(button).removeClass("offline");
            $(button).addClass("online");
            LPMobile.setInvitationShown(acct, skill);
        } else {
            $(button).prop("disabled",true);
            $(button).removeClass("online");
            $(button).addClass("offline");
        };
    } else { };
}
var getChannelIndex = function(elementText){
    	var returningIndexValue;
    	var checkboxes=$("input[type=checkbox]");
    	for(i=0;i<checkboxes.length;i++){
    		var eText=$(checkboxes[i]).siblings("span").text();
    		if(eText==elementText){
    			returningIndexValue=i;
    			break;
    		}
    	}

    	return returningIndexValue;
    }

var syncParamWithLP = function(element) {
        debug("sync Param with LP called");
        var elementText = $(element).siblings("span").text();
        var index = getChannelIndex(elementText);
        debug("ME_DisplayName_channels ------------------- start of section -------------------------")
        debug("The Index of channel is - " + index + " & the elementText is - " + elementText);
        if (element.checked) {
            LPMobile.reportEvent("ME_DisplayName_channels " + index, elementText);
            debug("--------------> Event for ME_DisplayName_channels " + index +" : "+elementText +" fired!")
            debug("ME_DisplayName_channels " + index + " is set to " + elementText);

        } else {
            LPMobile.reportEvent("ME_DisplayName_channels " + index, "-");
            debug("--------------> Event for ME_DisplayName_channels " + index +" : Blank fired!")
            debug("ME_DisplayName_channels " + index + " is set to 'Blank'. (The field name was-" + elementText+")");
        }

        debug("ME_DisplayName_channels ------------------- end of section -------------------------")

    };

var syncParamsWithLP = function(element) {
        debug("sync Params with LP called");
        $("input[type=checkbox]").each(function(index, element) {
            var elementText = $(element).siblings("span").text();
            if (element.checked) {
                LPMobile.reportEvent("ME_DisplayName_channels " + index, elementText);
                debug("ME_DisplayName_channels " + index + " is set to " + elementText);
            } else {
                LPMobile.reportEvent("ME_DisplayName_channels " + index, "-");
                debug("ME_DisplayName_channels " + index + " is set to 'Blank'. (The field name was-" + elementText+")");
            }
        });
        debug("ME_DisplayName_channels ------------------- end of section -------------------------")

    };
 var syncWithLP=function(element){
     var approach=$('input[name=approach]:checked').val();
     if(approach=="approach1"){
         syncParamsWithLP(element);
     }else if(approach=="approach2"){
         syncParamWithLP(element);
     }
 }
function onReady() {
    console.log("**********ONREADY*************");
    LPMobile.on("enabledChange", function (o) {
        chatButtonState(o.account, o.skill);
        mixpanel.track("enabledChange")
    });

    LPMobile.on('chatDisabled', function () {
        mixpanel.track("chatDisabled")
    });

    LPMobile.on('chatEnabled', function () {
        mixpanel.track("chatEnabled")
    });

    LPMobile.on('visitStart', function () {
      mixpanel.track("visitStart")
    });

    LPMobile.on('hotLead', function () {
      //debugger;
        mixpanel.track("hotlead")
    });

    LPMobile.on('coldLead', function () {
      //debugger;
        mixpanel.track("coldLead")
    });

    LPMobile.on('invitationShow', function () {
      //debugger;
        mixpanel.track("invitationShow")
    });

    LPMobile.on('chatWindowShow', function () {
      //debugger;
        mixpanel.track("chatWindowShow")
    });

    LPMobile.on('chatWindowHide', function () {
      //debugger;
        mixpanel.track("chatWindowHide")
    });

    LPMobile.on('windowShow', function () {
      //debugger;
        mixpanel.track("windowShow")
    });

    LPMobile.on('windowHide', function () {
      //debugger;
        mixpanel.track("windowHide")
    });

    LPMobile.on('visitorMessage', function () {
      //debugger;
        mixpanel.track("visitorMessage")
    });

    LPMobile.on('agentMessage', function () {
      //debugger;
        mixpanel.track("agentMessage")
    });

    LPMobile.on('invitationAccept', function () {
      //debugger;
        mixpanel.track("invitationAccept")
    });

    LPMobile.on('chatEnd', function () {
      //debugger;
        mixpanel.track("chatEnd")
    });

    LPMobile.on('chatInteractive', function () {
      //debugger;
        mixpanel.track("chatInteractive")
    });

    LPMobile.on('prechatSurveyCanceled', function () {
      //debugger;
        mixpanel.track("prechatSurveyCanceled")
    });

    LPMobile.on('prechatSurveySubmit', function () {
      //debugger;
        mixpanel.track("prechatSurveySubmit")
    });

    LPMobile.on('offlineSurveySubmit', function () {
      //debugger;
        mixpanel.track("offlineSurveySubmit")
    });

    LPMobile.on('prechatSurveyShow', function () {
      //debugger;
        mixpanel.track("prechatSurveyShow")
    });

    LPMobile.on('postchatSurveyShow', function () {
      //debugger;
        mixpanel.track("postchatSurveyShow")
    });

    LPMobile.on('chatInteractive', function () {
      //debugger;
        mixpanel.track("chatInteractive")
    });

    LPMobile.on('offlineSurveyShow', function () {
      //debugger;
        mixpanel.track("offlineSurveyShow")
    });




}
