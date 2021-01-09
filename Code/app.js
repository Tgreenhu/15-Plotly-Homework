

// Function To Populate Dropdown
// function populateDropDown () {
//     let selection = d3.select('#selDataset');
//     d3.json('samples.json').then((data) => {
//         let id = data.names;
//         id.forEach(id => {
//             selector.append('option').text(id).property('value', id);
//         });
//     })
// };

// Create Graphs
// function createGraphs(species) {
    d3.json('samples.json').then(data => {
        // Save Variables
        let samples = data.samples[0];
        let sample_values = samples.sample_values;
        let otu_ids = samples.otu_ids;
        let otu_labels = samples.otu_labels;
        let metadata = data.metadata[0];

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
        let metaDataArea = d3.select('#sample-metadata');
        metaDataArea.html("");
        Object.entries(metadata).forEach(([key, value]) => {
            metaDataArea.append('p').text(`${key}: ${value}`);
        });
    });
// };
