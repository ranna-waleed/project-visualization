function fetchDataAndUpdateChart() {
    fetch('/get-datachart')
        .then(response => response.json())
        .then(data => {
            updateChart(data);
        })
        .catch(error => console.error('Error:', error));
}
function updateChart(data_df) {

    // console.log(data_df)
    am5.ready(function() {
 
    var root = am5.Root.new("chartdiv");

    root.setThemes([
        am5themes_Animated.new(root)
    ]);
     //Define chart
    var chart = root.container.children.push( 
    am5percent.PieChart.new(root, {
        layout: root.verticalLayout
    }) 
    );

    // Define data
    var data = [{
   School: "Computer Science",
   Expenses: 2180000
    }, {
        School: "Science",
        Expenses: 1554000
    },{
        School: "Business",
        Expenses:746000
        },{
            School: "Engineering",
            Expenses: 1100000
      
    }];

    // Create series
    var series = chart.series.push(
    am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "value",
        categoryField: "class"
    })
    );
    // console.log(data)
    series.data.setAll(data_df);

  
    var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
    x: am5.percent(50),
        layout: root.horizontalLayout
    }));

    legend.data.setAll(series.dataItems);
        
}); 
}
            
document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndUpdateChart()
});
 

     