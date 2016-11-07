define("GraphLayoutController", ["Scripts/d3/d3.js"], function (d3) {
    function onTick() {
        this.layout.nodes().forEach(function (n) {
            n.xPos(n.x);
            n.yPos(n.y);
        });

        this.layout.force("link").links().forEach(function (l) {
            l.x1(l.source.x);
            l.y1(l.source.y);
            l.x2(l.target.x);
            l.y2(l.target.y);
        });
    }

    return function () {
        this.layout = d3.forceSimulation()
            .stop()
            .force("charge", d3.forceCollide(50))
            .force("link", d3.forceLink().id(function (d) {
                return d.id;
            }).distance(100))
            .force("center", d3.forceCenter(600, 350))
            .force("x", d3.forceX().strength(0.2))
            .force("y", d3.forceY().strength(0.2))
            .on("tick", onTick.bind(this));
        
        this.setNodes = function (nodes) {
            this.layout.nodes(nodes);
            nodes[nodes.length - 1].x = 400;
            nodes[nodes.length - 1].y = 250;
            this.startSimulation();
            return this;
        };

        this.setLinks = function (links) {
            this.layout.force("link").links(links);
            this.startSimulation();
            return this;
        };

        this.startSimulation = function () {
            this.layout.alpha(1).restart();
        };
    };
});