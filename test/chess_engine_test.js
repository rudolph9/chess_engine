var expect = require("expect.js");
require("../chess_engine.js");


describe('Board', function(){
  var board = null;
  beforeEach(function(done){
    board = new Board();
    done();
  });
  describe('#connectEachRowToEachSubsiquentRow', function(){
    it('should work for 4 nodes', function(){
      var n_a0 = new BoardNode();
      var n_a1 = new BoardNode();
      var n_b0 = new BoardNode();
      var n_b1 = new BoardNode();
      var nodes = [[n_a0, n_a1], [n_b0, n_b1]];
      board.connectEachRowToEachSubsiquentRow(nodes);
      expect(n_a0.n()).to.equal(null);
      expect(n_a0.s()).to.equal(n_b0);
      expect(n_b1.n()).to.equal(n_a1);
      expect(n_b1.s()).to.equal(null);
    });
  });
  describe('#connectEachColumnToEachSubsiquentColoumn', function(){
    it('should work for 4 nodes', function(){
      var n_a0 = new BoardNode();
      var n_a1 = new BoardNode();
      var n_b0 = new BoardNode();
      var n_b1 = new BoardNode();
      var nodes = [[n_a0, n_a1], [n_b0, n_b1]];
      board.connectEachColumnToEachSubsiquentColoumn(nodes);
      expect(n_a0.w()).to.equal(null);
      expect(n_a0.e()).to.equal(n_a1);
      expect(n_b1.w()).to.equal(n_b0);
      expect(n_b1.e()).to.equal(null);
    });
  });
  describe('#connectEachDiaginalToEachSubsiquentDiagnal', function(){
    it('should work for 4 nodes', function(){
      var n_a0 = new BoardNode();
      var n_a1 = new BoardNode();
      var n_b0 = new BoardNode();
      var n_b1 = new BoardNode();
      var nodes = [[n_a0, n_a1], [n_b0, n_b1]];
      board.connectEachDiaginalToEachSubsiquentDiagnal(nodes, 'se');
      expect(n_a0.sw()).to.equal(null);
      expect(n_a0.nw()).to.equal(null);
      expect(n_a0.se()).to.equal(n_b1);
      expect(n_a1.se()).to.equal(null);
    });
    it('should work for 9 nodes', function(){
      var n_a0 = new BoardNode();
      var n_a1 = new BoardNode();
      var n_a2 = new BoardNode();
      var n_b0 = new BoardNode();
      var n_b1 = new BoardNode();
      var n_b2 = new BoardNode();
      var n_c0 = new BoardNode();
      var n_c1 = new BoardNode();
      var n_c2 = new BoardNode();
      var nodes = [[n_a0, n_a1, n_a2], [n_b0, n_b1, n_b2], [n_c0, n_c1, n_c2]];
      board.connectEachDiaginalToEachSubsiquentDiagnal(nodes, 'se');
      expect(n_a0.sw()).to.equal(null);
      expect(n_a0.nw()).to.equal(null);
      expect(n_a0.se()).to.equal(n_b1);
      expect(n_a1.se()).to.equal(n_b2);
      expect(n_b1.se()).to.equal(n_c2);
      expect(n_b1.nw()).to.equal(n_a0);
    });
  });

  describe('#buildBoardNodes', function(){
    it('should attach', function(){
      board.buildBoardNodes();
      expect(board.nodes[0][0].s()).to.equal(board.nodes[1][0]);

      expect(board.nodes[3][3].n()).to.equal(board.nodes[2][3]);
      expect(board.nodes[3][3].e()).to.equal(board.nodes[3][4]);
      expect(board.nodes[3][3].s()).to.equal(board.nodes[4][3]);
      expect(board.nodes[3][3].w()).to.equal(board.nodes[3][2]);
      expect(board.nodes[3][3].ne()).to.equal(board.nodes[2][4]);
      expect(board.nodes[3][3].nw()).to.equal(board.nodes[2][2]);
      expect(board.nodes[3][3].se()).to.equal(board.nodes[4][4]);
      expect(board.nodes[3][3].sw()).to.equal(board.nodes[4][2]);
    });
  });

  describe('#getNNodes', function(){
    it('should return an array of 8 nodes', function(){
      var nodes = board.getNNodes(8);
      expect(nodes.length).to.equal(8);
      nodes.forEach(function(node, i) {
        expect(node.constructor).to.equal(BoardNode);
      });
    });
  });
  describe('#transpose', function(){
    it('should transpose 2x2 board (i.e. the matrix passed in argument)', function(){
      var nodes = [['n_a0', 'n_a1'], ['n_b0', 'n_b1']];
      board.transpose(nodes, function(nodes_0){
        expect(nodes_0).to.eql([['n_a0', 'n_b0'], ['n_a1', 'n_b1']]);
      });
    });
    it('should transpose 3x3 board (i.e. the matrix passed in argument)', function(){
      var nodes = [['n_a0', 'n_a1', 'n_a2'], ['n_b0', 'n_b1', 'n_b2'], ['n_c0', 'n_c1', 'n_c2']];
      board.transpose(nodes, function(nodes_0){
        expect(nodes_0).to.eql([['n_a0', 'n_b0', 'n_c0'], ['n_a1', 'n_b1', 'n_c1'], ['n_a2', 'n_b2', 'n_c2']]);
      });
    });
  });
});

