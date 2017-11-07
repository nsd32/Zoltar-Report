$(document).ready(function() {

    var viewID;
    var month;
    var year;
    var startDate;
    var endDate;

    var sessions = {
        total: 0,
        organic: 0,
        direct: 0,
        paid: 0,
        referral: 0,
        social: 0,
        email: 0,
        other: 0
    };
    var pageviews = {
        total: 0,
        organic: 0,
        direct: 0,
        paid: 0,
        referral: 0,
        social: 0,
        email: 0,
        other: 0
    };
    var users = {
        total: 0,
        organic: 0,
        direct: 0,
        paid: 0,
        referral: 0,
        social: 0,
        email: 0,
        other: 0
    };
    var pageviewsPerSession = {
        total: 0,   
        organic: 0,
        direct: 0,
        paid: 0,
        referral: 0,
        social: 0,
        email: 0,
        other: 0
    };
    var bounceRate = {
        total: 0,
        organic: 0,
        direct: 0,
        paid: 0,
        referral: 0,
        social: 0,
        email: 0,
        other: 0
    };
    var exitRate = {
        total: 0,
        organic: 0,
        direct: 0,
        paid: 0,
        referral: 0,
        social: 0,
        email: 0,
        other: 0
    };
    var percentNewSessions = {
        total: 0,
        organic: 0,
        direct: 0,
        paid: 0,
        referral: 0,
        social: 0,
        email: 0,
        other: 0
    };
    var avgSessionDuration = {
        total: 0,
        organic: 0,
        direct: 0,
        paid: 0,
        referral: 0,
        social: 0,
        email: 0,
        other: 0
    };
    var entrances = {
        total: 0,
        organic: 0,
        direct: 0,
        paid: 0,
        referral: 0,
        social: 0,
        email: 0,
        other: 0
    };
    

    $('#dashSubmit').on('click', function(event) {
        if($('#companySelect').val() == 'Select Company' || $('#monthSelect').val() == 'Select Month' || $('#yearSelect').val() == 'Select Year') {
            return;
        }
        
        event.preventDefault();
        $('#sessions-donut-chart').empty();
        $('#pageview-donut-chart').empty();
        $('#users-donut-chart').empty();
        var d = 0;
        endDay = 0;
        viewID = $('#companySelect').val();
        console.log('View ID: ', viewID);
        month = parseInt($('#monthSelect').val());
        console.log('Selected Month: ', month);
        year = $('#yearSelect').val();
        console.log('Selected Year: ', year);

        if(month <= 8) {
            startDate = `${year}-0${month+1}-01`;
        } else {
            startDate = `${year}-${month+1}-01`;
        }

        d = new Date(year, month + 1, 0);
        endDay = d.getDate();
        

        if(month <= 8) {
            endDate = `${year}-0${month+1}-${endDay}`;
        } else {
            endDate = `${year}-${month+1}-${endDay}`;
        }
        queryReports();
    }); 


    function lastDayMonth(year,month){
        endDate = new Date(year, month +1, 0).getDate();     
    }

    function queryReports() {
    gapi.client.request({
      path: '/v4/reports:batchGet',
      root: 'https://analyticsreporting.googleapis.com/',
      method: 'POST',
      body: {
        reportRequests: [
          {
            viewId: viewID,
            dateRanges: [
              {
                startDate: startDate,
                endDate: endDate
              }
            ],
            metrics: [
              {
                expression: 'ga:sessions'
              },
              {
                expression: 'ga:pageviews'
              },
              {
                expression: 'ga:users'
              },
              {
                expression: 'ga:pageviewsPerSession'
              },
              {
                expression: 'ga:bounceRate'
              },
              {
                expression: 'ga:exitRate'
              },
              {
                expression: 'ga:percentNewSessions'
              },
              {
                expression: 'ga:avgSessionDuration'
              },
              {
                expression: 'ga:entrances'
              },
            ],
            dimensions: [
              {
                name: 'ga:channelGrouping'
              }
            ]
          }
        ]
      }
    }).then(displayResults, console.error.bind(console));
  }

  function displayResults(response) {
    var formattedJson = JSON.stringify(response.result, null, 2);
    // document.getElementById('query-output').value = formattedJson;
    console.log(formattedJson);

    sessions.total = response.result.reports[0].data.totals[0].values[0];
    pageviews.total = response.result.reports[0].data.totals[0].values[1];
    users.total = response.result.reports[0].data.totals[0].values[2];
    pageviewsPerSession.total = response.result.reports[0].data.totals[0].values[3];
    bounceRate.total = response.result.reports[0].data.totals[0].values[4];
    exitRate.total = response.result.reports[0].data.totals[0].values[5];
    percentNewSessions.total = response.result.reports[0].data.totals[0].values[6];
    avgSessionDuration.total = response.result.reports[0].data.totals[0].values[7];
    entrances.total = response.result.reports[0].data.totals[0].values[8];

    var rowArray = response.result.reports[0].data.rows;

    rowArray.forEach(row => {

        console.log(row.dimensions[0]);
        console.log(row.metrics[0].values[0])

        if (row.dimensions[0] === 'Organic Search') {
            sessions.organic = row.metrics[0].values[0];
            pageviews.organic = row.metrics[0].values[1];
            users.organic = row.metrics[0].values[2];
            pageviewsPerSession.organic = row.metrics[0].values[3];
            bounceRate.organic = row.metrics[0].values[4];
            exitRate.organic = row.metrics[0].values[5];
            percentNewSessions.organic = row.metrics[0].values[6];
            avgSessionDuration.organic = row.metrics[0].values[7];
            entrances.organic = row.metrics[0].values[8];
        } else if (row.dimensions[0] === 'Direct') {
            sessions.direct = row.metrics[0].values[0];
            pageviews.direct = row.metrics[0].values[1];
            users.direct = row.metrics[0].values[2];
            pageviewsPerSession.direct = row.metrics[0].values[3];
            bounceRate.direct = row.metrics[0].values[4];
            exitRate.direct = row.metrics[0].values[5];
            percentNewSessions.direct = row.metrics[0].values[6];
            avgSessionDuration.direct = row.metrics[0].values[7];
            entrances.direct = row.metrics[0].values[8];
        } else if (row.dimensions[0] === 'Paid Search') {
            sessions.paid = row.metrics[0].values[0];
            pageviews.paid = row.metrics[0].values[1];
            users.paid = row.metrics[0].values[2];
            pageviewsPerSession.paid = row.metrics[0].values[3];
            bounceRate.paid = row.metrics[0].values[4];
            exitRate.paid = row.metrics[0].values[5];
            percentNewSessions.paid = row.metrics[0].values[6];
            avgSessionDuration.paid = row.metrics[0].values[7];
            entrances.paid = row.metrics[0].values[8];
        } else if (row.dimensions[0] === 'Referral') {
            sessions.referral = row.metrics[0].values[0];
            pageviews.referral = row.metrics[0].values[1];
            users.referral = row.metrics[0].values[2];
            pageviewsPerSession.referral = row.metrics[0].values[3];
            bounceRate.referral = row.metrics[0].values[4];
            exitRate.referral = row.metrics[0].values[5];
            percentNewSessions.referral = row.metrics[0].values[6];
            avgSessionDuration.referral = row.metrics[0].values[7];
            entrances.referral = row.metrics[0].values[8];
        } else if (row.dimensions[0] === 'Social') {
            sessions.social = row.metrics[0].values[0];
            pageviews.social = row.metrics[0].values[1];
            users.social = row.metrics[0].values[2];
            pageviewsPerSession.social = row.metrics[0].values[3];
            bounceRate.social = row.metrics[0].values[4];
            exitRate.social = row.metrics[0].values[5];
            percentNewSessions.social = row.metrics[0].values[6];
            avgSessionDuration.social = row.metrics[0].values[7];
            entrances.social = row.metrics[0].values[8];
        } else if (row.dimensions[0] === 'Email') {
            sessions.email = row.metrics[0].values[0];
            pageviews.email = row.metrics[0].values[1];
            users.email = row.metrics[0].values[2];
            pageviewsPerSession.email = row.metrics[0].values[3];
            bounceRate.email = row.metrics[0].values[4];
            exitRate.email = row.metrics[0].values[5];
            percentNewSessions.email = row.metrics[0].values[6];
            avgSessionDuration.email = row.metrics[0].values[7];
            entrances.email = row.metrics[0].values[8];
        } else if (row.dimensions[0] === '(Other)') {
            sessions.other = row.metrics[0].values[0];
            pageviews.other = row.metrics[0].values[1];
            users.other = row.metrics[0].values[2];
            pageviewsPerSession.other = row.metrics[0].values[3];
            bounceRate.other = row.metrics[0].values[4];
            exitRate.other = row.metrics[0].values[5];
            percentNewSessions.other = row.metrics[0].values[6];
            avgSessionDuration.other = row.metrics[0].values[7];
            entrances.other = row.metrics[0].values[8];
        }
    })

    var colors = ['#5cb85c', '#337ab7', '#f0ad4e', '#d9534f', '#3c1f80', '#00e5ee', '#e0d039'];
    
         // Donut Chart
    $('#sessions-total').text(` (Total: ${sessions.total})`);
    Morris.Donut({
        element: 'sessions-donut-chart',
        colors: colors,
        data: [{
            label: "Direct",
            value: sessions.direct
        }, {
            label: "Organic Search",
            value: sessions.organic
        }, {
            label: "Paid Search",
            value: sessions.paid
        }, {
            label: "Referral",
            value: sessions.referral
        }, {
            label: "Social",
            value: sessions.social
        }, {
            label: "Email",
            value: sessions.email
        }, {
            label: "Other",
            value: sessions.other
        }],
        resize: true
    });


    $('#pageview-total').text(` (Total: ${pageviews.total})`);
    Morris.Donut({
        element: 'pageview-donut-chart',
        colors: colors,
        data: [{
            label: "Direct",
            value: pageviews.direct
        }, {
            label: "Organic Search",
            value: pageviews.organic
        }, {
            label: "Paid Search",
            value: pageviews.paid
        }, {
            label: "Referral",
            value: pageviews.referral
        }, {
            label: "Social",
            value: pageviews.social
        }, {
            label: "Email",
            value: pageviews.email
        }, {
            label: "Other",
            value: pageviews.other
        }],
        resize: true
    });

    $('#users-total').text(` (Total: ${users.total})`);
    Morris.Donut({
        element: 'users-donut-chart',
        colors: colors,
        data: [{
            label: "Direct",
            value: users.direct
        }, {
            label: "Organic Search",
            value: users.organic
        }, {
            label: "Paid Search",
            value: users.paid
        }, {
            label: "Referral",
            value: users.referral
        }, {
            label: "Social",
            value: users.social
        }, {
            label: "Email",
            value: users.email
        }, {
            label: "Other",
            value: users.other
        }],
        resize: true
    });  

    $('#channelBreakdown').removeClass('hide');
    
    $('.main-sessions-total').text(` (Total: ${sessions.total})`)
    $('.direct').text(sessions.direct);
    $('.organic').text(sessions.organic);
    $('.paid').text(sessions.paid);
    $('.referral').text(sessions.referral);
    $('.social').text(sessions.social);
    $('.other').text(sessions.other);
    $('').text(sessions.email);

    $('.totalUsers').text(users.total);
    $('.totalEntrance').text(entrances.total);
    $('.totalSessions').text(sessions.total);
    $('.totalPercentNewSessions').text(roundTwoDecimal.round(percentNewSessions.total,2) + ' %');
    $('.totalAvgSessions').text(roundTwoDecimal.round(avgSessionDuration.total, 2));
    $('.totalPageviews').text(pageviews.total);
    $('.totalPageviewsPerSession').text(roundTwoDecimal.round(pageviewsPerSession.total, 2));
    $('.totalBounceRate').text(roundTwoDecimal.round(bounceRate.total,2) + ' %');
    $('.totalExitRate').text(roundTwoDecimal.round(exitRate.total,2) + ' %');

    $('.organicUsers').text(users.organic);
    $('.organicEntrance').text(entrances.organic);
    $('.organicSessions').text(sessions.organic);
    $('.organicPercentNewSessions').text(roundTwoDecimal.round(percentNewSessions.organic,2) + ' %');
    $('.organicAvgSessions').text(roundTwoDecimal.round(avgSessionDuration.organic, 2));
    $('.organicPageviews').text(pageviews.organic);
    $('.organicPageviewsPerSession').text(roundTwoDecimal.round(pageviewsPerSession.organic, 2));
    $('.organicBounceRate').text(roundTwoDecimal.round(bounceRate.organic,2) + ' %');
    $('.organicExitRate').text(roundTwoDecimal.round(exitRate.organic,2) + ' %');

    $('.directUsers').text(users.direct);
    $('.directEntrance').text(entrances.direct);
    $('.directSessions').text(sessions.direct);
    $('.directPercentNewSessions').text(roundTwoDecimal.round(percentNewSessions.direct,2) + ' %');
    $('.directAvgSessions').text(roundTwoDecimal.round(avgSessionDuration.direct, 2));
    $('.directPageviews').text(pageviews.direct);
    $('.directPageviewsPerSession').text(roundTwoDecimal.round(pageviewsPerSession.direct, 2));
    $('.directBounceRate').text(roundTwoDecimal.round(bounceRate.direct,2) + ' %');
    $('.directExitRate').text(roundTwoDecimal.round(exitRate.direct,2) + ' %');

    $('.paidUsers').text(users.paid);
    $('.paidEntrance').text(entrances.paid);
    $('.paidSessions').text(sessions.paid);
    $('.paidPercentNewSessions').text(roundTwoDecimal.round(percentNewSessions.paid,2) + ' %');
    $('.paidAvgSessions').text(roundTwoDecimal.round(avgSessionDuration.paid, 2));
    $('.paidPageviews').text(pageviews.paid);
    $('.paidPageviewsPerSession').text(roundTwoDecimal.round(pageviewsPerSession.paid, 2));
    $('.paidBounceRate').text(roundTwoDecimal.round(bounceRate.paid,2) + ' %');
    $('.paidExitRate').text(roundTwoDecimal.round(exitRate.paid,2) + ' %');

    $('.referralUsers').text(users.referral);
    $('.referralEntrance').text(entrances.referral);
    $('.referralSessions').text(sessions.referral);
    $('.referralPercentNewSessions').text(roundTwoDecimal.round(percentNewSessions.referral,2) + ' %');
    $('.referralAvgSessions').text(roundTwoDecimal.round(avgSessionDuration.referral, 2));
    $('.referralPageviews').text(pageviews.referral);
    $('.referralPageviewsPerSession').text(roundTwoDecimal.round(pageviewsPerSession.referral, 2));
    $('.referralBounceRate').text(roundTwoDecimal.round(bounceRate.referral,2) + ' %');
    $('.referralExitRate').text(roundTwoDecimal.round(exitRate.referral,2) + ' %');

    $('.socialUsers').text(users.social);
    $('.socialEntrance').text(entrances.social);
    $('.socialSessions').text(sessions.social);
    $('.socialPercentNewSessions').text(roundTwoDecimal.round(percentNewSessions.social,2) + ' %');
    $('.socialAvgSessions').text(roundTwoDecimal.round(avgSessionDuration.social, 2));
    $('.socialPageviews').text(pageviews.social);
    $('.socialPageviewsPerSession').text(roundTwoDecimal.round(pageviewsPerSession.social, 2));
    $('.socialBounceRate').text(roundTwoDecimal.round(bounceRate.social,2) + ' %');
    $('.socialExitRate').text(roundTwoDecimal.round(exitRate.social,2) + ' %');

    $('.emailUsers').text(users.email);
    $('.emailEntrance').text(entrances.email);
    $('.emailSessions').text(sessions.email);
    $('.emailPercentNewSessions').text(roundTwoDecimal.round(percentNewSessions.email,2) + ' %');
    $('.emailAvgSessions').text(roundTwoDecimal.round(avgSessionDuration.email, 2));
    $('.emailPageviews').text(pageviews.email);
    $('.emailPageviewsPerSession').text(roundTwoDecimal.round(pageviewsPerSession.email, 2));
    $('.emailBounceRate').text(roundTwoDecimal.round(bounceRate.email,2) + ' %');
    $('.emailExitRate').text(roundTwoDecimal.round(exitRate.email,2) + ' %');

    $('.otherUsers').text(users.other);
    $('.otherEntrance').text(entrances.other);
    $('.otherSessions').text(sessions.other);
    $('.otherPercentNewSessions').text(roundTwoDecimal.round(percentNewSessions.other,2) + ' %');
    $('.otherAvgSessions').text(roundTwoDecimal.round(avgSessionDuration.other, 2));
    $('.otherPageviews').text(pageviews.other);
    $('.otherPageviewsPerSession').text(roundTwoDecimal.round(pageviewsPerSession.other, 2));
    $('.otherBounceRate').text(roundTwoDecimal.round(bounceRate.other,2) + ' %');
    $('.otherExitRate').text(roundTwoDecimal.round(exitRate.other,2) + ' %');

  }

  var roundTwoDecimal = {};
  
  roundTwoDecimal.round = function(number, precision) {
      var factor = Math.pow(10, precision);
      var tempNumber = number * factor;
      var roundedTempNumber = Math.round(tempNumber);
      return roundedTempNumber / factor;
  };


  // function to instantiate and format PDF
  function genPDF() {

     var columns = ["Channel Name", "Users", "Sessions", "% New Sessions", "Avg Session Duration (sec)", "Page Views", "Page Views Per Session", "Bounce Rate", "Exit Rate"];
     var rows = [
        ["Organic", users.organic, entrances.organic, sessions.organic, roundTwoDecimal.round(avgSessionDuration.organic, 2), pageviews.organic, roundTwoDecimal.round(pageviewsPerSession.organic, 2), roundTwoDecimal.round(bounceRate.organic, 2), roundTwoDecimal.round(exitRate.organic, 2)],
        ["Direct", users.direct, entrances.direct, sessions.direct, roundTwoDecimal.round(avgSessionDuration.direct, 2), pageviews.direct, roundTwoDecimal.round(pageviewsPerSession.direct, 2), roundTwoDecimal.round(bounceRate.direct, 2), roundTwoDecimal.round(exitRate.direct, 2)],
        ["Paid Search", users.paid, entrances.paid, sessions.paid, roundTwoDecimal.round(avgSessionDuration.paid, 2), pageviews.paid, roundTwoDecimal.round(pageviewsPerSession.paid, 2), roundTwoDecimal.round(bounceRate.paid, 2), roundTwoDecimal.round(exitRate.paid, 2)],
        ["Referral", users.referral, entrances.referral, sessions.referral, roundTwoDecimal.round(avgSessionDuration.referral, 2), pageviews.referral, roundTwoDecimal.round(pageviewsPerSession.referral, 2), roundTwoDecimal.round(bounceRate.referral, 2), roundTwoDecimal.round(exitRate.referral, 2)],
        ["Social", users.social, entrances.social, sessions.social, roundTwoDecimal.round(avgSessionDuration.social, 2), pageviews.social, roundTwoDecimal.round(pageviewsPerSession.social, 2), roundTwoDecimal.round(bounceRate.social, 2), roundTwoDecimal.round(exitRate.social, 2)],
        ["Other", users.other, entrances.other, sessions.other, roundTwoDecimal.round(avgSessionDuration.other, 2), pageviews.other, roundTwoDecimal.round(pageviewsPerSession.other, 2), roundTwoDecimal.round(bounceRate.other, 2), roundTwoDecimal.round(exitRate.other, 2)],
        ["Totals", users.total, entrances.total, sessions.total, roundTwoDecimal.round(avgSessionDuration.total, 2), pageviews.total, roundTwoDecimal.round(pageviewsPerSession.total, 2), roundTwoDecimal.round(bounceRate.total, 2), roundTwoDecimal.round(exitRate.total, 2)]
     ];

     var columnsOrganic = ["Organic", "Details"];
     var rowsOrganic = [
        ["Users", users.organic],
        ["Sessions", entrances.organic],
        ["% New Sessions", sessions.organic],
        ["Avg Session Duration(sec)", roundTwoDecimal.round(avgSessionDuration.organic, 2)],
        ["Page Views", pageviews.organic],
        ["Page Views Per Session", roundTwoDecimal.round(pageviewsPerSession.organic, 2)],
        ["Bounce Rate", roundTwoDecimal.round(bounceRate.organic, 2)],
        ["Exit Rate", roundTwoDecimal.round(exitRate.organic, 2)]
     ];

     var columnsDirect = ["Direct", "Details"];
     var rowsDirect = [
        ["Users", users.direct],
        ["Sessions", entrances.direct],
        ["% New Sessions", sessions.direct],
        ["Avg Session Duration(sec)", roundTwoDecimal.round(avgSessionDuration.direct, 2)],
        ["Page Views", pageviews.direct],
        ["Page Views Per Session", roundTwoDecimal.round(pageviewsPerSession.direct, 2)],
        ["Bounce Rate", roundTwoDecimal.round(bounceRate.direct, 2)],
        ["Exit Rate", roundTwoDecimal.round(exitRate.direct, 2)]
     ];

     var columnsPaid = ["Paid", "Details"];
     var rowsPaid = [
        ["Users", users.paid],
        ["Sessions", entrances.paid],
        ["% New Sessions", sessions.paid],
        ["Avg Session Duration(sec)", roundTwoDecimal.round(avgSessionDuration.paid, 2)],
        ["Page Views", pageviews.paid],
        ["Page Views Per Session", roundTwoDecimal.round(pageviewsPerSession.paid, 2)],
        ["Bounce Rate", roundTwoDecimal.round(bounceRate.paid, 2)],
        ["Exit Rate", roundTwoDecimal.round(exitRate.paid, 2)]
     ];

     var columnsReferral = ["Referral", "Details"];
     var rowsReferral = [
        ["Users", users.referral],
        ["Sessions", entrances.referral],
        ["% New Sessions", sessions.referral],
        ["Avg Session Duration(sec)", roundTwoDecimal.round(avgSessionDuration.referral, 2)],
        ["Page Views", pageviews.referral],
        ["Page Views Per Session", roundTwoDecimal.round(pageviewsPerSession.referral, 2)],
        ["Bounce Rate", roundTwoDecimal.round(bounceRate.referral, 2)],
        ["Exit Rate", roundTwoDecimal.round(exitRate.referral, 2)]
     ];

     var columnsSocial = ["Social", "Details"];
     var rowsSocial = [
        ["Users", users.social],
        ["Sessions", entrances.social],
        ["% New Sessions", sessions.social],
        ["Avg Session Duration(sec)", roundTwoDecimal.round(avgSessionDuration.social, 2)],
        ["Page Views", pageviews.social],
        ["Page Views Per Session", roundTwoDecimal.round(pageviewsPerSession.social, 2)],
        ["Bounce Rate", roundTwoDecimal.round(bounceRate.social, 2)],
        ["Exit Rate", roundTwoDecimal.round(exitRate.social, 2)]
     ];

     var columnsOther = ["Other", "Details"];
     var rowsOther = [
        ["Users", users.other],
        ["Sessions", entrances.other],
        ["% New Sessions", sessions.other],
        ["Avg Session Duration(sec)", roundTwoDecimal.round(avgSessionDuration.other, 2)],
        ["Page Views", pageviews.other],
        ["Page Views Per Session", roundTwoDecimal.round(pageviewsPerSession.other, 2)],
        ["Bounce Rate", roundTwoDecimal.round(bounceRate.other, 2)],
        ["Exit Rate", roundTwoDecimal.round(exitRate.other, 2)]
     ];

     var columnsTotals = ["Totals", "Details"];
     var rowsTotals = [
        ["Users", users.total],
        ["Sessions", entrances.total],
        ["% New Sessions", sessions.total],
        ["Avg Session Duration(sec)", roundTwoDecimal.round(avgSessionDuration.total, 2)],
        ["Page Views", pageviews.total],
        ["Page Views Per Session", roundTwoDecimal.round(pageviewsPerSession.total, 2)],
        ["Bounce Rate", roundTwoDecimal.round(bounceRate.total, 2)],
        ["Exit Rate", roundTwoDecimal.round(exitRate.total, 2)]
     ];

     var doc = new jsPDF('landscape');

     doc.autoTable(columns, rows, {
        // startY: doc.autoTableEndPosY() + 10,
        tableWidth: 'auto',
        pageBreak: 'auto'
     });
     doc.autoTable(columnsOrganic, rowsOrganic, {
        startY: doc.autoTableEndPosY() + 40,
        tableWidth: 100
     });
     doc.autoTable(columnsDirect, rowsDirect, {
        startY: doc.autoTableEndPosY() + 50,
        tableWidth: 100
     });
     doc.autoTable(columnsPaid, rowsPaid, {
        startY: doc.autoTableEndPosY() + 40,
        tableWidth: 100
     });
     doc.autoTable(columnsReferral, rowsReferral, {
        startY: doc.autoTableEndPosY() + 50,
        tableWidth: 100
     });
     doc.autoTable(columnsSocial, rowsSocial, {
        startY: doc.autoTableEndPosY() + 40,
        tableWidth: 100
     });
     doc.autoTable(columnsOther, rowsOther, {
        startY: doc.autoTableEndPosY() + 50,
        tableWidth: 100
     });
     doc.autoTable(columnsTotals, rowsTotals, {
        startY: doc.autoTableEndPosY() + 40,
        tableWidth: 100
     });
     
     doc.save('table.pdf');
  }

  $('#pdf').click(function () {
    
    genPDF();

    });
});




