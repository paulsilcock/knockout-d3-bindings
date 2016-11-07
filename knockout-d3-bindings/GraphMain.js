require(["Scripts/knockout-3.4.0", "GraphViewModel", "NodeGenerator"], function (ko, GraphViewModel, NodeGenerator) {
    var nodeGen = new NodeGenerator(3);

    this.graphData = new GraphViewModel(nodeGen.initialNodes.nodes, nodeGen.initialNodes.links);

    ko.applyBindings(this);

    this.graphData.startSimulation();

    var it = 0;
    var timer = setInterval((function () {
        var newNodeInfo = nodeGen.getNewNode();
        this.graphData.nodeArray.push(newNodeInfo.node);
        this.graphData.linkArray.push(newNodeInfo.link);
        it++;
        if (it >= 20) {
            clearInterval(timer);
        }
    }).bind(this), 1000);
});