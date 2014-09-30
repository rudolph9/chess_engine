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
  for(i = 0; i < this.HEIGHT; i++){
    nodes.push(this.getNNodes(this.WIDTH));
  }

  this.connectEachRowToEachSubsiquentRow(nodes);

  return nodes;
};

Board.prototype.connectEachRowToEachSubsiquentRow = function(nodes) {
  nodes.reduce(function(prev_row, cur_row) {
    prev_row.forEach(function(node, i) {
      node.setNeighbor('s', cur_row[i]);
    });
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
