import {Pawn, Rook, Knight, Bishop, Queen, King} from "./Pieces.js"
//------------------------------------------Constants----------------------------------------------
const body = document.body;
const tablero = document.getElementById('tablero');
const turno = document.getElementById('turno');
const columns = ["A","B","C","D","E","F","G","H"];
// const colors = ["white","black"]; 
// const directions = ["positive","negative"]
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
let activeDiv = [
 [false, false, false, false, false, false, false, false],
 [false, false, false, false, false, false, false, false],    
 [false, false, false, false, false, false, false, false],
 [false, false, false, false, false, false, false, false],
 [false, false, false, false, false, false, false, false],
 [false, false, false, false, false, false, false, false],
 [false, false, false, false, false, false, false, false],
 [false, false, false, false, false, false, false, false],
];
let isActiveDivClear = true;

let enPassantFlagExists = false;
let isWhitesTurn = true;
let numeroDeTurno = 1;
//Arrays of objects
let oTowers = [];
let oKnights = [];
let oBishops = [];
let oQueens = [];
let oKings = [];
let oPawns = [];
//-------------------------------------------Helpers-----------------------------------------------
//Setting initial position
let initialPosition =  (i,div) => {
	//Blacks
	if( div.getAttribute("Id") === "A8" || div.getAttribute("Id") === "H8"){
		div.innerHTML = blackTower;
		div.dataset.piece="Tower";
		div.dataset.pieceColor="Black";
		div.dataset.isOccupied='true';

		oTowers.push( new Rook(div.getAttribute("Id"), false ))
	}
	if( div.getAttribute("Id") === "B8" || div.getAttribute("Id") === "G8"){
		div.innerHTML = blackKnight;
		div.dataset.piece="Knight";
		div.dataset.pieceColor="Black";
		div.dataset.isOccupied='true';

		oKnights.push( new Knight(div.getAttribute("Id"), false ))
	}
	if( div.getAttribute("Id") === "C8" || div.getAttribute("Id") === "F8"){
		div.innerHTML = blackBishop;
		div.dataset.piece="Bishop";
		div.dataset.pieceColor="Black";
		div.dataset.isOccupied='true';

		oBishops.push( new Bishop(div.getAttribute("Id"), false ))
	}
	if( div.getAttribute("Id") === "D8"){
		div.innerHTML = blackQueen;
		div.dataset.piece="Queen";
		div.dataset.pieceColor="Black";
		div.dataset.isOccupied='true';

		oQueens.push( new Queen(div.getAttribute("Id"), false ))
	}
	if( div.getAttribute("Id") === "E8"){
		div.innerHTML = blackKing;
		div.dataset.piece="King";
		div.dataset.pieceColor="Black";
		div.dataset.isOccupied='true';

		oKings.push( new King(div.getAttribute("Id"), false ))
	}
	if(8-i===7){
		div.innerHTML = blackPawn;
		div.dataset.piece="Pawn";
		div.dataset.pieceColor="Black";
		div.dataset.isOccupied='true';

		oPawns.push( new Pawn(div.getAttribute("Id"), false ))
	}
	//Whites
	if(8-i===2){
		div.innerHTML = whitePawn;
		div.dataset.piece="Pawn";
		div.dataset.pieceColor="White";
		div.dataset.isOccupied='true';

		oPawns.push( new Pawn(div.getAttribute("Id"), true ))
	}
	if( div.getAttribute("Id") === "A1" || div.getAttribute("Id") === "H1"){
		div.innerHTML = whiteTower;
		div.dataset.piece="Tower";
		div.dataset.pieceColor="White";
		div.dataset.isOccupied='true';

		oTowers.push( new Rook(div.getAttribute("Id"), true ))
	}
	if( div.getAttribute("Id") === "B1" || div.getAttribute("Id") === "G1"){
		div.innerHTML = whiteKnight;
		div.dataset.piece="Knight";
		div.dataset.pieceColor="White";
		div.dataset.isOccupied='true';

		oKnights.push( new Knight(div.getAttribute("Id"), true ))
	}
	if( div.getAttribute("Id") === "C1" || div.getAttribute("Id") === "F1"){
		div.innerHTML = whiteBishop;
		div.dataset.piece="Bishop";
		div.dataset.pieceColor="White";
		div.dataset.isOccupied='true';

		oBishops.push( new Bishop(div.getAttribute("Id"), true ))
	}
	if( div.getAttribute("Id") === "D1"){
		div.innerHTML = whiteQueen;
		div.dataset.piece="Queen";
		div.dataset.pieceColor="White";
		div.dataset.isOccupied='true';

		oQueens.push( new Queen(div.getAttribute("Id"), true ))
	}
	if( div.getAttribute("Id") === "E1"){
		div.innerHTML = whiteKing;
		div.dataset.piece="King";
		div.dataset.pieceColor="White";
		div.dataset.isOccupied='true';

		oKings.push( new King(div.getAttribute("Id"), true ))
	}
	//Everything else is set to empty
	if( 8-i===3 || 8-i===4 || 8-i===5 || 8-i===6 ){
		div.innerHTML="";
		div.dataset.piece="";
		div.dataset.pieceColor="";
		div.dataset.isOccupied='false';
	}
}

