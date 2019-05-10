var board1;
var t;
var game= new Chess();
//document.getElementById("btn").addEventListener("click", board1.clear);
/*function evaluateBoard(board){
var score=0;
var pos=board1.position();
for(var index in pos) {//console.log(pos[index]);
if(pos[index]==='wP') score+=10; 
else if(pos[index]==='wR') score+=50;
else if(pos[index]==='wN') score+=30;
else if(pos[index]==='wB') score+=30;
else if(pos[index]==='wQ') score+=90;
else if(pos[index]==='wK') score+=900;
else if(pos[index]==='bP') score-=10; 
else if(pos[index]==='bR') score-=50;
else if(pos[index]==='bN') score-=30;
else if(pos[index]==='bB') score-=30;
else if(pos[index]==='bQ') score-=90;
else if(pos[index]==='bK') score-=900;
}

return score;
}*/

var minimaxRoot =function(depth,player) {

    var newGameMoves = game.moves();
    var bestMove = -9999;
    var bestMoveFound;

    for(var i = 0; i < newGameMoves.length; i++) {
        var newGameMove = newGameMoves[i]
        game.move(newGameMove);
          console.log("in");
        var value = minimax(depth-1, game,-10000,10000,player);
          console.log("out");
        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
    }
    return bestMoveFound;
};

 function minimax(depth,alpha, beta,player) {
 
    if (depth === 0) {
             return -evaluateBoard(game.board());
   
    }

    var newGameMoves = game.moves();

    if (player==='white') {
        var bestMove = -9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta,'black'));
            game.undo();
            alpha = Math.min(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    } else {
        var bestMove = 9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta,'black'));
            game.undo();
            beta = Math.max(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
};
var evaluateBoard = function (board) {
    var totalEvaluation = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
        }
    }
    return totalEvaluation;
};

var reverseArray = function(array) {
    return array.slice().reverse();
};

var pawnEvalWhite =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
    [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];

