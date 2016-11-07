define("GraphViewModel", ['Scripts/knockout-3.4.0', 'GraphLayoutController'], function (ko, glc) {
    var GraphViewModel = function (nodes, links) {
        this.nodeArray = ko.observableArray(nodes);
        this.linkArray = ko.observableArray(links);

        this.glc = new glc()
            .setNodes(this.nodeArray())
            .setLinks(this.linkArray());

        this.nodeArray.subscribe(function (changes) {
            this.glc.setNodes(this.nodeArray());
        }, this, "arrayChange");

        this.linkArray.subscribe(function (changes) {
            this.glc.setLinks(this.linkArray());
        }, this, "arrayChange");

        this.startSimulation = function () {
            this.glc.startSimulation();
        };
    };

    return GraphViewModel;
});