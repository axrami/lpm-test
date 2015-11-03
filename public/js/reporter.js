$(function () {
    var Reporter = {};
    var $json = $('#results').data('value');
    var $body = $('body');

    var buildTable = function () {
        console.log($json);
        $body.append("<table id='result-table'></table>");
        $("#result-table").append(
            "<thead>" +
            "   <tr>" +
            "       <td>Request type</td>" +
            "       <td>responseCode</td>" +
            "       <td>Latency</td>" +
            "       <td>url</td>" +
            "</tr>" +
            "</thead>");
        addRows();
    };

    var addRows = function() {
      var table = $('#result-table');
        $.each($json, function(i, item) {
            var jsonObj = JSON.parse($json[i]);
            console.log(jsonObj.latency);
            table.append(
                "<tr>" +
                    "<td>"+jsonObj.requestType+"</td>" +
                    "<td>"+jsonObj.responseCode+"</td>" +
                    "<td>"+jsonObj.latency+"</td>" +
                    "<td>"+jsonObj.url+"</td>" +
                "</tr>"
            )
        })
    };

    var createAveragebar = function() {

    };

    var defineDataTable= function() {
        $("#result-table").DataTable();
    };

    var init = function () {
        buildTable();
        defineDataTable();
    };

    init();
    window.Reporter = Reporter;
});
