function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var filtereddata = metadata.filter(name => name.id == sample);
    var selector = d3.select("#sample-metadata");
    selector.html("");
    // console.log(selector);
    // console.log(filtereddata);
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata
  

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(filtereddata[0]).forEach(([key, value]) => {
  	selector.append("h6").text(`${key} : ${value}`)
    });
  });
}

function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var filtereddata = samples.filter(name => name.id == sample);

var trace1 = [{
   
  y: filtereddata[0].otu_ids.slice(0, 10).reverse(),
  x: filtereddata[0].sample_values.slice(0, 10).reverse(),
  type: "bar",
  orientation: "h"
}];

var layout = {
  title: "OTU Frequency"
};



Plotly.newPlot("bar", trace1, layout);
    

var trace2 = [{
   
  x: filtereddata[0].otu_ids,
  y: filtereddata[0].sample_values,
  mode: 'markers',
  marker: {
    color: filtereddata[0].otu_ids,
    size: filtereddata[0].sample_values,
    text: filtereddata[0].otu_labels
  },
  type: "bubble",
}];

var layout2 = {
  title: "OTU Samples"
};



Plotly.newPlot("bubble", trace2, layout2);





    // Build a Bubble Chart
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    // code to populate select options
    sampleNames.forEach((subject) => {
      selector.append("option").text(subject).property("value", subject)
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected 
  // The function call is in the HTML file as <select id="selDataset" onchange="optionChanged(this.value)"></select>
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();