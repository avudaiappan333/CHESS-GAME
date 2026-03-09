const movesound=new Audio("move.mp3");
var piece = [
  ["WR1", "WH1", "WB1", "WQ", "WK", "WB2", "WH2", "WR2"],
  ["WP1", "WP2", "WP3", "WP4", "WP5", "WP6", "WP7", "WP8"],
  ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
  ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
  ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
  ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
  ["BP1", "BP2", "BP3", "BP4", "BP5", "BP6", "BP7", "BP8"],
  ["BR1", "BH1", "BB1", "BQ", "BK", "BB2", "BH2", "BR2"],
];

var position = null;
var movedpiece = null;

//PIECE clkdRow AND clkdColumn
var coinRow = null;
var coinColumn = null;

var playerTurn = "W";

//1.WHITE KING
var WkingColumn = null;
var WkingRow = null;

//2.BLACK KING
var BkingRow = null;
var BkingColumn = null;

var getData = document.querySelectorAll(".box");
getData.forEach(function (add) {
  add.addEventListener("click", function () {
    var clkdRow = Number(this.dataset.row);
    var clkdColumn = Number(this.dataset.column);
    if (
      piece[clkdRow][clkdColumn] != "EMPTY" &&
      piece[clkdRow][clkdColumn].charAt(0) == playerTurn
    ) {
      if (position != null) {
        position.classList.remove("selected");
      }
      this.classList.add("selected");
      movedpiece = piece[clkdRow][clkdColumn];
      coinRow = clkdRow;
      coinColumn = clkdColumn;
      position = this;
      return;
    }
    // else if(movedpiece!=null){
    else if (movedpiece != null) {
      if (
        piece[clkdRow][clkdColumn] != "EMPTY" &&
        piece[clkdRow][clkdColumn].charAt(0) == movedpiece.charAt(0)
      ) {
        console.log("its your piece");
        return;
      }
      //   //0.HORSE
      //     if(movedpiece.charAt(1)=="R")
      //        rook(clkdRow, clkdColumn);
      //1.HORSE
      if (movedpiece.charAt(1) == "H") horse(clkdRow, clkdColumn, piece);
      //ROOK
      else if (movedpiece.charAt(1) == "R") rook(clkdRow, clkdColumn);
      else if (movedpiece.startsWith("WP")) wpawn(clkdRow, clkdColumn, piece);
      else if (movedpiece.startsWith("BP")) bpawn(clkdRow, clkdColumn, piece);
      // //2.BISHOP
      else if (movedpiece.charAt(1) == "B") bishop(clkdRow, clkdColumn, piece);
      //3.QUEEN
      else if (movedpiece.charAt(1) == "Q") queen(clkdRow, clkdColumn);
      //4.KING
      else if (movedpiece.charAt(1) == "K") king(clkdRow, clkdColumn, piece);
    }
    //5.WPAWN
    //4.BPAWN
    // elseif(movedpiece.charAt(1)=="P")
    //    bpawn(clkdRow, clkdColumn);

    result(clkdRow, clkdColumn);
    // console.log(piece);
  });
});

function resultchange(rowno, columnNo, value1) {
  if (value1) {
    if (piece[rowno][columnNo] == "WK") {
      console.log("Black wins");
    } else if (piece[rowno][columnNo] == "BK") {
      console.log("White wins");
    }
    piece[rowno][columnNo] = movedpiece;
    piece[coinRow][coinColumn] = "EMPTY";

    var now = document.querySelector(
      `[data-row="${rowno}"][data-column="${columnNo}"]`,
    );
    var move = document.querySelector(
      `[data-row="${coinRow}"][data-column="${coinColumn}"]`,
    );
    let del = now.querySelector("img");
    if (del) now.removeChild(del);
    let img = move.querySelector("img");
    if (img) now.appendChild(img);
    movesound.currentTime=0;
    movesound.play();
    playerTurn = playerTurn == "W" ? "B" : "W";
    // orginal(position);

    for (let i = 0; i < piece.length; i++) {
      for (let j = 0; j < piece.length; j++) {
        if (piece[i][j].startsWith("WK")) {
          WkingRow = i;
          WkingColumn = j;
          // break outer;
        } else if (piece[i][j].startsWith("BK")) {
          BkingRow = i;
          BkingColumn = j;
          // break outer;
        }
      }
    }
    // console.log("Black King:",BkingRow," ",BkingColumn);
    // console.log("White King:",WkingRow," ",WkingColumn);

    //     let bd=document.getElementById("brd");
    //     if(playerTurn=="W"){
    //         bd.classList.add("rotate");
    //     }
    //     else if(playerTurn=="B"){
    //        bd.classList.remove("rotate");
    //     }
    //   }

    //  else{
    //      console.log("try again ");
    //      return;
    //      }

    // }}
    // else if(piece[i]=="BK"){
    //     console.log("WHITE WINS");
    // break;}

    // check(rowno,columnNo)
  }
}
//rook
// function check(row1,column1){

