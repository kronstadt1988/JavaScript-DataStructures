/*
I have been trying to find a Graph implementation without bugs in JavaScript and I wasn't able to do it.

This implementation works for undirected Graphs.

Shortest Path function returns two arrays.

Example:

var g = new Graph(10);

g.addEdge(1,3);
g.addEdge(1,5);
g.addEdge(1,8);

var shortestPath = g.shortestPath(5);

Will return an array with the distances of all numbers ( if not, null) and another array with its predecessors.

*/

function Graph(v){
    this.vertices = v;
    this.edges = 0;
    this.redirectedEdges = 0;
    this.adj = [];
    this.edgeTo = [];
    this.marked = [];
    for (var i = 0; i < this.vertices; ++i) {
        this.marked[i] = false;
        this.adj[i] = [];
        this.edgeTo[i] = [];
    }
    
    this.addEdge = function(v, w){
        if(this.adj[v] === undefined || this.adj[w] === undefined ){
            throw "Couldn't insert because no such node exists."
        }
        this.adj[v].push(w);
        this.adj[w].push(v);
        this.edges++;
    }

    this.removeEdge = function(v, w){
        if(this.adj[v].indexOf(w)>=0 && this.adj[w].indexOf(v)>=0){
            var indexV = this.adj[v].indexOf(w);
            var indexW = this.adj[w].indexOf(v);

            this.adj[v].splice(indexV,1);
            this.adj[w].splice(indexW,1);

            this.edges--;
        }else{
            return false;
        }
    }

    this.dfs =  function (v) {
        var self = this;
        this.marked[v] = true;
        if (this.adj[v] != undefined) {
            console.log("Visited vertex: " + v);
        }
        this.adj[v].forEach(function(item){
            if (!self.marked[item]) {
                self.dfs(item);
            }
        })
    }

    this.bfs = function(s){
        var self = this;
        var queue = [];
        this.marked[s] = true;
        queue.push(s); 
        while (queue.length > 0) {
            var v = queue.shift(); 
            if (v !== undefined) {
                console.log("Visited vertex: " + v);
            }

            this.adj[v].forEach(function(w){
                if (!self.marked[w]) {
                    self.marked[w] = true;
                    console.log("Pushing W")

                    queue.push(w);
                    console.log(queue)
                }

            })
        }

    }
    this.shortestPath = function (v) {
        var distance = [];
        var pred = [];

        for(var i = 0 ; i<this.vertices ; i++){
            distance[i]=null;
            pred[i] = 0;
        }

        var self = this;
        var queue = [];
        this.marked[v] = true;
        queue.push(v); // add to back of queue
        while (queue.length > 0) {
            var v = queue.shift(); // remove from front of queue
            if (v !== undefined) {
                console.log("Visited vertex: " + v);
            }

            this.adj[v].forEach(function(w){
                if (!self.marked[w]) {
                    self.marked[w] = true;
                    distance[w]=distance[v]+1
                    pred[w] = v
                    queue.push(w);
                    console.log(queue)
                }

            })
        }

        return{
            distance : distance,
            pred : pred
        }   
    }    
}



