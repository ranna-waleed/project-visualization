function fetchDataAndUpdateTable() {
    fetch('/get-datatable')
        .then(response => response.json())
        .then(data => {
            updateDataTable(data);
        })
        .catch(error => console.error('Error:', error));
}
function updateDataTable(data) {
    am5.ready(function() {
        
    var root = am5.Root.new("datadiv");
 

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
var chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.horizontalLayout
    })
  );
  
  
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30 });
  
  var yAxis = chart.yAxes.push(
    am5xy.CategoryAxis.new(root, {
      maxDeviation: 0,
      categoryField: "School",
      renderer: yRenderer
    })
  );
  
  var xAxis = chart.xAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0,
      min: 0,
      renderer: am5xy.AxisRendererX.new(root, {})
    })
  );
  
  
  // Create series
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "School",
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "value",
      sequencedInterpolation: true,
      categoryYField: "School"
    })
  );
  
  var columnTemplate = series.columns.template;

  columnTemplate.adapters.add("tooltipText", (tooltipText, target) => {
    // Get the corresponding data item for the current column
    var dataItem = target.dataItem;
  
    // Customize the tooltip text based on the value of the bar
    return "Revenue of " + dataItem.get("categoryY") + ": " + dataItem.get("value");
  });
  
  columnTemplate.setAll({
    draggable: true,
    cursorOverStyle: "pointer",
    cornerRadiusBR: 10,
    cornerRadiusTR: 10
  });
  
  
  
  columnTemplate.adapters.add("fill", (fill, target) => {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });
  
  columnTemplate.adapters.add("stroke", (stroke, target) => {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });
  
  columnTemplate.events.on("dragstop", () => {
    sortCategoryAxis();
  });
  

  // Set data
  var data = [{
    School: "Computer Science",
    value: 269000
  }, {
    School: "Engineering",
    value: 5767999
  }, {
    School: "Business",
    value: 2869999
  }, {
    School: "Science",
    value: 1659000
  }];
  
  yAxis.data.setAll(data);
  series.data.setAll(data);
  
  
  // Make stuff animate on load
  series.appear(1000);
  chart.appear(1000, 100);
      
              
      }); // end am5.ready()
  }
  document.addEventListener('DOMContentLoaded', function() {
      fetchDataAndUpdateTable()
  });
   