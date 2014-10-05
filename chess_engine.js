var _ = require('underscore');
// Lets start by building the classes which map
// the directed colored graph we will use to idenify
// the available moves to a player.
//
// Let the color of the paths corelate to the english
// algebraic notation for chess pieces:
// http://en.wikipedia.org/wiki/Algebraic_notation_(chess)#Figurine_algebraic_notation
//
// Mapping must start with the king.  There is an 8 by 8 in chess that
// made up of 64 random nodes.  White king maps the board, black king is
// placed in relation to white king.

BoardNode = function() {
  //null implies empty node
  this.ocupiedByPiece = null;
  this.neighbors = {
    n: null,  //north
    e: null,  //east
    s: null,  // ...
    w: null,
    ne: null,
    nw: null,
    se: null,
    sw: null
  }
};

// Set up convienet accessors for a BoardNode.
// bn = new BoardNode()
// bn.n() // => returns what ever bn.neighbors.n is storing
_.each((new BoardNode()).neighbors, function(value, key){
  BoardNode.prototype[key] = function(){
    return this.neighbors[key];
  };
});

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

  return nodes;
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

BoardPiece = function(board) {
  this.BOARD = board;
};

ChessBoardPiece = function(chess_board) {
  BoardPiece.call(this, chess_board);
};
ChessBoardPiece.prototype = Object.create(BoardPiece.prototype);
ChessBoardPiece.prototype.availableMoves = function() {
  return [];
};




// Pawns are actully kind of difficult, lets start with king.
/*
Pawn = function(chess_board) {
  ChessBoardPiece.call(this, chess_board);
};
Pawn.prototype = Object.create(ChessBoardPiece.prototype);
Pawn.prototype.availableMoves = function() {
  var cur_pos = this.BOARD.position_of(this);
  var moves = [ new ChessBoardPiecePosition(cur_pos.x, cur_pos.y + 1) ];
};
*/