describe('BoardNode', function(){
  it('should contain stuff', function(){
    var board_node = new BoardNode();
    expect(typeof board_node.neighbors).not.to.equal('undefined');
    expect(typeof board_node.ocupiedByPiece).not.to.equal('undefined');
  });
  describe('#traversDirection', function(){
    it('shold execute the callback on every node in a given direction', function(){
      board = new Board();
      board.buildBoardNodes();
      var nodes = [];
      var callback = null;
      callback = function(d, node){
        nodes.push(node);
        return true;
      };
      var start_node = board.nodes[0][0];
      start_node.traverseDirection('s', callback);
      nodes.forEach(function(i, v){
        expect(v).to.not.equal(start_node);
      });
      expect(nodes.length).to.equal(7);
    });
  });

  describe('#setNeighbor', function(){
    it('should attach two board nodes', function(){
      var node0 = new BoardNode();
      var node1 = new BoardNode();
      node0.setNeighbor('n', node1);
      expect(node0.neighbors.n).to.equal(node1);
      expect(node1.neighbors.s).to.equal(node0);
    });
  })
  describe('#neighborByIndex', function(){
    it('should return the neighbor by index', function(){
      var bn = new BoardNode();
      var bn1 = new BoardNode();
      var bn2 = new BoardNode();
      bn.setNeighbor('n', bn1);
      bn.setNeighbor('nw', bn2);
      expect(bn.neighborByIndex(0)).to.equal(bn1);
      expect(bn.neighborByIndex(-1)).to.equal(bn2);
    });
  });
});

