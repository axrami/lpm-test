$(function () {
    var Reporter = {};
    var $testData = $('#results').data('value'),
        $json = $testData['test-data'],
        $testCounterjson = $testData['test-counter'],
        $body = $('body'),
        $resultSummary = $("#results-summary"),
        twoHundred = 0,
        twoHundredOne = 0,
        twoHundredFour = 0,
        fiveHundred = 0,
        fourHundredFour = 0,
        latencyAverage = [];
    console.log($testCounterjson);

    var buildTable = function () {
        $body.append("<table id='result-table'></table>");
        $("#result-table").append(
            "<thead>" +
            "   <tr>" +
            "       <td>Request type</td>" +
            "       <td>Response code</td>" +
            "       <td>App Id</td>" +
            "       <td>Latency</td>" +
            "       <td>url</td>" +
            "</tr>" +
            "</thead>");
        addRows();
    };

    var addRows = function() {
      var $table = $('#result-table');
        $.each($json, function(i, item) {
            var jsonObj = JSON.parse($json[i]);
            latencyAverage.push(jsonObj.latency);
            parseResponseCodes(jsonObj.responseCode);
            $table.append(
                "<tr>" +
                    "<td>"+jsonObj.requestType+"</td>" +
                    "<td>"+jsonObj.responseCode+"</td>" +
                    "<td>"+jsonObj.appId+"</td>" +
                    "<td>"+jsonObj.latency+"</td>" +
                    "<td>"+jsonObj.url+"</td>" +
                "</tr>"
            )
        })
    };

    var createNavBar = function() {
        $body.prepend(
            '<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">' +
                '<div class="container"> ' +
                    '<div class="navbar-header">' +
                        '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">' +
                            '<span class="sr-only">Toggle navigation</span>' +
                            '<span class="icon-bar"></span>' +
                            '<span class="icon-bar"></span>' +
                            '<span class="icon-bar"></span>' +
                        '</button>' +
                        '<a class="navbar-brand" href="#">Test Results</span></a>' +
                    '</div>' +
                '</div>' +
            '</div>'
            )
    };

    var createAveragebar = function() {
        $('#pass-fail-bar').append(
            "<div id='summary'>" +
                "<ul id='summary-list'>" +
                    "<li><span style='color:green;'>200</span> "+ twoHundred +"</li>" +
                    "<li><span style='color:green;'>201</span> "+ twoHundredOne +"</li>" +
                    "<li><span style='color:darkred;'>204</span> "+ twoHundredFour +"</li>" +
                    "<li><span style='color:red;'>500</span> "+ fiveHundred +"</li>" +
                    "<li><span style='color:grey;'>404</span> "+ fourHundredFour +"</li>" +
                    "<li><span style='color:cadetblue;'>latency</span> "+ averageLatency() +"</li>" +
            "</div>"
        );
    };

    var createPassFailBar = function() {
        $resultSummary.append(
            "<div id='pass-fail-bar' class='jumbotron'>" +
                "<div id='stats-header'>" +
                    "<span>Test Count: " + $testCounterjson['totalTest'] + "</span>" +
                    "<span style='color:green;'>Passed: " + $testCounterjson['passedTest'] + "</span>" +
                    "<span style='color:red;'>Failed: " + $testCounterjson['failedTest'] + " </span></div>" +
            "</div>"
        );
    };

    var parseResponseCodes = function(responseCode) {
        if (responseCode == 200) {
            twoHundred = twoHundred + 1;
        } else if (responseCode == 201) {
            twoHundredOne = twoHundredOne +1;
        } else if (responseCode == 500) {
            fiveHundred = fiveHundred +1;
        } else if (responseCode == 404) {
            fourHundredFour = fourHundredFour + 1;
        } else {
            console.log("unknown responseCode: " + responseCode);
        }
    };

    var averageLatency = function() {
        var entries = latencyAverage.length;
        var total = 0;
        $.each(latencyAverage,function() {
            total += this;
        });
        console.log("Full latency average: " + total / entries);
        return(Math.floor(total / entries));
    };

    var defineDataTable= function() {
        $("#result-table").DataTable();
    };

    var buildUI = function() {
        createNavBar();
        buildTable();
        defineDataTable();
        createPassFailBar();
        createAveragebar();
    };


    var init = function () {
        buildUI();
    };

    init();

    window.Reporter = Reporter;
});
