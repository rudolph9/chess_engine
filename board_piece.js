
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
};

ChessBoardPiece = function(chessBoard, ocupyingNode, team) {
  BoardPiece.call(this, chessBoard, ocupyingNode, team);
};
ChessBoardPiece.prototype = Object.create(BoardPiece.prototype);
ChessBoardPiece.prototype.activeMoves = function() {
  return [];
};

ChessBoardPiece.prototype.activeMovesBishopRookHealper = function(d, moves) {
    var self = this;
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
  var self = this;

  this.activeMoves = ko.computed(function(){
    var moves = [];
    ['n', 'e', 's', 'w'].forEach(function(d, i){
      self.activeMovesBishopRookHealper(d, moves);
    });
    return moves;
  });
};
Rook.prototype = Object.create(ChessBoardPiece.prototype);

Bishop = function(chessBoard, ocupyingNode, team) {
  BoardPiece.call(this, chessBoard, ocupyingNode, team);
  var self = this;

  this.activeMoves = ko.computed(function(){
    var moves = [];
    ['ne', 'se', 'sw', 'nw'].forEach(function(d, i){
      self.activeMovesBishopRookHealper(d, moves);
    });
    return moves;
  });
};
Bishop.prototype = Object.create(ChessBoardPiece.prototype);

Queen = function(chessBoard, ocupyingNode, team) {
  BoardPiece.call(this, chessBoard, ocupyingNode, team);
  var self = this;

  this.activeMoves = ko.computed(function(){
    var moves = [];
    self.ocupyingNode().neighborKeys.forEach(function(d, i){
      self.activeMovesBishopRookHealper(d, moves);
    });
    return moves;
  });
};
Queen.prototype = Object.create(ChessBoardPiece.prototype);

Knight = function(chessBoard, ocupyingNode, team) {
  BoardPiece.call(this, chessBoard, ocupyingNode, team);
  var self = this;

  this.activeMoves = ko.pureComputed(function(){
    var moves = [];
    ['n', 'e', 's', 'w'].forEach(function(d, i){
      var i;
      var cur_node = self.ocupyingNode();
      for(i=0; i<1; i++){
        if(cur_node) {
          cur_node = cur_node[d]();
        } else {
          return false;
        }
      }
      if(!cur_node) return false;
      [-1, 1].forEach(function(s, i){
        var n = cur_node.neighborByIndex(cur_node.neighborKeys.indexOf(d) + s);
        if(n && (!n.ocupiedByPiece() || (n.ocupiedByPiece() && n.ocupiedByPiece().TEAM != self.TEAM))) moves.push(n);
      });
    });
    return moves;
  });
};
Knight.prototype = Object.create(ChessBoardPiece.prototype);

// @param forwardDir [Sting] representing the direction
Pawn = function(chessBoard, ocupyingNode, team) {
  ChessBoardPiece.call(this, chessBoard, ocupyingNode, team);
  var self = this;

  // Node is assumed to have started on the side of his team
  // with north and south ocupying polar oposites on the board.
  this.forwardDirObsv = ko.observable(null);
  this.forwardDir = ko.pureComputed(function(){
    if (self.forwardDirObsv() !== null) return self.forwardDirObsv();
    if(self.ocupyingNode() !== null) {
      if (self.ocupyingNode().s() && self.ocupyingNode().s().s()) {
        self.forwardDirObsv('s');
      } else {
        self.forwardDirObsv('n');
      }
    }
    return self.forwardDirObsv();
  });

  this.activeMoves = ko.pureComputed(function(){
    // this is prime for refactoring to be inherted somehow among all activeMoves ko.computeds
    var moves = []; 
    if (!self.ocupyingNode() || !self.forwardDir()) return moves;
    var forward_node = self.ocupyingNode()[self.forwardDir()]()
    if (!forward_node.ocupiedByPiece()) moves.push(forward_node);
    ['e', 'w'].forEach(function(dir){
      var n = forward_node[dir]();
      if (n && n.ocupiedByPiece() && n.ocupiedByPiece().TEAM !== self.TEAM) moves.push(n);
    });
    return moves;
  });
};
Pawn.prototype = Object.create(ChessBoardPiece.prototype);