//Rendering extra rows
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
turno.innerHTML= "Es El Turno De Las: <span>" + (isWhitesTurn ? "Blancas </span>" : "Negras </span>");

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

		if( 8-i===1 || 8-i===2 || 8-i===7 || 8-i===8 ){
			div.addEventListener("click", () => {
  				console.log("Estas en: " + div.getAttribute("Id") );
			})
			if( 8-i===2 || 8-i===7 ){
				//Pawn.computeTarget()
			} 
		}
	}
	renderExtraCol(i, divRow, false);
}
renderExtraRow(true);
//------------------------------------------Instancias---------------------------------------------
console.log(oQueens)
console.log(oPawns)
//--------------------------------------------Events-----------------------------------------------
const occupiedDivs = Array.from(document.querySelectorAll('[data-is-occupied="true"]'));
console.log(occupiedDivs);

let letrero = document.querySelector('span#turno.tablero');
function changeTurn() {
	isWhitesTurn = !isWhitesTurn;
	letrero.innerHTML = "" + (isWhitesTurn ? "Blancas" : "Negras");
}

function setFalse() {
	activeDiv.forEach( el => {	for (var i = 0; i < 8; i++) { el[i]=false; } });
	isActiveDivClear = true;
}

function removeOthers(id) {
	setFalse();
	let c = columns.indexOf(id[0]);
	let r = id[1];
	activeDiv[8-r][c] = true;
	isActiveDivClear = false;
}

function removeEvents(position){
	//Remove events
	let c = columns.indexOf(position[0]);
	let r = position[1];
	for (let i = 0; i <= 15; i++) {
			let element = document.getElementById(oPawns[0+i].position);
			if (i>=0 && i<=15 && i!=c){
				element.removeEventListener("click", boundedClickHandler[0+i]);
				console.log("Removido ");
				console.log("activeDiv[6]["+j+"]:"+activeDiv[6][i]);
			}
	}
}

function addEvents(position){
	//add events
	let c = columns.indexOf(position[0]);
	let r = position[1];
	for (let i = 0; i <= 15; i++) {
			let element = document.getElementById(oPawns[0+i].position);
			if (i>=0 && i<=15 && i!=c){
				element.addEventListener("click", boundedClickHandler[0+i]);
				console.log("Agregado ");
				console.log("activeDiv[6]["+j+"]:"+activeDiv[6][i]);
			}
	}
}


let clickHandler = (lista,elemento) => {
	lista.forEach( el => document.getElementById(el).classList.toggle('yellow') );
	removeOthers(elemento.id);
	removeEvents(elemento.id);
	let listaCero = document.getElementById(lista[0]);
	if( listaCero.classList.contains('yellow') ) {
		console.log("Si hay amarillo");
	} else {
		setFalse();
		addEvents(elemento.id);
	}
	console.table(activeDiv);
	console.log(isActiveDivClear);
}


var boundedClickHandler = [];
for (let i = 0; i <= 15; i++) {
	let element = document.getElementById(oPawns[i].position);
	let lista = oPawns[i].computeTarget();
	boundedClickHandler[i] = clickHandler.bind(null,lista,element);
	element.addEventListener("click", boundedClickHandler[i]);
}

