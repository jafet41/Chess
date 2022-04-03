//------------------------------------------Constants----------------------------------------------
const body = document.body;
const tablero = document.getElementById('tablero');
const turno = document.getElementById('turno');
const columns = ["A","B","C","D","E","F","G","H"];
const colors = ["white","black"]; 
const directions = ["positive","negative"]
//White pieces
const whiteKing = "<img src=\"Pieces/King-W.svg\" class=\"imageSVG\" />";
const whiteQueen = "<img src=\"Pieces/Queen-W.svg\" class=\"imageSVG\" />";
const whiteTower = "<img src=\"Pieces/Tower-W.svg\" class=\"imageSVG\" />";
const whiteBishop = "<img src=\"Pieces/Bishop-W.svg\" class=\"imageSVG\" />";
const whiteKnight = "<img src=\"Pieces/Knight-W.svg\" class=\"imageSVG\" />";
const whitePawn = "<img src=\"Pieces/Pawn-W.svg\" class=\"imageSVG\" />";
//Black pieces
const blackKing = "<img src=\"Pieces/King-B.svg\" class=\"imageSVG\" />";
const blackQueen = "<img src=\"Pieces/Queen-B.svg\" class=\"imageSVG\" />";
const blackTower = "<img src=\"Pieces/Tower-B.svg\" class=\"imageSVG\" />";
const blackBishop = "<img src=\"Pieces/Bishop-B.svg\" class=\"imageSVG\" />";
const blackKnight = "<img src=\"Pieces/Knight-B.svg\" class=\"imageSVG\" />";
const blackPawn = "<img src=\"Pieces/Pawn-B.svg\" class=\"imageSVG\" />";
//-------------------------------------------Globals-----------------------------------------------
let isWhitesTurn = true;
//--------------------------------------Quick test of objects--------------------------------------
// const myPawn = {
// 	position: 'D2',
// 	postPosition: ['D3', 'D4'],
// 	avanzar:  (x) => {return postx;},
// 	capturar: (x) => {return postx;}
// };
// myPawn.col=myPawn.position[0];
// myPawn.row=myPawn.position[1];
//-------------------------------------------Classes-----------------------------------------------
//--------------------Peon-----------------------
class Pawn{
	constructor (_position,_isColorWhite) {
		this.position = _position;
		this.col = _position[0];
		this.colN = columns.indexOf(_position[0]) + 1; 
	//	this.colN = _position[0].charCodeAt(0) - 64;
		this.row = _position[1];
		if(_isColorWhite){
			this.color = colors[0];
			this.enemyColor = colors[1];
			this.direction = directions[0];
		} else {
			this.color = colors[1];
			this.enemyColor = colors[0];
			this.direction = directions[1];
		}
		this.movesHistory.push(_position);
		this.hasBeenMoved = false;
	}

	get col() {
		return this._col;
	}
	get row() {
		return this._row;
	}
	set col(newCol) {
		this._col = newCol;
	}
	set row(newRow) {
		this._row = newRow;
	}

