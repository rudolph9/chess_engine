var expect = require("expect.js");
require("../chess_engine.js");


describe('Board', function(){
  var board = null;
  beforeEach(function(done){
    board = new Board();
    done();
  });

  it('should do something', function(){
    var board = new Board();
    //expect(board.nodes.length).not.to.equal(64);
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