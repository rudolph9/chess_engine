BoardNode = function() {
  var self = this;
  //null implies empty node
  this.ocupiedByPiece = ko.observable(null);
  this.neighbors = {};
  this.neighborKeys.forEach(function(dir) {self.neighbors[dir] = null;});
};

BoardNode.prototype.neighborKeys = [
  'n', // north
  'ne', //north east
  'e',  // ...
  'se',
  's',
  'sw',
  'w',
  'nw'];

// Set up convienet accessors for a BoardNode.
// bn = new BoardNode()
// bn.n() // => returns what ever bn.neighbors.n is storing
_.each((new BoardNode()).neighbors, function(value, key){
  BoardNode.prototype[key] = function(){
    return this.neighbors[key];
  };
});

//BoardNode.prototype.neighborsAry = _.map(_.keys(self.neighbors), function(dir) { return (function() {return self.neighbors[dir];}); });

BoardNode.prototype.opositeNeighborDirection = {
  n: 's',
  e: 'w',
  s: 'n',
  w: 'e',
  ne: 'sw',
  nw: 'se',
  se: 'nw',
  sw: 'ne'
};

BoardNode.prototype.setNeighbor = function(direction, node) {
  // maybe add something to verify the direction is valid?
  if (!node) return false;

  this.neighbors[direction] = node;
  node.neighbors[this.opositeNeighborDirection[direction]] = this;
};