	avanzar() {
		if(this.direction==="positive"){
			if(targetTile==empty)
				this.row++;
			else
				console.log("Invalid move")
		} else {
			if(targetTile==empty)
				this.row--;
			else
				console.log("Invalid move")
		}
		this.hasBeenMoved = true;
	}
	avanzar2() {
		let origin = this.position;
		if(direction==="positive"){
			if(hasBeenMoved === false && inbetweenTiles==empty)
				this.row += 2;
			else
				console.log("Invalid move");
		} else {
			if(hasBeenMoved === false && inbetweenTiles==empty)
				this.row -= 2;
			else
				console.log("Invalid move");
		}
		this.hasBeenMoved = true;
		return origin;
	}
	capturar() {
		targetTiles=computeTlesForCapture();
		if(direction==="positive") {
			if(myCol==OccupiedByEnemy){
				this.row++;
				if(toTheRight)
					this.col++;
				else
					this.col--;
			} else{
				console.log("Invalid move");
			} 
		} else {
			if(targetTiles==OccupiedByEnemy){
				this.row--;
				if(toTheRight)
					this.col++;
				else
					this.col--;
			} else{
				console.log("Invalid move");
			}
		}
		this.hasBeenMoved = true;
	}
	capturarAlPaso() {
		if(direction==="positive") {
			if( (enemyOriginCol===(myCol+1) || enemyOriginCol===(myCol-1)) &&  enemyOriginRow===7  ){
				this.row++;
				if(toTheRight)
					this.col++;
				else
					this.col--;
			} else{
				console.log("Invalid move");
			} 
		} else {
			if( (enemyOriginCol===(myCol+1) || enemyOriginCol===(myCol-1)) &&  enemyOriginRow===2  ){
				this.row--;
				if(toTheRight)
					this.col++;
				else
					this.col--;
			} else{
				console.log("Invalid move");
			}			
		}
		this.hasBeenMoved = true;
	}
}
// let myPawn1 = new Pawn("D2",true);
// console.log(myPawn1);
//-------------------Torre-----------------------
class Rook{
	constructor (_position,_isColorWhite) {
		this.position = _position;
		this.col = _position[0];
		this.row = _position[1];
		if(_isColorWhite){
			this.color = colors[0];
			this.enemyColor = colors[1];
			this.direction = directions[0];
		} else {
			this.color = colors[1];
			this.enemyColor = colors[0];
			this.direction = directions[1];
		}
		this.hasBeenMoved = false;
	}
}
//------------------Caballo----------------------
class Knight{
	constructor (_position,_isColorWhite) {
		this.position = _position;
		this.col = _position[0];
		this.row = _position[1];
		if(_isColorWhite){
			this.color = colors[0];
			this.enemyColor = colors[1];
			this.direction = directions[0];
		} else {
			this.color = colors[1];
			this.enemyColor = colors[0];
			this.direction = directions[1];
		}
	}
}
//-------------------Alfil-----------------------
class Bishop{
	constructor (_position,_isColorWhite) {
		this.position = _position;
		this.col = _position[0];
		this.row = _position[1];
		if(_isColorWhite){
			this.color = colors[0];
			this.enemyColor = colors[1];
			this.direction = directions[0];
		} else {
			this.color = colors[1];
			this.enemyColor = colors[0];
			this.direction = directions[1];
		}
	}
}
//-------------------Reina-----------------------
class Queen{
	constructor (_position,_isColorWhite) {
		this.position = _position;
		this.col = _position[0];
		this.row = _position[1];
		if(_isColorWhite){
			this.color = colors[0];
			this.enemyColor = colors[1];
			this.direction = directions[0];
		} else {
			this.color = colors[1];
			this.enemyColor = colors[0];
			this.direction = directions[1];
		}
	}
}
//--------------------Rey------------------------
class King{
	constructor (_position,_isColorWhite) {
		this.position = _position;
		this.col = _position[0];
		this.row = _position[1];
		if(_isColorWhite){
			this.color = colors[0];
			this.enemyColor = colors[1];
			this.direction = directions[0];
		} else {
			this.color = colors[1];
			this.enemyColor = colors[0];
			this.direction = directions[1];
		}
		this.hasBeenMoved = false;
	}
}
//-------------------------------------------Helpers-----------------------------------------------
let initialPosition =  (i,div) => {
	//Setting initial position
	//Blacks
	if( div.getAttribute("Id") === "A8" || div.getAttribute("Id") === "H8"){
		div.innerHTML = blackTower;
		div.dataset.piece="Tower";
		div.dataset.pieceColor="Black";
		div.dataset.isOccupied='true';
	}
	if( div.getAttribute("Id") === "B8" || div.getAttribute("Id") === "G8"){
		div.innerHTML = blackKnight;
		div.dataset.piece="Knight";
		div.dataset.pieceColor="Black";
		div.dataset.isOccupied='true';
	}
	if( div.getAttribute("Id") === "C8" || div.getAttribute("Id") === "F8"){
		div.innerHTML = blackBishop;
		div.dataset.piece="Bishop";
		div.dataset.pieceColor="Black";
		div.dataset.isOccupied='true';
	}
	if( div.getAttribute("Id") === "D8"){
		div.innerHTML = blackQueen;
		div.dataset.piece="Queen";
		div.dataset.pieceColor="Black";
		div.dataset.isOccupied='true';
	}
	if( div.getAttribute("Id") === "E8"){
		div.innerHTML = blackKing;
		div.dataset.piece="King";
		div.dataset.pieceColor="Black";
		div.dataset.isOccupied='true';
	}
	if(8-i===7){
		div.innerHTML = blackPawn;
		div.dataset.piece="Pawn";
		div.dataset.pieceColor="Black";
		div.dataset.isOccupied='true';
	}
	//Whites
	if(8-i===2){
		div.innerHTML = whitePawn;
		div.dataset.piece="Pawn";
		div.dataset.pieceColor="White";
		div.dataset.isOccupied='true';
	}
	if( div.getAttribute("Id") === "A1" || div.getAttribute("Id") === "H1"){
		div.innerHTML = whiteTower;
		div.dataset.piece="Tower";
		div.dataset.pieceColor="White";
		div.dataset.isOccupied='true';
	}
	if( div.getAttribute("Id") === "B1" || div.getAttribute("Id") === "G1"){
		div.innerHTML = whiteKnight;
		div.dataset.piece="Knight";
		div.dataset.pieceColor="White";
		div.dataset.isOccupied='true';
	}
	if( div.getAttribute("Id") === "C1" || div.getAttribute("Id") === "F1"){
		div.innerHTML = whiteBishop;
		div.dataset.piece="Bishop";
		div.dataset.pieceColor="White";
		div.dataset.isOccupied='true';
	}
	if( div.getAttribute("Id") === "D1"){
		div.innerHTML = whiteQueen;
		div.dataset.piece="Queen";
		div.dataset.pieceColor="White";
		div.dataset.isOccupied='true';
	}
	if( div.getAttribute("Id") === "E1"){
		div.innerHTML = whiteKing;
		div.dataset.piece="King";
		div.dataset.pieceColor="White";
		div.dataset.isOccupied='true';
	}
	//Everything else is set to empty
	if( 8-i===3 || 8-i===4 || 8-i===5 || 8-i===6 ){
		div.innerHTML="";
		div.dataset.piece="";
		div.dataset.pieceColor="";
		div.dataset.isOccupied='false';
	}
}

