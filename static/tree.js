function fetchDataAndUpdateTree() {
    fetch('/get-dataTree')
        .then(response => response.json())
        .then(data => {
            updateTree(data);
        })
        .catch(error => console.error('Error:', error));
}

function updateTree(data) {
 
    console.log(data)
    am5.ready(function() {

// Create root and chart
var root = am5.Root.new("treediv");

root.setThemes([
  am5themes_Animated.new(root)
]);

var data = [{
  name: "School",
  children: [{
    name: "Computer Science",
    children: [{
      name: "Artificial Intelligence",
      value: 300
    }, {
      name: "Information Technology",
      value: 60
    }, {
      name: "Software Engineering",
      value: 100
    }]
  }, {
    name: "Science",
    children: [{
      name: "Physics",
      value: 150
    }, {
      name: "Chemistry",
      value: 200
    },{
        name: "Biomedical",
        value: 200
    },{
        name: "Nano Science",
        value: 100
    },{
        name: "Materials science",
        value: 200
    }]
  }, {
    name: "Business",
    children: [{
      name: "Finance",
      value: 300
    }, {
      name: "Marketing",
      value: 50
    }, {
      name: "Actuarial Analysis",
      value: 170
    }, {
        name: "Risk Management",
        value: 190
      }, {
        name: "Innovation Management",
        value: 300
    }, {
        name: "Technology Management",
        value: 50
    }]
  }, {
    name: "Engineering",
    children: [{
      name: "Renewable",
      value: 100
    }, {
      name: "Energy and Bioprocess",
      value: 260
    }, {
      name: "Nanotechnology",
      value: 230
    }, {
        name: "Environmental",
        value: 300
      }, {
        name: "Areospace",
        value: 150
    }, {
        name: "Communications and information",
        value: 80
      }, {
        name: "Mechanical Engineering",
        value: 250
    }, {
        name: "Electrical Engineering",
        value: 100
   
    }]
  }]
}];


var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    layout: root.verticalLayout
  })
);

var series = container.children.push(
  am5hierarchy.Tree.new(root, {
    singleBranchOnly: false,
    downDepth: 1,
    initialDepth: 5,
    topDepth: 0,
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    orientation: "vertical"
  })
);

series.data.setAll(data);
series.set("selectedDataItem", series.dataItems[0]);
}); 
}
            
document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndUpdateTree()
});
 