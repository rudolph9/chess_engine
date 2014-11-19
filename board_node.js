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
// NOTE: this could use some refactoring to use neighborKeys and avoid creating a new BoardNode() object
_.each((new BoardNode()).neighbors, function(value, key){
  BoardNode.prototype[key] = function(){
    return this.neighbors[key];
  };
});


BoardNode.prototype.neighborByIndex = function(i) {
  if (i > this.neighborKeys.length - 1 || i < -this.neighborKeys.length) throw 'index out of bounds must be less than ' + this.neighborKeys.length;
  if (i < 0) i = this.neighborKeys.length + i;
  return this[this.neighborKeys[i]]();
};

//continues traversing of callback returns true,
//stops if callback return false or there are no more nodes
BoardNode.prototype.traverseDirection = function(d, callback) {
  if(this[d]()){
    // I feel like you shouldn't need to pass `this` into the callback,
    // I would think `this` outside the context of the callback would be
    // equal to `this` inside the context of the callback?
    if (callback(d, this[d]())) this[d]().traverseDirection(d, callback);
  }
};

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

