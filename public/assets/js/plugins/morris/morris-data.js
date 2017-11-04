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
    
    var rowArray = response.result.reports[0].data.rows;
    var metrics = response.result.reports[0].columnHeader.metricHeader.metricHeaderEntries;
    var colors = ['#5cb85c', '#337ab7', '#f0ad4e', '#d9534f', '#3c1f80'];

    rowArray.forEach(row => {
        console.log(row.dimensions[0]);
        console.log(row.metrics[0].values)
        var dimension = row.dimensions[0];
        var metricValues = row.metrics[0].values;

        if (dimension === 'Direct') {

            var chart = '<div class="col-lg-4">';
            chart += '<div class="panel panel-default">';
            chart += '<div class="panel-heading"><h3 id="direct-title" class="panel-title"><i class="fa fa-long-arrow-right fa-fw"></i><span id="chart-total"></span></h3></div>'
            chart += '<div class="panel-body"><div id="direct-donut-chart"></div><div class="text-right"><a href="#">View Details <i class="fa fa-arrow-circle-right"></i></a></div></div>';
            chart += '</div>';
            chart += '</div>';
            chart += '</div>';
            $('#donut-chart-row').append(chart);

            $('#direct-title').text(`Direct`);
            Morris.Donut({
                element: 'direct-donut-chart',
                
                data: [{
                    label: metrics[0].name,
                    value: metricValues[0]
                }, {
                    label: metrics[1].name,
                    value: metricValues[1]
                }, {
                    label: metrics[2].name,
                    value: metricValues[2]
                }, {
                    label: metrics[3].name,
                    value: metricValues[3]
                }, {
                    label: metrics[4].name,
                    value: metricValues[4]
                }, {
                    label: metrics[5].name,
                    value: metricValues[5]
                }, {
                    label: metrics[6].name,
                    value: metricValues[6]
                }, {
                    label: metrics[7].name,
                    value: metricValues[7]
                }, {
                    label: metrics[8].name,
                    value: metricValues[8]
                }],
                resize: true
            });

        } else if (dimension === 'Organic Search') {

            var chart = '<div class="col-lg-4">';
            chart += '<div class="panel panel-default">';
            chart += '<div class="panel-heading"><h3 id="organic-title" class="panel-title"><i class="fa fa-long-arrow-right fa-fw"></i><span id="chart-total"></span></h3></div>'
            chart += '<div class="panel-body"><div id="organic-donut-chart"></div><div class="text-right"><a href="#">View Details <i class="fa fa-arrow-circle-right"></i></a></div></div>';
            chart += '</div>';
            chart += '</div>';
            chart += '</div>';
            $('#donut-chart-row').append(chart);

            $('#organic-title').text(`Organic Search`);
            Morris.Donut({
                element: 'organic-donut-chart',
                
                data: [{
                    label: metrics[0].name,
                    value: metricValues[0]
                }, {
                    label: metrics[1].name,
                    value: metricValues[1]
                }, {
                    label: metrics[2].name,
                    value: metricValues[2]
                }, {
                    label: metrics[3].name,
                    value: metricValues[3]
                }, {
                    label: metrics[4].name,
                    value: metricValues[4]
                }, {
                    label: metrics[5].name,
                    value: metricValues[5]
                }, {
                    label: metrics[6].name,
                    value: metricValues[6]
                }, {
                    label: metrics[7].name,
                    value: metricValues[7]
                }, {
                    label: metrics[8].name,
                    value: metricValues[8]
                }],
                resize: true
            });

        } else if (dimension === 'Paid Search') {

            var chart = '<div class="col-lg-4">';
            chart += '<div class="panel panel-default">';
            chart += '<div class="panel-heading"><h3 id="paid-title" class="panel-title"><i class="fa fa-long-arrow-right fa-fw"></i><span id="chart-total"></span></h3></div>'
            chart += '<div class="panel-body"><div id="paid-donut-chart"></div><div class="text-right"><a href="#">View Details <i class="fa fa-arrow-circle-right"></i></a></div></div>';
            chart += '</div>';
            chart += '</div>';
            chart += '</div>';
            $('#donut-chart-row').append(chart);

            $('#paid-title').text(`Paid Search`);

            Morris.Donut({
                element: 'paid-donut-chart',
                
                data: [{
                    label: metrics[0].name,
                    value: metricValues[0]
                }, {
                    label: metrics[1].name,
                    value: metricValues[1]
                }, {
                    label: metrics[2].name,
                    value: metricValues[2]
                }, {
                    label: metrics[3].name,
                    value: metricValues[3]
                }, {
                    label: metrics[4].name,
                    value: metricValues[4]
                }, {
                    label: metrics[5].name,
                    value: metricValues[5]
                }, {
                    label: metrics[6].name,
                    value: metricValues[6]
                }, {
                    label: metrics[7].name,
                    value: metricValues[7]
                }, {
                    label: metrics[8].name,
                    value: metricValues[8]
                }],
                resize: true
            });

        } else if (dimension === 'Referral') {

            var chart = '<div class="col-lg-4">';
            chart += '<div class="panel panel-default">';
            chart += '<div class="panel-heading"><h3 id="referral-title" class="panel-title"><i class="fa fa-long-arrow-right fa-fw"></i><span id="chart-total"></span></h3></div>'
            chart += '<div class="panel-body"><div id="referral-donut-chart"></div><div class="text-right"><a href="#">View Details <i class="fa fa-arrow-circle-right"></i></a></div></div>';
            chart += '</div>';
            chart += '</div>';
            chart += '</div>';
            $('#donut-chart-row').append(chart);

            $('#referral-title').text(`Referral`);

            Morris.Donut({
                element: 'referral-donut-chart',
                
                data: [{
                    label: metrics[0].name,
                    value: metricValues[0]
                }, {
                    label: metrics[1].name,
                    value: metricValues[1]
                }, {
                    label: metrics[2].name,
                    value: metricValues[2]
                }, {
                    label: metrics[3].name,
                    value: metricValues[3]
                }, {
                    label: metrics[4].name,
                    value: metricValues[4]
                }, {
                    label: metrics[5].name,
                    value: metricValues[5]
                }, {
                    label: metrics[6].name,
                    value: metricValues[6]
                }, {
                    label: metrics[7].name,
                    value: metricValues[7]
                }, {
                    label: metrics[8].name,
                    value: metricValues[8]
                }],
                resize: true
            });

        } else if (dimension === 'Social') {

            var chart = '<div class="col-lg-4">';
            chart += '<div class="panel panel-default">';
            chart += '<div class="panel-heading"><h3 id="social-title" class="panel-title"><i class="fa fa-long-arrow-right fa-fw"></i><span id="chart-total"></span></h3></div>'
            chart += '<div class="panel-body"><div id="social-donut-chart"></div><div class="text-right"><a href="#">View Details <i class="fa fa-arrow-circle-right"></i></a></div></div>';
            chart += '</div>';
            chart += '</div>';
            chart += '</div>';
            $('#donut-chart-row').append(chart);

            $('#social-title').text(`Social`);

            Morris.Donut({
                element: 'social-donut-chart',
                
                data: [{
                    label: metrics[0].name,
                    value: metricValues[0]
                }, {
                    label: metrics[1].name,
                    value: metricValues[1]
                }, {
                    label: metrics[2].name,
                    value: metricValues[2]
                }, {
                    label: metrics[3].name,
                    value: metricValues[3]
                }, {
                    label: metrics[4].name,
                    value: metricValues[4]
                }, {
                    label: metrics[5].name,
                    value: metricValues[5]
                }, {
                    label: metrics[6].name,
                    value: metricValues[6]
                }, {
                    label: metrics[7].name,
                    value: metricValues[7]
                }, {
                    label: metrics[8].name,
                    value: metricValues[8]
                }],
                resize: true
            });

        } else if (dimension === 'Email') {

            var chart = '<div class="col-lg-4">';
            chart += '<div class="panel panel-default">';
            chart += '<div class="panel-heading"><h3 id="email-title" class="panel-title"><i class="fa fa-long-arrow-right fa-fw"></i><span id="chart-total"></span></h3></div>'
            chart += '<div class="panel-body"><div id="email-donut-chart"></div><div class="text-right"><a href="#">View Details <i class="fa fa-arrow-circle-right"></i></a></div></div>';
            chart += '</div>';
            chart += '</div>';
            chart += '</div>';
            $('#donut-chart-row').append(chart);

            $('#email-title').text(`Email`);

            Morris.Donut({
                element: 'email-donut-chart',
                
                data: [{
                    label: metrics[0].name,
                    value: metricValues[0]
                }, {
                    label: metrics[1].name,
                    value: metricValues[1]
                }, {
                    label: metrics[2].name,
                    value: metricValues[2]
                }, {
                    label: metrics[3].name,
                    value: metricValues[3]
                }, {
                    label: metrics[4].name,
                    value: metricValues[4]
                }, {
                    label: metrics[5].name,
                    value: metricValues[5]
                }, {
                    label: metrics[6].name,
                    value: metricValues[6]
                }, {
                    label: metrics[7].name,
                    value: metricValues[7]
                }, {
                    label: metrics[8].name,
                    value: metricValues[8]
                }],
                resize: true
            });

        } else if (dimension === '(Other)') {

            var chart = '<div class="col-lg-4">';
            chart += '<div class="panel panel-default">';
            chart += '<div class="panel-heading"><h3 id="other-title" class="panel-title"><i class="fa fa-long-arrow-right fa-fw"></i><span id="chart-total"></span></h3></div>'
            chart += '<div class="panel-body"><div id="other-donut-chart"></div><div class="text-right"><a href="#">View Details <i class="fa fa-arrow-circle-right"></i></a></div></div>';
            chart += '</div>';
            chart += '</div>';
            chart += '</div>';
            $('#donut-chart-row').append(chart);

            $('#other-title').text(`Other`);

            Morris.Donut({
                element: 'other-donut-chart',
                
                data: [{
                    label: metrics[0].name,
                    value: metricValues[0]
                }, {
                    label: metrics[1].name,
                    value: metricValues[1]
                }, {
                    label: metrics[2].name,
                    value: metricValues[2]
                }, {
                    label: metrics[3].name,
                    value: metricValues[3]
                }, {
                    label: metrics[4].name,
                    value: metricValues[4]
                }, {
                    label: metrics[5].name,
                    value: metricValues[5]
                }, {
                    label: metrics[6].name,
                    value: metricValues[6]
                }, {
                    label: metrics[7].name,
                    value: metricValues[7]
                }, {
                    label: metrics[8].name,
                    value: metricValues[8]
                }],
                resize: true
            });

        }
    });

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
