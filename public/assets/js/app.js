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
    }
    var pageviews = {
        total: 0,
        organic: 0,
        direct: 0,
        paid: 0,
        referral: 0,
        social: 0,
        email: 0,
        other: 0
    }
    var users = {
        total: 0,
        organic: 0,
        direct: 0,
        paid: 0,
        referral: 0,
        social: 0,
        email: 0,
        other: 0
    }
    // var sessions = {
    //  organic: 0,
    //  direct: 0,
    //  paid: 0,
    //  referral: 0,
    //  social: 0,
    //  email: 0,
    //  other: 0
    // }
    // var sessions = {
    //  organic: 0,
    //  direct: 0,
    //  paid: 0,
    //  referral: 0,
    //  social: 0,
    //  email: 0,
    //  other: 0
    // }
    // var sessions = {
    //  organic: 0,
    //  direct: 0,
    //  paid: 0,
    //  referral: 0,
    //  social: 0,
    //  email: 0,
    //  other: 0
    // }
    // var sessions = {
    //  organic: 0,
    //  direct: 0,
    //  paid: 0,
    //  referral: 0,
    //  social: 0,
    //  email: 0,
    //  other: 0
    // }
    // var sessions = {
    //  organic: 0,
    //  direct: 0,
    //  paid: 0,
    //  referral: 0,
    //  social: 0,
    //  email: 0,
    //  other: 0
    // }
    

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

        if(month < 10) {
            startDate = `${year}-0${month+1}-01`;
        } else {
            startDate = `${year}-${month+1}-01`;
        }

        d = new Date(year, month + 1, 0);
        endDay = d.getDate();
        

        if(month < 10) {
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

    var rowArray = response.result.reports[0].data.rows;

    rowArray.forEach(row => {

        console.log(row.dimensions[0]);
        console.log(row.metrics[0].values[0])

        if (row.dimensions[0] === 'Organic Search') {
            sessions.organic = row.metrics[0].values[0];
            pageviews.organic = row.metrics[0].values[1];
            users.organic = row.metrics[0].values[2];
        } else if (row.dimensions[0] === 'Direct') {
            sessions.direct = row.metrics[0].values[0];
            pageviews.direct = row.metrics[0].values[1];
            users.direct = row.metrics[0].values[2];
        } else if (row.dimensions[0] === 'Paid Search') {
            sessions.paid = row.metrics[0].values[0];
            pageviews.paid = row.metrics[0].values[1];
            users.paid = row.metrics[0].values[2];
        } else if (row.dimensions[0] === 'Referral') {
            sessions.referral = row.metrics[0].values[0];
            pageviews.referral = row.metrics[0].values[1];
            users.referral = row.metrics[0].values[2];
        } else if (row.dimensions[0] === 'Social') {
            sessions.social = row.metrics[0].values[0];
            pageviews.social = row.metrics[0].values[1];
            users.social = row.metrics[0].values[2];
        } else if (row.dimensions[0] === 'Email') {
            sessions.email = row.metrics[0].values[0];
            pageviews.email = row.metrics[0].values[1];
            users.email = row.metrics[0].values[2];
        } else if (row.dimensions[0] === '(Other)') {
            sessions.other = row.metrics[0].values[0];
            pageviews.other = row.metrics[0].values[1];
            users.other = row.metrics[0].values[2];
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

  }

});