describe('BoardPiece', function(){
  var board = null;
  beforeEach(function(done){
    board = new Board();
    board.buildBoardNodes();
    done();
  });

  it('#label', function(){
  });
  describe('King', function(){
    it('should return all neigbors as availbe moves when no neighbors are occupied or null', function() {
      king = new King(board, board.nodes[1][1]);
      var i = 0;
      _.each(king.activeMoves(), function() { i++; });
      expect(i).to.equal(8);
    });
    it('should return only neighbors not null', function() {
      var i;
      var king = new King(board, null);
      king.ocupyingNode(board.nodes[0][1]);
      i=0; _.each(king.activeMoves(), function() { i++; }); expect(i).to.equal(5);
      king.ocupyingNode(board.nodes[0][0]);
      i=0; _.each(king.activeMoves(), function() { i++; }); expect(i).to.equal(3);
    });
    it('should return an empty arry when not occupying a node', function() {
      var king = new King(board, null);
      expect(king.activeMoves().length).to.equal(0);
    });
    it('should return array containing only opossing team node', function() {
      var king = new King(board, board.nodes[0][0], 'TeamA');
      var k1 = new King(board, board.nodes[0][1], 'TeamA');
      var k2 = new King(board, board.nodes[1][0], 'TeamA');
      var kingTeamB = new King(board, board.nodes[1][1], 'TeamB');
      expect(king.activeMoves().length).to.equal(1);
      expect(king.activeMoves()[0].ocupiedByPiece()).to.equal(kingTeamB);
    });
  });
  describe('Rook', function(){
    it('should initialize', function(){
      var rook = new Rook(board, board.nodes[0][1], null);
    });
    it('should include a horizontal node', function(){
      var rook = new Rook(board, board.nodes[0][1], 'TeamA');
      expect(rook.activeMoves().indexOf(board.nodes[0][4]) >= 0).to.equal(true);
    });
    it('should include not include a node ocupied by a team mate', function(){
      var rook = new Rook(board, board.nodes[0][1], 'TeamA');
      var king = new King(board, board.nodes[0][2], 'TeamA');
      expect(rook.activeMoves().indexOf(board.nodes[0][4])).to.equal(-1);
      expect(rook.activeMoves().indexOf(board.nodes[0][2])).to.equal(-1);
    });
  });
  describe('Bishop', function(){
    it('should initialize', function(){
      var bishop = new Bishop(board, board.nodes[0][1], null);
    });
    it('should include a diagnal node', function(){
      var bishop = new Bishop(board, board.nodes[0][0], 'TeamA');
      expect(bishop.activeMoves().indexOf(board.nodes[7][7]) >= 0).to.equal(true);
    });
  });
  describe('Queen', function(){
    it('should initialize', function(){
      var queen = new Queen(board, board.nodes[0][1], null);
    });
    it('should include a horizontal and a diagnal node', function(){
      var queen = new Queen(board, board.nodes[0][0], 'TeamA');
      expect(queen.activeMoves().indexOf(board.nodes[7][7]) >= 0).to.equal(true);
      expect(queen.activeMoves().indexOf(board.nodes[0][7]) >= 0).to.equal(true);
    });
  });
  describe('Knight', function(){
    it('should initialize', function(){
      var knight = new Knight(board, board.nodes[0][1], null);
    });
    it('should include available moves', function(){
      var knight = new Knight(board, board.nodes[0][1], 'TeamA');
      expect(knight.activeMoves()).to.contain(board.nodes[2][0]);
      expect(knight.activeMoves()).to.contain(board.nodes[2][2])
      expect(knight.activeMoves()).to.contain(board.nodes[1][3])
    });
  });
  describe('Pawn', function(){
    it('should initialize', function(){
      var pawn = new Pawn(board, board.nodes[1][1], null);
    });
    describe('#forwardDir', function(){
      it('should set the forwardDir correctly', function(){
        var pawn = new Pawn(board, board.nodes[1][1], null);
        expect(pawn.forwardDir()).to.equal('s');
      });
    });
    it('should include available moves', function(){
      var pawn = new Pawn(board, board.nodes[1][1], null);
      expect(pawn.activeMoves()).to.contain(board.nodes[2][1]);
    });
    it('should include available moves', function(){
      var pawn = new Pawn(board, board.nodes[1][1], null);
      var pawn1 = new Pawn(board, board.nodes[2][1], null);
      expect(pawn.activeMoves()).to.not.contain(board.nodes[2][1]);
    });
    it('should include available moves', function(){
      var pawn = new Pawn(board, board.nodes[1][1], 'teamA');
      var pawn1 = new Pawn(board, board.nodes[2][2], 'teamB');
      expect(pawn.activeMoves()).to.contain(board.nodes[2][1]);
      expect(pawn.activeMoves()).to.contain(board.nodes[2][2]);
    });
  });
});


describe('KO', function(){
  var ko = require('knockout');
  it('should be able to store computable return in a computable array', function(){
    var MyComputable = function() {
      var self = this;
      this.a = ko.observable(null);
      this.b = ko.computed(function(){
        if(self.a() === null) return null;
        return self.a() + 'something';
      });
    };

    mc = new MyComputable();
    expect(mc.a()).to.equal(null);
    expect(mc.b()).to.equal(null);

    mc.a('hello ')
    expect(mc.b()).to.eql('hello something');
  });
});