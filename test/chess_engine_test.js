var assert = require("assert");
require("../chess_engine.js");

describe('Board', function(){
  it('should return the correct HEIGHT and WIDTH', function(){
    board = new Board();
    assert.equal(board.HEIGHT, 8);
    assert.equal(board.WIDTH, 8);
  });
});

describe('BoardPiece', function(){
  it('#label', function(){
    assert.equal((new BoardPiece('some_label')).label, 'some_label');
  });
});