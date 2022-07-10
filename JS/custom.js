// if zillow doesn't provide all the info needed, the calculator can still run but only a handfull of metrics are still useful.
var complete_set = true;

function HandleCalculator(){
    var urlParams = new URLSearchParams(window.location.search);
    rental_income = urlParams.get('rental_income')
    if (rental_income==""){
        rental_income = "1"
        complete_set = false;
    }
    var submission = {
        "total_years": "30",
        "mortgageable_months": "360",
        "list_price": urlParams.get('list_price'),
        "selling_price_current_year_dollars": urlParams.get('list_price'),
        "taxable_price": urlParams.get('list_price'),
        "sales_tax": "0.08",
        "property_tax_rate_yearly": urlParams.get('property_tax_rate_yearly'),
        "monthly_interest_rate": "0.003333333333333",
        "new": "",
        "down_payment": "0.15",
        "fixed_closeing_costs": "10000",
            // washer/dryer: 2500
            // refrigerator/freezer: 2300 
        "rental_income": urlParams.get('rental_income'),
        "percent_time_unit_occupied": "0.93",
        "maintainance_monthly": urlParams.get('maintainance_monthly'),
        "condo_fees_monthly": urlParams.get('condo_fees_monthly'),
        "income_tax_rate_company": "0.15",
        "income_tax_rate_individual": ".3",
        "home_insurance_monthly": urlParams.get('home_insurance_monthly')
    };
    $(".loading").html('<img src="http://www.mytreedb.com/uploads/mytreedb/loader/ajax_loader_gray_512.gif" style="width:35px;height:35px;"></img>')
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: "https://as0c02n20k.execute-api.us-east-1.amazonaws.com/",
        data: submission,
        jsonpCallback: "localJsonpCallback(",
        error: function(data) {
            $(".loading").html(data.error())
        }
    });
};

function show_statistic(id, value, text) {
    html = text + '<p><b>' + value + '</b></p>'
    $('#' + id).html(html);
    $('#' + id).show();
    console.log('shown!');
}

function pad(x, prefix='$', suffix='') {
    string = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    string = prefix + string + suffix;
    return string;
}

function result_title(real_reinvested_profits, eac) {
    text = "This investment"
    if(real_reinvested_profits >= eac){
        text += "<p style='display:inline; color:green;'> out performs </p>"
        amount = "<p style='display:inline; color:green;'>" + pad(real_reinvested_profits - eac) + "</p>"
    } else {
        text += "<p style='display:inline; color:red;'> under performs </p>"
        amount = "<p style='display:inline; color:red;'>" + pad(eac - real_reinvested_profits) + "</p>"
    }

    text += "the S&P500 by ";
    text += amount;
    html = '<h5 style="text-align:center; margin-top:40px; margin-bottom:20px;">' + text + '</h5>'
    $('#result-title').html(html);
}