let renderExtraRow = (isBottom) => {
	//Bottom red divs
	const divRow = document.createElement("div");
	divRow.classList.add("extraRow");
	tablero.append(divRow);
	//Corner
	const corner1 = document.createElement("div");
	corner1.classList.add("tileCorner");
	divRow.append(corner1);

	for (var n = 0; n < 8; n++) {
		const divColId = document.createElement("div");
		divColId.classList.add("tileColId");
		if(isBottom===true)
			divColId.innerText = columns[n];
		divRow.append(divColId);
	}

	//Another Corner
	const corner2 = document.createElement("div");
	corner2.classList.add("tileCorner");
	divRow.append(corner2);
}

let renderExtraCol = (i, divRow, isLeft) => {
	//Left red divs
	const divRowId = document.createElement("div");
	divRowId.classList.add("tileRowId");
	if(isLeft)
		divRowId.innerText = (8-i);
	divRow.append(divRowId);
}
//-------------------------------------------------------------------------------------------------
turno.classList.add("tablero");
turno.innerHTML= "Es El Turno De Las: " + (isWhitesTurn ? "Blancas" : "Negras");

renderExtraRow(false);
//Chess Board
for (var i = 0; i < 8; i++) {
	const divRow = document.createElement("div");
	divRow.classList.add("mainRow");
	tablero.append(divRow);
	renderExtraCol(i, divRow, true);
	for (var j = 0; j < 8; j++) {
		const div = document.createElement("div");
		
		if( (i+j) % 2 == 0 ){
			div.setAttribute("class","white");
		} else {
			div.setAttribute("class","black");
		}

		div.classList.add("tile");
		div.setAttribute("Id",columns[j] + (8-i));
		initialPosition(i,div);
		divRow.append(div);
	}
	renderExtraCol(i, divRow, false);
}
renderExtraRow(true);

//--------------------------------------------Events-----------------------------------------------
const myDIVS = Array.from(document.querySelectorAll('div.mainRow'));
console.log(myDIVS[1])

const A2 = document.getElementById("A2");

A2.addEventListener("click", () => {
  console.log("estas en A2")
})


