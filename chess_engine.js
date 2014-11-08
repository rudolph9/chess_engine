_ = require('underscore');
ko = require('knockout');

require('./board_node');
require('./board');

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


BoardPiece = function(board) {
  this.BOARD = board;
  this.ocupyingNode = ko.observable(null);

  // active:
  //   1.  Describes a piece that controls a number of squares, or a piece that has a number of squares available for its next move.
  //   2.  An "active defense" is a defense employing threat(s) or counterattack(s).
  //this.active_moves = ko.computable(function(){
  //  var self = this;
  //  return _.tap({}, function(neighbors){
  //    _.each(this.ocupyingNode().try('neighbors'), function(v,k){
  //      neighbors[
  //    }
  //});
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