function localJsonpCallback(json) {
    if(json.error){
        $(version).find(".loading").html('ERROR: ' + json.error)
        return
    }
    var real_reinvested_profits = json["real_reinvested_profits"];
    var eac = json["eac"];
    var real_profit = json["real_profit"];
    var nominal_profit = json["nominal_profit"];
    var number_of_months_to_pay_back_initial = json["number_of_months_to_pay_back_initial"];
    var cash_flow = json["cash_flow"];
    var real_cash_flow = json["real_cash_flow"];
    var renters_profit_over_owner = json["renters_profit_over_owner"];
    result_title(real_reinvested_profits, eac);
    show_statistic('first_month', pad(-1 * cash_flow[0]), 'First month net loss; the minimum funding required to start this project:');
    show_statistic('nominal_profit', pad(nominal_profit), 'Nominal dollars netted over the duration:');
    show_statistic('real_profit', pad(real_profit), 'Real, base year adjusted dollars netted over the duration:');
    show_statistic('number_of_months_to_pay_back_initial', pad(number_of_months_to_pay_back_initial, '', ' months'), 'Number of months to break even, without selling the property: ');
    show_statistic('eac', pad(eac), 'Real, base year adjusted value of what this investment would have netted you in the S&P 500:');
    show_statistic('real_reinvested_profits', pad(real_reinvested_profits), 'Real value of reinvesting profits in the S&P 500; what this investment should net you:');
    if(renters_profit_over_owner > 0){
        show_statistic('renters_profit_over_owner', pad(renters_profit_over_owner), 'Nominal wealth difference renter accures over owner');
    } else {
        show_statistic('renters_profit_over_owner', pad(-1 * renters_profit_over_owner), 'Nominal wealth difference owner accures over renter');
    }
    $.each(cash_flow, function(index,val){val = [index, val]});
    $.each(real_cash_flow, function(index,val){val = [index, val]});
    // $(".loading").html('');
    var now = (new Date()).valueOf();
    series=[{
        name:'Nominal Net Cash Flow',
        type:'area',
        fillColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 1,
                y2: 1
            },
            stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
        },
        data: cash_flow.slice(1),
        pointStart: now,
        pointIntervalUnit: 'month'
    }, {
            name:'Real Net Cash Flow',
            type:'area',
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 1,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[1]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0).get('rgba')]
                ]
            },
            data: real_cash_flow.slice(1),
            pointStart: now,
            pointIntervalUnit: 'month'
    }];   

    // $('#chartcontainer').html('<div class="calc-container"><div id="mainchart" style="min-width: 310px; height: 400px; margin: 0 auto">');
    graphMoney(series, 'Monthly Nominal Net Cash Flows', 'Excludes first and last month');
    $('.collapsible').collapsible();
    $('.collapsible').collapsible('open');
    $('.collapsible').collapsible('close');
}

function graphMoney(series, title, subtitle) {
    Highcharts.stockChart('mainchart', {
        rangeSelector: {
            buttons: [{
                type: 'year',
                count: 5,
                text: '5y'
            }, {
                type: 'year',
                count: 10,
                text: '10y'
            }, {
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 2,
            inputEnabled: false
        },
        title:{
            text: title
        },
        subtitle:{
            text: subtitle
        },
        yAxis: {
            labels: {
                formatter: function () {
                    return '$' + (this.value > 0 ? ' + ' : '') + this.value;
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },
        xAxis: {
            type: 'date',
            title: {
                text: 'Date'
            },
        },
        plotOptions: {
            series: {
                showInNavigator: true,
                allowPointSelect: true,
            },
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>$ {point.y}</b> <br/>',
            valueDecimals: 2,
            split: true,
        },
        series: series
    });
};
function graphMoneyHist(version, series, title, subtitle){
    Highcharts.chart('histogram', {
        chart: {
            type: 'column',
        },
        title:{
            text: title
        },
        subtitle:{
            text: subtitle
        },
        xAxis: {
            title: { text: 'Returns' }
        },
        yAxis: {
            title: { text: 'Frequency' }
        },
        series: series
    });
}

//all credit to these guys for this function -> https://www.highcharts.com/blog/post/213-histogram-when-why-how/ 
function binData(data) {

  var hData = new Array(), //the output array
    size = data.length, //how many data points
    bins = Math.round(Math.sqrt(size)); //determine how many bins we need
  bins = bins > 50 ? 50 : bins; //adjust if more than 50 cells
  var max = Math.max.apply(null, data), //lowest data value
    min = Math.min.apply(null, data), //highest data value
    range = max - min, //total range of the data
    width = range / bins, //size of the bins
    bin_bottom, //place holders for the bounds of each bin
    bin_top;

  //loop through the number of cells
  for (var i = 0; i < bins; i++) {

    //set the upper and lower limits of the current cell
    bin_bottom = min + (i * width);
    bin_top = bin_bottom + width;

    //check for and set the x value of the bin
    if (!hData[i]) {
      hData[i] = new Array();
      hData[i][0] = bin_bottom + (width / 2);
    }

    //loop through the data to see if it fits in this bin
    for (var j = 0; j < size; j++) {
      var x = data[j];

      //adjust if it's the first pass
      i == 0 && j == 0 ? bin_bottom -= 1 : bin_bottom = bin_bottom;

      //if it fits in the bin, add it
      if (x > bin_bottom && x <= bin_top) {
        !hData[i][1] ? hData[i][1] = 1 : hData[i][1]++;
      }
    }
  }
  $.each(hData, function(i, point) {
    if (typeof point[1] == 'undefined') {
      hData[i][1] = 0;
    }
  });
  return hData;
}


HandleCalculator();