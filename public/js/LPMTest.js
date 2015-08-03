(function() {
    var LPMTest = {};

    LPMTest.events = [
        "visitStart", 
        "hotLead", 
        "coldLead", 
        "invitationShow", 
        "chatWindowShow", 
        "chatWindowHide", 
        "windowShow", 
        "windowHide", 
        "visitorMessage", 
        "agentMessage", 
        "invitationAccept", 
        "chatEnd", 
        "chatInteractive", 
        "prechatSurveyCanceled", 
        "prechatSurveySubmit", 
        "postchatSurveySubmit", 
        "offlineSurveySubmit", 
        "prechatSurveyShow", 
        "postchatSurveyShow", 
        "offlineSurveyShow", 
        "chatEnabled", 
        "chatDisabled"
    ];

    var re = /:.*$/,
        usedAccounts = {},
        usedSkills = {},
        sliderState = '0';

    var getMeta = function() {
        var meta = localStorage.getItem('meta');
        if (meta == null) {
            localStorage.setItem('meta', '0');
        }
    };

    var metaView = function() {
        getMeta();
        var meta = localStorage.getItem('meta');
        if (meta == '1') {
            //$("head").append("<meta name='viewport' content='user-scalable=1, width=device-width, initial-scale=1.0'>");
            // lp viewport
            $("head").append("<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'>");
            console.log("user-scalable=1, width=device-width, initial-scale=1.0");
        } else {
            $("head").append("<meta name='viewport' content='user-scalable=0, width=device-width, initial-scale=1.0,  minimum-scale=1.0, maximum-scale=1.0'>");
            console.log("user-scalable=0, width=device-width, initial-scale=1.0,  minimum-scale=1.0, maximum-scale=1.0");
        }
    };

    var togMeta = function() {
        var meta = localStorage.getItem('meta');
        if (meta == '1') {
            localStorage.setItem('meta', '0');
            location.reload();
        } else {
            localStorage.setItem('meta', '1');
            location.reload();
        }
    };

    var hybrid = function() {
        getHybrid();
        var hybrid = localStorage.getItem('hybrid');
        if (hybrid == '1') {
            window._LPM_HYBRID_ENABLED_ = true;
        } else {}
    };

    var getHybrid = function() {
        var hybrid = localStorage.getItem('hybrid');
        if (hybrid == null) {
            localStorage.setItem('hybrid', '0');
        }
    };

    var togHybrid = function() {
        var hStatus = localStorage.getItem('hybrid');
        if (hStatus == '0') {
            localStorage.setItem('hybrid', '1');
        } else {
            localStorage.setItem('hybrid', '0');
        }
        location.reload();
    };

    var langOverride = function() {
        var lang = document.getElementById('lang-input').value;
        localStorage.setItem('lang', lang);
        location.reload();
    };

    var availChange = function(data) {
        var accountNum = data.account,
            skill = data.skill,
            skillAvail = data.enabled,
            skillId = accountNum + skill,
            skillElem = $('#' + skillId);

        if (skillAvail == true && skillId in usedSkills) {
            skillElem.removeClass()
                .addClass("btn btn-success btn-lg btn-block");
        } else if (skillAvail == false && skillId in usedSkills) {
            skillElem.removeClass()
                .addClass("btn btn-danger btn-lg btn-block");
        } else {
            addSkills(data);
        }
    };

    var addSkills = function(data) {
        var accountNum = data.account,
            skill = data.skill,
            skillAvail = data.enabled,
            skillId = accountNum + skill;
        if (skillAvail == true) {
            $('#' + accountNum).append('<li><button id=' + skillId + '>' + skill + '</button></li>');
            $('#' + skillId).addClass('btn btn-success btn-block but')
                .on('click', function() {
                    beginChat(accountNum, skill);
                });
        } else {
            $('#' + accountNum).append('<li><button id=' + skillId + '>' + skill + '</button></li>');
            $('#' + skillId).addClass("btn btn-danger btn-block but")
                .on('click', function() {
                    beginChat(accountNum, skill);
                });
        }
        skillId = accountNum + skill;
        usedSkills[skillId] = "1";
    };

    var beginChat = function(accountNum, skill) {
        LPMobile.beginChat(accountNum, skill);
        console.log('Begin Chat ' + accountNum + ' ' +  skill);
    };

    var slideHandler = function(menu) {
        if (menu === 'event') {
            slideToggle();
            reportEventMenu();
        } else if (menu === 'skill') {
            slideToggle();
            SkillMenu();
        } else if (menu === 'language') {
            slideToggle();
            languageMenu();
        } else {}
    };

    var emptyMenu = function() {
        $('#slider').empty()
            .append('<ul></ul>');
    };

    var languageMenu = function() {
        emptyMenu();
        $('#slider ul').append('<li>Must use html two digit code "it" = Italian</li>')
            .append('<li><input id="lang-input" placeholder="language"></input></li>')
            .append('<li><button id="lang-submit">Set</button></li>');
        $('#lang-submit').on('click', function() {
            langOverride();
        });
    };

    var SkillMenu = function() {
        emptyMenu();
        $('#slider ul').append('<li><input id="defacc" placeholder="account"></input></li>')
            .append('<li><input id="defskill" placeholder="skill"></input></li>')
            .append('<li><button id="set-skill-btn">Send event</button></li>');
        $('#set-skill-btn').on('click', function() {
            setDefaultSkill();
        });
    };

    var reportEventMenu = function() {
        emptyMenu();
        $('#slider ul').append('<li><input id="key" value="Phone" placeholder="event"></input></li>')
            .append('<li><input id="value" value="400" placeholder="value"></input></li>')
            .append('<li><button id="report-event">Send event</button></li>');
        $(' #report-event').on('click', function() {
            reportEvent()
        });
    };

    var slideToggle = function() {
        if (sliderState === "0") {
            $('#slider').removeClass('hidden');
            sliderState = "1";
        } else {
            $('#slider').addClass('hidden');
            sliderState = "0";
        }
    };

    var reportEvent = function() {
        var evt = document.getElementById('key').value,
            val = document.getElementById('value').value;
        LPMobile.reportEvent(evt, val);
        console.log('reported ' + evt + ' and ' + val);
        slideToggle();
    };

    var setDefaultSkill = function() {
        var acc = document.getElementById('defacc').value,
            skill = document.getElementById('defskill').value;
        if (acc && skill) {
            LPMobile.setSkill(acc, skill);
            console.log('default set to ' + acc + ' ' + skill);
        } else if (skill) {
            LPMobile.setSkill(skill);
            console.log('default skell set to ' + skill);
        } else {
            console.log('no acc or skill');
        }
        slideToggle();
    };

    var windowSize = function() {
        var height = document.documentElement.clientHeight,
            width = document.documentElement.clientWidth;
        alert('Height: ' + height + ' ' + 'Width: ' + width);
    };

    var bindBtns = function() {
        $('#progress').on('click', function() {
            alert("Chat in progress: " + LPMobile.chatInProgress());
        });
        $('#tog-meta').on('click', function() {
            togMeta();
        });
        $('#view-port-size').on('click', function() {
            windowSize();
        });
        $('#report-btn').on('click', function() {
            slideHandler('event');
        });
        $('#tog-hybrid').on('click', function() {
            togHybrid();
        });
        $('#def-skill').on('click', function() {
            slideHandler('skill');
        });
        $('#lang-override').on('click', function() {
            slideHandler('language');
        });
        $('#invitation').on('click', function() {
            LPMobile.setInvitationShown();
        });
    };

    LPMTest.logEvent = function(event) {
        var date = new Date(),
            time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        console.log(event, time);
    };

    LPMTest.setLang = function() {
        var lang = localStorage.getItem('lang');
        if (!lang) {
            lang = 'en'
        }
        console.log('Language is ' + lang);
        return lang;
    };

    LPMTest.lpDisabled = function() {
        var disabled = LPMobile.disabled;
        if (disabled == false) {
            LPMobile.setChatEnabled(false);
        } else {
            LPMobile.setChatEnabled(true);
        }
    };

    LPMTest.buildPage = function(data) {
        var $list = $('#ul-wrapper'),
            accounts = data.account;
        if (accounts in usedAccounts) {} else {
            $list.append('<h4>' + accounts + '</h4>')
                .append('<ul id=' + accounts + '></ul><hr>');

            usedAccounts[accounts] = "1";
        }
        availChange(data);
    };

    LPMTest.httpLink = function() {
        var url = re.exec(document.URL),
            httpUrl = "http" + url;
        window.location.assign(httpUrl);
    };

    LPMTest.httpsLink = function() {
        var url = re.exec(document.URL),
            httpsUrl = "https" + url;
        window.location.assign(httpsUrl);
    };

     LPMTest.setLocal = function() {
         console.log("aaaaa == " + window.LPMobile.URLS.DISPATCH);
         console.log(window.LPMobile.URLS.DISPATCH + " == https://dispatch.staging.look.io");
         console.log(window.LPMobile.URLS.DISPATCH == "https://dispatch.staging.look.io")
        if (window.LPMobile.URLS.DISPATCH == "https://dispatch.staging.look.io") {

            window.LPMobile.URLS.DISPATCH = "balls";

            console.log(window.LPMobile.URLS.DISPATCH);
            console.log("seturl");
        } else {
            window.setTimeout(LPMTest.setLocal, 1);
        }
    };

    LPMTest.version = function() {
        version = LPMobile.version;
        $('.navbar-brand').append(version);
    };

    LPMTest.setInvitationShown = function() {
        LPMobile.setInvitationShown();
        console.log('invitation shown..');
    };
    //
    //LPMTest.checkLPMobile = function() {
    //    if (window.LPMobile != null) {
    //        LPMTest.setLocal();
    //    } else {
    //        window.setTimeout("LPMTest.checkLPMobile();", 1);
    //        console.log("LPMobile not found");
    //    }
    //
    //};

    var init = function() {
        metaView();
        hybrid();
        //LPMTest.checkLPMobile();
    };

    var domReady = function() {
        bindBtns();
    };

    $(document).ready(domReady);

    init();

    window.LPMTest = LPMTest;
})();