var bishopEvalWhite = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingEvalWhite = [

    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

var kingEvalBlack = reverseArray(kingEvalWhite);




var getPieceValue = function (piece, x, y) {
    if (piece === null) {
        return 0;
    }
    var getAbsoluteValue = function (piece, isWhite, x ,y) {
        if (piece.type === 'p') {
            return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
        } else if (piece.type === 'r') {
            return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
        } else if (piece.type === 'n') {
            return 30 + knightEval[y][x];
        } else if (piece.type === 'b') {
            return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
        } else if (piece.type === 'q') {
            return 90 + evalQueen[y][x];
        } else if (piece.type === 'k') {
            return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
        }
        throw "Unknown piece type: " + piece.type;
    };

    var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
};


var cfg;
var onChange= function(target){
console.log(game.in_checkmate());
  updateStatus();
//console.log(board1.orientation);
//alert("hio");
//console.log("AI turn");
//console.log()
//console.log(game.turn());
//console.log("Board evaluation");
//console.log(evaluateBoard(board1));

if(game.turn()=='b' && t===0)
{
t++;
  var moves=game.moves();
console.log("Inside minimax");
var bestMove=null;
 bestMove=minimaxRoot(2,'black');
console.log("outside minimax");
console.log(bestMove);
game.move(bestMove);

//Random moves
/*var y=Math.floor(Math.random()*moves.length);  
     var move=moves[y];
  game.move(move); */
//Random moves
/*Evaluation function basic
var minScore=5000;
var bestMove=null;
console.log("Possibilites");
for(var i=0;i<moves.length;i++)
{
     var move = moves[i];
       game.move(move);
     board1.position(game.fen());
        var score=evaluateBoard(board1);
      console.log(i+" "+score+" "+move);
      console.log(board1.position());
       if(score<minScore)
       {
            minScore=score;
            bestMove=move;
      }
       game.undo();
}
game.move(bestMove);
basic evaluation function */


}



//board1.position()[target]=null;
//if(board1.orientation==='white') board1.orientation='black';
//else cfg['orientation']='white';
//board1=ChessBoard('board1',cfg);
};
var onDragStart = function(source, piece, position, orientation) {


  if (game.game_over() === true ||
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};
var onDrop = function(source, target,piece) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  if (move === null) return 'snapback';
 t=0;

//console.log("Inside minimax");
//var bestMove=minimax(3,game,'black');
//console.log("outside minimax");
//console.log(bestMove);
  //console.log(board1.position());
 //console.log(move['flags']);

 //console.log(game.turn());
//console.log(target);
//console.log(board1.position());
//var f=board1.position();
//console.log(f[target]);
/*
if(move['flags']==='k' && game.turn()=='b') {  
    board1.move('h1-f1');
console.log("yes");
}
else if(move['flags']==='k' && game.turn()=='w')
{
    board1.move('h8-f8');
console.log("yes");

}
else if(move['flags']=='q' && game.turn()=='b')
{
   board1.move('a1-d1');
}
else if(move['flags']=='q' && game.turn()=='w')
{
   board1.move('a8-d8');
}
else if(move['flags']=='e')
{
console.log(board1.position());
console.log("yipee ");
console.log(target);
console.log(piece);

 if(game.turn()=='b')
{

console.log("white has enpass");
var newtar=target[0];
console.log(parseInt(target[1],10)-1);
var ex=parseInt(target[1],10)-1;
var gj=newtar.concat(ex.toString());

console.log(gj);
//board1.position(f);
var f=board1.position();
console.log(f);
delete f[gj];
board1.position(f);

board1.orientation('flip');
}
else if(game.turn()=='w')
{
console.log("black has enpass");
var newtar=target[0];
console.log(parseInt(target[1],10)+1);
var ex=parseInt(target[1],10)+1;
var gj=newtar.concat(ex.toString());

console.log(gj);
//board1.position(f);
var f=board1.position();
console.log(f);
delete f[gj];
board1.position(f);

board1.orientation('flip');
}

}
else if(move['flags'] == 'p' || move['flags'] == 'cp')
{
if(game.turn()=='b'){
//var fg=board1.position();
//onsole.log(fg);
//fg[target]='wQ';
//console.log("promoted!!!");
//console.log(fg);

//console.log("yo");
//board1.position(fg);
//console.log(fg);
//game.put({ type: game.QUEEN, color: game.WHITE }, target);
console.log("final");
var fg=board1.position();
fg[target]='wQ';
board1.position(fg);
/*var cfg = {
  draggable: true,
  dropOffBoard: 'snapback', // this is the default
  position:'start',
   onChange:onChange,
   onDragStart:onDragStart,
  onDrop:onDrop
};
//game.put({ type: game.QUEEN, color: game.WHITE }, target);
} 
}*/

  // illegal move

};
var onSnapEnd = function() {
  board1.position(game.fen());
};
var updateStatus = function() {
  var status = '';

  var moveColor = 'White';
  if (game.turn() === 'b') {
    moveColor = 'Black';
     
  }

  // checkmate?
  if (game.in_checkmate() === true) {
    status = 'Game over, ' + moveColor + ' checkmate.';
  alert(status);
document.getElementById('oh').style.display='block';
     document.getElementById('oh').innerText=status;
  }

  // draw?
  else if (game.in_draw() === true) {
    status = 'Game over, drawn position';
alert(status);
document.getElementById('oh').style.display='block';
     document.getElementById('oh').innerText=status;
  }

  // game still on
  else {
    status = moveColor + ' to move';


    // check?
    if (game.in_check() === true) {
      status += ', ' + moveColor + ' is in check';
alert(status);

    }
  }
console.log(status);
};
document.getElementById("new").addEventListener("click", displayButton);
function newGame()
{
alert("hi");
document.getElementById('oh').style.display='none';
     document.getElementById('oh').innerText=status;
var cfg = {
  draggable: true,
  dropOffBoard: 'snapback', // this is the default
  position: 'start',
   onChange:onChange,
   onDragStart:onDragStart,
  onDrop:onDrop,
 onSnapEnd:onSnapEnd
};
  board1=ChessBoard('board1',cfg);
game=new Chess();
//var f=board1.position();
//delete f.d2;
//board1.position(f);
 $('#btn').on('click',board1.clear);
}

function displayButton()
{
var x=document.getElementsByClassName("inv")[0]
x.style.display="block";
x.innerText="Clear";
}

