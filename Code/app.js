// Function To Populate Dropdown
function populateDropDown () {
    // select where the dropdown is in the HTML
    let selector = d3.select('#selDataset');
    // read the data then append all sample IDs
    d3.json('samples.json').then((data) => {
        let id = data.names;
        id.forEach((item) => {
        selector.append('option').text(item).property('value', item);
        });
        let firstSample = id[0];
        createGraphs(firstSample);})};

// Create Graphs
function createGraphs(sample) {
    // read data then create charts
    d3.json('samples.json').then(data => {
        // Save Variables
        let samples = data.samples;
        let filterArray = samples.filter(item => item.id == sample);
        let result = filterArray[0];
        let sample_values = result.sample_values;
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;

        // Set Up Bar Chart
        let trace1 = {
            x: sample_values.slice(0,10).sort(function(a,b) {return b-a}),
            y: otu_ids.map(x => `OTU ${x}`),
            type: 'bar',
            orientation: 'h',
            text: otu_labels};
        let barGraphData = [trace1];
        Plotly.newPlot('bar', barGraphData);

        // Set Up Bubble Chart
        let trace2 = {
            x: otu_ids,
            y: sample_values,
            marker: {
                size: sample_values,
                color: otu_ids},
            text: otu_labels,
            mode: 'markers'};
        let bubbleGraphData = [trace2];
        let layout2 = {
            xaxis: {title: 'OTU ID'}};
        Plotly.newPlot('bubble', bubbleGraphData, layout2);

        // Update Demographic Panel
        let metadata = data.metadata
        // filter the data for each id the user selects
        let filterMeta = metadata.filter(item => item.id == sample)
        let resultMeta = filterMeta[0]
        // select the metadata area in the HTML
        let metaDataArea = d3.select('#sample-metadata');
        // clear all HTML
        metaDataArea.html("");
        // append the metadata area with the info for correct ID
        Object.entries(resultMeta).forEach(([key, value]) => {
            metaDataArea.append('p').text(`${key}: ${value}`);
        });
    });
};
// When the user changes ID, activate createGraph function for that sample
function optionChanged(newSample) {
    createGraphs(newSample);};
    
// Activate the populateDropDown function
populateDropDown();