define("NodeGenerator", ["Scripts/knockout-3.4.0"], function (ko) {
    function createNode(id) {
        return {
            "id": id,
            "radius": ko.observable(Math.floor(Math.random() * (40 - 10 + 1)) + 10),
            "xPos": ko.observable(),
            "yPos": ko.observable()
        }
    }

    function createLink(source, target) {
        return {
            "source": source,
            "target": target,
            "x1": ko.observable(),
            "y1": ko.observable(),
            "x2": ko.observable(),
            "y2": ko.observable()
        }
    }

    function setupNodes(numNodes) {
        var nodes = [];
        for (var i = 0; i < numNodes; i++) {
            nodes[i] = createNode(i);
        }

        var links = [];
        for (var i = 1; i < nodes.length; i++) {
            links[i - 1] = createLink(0, i);
        }

        return {
            "nodes": nodes,
            "links": links
        }
    }

    return function (numNodes) {
        this.initialNodes = setupNodes(numNodes);
        this.initialNodes.nodes[0].fx = 600;
        this.initialNodes.nodes[0].fy = 350;
        this.numNodesCreated = this.initialNodes.nodes.length;

        this.getNewNode = function () {
            var node = createNode(this.numNodesCreated);
            this.numNodesCreated++;

            var linkSourceId = Math.floor(Math.random() * (this.numNodesCreated - 1));
            var link = createLink(linkSourceId, node.id);

            return {
                "node": node,
                "link": link
            };
        };
    };
});