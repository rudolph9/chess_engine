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
      bn.setNeighbor('n', bn1);
      expect(bn.neighborByIndex(0)).to.equal(bn1);
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