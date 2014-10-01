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


  describe('#buildBoardNodes', function(){
    it('should attach', function(){
      //yup
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

  describe('#addtachNodes', function(){
    it('should attach two board nodes', function(){
      var node0 = new BoardNode();
      var node1 = new BoardNode();
      node0.setNeighbor('n', node1);
      expect(node0.neighbors.n).to.equal(node1);
      expect(node1.neighbors.s).to.equal(node0);
    });
  })
});

describe('BoardPiece', function(){
  it('#label', function(){
  });
});