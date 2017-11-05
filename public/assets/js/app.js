$(document).ready(function() {

    var viewID;
    var month;
    var year;
    var startDate;
    var endDate;

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
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
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
        console.log('session total: ' + response.result.reports[0].data.rows[0].metrics[0].values[0]);

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
    $('#main-sessions-total').text(` (Total: ${sessionData.total})`)
    $('#direct').text(response.result.reports[0].data.rows[0].metrics[0].values[0]);
    $('#organic').text(response.result.reports[0].data.rows[1].metrics[0].values[0]);
    $('#paid').text(response.result.reports[0].data.rows[2].metrics[0].values[0]);
    $('#referral').text(response.result.reports[0].data.rows[3].metrics[0].values[0]);
    $('#social').text(response.result.reports[0].data.rows[0].metrics[0].values[0]);
       
    }
});