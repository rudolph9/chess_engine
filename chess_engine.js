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


BoardPiece = function(board, ocupyingNode) {
  var self = this;
  this.BOARD = board;
  this.ocupyingNodeObsv = ko.observable(null);
  this.ocupyingNode = ko.computed({ // this could probably be a pureComputed but I'm holding off until I get better test coverage to verify this.
    read: function() { return self.ocupyingNodeObsv(); },
    write: function(value) {
      if (value && value.ocupiedByPiece()) throw 'node already ocupied'; //if trying to move to an occupied node
      if (value) value.ocupiedByPiece(self);
      self.ocupyingNodeObsv(value);
      if (self.ocupyingNode()) self.ocupyingNode().ocupiedByPiece(null); // if currently occupying a node
    }
  });
  this.ocupyingNode(ocupyingNode);
 

  // active:
  //   1.  Describes a piece that controls a number of squares, or a piece that has a number of squares available for its next move.
  //   2.  An "active defense" is a defense employing threat(s) or counterattack(s).
  //this.activeMoves = ko.computable(function(){
  //  var self = this;
  //  return _.tap({}, function(neighbors){
  //    _.each(this.ocupyingNode().try('neighbors'), function(v,k){
  //      neighbors[
  //    }
  //});
};

ChessBoardPiece = function(chessBoard, ocupyingNode) {
  BoardPiece.call(this, chessBoard, ocupyingNode);
};
ChessBoardPiece.prototype = Object.create(BoardPiece.prototype);
ChessBoardPiece.prototype.activeMoves = function() {
  return [];
};

King = function(chessBoard, ocupyingNode) {
  BoardPiece.call(this, chessBoard, ocupyingNode);
  var self = this;

  this.activeMoves = ko.pureComputed(function(){
    //iterate through each neighbor and idenfy each empty not null node
    var moves = [];
    _.each(self.ocupyingNode().neighbors, function(n,dir){
      if(n && !n.ocupiedByPiece()) moves.push(n);
    });
    return moves;
  });
};
King.prototype = Object.create(ChessBoardPiece.prototype);

/*
// @param forwardDir [Sting] representing the direction
Pawn = function(chessBoard, ocupyingNode, forwardDir) {
  ChessBoardPiece.call(this, chessBoard, ocupyingNode);
  this.forwardDir = forwardDir;

  this.activeMoves = ko.pureComputed(function(){
    //iterate through each neighbor and idenfy each empty not null node
    var moves = [];
    _.each(self.ocupyingNode().neighbors, function(n,dir){
      if(n && !n.ocupiedByPiece()) moves.push(n);
    });
    return moves;
  });
};
Pawn.prototype = Object.create(ChessBoardPiece.prototype);
Pawn.prototype.availableMoves = function() {
  var cur_pos = this.BOARD.position_of(this);
  var moves = [ new ChessBoardPiecePosition(cur_pos.x, cur_pos.y + 1) ];
};
*/
