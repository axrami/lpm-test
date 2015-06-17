


var url = "https://stats.look.io/render/?width=586&height=308&_salt=1434573508.173&from=00%3A00_20150501&until=23%3A59_20150531&target=stats_counts.property.Web."+ "0363eef2" +".funnel.1&format=json"
var accounts = [];

//(function(){
//    $.get(url, {name : "lookio" , password: "look@uthere"})
//        .done(function(data) {
//            console.log(data);
//        });
//})();

(function() {
    $.ajax({
        url: url,
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        data: {
            name: 'lookio',
            password: 'look@uthere'
        },
        success: function(data) {
            console.log(data);
        }
    });

})();
