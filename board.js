Board = function() {
  this.nodes = null;
};
Board.prototype.HEIGHT = 8;
Board.prototype.WIDTH  = 8;

Board.prototype.buildBoardNodes = function() {
  this.nodes = []; // an array of arrys
  var nodes = this.nodes;
  var i;
  for(/*var prob needed but working on something else right night and need to check later*/ i = 0; i < this.HEIGHT; i++){
    nodes.push(this.getNNodes(this.WIDTH));
  }

  this.connectEachRowToEachSubsiquentRow(nodes);
  this.connectEachColumnToEachSubsiquentColoumn(nodes);
  this.connectEachDiaginalToEachSubsiquentDiagnal(nodes, 'se');
  this.connectEachDiaginalToEachSubsiquentDiagnal(nodes.reverse(), 'ne'); nodes.reverse();
  this.labelNodes();

  return nodes;
};

Board.prototype.labelNodes = function(){
  function countNeighbors(node) {
    var i = 0;
    _.each(node.neighbors, function(n, dir){
      if(n) i++;
    });
    return i;
  };

  this.nodes.forEach(function(row, x) {
    row.forEach(function(n, y) {
      n.x = x;
      n.y = y;
    });
  });
};


// @param matrix [Array] an array of 
// NOTE: only works for 2d matricies, consider
// making the function recursive to make it condusive
// to any dementional matrix.
// @ param callback [function] a function to be called with the
// transposed matrix.
Board.prototype.transpose = function(matrix, callback) {
  _.tap([], function(matrix_0){
    _.each(matrix, function(row, i){
      matrix_0[i] = [];
      _.each(row, function(cell, j){
        matrix_0[i][j] = matrix[j][i];
      });
    });
    callback(matrix_0);
  });
};
Board.prototype.connectEachColumnToEachSubsiquentColoumn = function(nodes) {
  var self = this;
  this.transpose(nodes, function(nodes_0) {
    self.connectEachHelper(nodes_0, 'e');
  });
};


Board.prototype.connectEachRowToEachSubsiquentRow = function(nodes) {
  this.connectEachHelper(nodes, 's');
};

Board.prototype.connectEachDiaginalToEachSubsiquentDiagnal = function(nodes, neighbor_direction) {
  nodes.forEach(function(row, i) {
    row.forEach(function(node, j) {
      node.setNeighbor(neighbor_direction, ((nodes[i + 1]||[])[j + 1] || null));
    });
  });
}

Board.prototype.connectEachHelper = function(nodes, neighbor_direction) {
  nodes.reduce(function(prev_row, cur_row) {
    prev_row.forEach(function(node, i) {
      node.setNeighbor(neighbor_direction, cur_row[i]);
    });
    return cur_row;
  });
};

Board.prototype.getNNodes = function(num_nodes) {
  var nodes = [];
  for(i = 0; i < num_nodes; i++){
    nodes.push(new BoardNode());
  }
  return nodes;
};