// }

function rook(getRow, getColumn) {
  let sendRow = getRow;
  let sendColumn = getColumn;
  let value = false;

  let directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];
  // let chances = [
  //   [coinRow, coinColumn + 1],
  //   [coinRow, coinColumn + 2],
  //   [coinRow, coinColumn + 3],
  //   [coinRow, coinColumn + 4],
  //   [coinRow, coinColumn + 5],
  //   [coinRow, coinColumn + 6],

  //   [coinRow + 1, coinColumn],
  //   [coinRow + 2, coinColumn],
  //   [coinRow + 3, coinColumn],
  //   [coinRow + 4, coinColumn],
  //   [coinRow + 5, coinColumn],
  //   [coinRow + 6, coinColumn],

  //   [coinRow, coinColumn - 1],
  //   [coinRow, coinColumn - 2],
  //   [coinRow, coinColumn - 3],
  //   [coinRow, coinColumn - 4],
  //   [coinRow, coinColumn - 5],
  //   [coinRow, coinColumn - 6],

  //   [coinRow - 1, coinColumn],
  //   [coinRow - 2, coinColumn],
  //   [coinRow - 3, coinColumn],
  //   [coinRow - 4, coinColumn],
  //   [coinRow - 5, coinColumn],
  //   [coinRow - 6, coinColumn],
  // ];
  for (let i = 0; i < directions.length; i++) {
    let rRow = coinRow;
    let rCol = coinColumn;
    // console.log(chances);]
    while (true) {
      rRow = rRow + directions[i][0];
      rCol = rCol + directions[i][1];
      if (rRow < 0 || rRow > 7 || rCol < 0 || rCol > 7) break;
      // for (let rk = 0; rk < chances.length; rk++) {
      //   // for(let j=0;j<chances.length;j++){
      //   if (playerTurn == "W") {
      //     if (rRow == BkingRow && rCol == BkingColumn)
      //       alert("check");
      //   }
      //   if (playerTurn == "B") {
      //     if (rRow == WkingRow && rCol== WkingColumn)
      //       alert("check");
      //   }
      // }

      if (rRow == BkingRow && rCol == BkingColumn) alert("white wins");
      if (rRow == WkingRow && rCol == WkingColumn) alert("Black wins");

      if (rRow == sendRow && rCol == sendColumn) {
        value = true;
        break;
      }
      if (piece[rRow][rCol] != "EMPTY") break;
    }
    if (value) break;
  }
  resultchange(sendRow, sendColumn, value);
  checkalert(sendRow, sendColumn);
  orginal(position);
}
function checkalert(rowvalue, columnvalue) {
  let directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
    // [-2, -1],[-1, -2],[-2, 1],[-1, 2],
    // [1, -2],[2, -1],[1, 2],[2, 1],[1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
  ];
  console.log("running");
  let coinname = piece[rowvalue][columnvalue];
  let kingRow = coinname.charAt(0) == "W" ? BkingRow : WkingRow;
  let kingCol = coinname.charAt(0) == "W" ? BkingColumn : WkingColumn;
  for (let i = 0; i < directions.length; i++) {
    let row = rowvalue;
    let column = columnvalue;
    while (true) {
      row += directions[i][0];
      column += directions[i][1];
      console.log(row, column);

      if (row < 0 || row > 7 || column < 0 || column > 7) break;
      if (row == kingRow && column == kingCol) {
        alert("check");
        return;
      }

      if (piece[row][column] != "EMPTY") break;
    }
  }
}
//horse;
function horse(getRow, getColumn) {
  let sendRow = getRow;
  let sendColumn = getColumn;
  // value = false;

  // let directions = [
  //   [-2, -1],
  //   [-1, -2],
  //   [-2, 1],
  //   [-1, 2],
  //   [1, -2],
  //   [2, -1],
  //   [1, 2],
  //   [2, 1]
  // ];

  // for (let i = 0; i < directions.length; i++) {
  //   let hRow = coinRow;
  //   let hCol = coinColumn;

  //   hRow = hRow + directions[i][0];
  //   hCol = hCol + directions[i][1];
  //   if (hRow < 0 || hRow > 7 || hCol < 0 || hCol > 7) break;
  //   if (hRow == sendRow && hCol == sendColumn) {
  //     value = true;
  //     break;
  //   }
  //   // if (piece[hRow][hCol] != "EMPTY") break;
  // }
  var horse = [
    [coinRow - 2, coinColumn - 1],
    [coinRow - 1, coinColumn - 2],
    [coinRow - 2, coinColumn + 1],
    [coinRow - 1, coinColumn + 2],
    [coinRow + 1, coinColumn - 2],
    [coinRow + 2, coinColumn - 1],
    [coinRow + 1, coinColumn + 2],
    [coinRow + 2, coinColumn + 1],
  ];

  let value = false;

  for (let i = 0; i < horse.length; i++) {
    if (
      horse[i][0] >= 0 &&
      horse[i][0] <= 7 &&
      horse[i][1] >= 0 &&
      horse[i][1] <= 7
    ) {
      if (horse[i][0] == sendRow && horse[i][1] == sendColumn) {
        value = true;
        break;
      }
    }
  }

  resultchange(sendRow, sendColumn, value);
  checkalert(sendRow, sendColumn);
  orginal(position);
}

