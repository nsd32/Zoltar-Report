// Morris.js Charts sample data for SB Admin template

// $(function() {
    // Replace with your view ID.
  var VIEW_ID = '95712718';
  console.log(VIEW_ID);

  

  // Query the API and print the results to the page.
  function queryReports() {
    gapi.client.request({
      path: '/v4/reports:batchGet',
      root: 'https://analyticsreporting.googleapis.com/',
      method: 'POST',
      body: {
        reportRequests: [
          {
            viewId: VIEW_ID,
            dateRanges: [
              {
                startDate: '7daysAgo',
                endDate: 'today'
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
    console.log('session total: ' + response.result.reports[0].data.rows[0].metrics[0].values[0]);
    // var sessions = response.result.reports[0].data.rows[0].metrics[0].values[0];
    // var pageviews = response.result.reports[0].data.rows[0].metrics[0].values[1];
    // var users = response.result.reports[0].data.rows[0].metrics[0].values[2];
    // var pageviewsPerSession = response.result.reports[0].data.rows[0].metrics[0].values[3];
    // var bounceRate = response.result.reports[0].data.rows[0].metrics[0].values[4];
    // var exitRate = response.result.reports[0].data.rows[0].metrics[0].values[5];
    // var newSessions = response.result.reports[0].data.rows[0].metrics[0].values[6];
    // var avgSessionDuration = response.result.reports[0].data.rows[0].metrics[0].values[7];
    // var goalCompletions = response.result.reports[0].data.rows[0].metrics[0].values[8];
    // console.log(sessions)
    var sessionData = {
        total: response.result.reports[0].data.totals[0].values[0],
        direct: response.result.reports[0].data.rows[0].metrics[0].values[0],
        organicSearch: response.result.reports[0].data.rows[1].metrics[0].values[0],
        paidSearch: response.result.reports[0].data.rows[2].metrics[0].values[0],
        referral: response.result.reports[0].data.rows[3].metrics[0].values[0],
        social: response.result.reports[0].data.rows[4].metrics[0].values[0]
    }

    var pageviewData = {
        total: response.result.reports[0].data.totals[0].values[1],
        direct: response.result.reports[0].data.rows[0].metrics[0].values[1],
        organicSearch: response.result.reports[0].data.rows[1].metrics[0].values[1],
        paidSearch: response.result.reports[0].data.rows[2].metrics[0].values[1],
        referral: response.result.reports[0].data.rows[3].metrics[0].values[1],
        social: response.result.reports[0].data.rows[4].metrics[0].values[1]
    }

    var userData = {
        total: response.result.reports[0].data.totals[0].values[2],
        direct: response.result.reports[0].data.rows[0].metrics[0].values[2],
        organicSearch: response.result.reports[0].data.rows[1].metrics[0].values[2],
        paidSearch: response.result.reports[0].data.rows[2].metrics[0].values[2],
        referral: response.result.reports[0].data.rows[3].metrics[0].values[2],
        social: response.result.reports[0].data.rows[4].metrics[0].values[2]
    }

    var colors = ['#5cb85c', '#337ab7', '#f0ad4e', '#d9534f', '#3c1f80'];

     // Donut Chart
    $('#sessions-total').text(` (Total: ${sessionData.total})`);
    Morris.Donut({
        element: 'sessions-donut-chart',
        colors: colors,
        data: [{
            label: "Direct",
            value: sessionData.direct
        }, {
            label: "Organic Search",
            value: sessionData.organicSearch
        }, {
            label: "Paid Search",
            value: sessionData.paidSearch
        }, {
            label: "Referral",
            value: sessionData.referral
        }, {
            label: "Social",
            value: sessionData.social
        }],
        resize: true
    });


    $('#pageview-total').text(` (Total: ${pageviewData.total})`);
    Morris.Donut({
        element: 'pageview-donut-chart',
        colors: colors,
        data: [{
            label: "Direct",
            value: pageviewData.direct
        }, {
            label: "Organic Search",
            value: pageviewData.organicSearch
        }, {
            label: "Paid Search",
            value: pageviewData.paidSearch
        }, {
            label: "Referral",
            value: pageviewData.referral
        }, {
            label: "Social",
            value: pageviewData.social
        }],
        resize: true
    });

    $('#users-total').text(` (Total: ${userData.total})`);
    Morris.Donut({
        element: 'users-donut-chart',
        colors: colors,
        data: [{
            label: "Direct",
            value: userData.direct
        }, {
            label: "Organic Search",
            value: userData.organicSearch
        }, {
            label: "Paid Search",
            value: userData.paidSearch
        }, {
            label: "Referral",
            value: userData.referral
        }, {
            label: "Social",
            value: userData.social
        }],
        resize: true
    });

    $('#direct').text(response.result.reports[0].data.rows[0].metrics[0].values[0]);
    $('#organic').text(response.result.reports[0].data.rows[1].metrics[0].values[0]);
    $('#paid').text(response.result.reports[0].data.rows[2].metrics[0].values[0]);
    $('#referral').text(response.result.reports[0].data.rows[3].metrics[0].values[0]);
    $('#social').text(response.result.reports[0].data.rows[4].metrics[0].values[0]);

    
     // Area Chart
    // Morris.Area({
    //     element: 'morris-area-chart',
    //     data: [{
    //         period: 'Sunday',
    //         pageviews: 100
    //     }, {
    //         period: 'Monday',
    //         pageviews: 120
    //     }, {
    //         period: 'Tuesday',
    //         pageviews: 90
    //     }, {
    //         period: 'Wednesday',
    //         pageviews: 75
    //     }, {
    //         period: 'Thursday',
    //         pageviews: 130
    //     }, {
    //         period: 'Friday',
    //         pageviews: 50
    //     }, {
    //         period: 'Saturday',
    //         pageviews: 175
    //     }],
    //     xkey: 'period',
    //     ykeys: ['pageviews'],
    //     labels: ['pageviews'],
    //     pointSize: 2,
    //     hideHover: 'auto',
    //     resize: true
    // });

    // var newTest = {
    //   sessions: sessions,
    //   pageviews: pageviews,
    //   users: users,
    //   pageviewsBySession: pageviewsPerSession,
    //   bounceRate: bounceRate,
    //   exitRate: exitRate,
    //   newSession: newSessions,
    //   avgSession: avgSessionDuration,
    //   goalCompletion: goalCompletions,
    //   view_id: VIEW_ID,
    //   start_date: 'October 1, 2017',
    //   end_date: 'October 31, 2017'
    // }

    // $.post('/api/monthly', newTest);
    
        
        



    
  }

   

   

    // // Line Chart
    // Morris.Line({
    //     // ID of the element in which to draw the chart.
    //     element: 'morris-line-chart',
    //     // Chart data records -- each entry in this array corresponds to a point on
    //     // the chart.
    //     data: [{
    //         d: '2012-10-01',
    //         visits: 802
    //     }, {
    //         d: '2012-10-02',
    //         visits: 783
    //     }, {
    //         d: '2012-10-03',
    //         visits: 820
    //     }, {
    //         d: '2012-10-04',
    //         visits: 839
    //     }, {
    //         d: '2012-10-05',
    //         visits: 792
    //     }, {
    //         d: '2012-10-06',
    //         visits: 859
    //     }, {
    //         d: '2012-10-07',
    //         visits: 790
    //     }, {
    //         d: '2012-10-08',
    //         visits: 1680
    //     }, {
    //         d: '2012-10-09',
    //         visits: 1592
    //     }, {
    //         d: '2012-10-10',
    //         visits: 1420
    //     }, {
    //         d: '2012-10-11',
    //         visits: 882
    //     }, {
    //         d: '2012-10-12',
    //         visits: 889
    //     }, {
    //         d: '2012-10-13',
    //         visits: 819
    //     }, {
    //         d: '2012-10-14',
    //         visits: 849
    //     }, {
    //         d: '2012-10-15',
    //         visits: 870
    //     }, {
    //         d: '2012-10-16',
    //         visits: 1063
    //     }, {
    //         d: '2012-10-17',
    //         visits: 1192
    //     }, {
    //         d: '2012-10-18',
    //         visits: 1224
    //     }, {
    //         d: '2012-10-19',
    //         visits: 1329
    //     }, {
    //         d: '2012-10-20',
    //         visits: 1329
    //     }, {
    //         d: '2012-10-21',
    //         visits: 1239
    //     }, {
    //         d: '2012-10-22',
    //         visits: 1190
    //     }, {
    //         d: '2012-10-23',
    //         visits: 1312
    //     }, {
    //         d: '2012-10-24',
    //         visits: 1293
    //     }, {
    //         d: '2012-10-25',
    //         visits: 1283
    //     }, {
    //         d: '2012-10-26',
    //         visits: 1248
    //     }, {
    //         d: '2012-10-27',
    //         visits: 1323
    //     }, {
    //         d: '2012-10-28',
    //         visits: 1390
    //     }, {
    //         d: '2012-10-29',
    //         visits: 1420
    //     }, {
    //         d: '2012-10-30',
    //         visits: 1529
    //     }, {
    //         d: '2012-10-31',
    //         visits: 1892
    //     }, ],
    //     // The name of the data record attribute that contains x-visitss.
    //     xkey: 'd',
    //     // A list of names of data record attributes that contain y-visitss.
    //     ykeys: ['visits'],
    //     // Labels for the ykeys -- will be displayed when you hover over the
    //     // chart.
    //     labels: ['Visits'],
    //     // Disables line smoothing
    //     smooth: false,
    //     resize: true
    // });

    // // Bar Chart
    // Morris.Bar({
    //     element: 'morris-bar-chart',
    //     data: [{
    //         device: 'iPhone',
    //         geekbench: 136
    //     }, {
    //         device: 'iPhone 3G',
    //         geekbench: 137
    //     }, {
    //         device: 'iPhone 3GS',
    //         geekbench: 275
    //     }, {
    //         device: 'iPhone 4',
    //         geekbench: 380
    //     }, {
    //         device: 'iPhone 4S',
    //         geekbench: 655
    //     }, {
    //         device: 'iPhone 5',
    //         geekbench: 1571
    //     }],
    //     xkey: 'device',
    //     ykeys: ['geekbench'],
    //     labels: ['Geekbench'],
    //     barRatio: 0.4,
    //     xLabelAngle: 35,
    //     hideHover: 'auto',
    //     resize: true
    // });


// });
