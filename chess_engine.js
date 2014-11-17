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


BoardPiece = function(board, ocupyingNode, team) {
  var self = this;
  this.TEAM = team
  this.BOARD = board;
  this.ocupyingNodeObsv = ko.observable(null);
  this.ocupyingNode = ko.computed({ // this could probably be a pureComputed but I'm holding off until I get better test coverage to verify this.
    read: function() { return self.ocupyingNodeObsv(); },
    write: function(value) {
      if (value && value.ocupiedByPiece()) throw 'node already ocupied'; //if trying to move to an occupied node
      if (value) value.ocupiedByPiece(self);
      if (self.ocupyingNode()) self.ocupyingNode().ocupiedByPiece(null); // if currently occupying a node
      self.ocupyingNodeObsv(value);
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

ChessBoardPiece = function(chessBoard, ocupyingNode, team) {
  BoardPiece.call(this, chessBoard, ocupyingNode, team);
};
ChessBoardPiece.prototype = Object.create(BoardPiece.prototype);
ChessBoardPiece.prototype.activeMoves = function() {
  return [];
};

King = function(chessBoard, ocupyingNode, team) {
  BoardPiece.call(this, chessBoard, ocupyingNode, team);
  var self = this;

  this.activeMoves = ko.computed(function(){
    // this is prime for refactoring to be inherted somehow among all activeMoves ko.computeds
    var moves = []; 
    if (!self.ocupyingNode()) return moves;

    //iterate through each neighbor and idenfy each empty not null node
    _.each(self.ocupyingNode().neighbors, function(n,dir){
      if (n && (!n.ocupiedByPiece() || (n.ocupiedByPiece().TEAM !== self.TEAM))) moves.push(n);
    });
    return moves;
  });
};
King.prototype = Object.create(ChessBoardPiece.prototype);

Rook = function(chessBoard, ocupyingNode, team) {
  BoardPiece.call(this, chessBoard, ocupyingNode, team);
  this.initialize(chessBoard, ocupyingNode, team);
};
Rook.prototype = Object.create(ChessBoardPiece.prototype);

Rook.prototype.initialize = function(chessBoard, ocupyingNode, team) {
  var self = this;

  this.activeMoves = ko.computed(function(){
    var moves = [];
    ['n', 'e', 's', 'w'].forEach(function(d, i){
      self.ocupyingNode().traverseDirection(d, function(d, node){
        if (node.ocupiedByPiece()) {
          if (node.ocupiedByPiece().TEAM === self.TEAM) {
            return false;
          } else {
            moves.push(node);
            return false;
          }
        } else {
          moves.push(node);
          return true;
        }
      });
    });
    return moves;
  });
};

//Rook.prototype.include = /*something only keeps the current node and the direction in memory.

/*
// @param forwardDir [Sting] representing the direction
Pawn = function(chessBoard, ocupyingNode, forwardDir) {
  ChessBoardPiece.call(this, chessBoard, ocupyingNode);
  this.forwardDir = forwardDir;

  this.activeMoves = ko.pureComputed(function(){
    // this is prime for refactoring to be inherted somehow among all activeMoves ko.computeds
    var moves = []; 
    if (!self.ocupyingNode()) return moves;

    this.currently

    return moves;
  });
};
Pawn.prototype = Object.create(ChessBoardPiece.prototype);

Pawn.prototype.
*/