function bishop(getRow, getColumn) {
  let sendRow = getRow;
  let sendColumn = getColumn;
  let value = false;
  let directions = [
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
  ];
  for (let i = 0; i < directions.length; i++) {
    let bRow = coinRow;
    let bCol = coinColumn;

    while (true) {
      bRow = bRow + directions[i][0];
      bCol = bCol + directions[i][1];

      if (bRow < 0 || bRow > 7 || bCol < 0 || bCol > 7) break;
      if (bRow == BkingRow && bCol == BkingColumn) alert("white wins");
      if (bRow == WkingRow && bCol == WkingColumn) alert("Black wins");
      if (bRow == sendRow && bCol == sendColumn) {
        value = true;
        break;
      }
      // THEN check blocking piece
      if (piece[bRow][bCol] !== "EMPTY") break;
    }

    if (value) break;
  }

  resultchange(sendRow, sendColumn, value);
  checkalert(sendRow, sendColumn);
  orginal(position);
}

function queen(getRow, getColumn) {
  let sendRow = getRow;
  let sendColumn = getColumn;
  let value = false;
  let directions = [
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];

  for (let i = 0; i < directions.length; i++) {
    let qRow = coinRow;
    let qCol = coinColumn;
    while (true) {
      qRow = qRow + directions[i][0];
      qCol = qCol + directions[i][1];
      if (qRow < 0 || qRow > 7 || qCol < 0 || qCol > 7) break;

      if (qRow == sendRow && qCol == sendColumn) {
        value = true;
        break;
      }

      if (qRow == BkingRow && qCol == BkingColumn) alert("white wins");
      if (qRow == WkingRow && qCol == WkingColumn) alert("Black wins");
      if (piece[qRow][qCol] != "EMPTY") break;
    }
    if (value) break;
  }

  resultchange(sendRow, sendColumn, value);
  checkalert(sendRow, sendColumn);
  orginal(position);
}
/*
let rook=[[r+1,c],[r-1,c],[r,c+1],[r,c-1]]
let  queen=[[r+1,c+1],[r-1,c-1],[r+1,c],[r-1,c],[r,c+1],[r,c-1]]
 */
function king(getRow, getColumn) {
  let sendRow = getRow;
  let sendColumn = getColumn;
  let king = [
    [coinRow + 1, coinColumn + 1],
    [coinRow + 1, coinColumn - 1],
    [coinRow - 1, coinColumn + 1],
    [coinRow - 1, coinColumn - 1],
    [coinRow, coinColumn - 1],
    [coinRow, coinColumn + 1],
  ];
  for (let i = 0; i < king.length; i++) {
    if (
      king[i][0] >= 0 &&
      king[i][0] <= 7 &&
      king[i][1] >= 0 &&
      king[i][1] <= 7
    ) {
      if (king[i][0] == sendRow && king[i][1] == sendColumn) {
        value = true;
        break;
      }
      // if (piece[sendRow][sendColumn] != "EMPTY") break;
    }
  }
  resultchange(sendRow, sendColumn, value);
  orginal(position);
}

