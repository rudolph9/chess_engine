var assert = require("should");
require("../chess_engine.js");


describe('Board', function(){
  it('', function(){
    board = new Board();
  });
});

describe('BoardNode', function(){
  it('should contain stuff', function(){
    board_node = new BoardNode();
    (typeof board_node.neighbors).should.not.equal('undefined');
    (typeof board_node.ocupiedByPiece).should.not.equal('undefined');
  });
});

describe('BoardPiece', function(){
  it('#label', function(){
  });
});