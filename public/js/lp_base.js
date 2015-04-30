var _LP_CFG_ = {
    app_id: '5df4277b',
    log_level: 1,
    options: {
        triggerSelector: '.chat-btn',
        chatDisabled: false,
        onChatDisabled: function (els) { // An event that fires when chat is disabled. It takes one parameter which is an array of your trigger selectors.
            for (var i = 0; i < els.length; i++) {
                els[i].style.opacity = .1;
            }
        },
        onChatEnabled: function (els) { // An event that fires when chat is enabled. It takes one parameter which is an array of your trigger selectors.
            for (var i = 0; i < els.length; i++) {
                els[i].style.opacity = 1;
            }
        },

        extras: function () {
            return {
                "time": Date.now()
            }

        }
    }

};

(function () {
    var a = _LP_CFG_.lpjsid = "lpjs-" + (new Date).getTime(),
        b = document.createElement("script"),
        s = document.getElementsByTagName("script")[0];
    b.id = a;
    b.type = "text/javascript";
    b.async = true;
    b.src = 'https://s3.amazonaws.com/look-dev-html-lib/lp_lib/liveperson-mobile.js',
        s.parentNode.insertBefore(b, s);
})();