function wpawn(getRow, getColumn) {
  let sendRow = getRow;
  let sendColumn = getColumn;
  let value = false;
  let singlemove = coinRow + 1;
  let doublemove = coinRow + 2;
  if (sendRow == singlemove && sendColumn == coinColumn) {
    if (piece[singlemove][coinColumn] == "EMPTY") {
      value = true;
    }
  }
  if (coinRow == 1 && sendRow == doublemove && sendColumn == coinColumn) {
    if (
      piece[singlemove][coinColumn] == "EMPTY" &&
      piece[doublemove][coinColumn] == "EMPTY"
    ) {
      value = true;
    }
  }

  if (
    sendRow == singlemove &&
    (sendColumn == coinColumn + 1 || sendColumn == coinColumn - 1)
  ) {
    if (
      piece[sendRow][sendColumn] != "EMPTY" &&
      piece[sendRow][sendColumn].startsWith("B")
    ) {
      value = true;
    }
  }
  resultchange(sendRow, sendColumn, value);
  orginal(position);
}
function bpawn(getRow, getColumn) {
  let sendRow = getRow;
  let sendColumn = getColumn;
  let value = false;
  let singlemove = coinRow - 1;
  let doublemove = coinRow - 2;
  if (sendRow == singlemove && sendColumn == coinColumn) {
    if (piece[singlemove][coinColumn] == "EMPTY") value = true;
  }
  if (coinRow == 6 && sendRow == doublemove && sendColumn == coinColumn) {
    if (
      piece[singlemove][coinColumn] == "EMPTY" &&
      piece[doublemove][coinColumn] == "EMPTY"
    )
      value = true;
  }

  if (
    sendRow == singlemove &&
    (sendColumn == coinColumn - 1 || sendColumn == coinColumn + 1)
  ) {
    if (
      piece[sendRow][sendColumn] != "EMPTY" &&
      piece[sendRow][sendColumn].startsWith("W")
    )
      value = true;
  }
  //    console.log("m1",m1,"target",sendRow,sendColumn,"value",value);

  resultchange(sendRow, sendColumn, value);
  orginal(position);
}
function orginal(c1) {
  if (c1) {
    c1.classList.remove("selected");
  }
  c1 = null;
  movedpiece = null;
}
function result(getRow, getColumn) {
  let sendRow = getRow;
  let sendColumn = getColumn;
  console.log("piece name:", piece[sendRow][sendColumn]);
  console.log("movedpiece from", coinRow, coinColumn);
  console.log("movedpiece to", sendRow, sendColumn);
  console.log("------------");
}

//COMPUTER MOVE
// console.log(clkdRow,clkdColumn);
window.onload
if (playerTurn == "W") computerMove();
function computerMove(){
var compMoves = [
  ["WR1", "WH1", "WB1", "WQ", "WK", "WB2", "WH2", "WR2"],

  ["WP1", "WP2", "WP3", "WP4", "WP5", "WP6", "WP7", "WP8"],
];
let rowLen = 2;
let colLen = 8;
let slctrow = Math.floor(Math.random() * rowLen);
let slctcol = Math.floor(Math.random() * colLen);

let slctdPiece = compMoves[slctrow][slctcol];
let condition = false;
let coinRow = slctrow;
let coinCol = slctcol;
for (let rowNo = 0; rowNo < rowLen; rowNo++) {
  for (let colNo = 0; colNo < colLen; colNo++) {
    if (compMoves[rowNo][colNo] == slctdPiece){
       condition = true;
       break;
    }
  }
}
// if (condition) {
//   if (slctdPiece.charAt(1) == "R") {
//      cRook();
//   }
   if (slctdPiece.charAt(1) == "H") {
         cHorse();
   }
//   if (slctdPiece.charAt(1) == "B") {
//     cBishop();
//   }
//   if (slctdPiece.charAt(1) == "Q") {
//     cQueen();
//   }
//   if (slctdPiece.charAt(1) == "K") {
//     cKing();
//   }
//   if (slctdPiece.charAt(1) == "P") {
//     cPawn();
//   }

  }

function cHorse() {
  var horse = [
    [coinRow - 2, coinCol - 1],
    [coinRow - 1, coinCol - 2],
    [coinRow - 2, coinCol + 1],
    [coinRow - 1, coinCol + 2],
    [coinRow + 1, coinCol - 2],
    [coinRow + 2, coinCol - 1],
    [coinRow + 1, coinCol + 2],
    [coinRow + 2, coinCol + 1],
  ];
  let num = horse.length;
  let slct = Math.floor(Math.random() * num);

  // for (let i = 0; i < horse.length; i++) {
  let compceRow = horse[slct][0]
  let compceCol = horse[slct][1];

  console.log(slct);
  console.log("SElected piece", compce);
  if (
    compceRow[0]>= 0 &&
    compceRow[0] <= 7 &&
    compceCol[1] >= 0 &&
    compceCol[1] <= 7
  ) {
     
        if((piece[compceRow][compceCol] =="EMPTY")||(piece[compceRow][compceCol].charAt(0)!=slctdPiece.charAt(0))){  
      value = true;
     console.log("HORSE MOVED TO ",compceRow,compceCol);
    piece[compceRow][compceCol] =slctdPiece;
    piece[coinRow][coinCol] ="EMPTY";
        }
      }
  }



