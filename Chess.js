import {Pawn, Rook, Knight, Bishop, Queen, King} from "./Pieces.js"
//------------------------------------------Constants----------------------------------------------
const body = document.body;
const tablero = document.getElementById('tablero');
const turno = document.getElementById('turno');

//const openButton = document.getElementById('botonOpen');
const modal1 = document.getElementById('modal');
const modal2 = document.getElementById('modal2')
const overlay = document.getElementById('overlay');
const acceptButton = document.getElementById('aceptar');
const acceptButton2 = document.getElementById('aceptar2');

const columns = ["A","B","C","D","E","F","G","H"];
//White pieces
const whiteKing = "<img src=\"Pieces/King-W.svg\" class=\"imageSVG\" />";
const whiteQueen = "<img src=\"Pieces/Queen-W.svg\" class=\"imageSVG\" />";
const whiteRook = "<img src=\"Pieces/Tower-W.svg\" class=\"imageSVG\" />";
const whiteBishop = "<img src=\"Pieces/Bishop-W.svg\" class=\"imageSVG\" />";
const whiteKnight = "<img src=\"Pieces/Knight-W.svg\" class=\"imageSVG\" />";
const whitePawn = "<img src=\"Pieces/Pawn-W.svg\" class=\"imageSVG\" />";
//Black pieces
const blackKing = "<img src=\"Pieces/King-B.svg\" class=\"imageSVG\" />";
const blackQueen = "<img src=\"Pieces/Queen-B.svg\" class=\"imageSVG\" />";
const blackRook = "<img src=\"Pieces/Tower-B.svg\" class=\"imageSVG\" />";
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

let lastMovedPiece = {
	piece: "",
	color: "",
	initialPosition: "",
	finalPosition: ""
}

var piezaSeleccionada = "";
var piezaSeleccionada2 = "";
var _promote;

let isActiveDivClear = true;
let enPassantFlagExists = false;
let isWhitesTurn = true;
let numeroDeTurno = 1;

var allPossibleMovesW = [];
var allPossibleMovesB = [];
var supportedBoxesW = [];
var supportedBoxesB = [];

var whitePieces = [];
var blackPieces = [];

//Arrays of objects
let oRooks = [];
let oKnights = [];
let oBishops = [];
let oQueens = [];
let oKings = [];
let oPawns = [];
//-----------------------------------------Cambiar-Turno-------------------------------------------
function cambiarTurno(){
	isWhitesTurn = !isWhitesTurn;
	turno.innerHTML= "Es El Turno De Las: <span>" + (isWhitesTurn ? "Blancas </span>" : "Negras </span>");
	if(isWhitesTurn) {
		turno.setAttribute("class","tableroWhite");
		numeroDeTurno++;
	}else{
		turno.setAttribute("class","tableroBlack");
	}
	//console.log("Numero de turno es: " + numeroDeTurno);
	//console.log(oKings[1].sorroundings);
	//console.log(supportedBoxesB)
}
//-------------------------------------------Helpers-----------------------------------------------
//Setting initial position
let initialPosition =  (i,div) => {
	//Blacks
	if( div.getAttribute("Id") === "A8" || div.getAttribute("Id") === "H8"){
		div.innerHTML = blackRook;
		div.dataset.piece="Rook";
		div.dataset.pieceColor="Black";
		div.dataset.isOccupied='true';

		oRooks.push( new Rook(div.getAttribute("Id"), false ))
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

		oPawns.push( new Pawn(div.getAttribute("Id"), false ));
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
		div.innerHTML = whiteRook;
		div.dataset.piece="Rook";
		div.dataset.pieceColor="White";
		div.dataset.isOccupied='true';

		oRooks.push( new Rook(div.getAttribute("Id"), true ))
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
turno.setAttribute("class","tableroWhite");
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
  				//console.log("Estas en: " + div.getAttribute("Id") );
			}) 
		}
	}
	renderExtraCol(i, divRow, false);
}
renderExtraRow(true);
//=============================Separar Instancias y algunos calculos===============================
getPiecesByColor()
allPossibleMoves_W()
allPossibleMoves_B()
getSupportedBoxes()
//=========================================Eventos=================================================
const occupiedDivs = Array.from(document.querySelectorAll('[data-is-occupied="true"]'));

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
//-----------------------------------------Eventos-Peon--------------------------------------------
var boundedHandlerMove = [];
var boundedClickHandler = [];

function removeEventsPawns(position="All"){
	//Remove events except indicated position
	for (let i = 0; i < oPawns.length; i++) {
		let element = document.getElementById(oPawns[i].position);
		if (oPawns[i].position!=position){
			element.removeEventListener("click", boundedClickHandler[i]);
			//console.log("Removido");	
		}
	}
	//Remove all Pawn Events
	if (position==="All") {
		for (let i = 0; i < oPawns.length; i++) {
			let element = document.getElementById(oPawns[i].position);
			element.removeEventListener("click", boundedClickHandler[i]);
			//console.log("Removidos todos los peones");
		}
	}
}

function addEventsPawns(color){
	//Add events
	for (let i = 0; i < oPawns.length; i++) {
			let element = document.getElementById(oPawns[i].position);
			if (oPawns[i].color === color){
				element.addEventListener("click", boundedClickHandler[i]);
				//console.log("Agregados Peones");
			}
	}
}


let clickHandler = (lista,elemento) => {
	lista.forEach( el => document.getElementById(el).classList.toggle("gray") );
	removeOthers(elemento.id);
	removeEventsPawns(elemento.id);
	removeEvents_Knights();
	removeEvents_Bishops();
	removeEvents_Rooks();
	removeEvents_Queens();
	removeEvents_Kings();

	let listaCero = document.getElementById(lista[0]);

	if (listaCero===null) { 
		setFalse();
		addEventsPawns(elemento.dataset.pieceColor);
		addEvents_Knights(elemento.dataset.pieceColor);
		addEvents_Bishops(elemento.dataset.pieceColor);
		addEvents_Rooks(elemento.dataset.pieceColor);
		addEvents_Queens(elemento.dataset.pieceColor);
		addEvents_Kings(elemento.dataset.pieceColor);
		return;
	}

	if( listaCero.classList.contains("gray") ) {
		//console.log("Si hay gris");
		lista.forEach( (item,i) => {
			boundedHandlerMove[i] = handlerMove.bind(null,elemento.id,item,lista);
			let element = document.getElementById(item);
			element.addEventListener("click", boundedHandlerMove[i]);
		});
	} else {
		setFalse();
		addEventsPawns(elemento.dataset.pieceColor);
		addEvents_Knights(elemento.dataset.pieceColor);
		addEvents_Bishops(elemento.dataset.pieceColor);
		addEvents_Rooks(elemento.dataset.pieceColor);
		addEvents_Queens(elemento.dataset.pieceColor);
		addEvents_Kings(elemento.dataset.pieceColor);
		lista.forEach( (item,i) => {
			let element = document.getElementById(item);
			element.removeEventListener("click", boundedHandlerMove[i]);
		});
	}
}

let handlerMove = async (pos1,pos2,lista) => {
	let div1 = document.getElementById(pos1);
	let div2 = document.getElementById(pos2);
	let areDiv1Div2Different = div1.dataset.pieceColor !== div2.dataset.pieceColor;
	let div1Color = div1.dataset.pieceColor;

	//Move Piece
	if(div2.dataset.isOccupied ==="false"){
	
		div1.innerHTML = "";
		div1.dataset.piece = "";
		div1.dataset.pieceColor = "";
		div1.dataset.isOccupied = "false";

		if (div1Color === "White") {
			div2.innerHTML = whitePawn;
			div2.dataset.piece = "Pawn";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
			
			//EnPassant
			let posEP="" + pos2[0] + (parseInt(pos2[1])-1);
			if (lastMovedPiece.piece === "Pawn" &&
		 		lastMovedPiece.color === "Black" &&
		 		lastMovedPiece.finalPosition === posEP) {

				let divEP = document.getElementById(posEP);
				divEP.innerHTML = "";
				divEP.dataset.piece = "";
				divEP.dataset.pieceColor = "";
				divEP.dataset.isOccupied = "false";
				let m = oPawns.findIndex( x => x.position===divEP.id);
				oPawns.splice(m, 1);
				boundedClickHandler.splice(m, 1);

			}

		} else {
			div2.innerHTML = blackPawn;
			div2.dataset.piece = "Pawn";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";

			//EnPassant
			let posEP="" + pos2[0] + (parseInt(pos2[1])+1);
			if (lastMovedPiece.piece === "Pawn" &&
		 		lastMovedPiece.color === "White" &&
		 		lastMovedPiece.finalPosition === posEP) {

				let divEP = document.getElementById(posEP);
				divEP.innerHTML = "";
				divEP.dataset.piece = "";
				divEP.dataset.pieceColor = "";
				divEP.dataset.isOccupied = "false";
				let m = oPawns.findIndex( x => x.position===divEP.id);
				oPawns.splice(m, 1);
				boundedClickHandler.splice(m, 1);

			}

		}
	//Capture Rival Piece 				
	} else if (div2.dataset.isOccupied ==="true" && areDiv1Div2Different) {
		
		div1.innerHTML = "";
		div1.dataset.piece = "";
		div1.dataset.pieceColor = "";
		div1.dataset.isOccupied = "false";

		let capturedPiece = div2.dataset.piece;
		switch (capturedPiece) {
		  case "Pawn": {
		  	let index = oPawns.findIndex( x => x.position===div2.id);
		    oPawns.splice(index, 1);
		    boundedClickHandler.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Knight": {
		    let index = oKnights.findIndex( x => x.position===div2.id);
		    oKnights.splice(index, 1);
		    boundedClickHandler_Knight.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Bishop": {
		  	let index = oBishops.findIndex( x => x.position===div2.id);
		    oBishops.splice(index, 1);
		    boundedClickHandler_Bishop.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Rook": {
		    let index = oRooks.findIndex( x => x.position===div2.id);
		    oRooks.splice(index, 1);
		    boundedClickHandler_Rook.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Queen": {
		    let index = oQueens.findIndex( x => x.position===div2.id);
		    oQueens.splice(index, 1);
		    boundedClickHandler_Queen.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "King": {
		    let index = oKings.findIndex( x => x.position===div2.id);
		    oKings.splice(index, 1);
		    boundedClickHandler_King.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  default: {
		    //console.log("Sin pieza capturada");
		    break;
			}
		}
		
		if (div1Color === "White") {
			div2.innerHTML = whitePawn;
			div2.dataset.piece = "Pawn";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
		} else if (div1Color === "Black") {
			div2.innerHTML = blackPawn;
			div2.dataset.piece = "Pawn";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";
		}
	}
	
	//Update lastMovedPiece (for en Passant and castling)
	lastMovedPiece.piece = div2.dataset.piece;
	lastMovedPiece.color = div2.dataset.pieceColor;
	lastMovedPiece.initialPosition = pos1;
	lastMovedPiece.finalPosition = pos2;
	
	//Remove gray events
	lista.forEach( el => document.getElementById(el).classList.remove("gray") );
	lista.forEach( (el,i) => {
		let element =document.getElementById(el);
		element.removeEventListener("click", boundedHandlerMove[i]);
	});

	//Pawn promotion
	let pos2Row = parseInt(pos2[1]);
	if (pos2Row===8) {
	 	piezaSeleccionada = await pawnPromotion("White");
		switch (piezaSeleccionada) {
		  case "Knight": {
		  	div2.innerHTML = whiteKnight;
			div2.dataset.piece = "Knight";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
			//console.log("Promocion: Caballo blanco");
			//Deletes promoted Pawn
		    let index = oPawns.findIndex( x => x.position===pos1);
		    oPawns.splice(index, 1);
		    div1.removeEventListener("click", boundedClickHandler[index]);
		    boundedClickHandler.splice(index, 1);
		    //Adds new Rook
		    oKnights.push( new Knight(pos2,true) );
		    boundCH_Knight();
		    break;
			}
		  case "Bishop": {
		  	div2.innerHTML = whiteBishop;
			div2.dataset.piece = "Bishop";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
			//console.log("Promocion: Alfil blanco");
			//Deletes promoted Pawn
		    let index = oPawns.findIndex( x => x.position===pos1);
		    oPawns.splice(index, 1);
		    div1.removeEventListener("click", boundedClickHandler[index]);
		    boundedClickHandler.splice(index, 1);
		    //Adds new Rook
		    oBishops.push( new Bishop(pos2,true) );
		    boundCH_Bishop();
		    break;
			}
		  case "Rook": {
		    div2.innerHTML = whiteRook;
			div2.dataset.piece = "Rook";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
			//console.log("Promocion: Torre blanca");
			//Deletes promoted Pawn
		    let index = oPawns.findIndex( x => x.position===pos1);
		    oPawns.splice(index, 1);
		    div1.removeEventListener("click", boundedClickHandler[index]);
		    boundedClickHandler.splice(index, 1);
		    //Adds new Rook
		    oRooks.push( new Rook(pos2,true) );
		    boundCH_Rook();
		    break;
			}
		  case "Queen": {
		  	div2.innerHTML = whiteQueen;
			div2.dataset.piece = "Queen";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
			//console.log("Promocion: Reina blanca");
			//Deletes promoted Pawn
		    let index = oPawns.findIndex( x => x.position===pos1);
		    oPawns.splice(index, 1);
		    div1.removeEventListener("click", boundedClickHandler[index]);
		    boundedClickHandler.splice(index, 1);
		    //Adds new Queen
		    oQueens.push( new Queen(pos2,true) );
		    boundCH_Queen();
		    break;
			}
		  default: {
		    //console.log("Sin pieza seleccionada para promoción");
		    break;
			}
		}
	  		
	}else if (pos2Row===1) {

	 	piezaSeleccionada2 = await pawnPromotion("Black");
		switch (piezaSeleccionada2) {
		  case "Knight": {
		  	div2.innerHTML = blackKnight;
			div2.dataset.piece = "Knight";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";
			//console.log("Promocion: Caballo negro");
			//Deletes promoted Pawn
		    let index = oPawns.findIndex( x => x.position===pos1);
		    oPawns.splice(index, 1);
		    div1.removeEventListener("click", boundedClickHandler[index]);
		    boundedClickHandler.splice(index, 1);
		    //Adds new Rook
		    oKnights.push( new Knight(pos2,false) );
		    boundCH_Knight();
		    break;
			}
		  case "Bishop": {
		  	div2.innerHTML = blackBishop;
			div2.dataset.piece = "Bishop";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";
			//console.log("Promocion: Alfil negro");
			//Deletes promoted Pawn
		    let index = oPawns.findIndex( x => x.position===pos1);
		    oPawns.splice(index, 1);
		    div1.removeEventListener("click", boundedClickHandler[index]);
		    boundedClickHandler.splice(index, 1);
		    //Adds new Rook
		    oBishops.push( new Bishop(pos2,false) );
		    boundCH_Bishop();
		    break;
			}
		  case "Rook": {
		    div2.innerHTML = blackRook;
			div2.dataset.piece = "Rook";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";
			//console.log("Promocion: Torre negra");
			//Deletes promoted Pawn
		    let index = oPawns.findIndex( x => x.position===pos1);
		    oPawns.splice(index, 1);
		    div1.removeEventListener("click", boundedClickHandler[index]);
		    boundedClickHandler.splice(index, 1);
		    //Adds new Rook
		    oRooks.push( new Rook(pos2,false) );
		    boundCH_Rook();
		    break;
			}
		  case "Queen": {
		  	div2.innerHTML = blackQueen;
			div2.dataset.piece = "Queen";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";
			//console.log("Promocion: Reina negra");
			//Deletes promoted Pawn
		    let index = oPawns.findIndex( x => x.position===pos1);
		    oPawns.splice(index, 1);
		    div1.removeEventListener("click", boundedClickHandler[index]);
		    boundedClickHandler.splice(index, 1);
		    //Adds new Queen
		    oQueens.push( new Queen(pos2,false) );
		    boundCH_Queen();
		    break;
			}
		  default: {
		    //console.log("Sin pieza seleccionada para promoción");
		    break;
			}
		}
	}

	//Update sign
	cambiarTurno();

	//Update position
	let k = oPawns.findIndex( x => x.position===pos1);
	if (k!==-1) {
		oPawns[k].position = pos2;
		//Remove pos1 event
		div1.removeEventListener("click", boundedClickHandler[k]);
	}

	//Update bounded function
	boundCH();
	//Update bishops/rooks/queens list in case the pawn movement 'unlocks' a diagonal-column-row
	boundCH_Bishop();
	boundCH_Rook();
	boundCH_Queen();
	boundCH_Knight();
	//Update lists to be ready for the recalculation of kings valid moves
	allPossibleMoves_W();
	allPossibleMoves_B();
	getSupportedBoxes();
	//Update kings valid moves
	boundCH_King();

	//Add enemy events
	if (div1Color === "White") {
		if ( allPossibleMovesW.includes(oKings[0].position) ) {
			oKings[0].check = true;
			boundCH_King();
			addEvents_Kings("Black");
		} else {
			addEventsPawns("Black");
			addEvents_Knights("Black");
			addEvents_Bishops("Black");
			addEvents_Rooks("Black");
			addEvents_Queens("Black");
			addEvents_Kings("Black");
		}
		
	} else if (div1Color === "Black") {
		if ( allPossibleMovesB.includes(oKings[1].position) ) {
			oKings[1].check = true;
			boundCH_King();
			addEvents_Kings("White");
		} else {
			addEventsPawns("White");
			addEvents_Knights("White");
			addEvents_Bishops("White");
			addEvents_Rooks("White");
			addEvents_Queens("White");
			addEvents_Kings("White");
		}
	}
}

function boundCH(){
	for (let i = 0; i < oPawns.length; i++) {
		let element = document.getElementById(oPawns[i].position);
		let lista = oPawns[i].computeTarget(oPawns,lastMovedPiece);
		boundedClickHandler[i] = clickHandler.bind(null,lista,element);
	}
}
boundCH();
addEventsPawns("White");
//----------------------------------------Eventos-Caballo------------------------------------------
var boundedClickHandler_Knight = [];
var boundedHandlerMove_Knight = [];

function removeEvents_Knights(position_Kn="All"){
	//Remove events except the indicated one
	for (let i = 0; i < oKnights.length; i++) {
		let element = document.getElementById(oKnights[i].position);
		if (oKnights[i].position!=position_Kn){
			element.removeEventListener("click", boundedClickHandler_Knight[i]);
			console.log("Removido1");	
		}
	}
	//Remove all Knight Events
	if (position_Kn === "All") {
		for (let i = 0; i < oKnights.length; i++) {
			let element = document.getElementById(oKnights[i].position);
			element.removeEventListener("click", boundedClickHandler_Knight[i]);
			console.log("Removidos todos los caballos");
		}
	}
}
function addEvents_Knights(color_Kn){
	//Add events
	for (let i = 0; i < oKnights.length; i++) {
		let element = document.getElementById(oKnights[i].position);
		if (oKnights[i].color === color_Kn){
			element.addEventListener("click", boundedClickHandler_Knight[i]);
			//console.log("Agregados Caballos")
		}
	}
}
let clickHandler_Knight = (lista,elemento) => {
	lista.forEach( el => document.getElementById(el).classList.toggle("gray") );
	removeOthers(elemento.id);
	removeEventsPawns();
	removeEvents_Knights(elemento.id);
	removeEvents_Bishops();
	removeEvents_Rooks();
	removeEvents_Queens();
	removeEvents_Kings();

	let listaCero = document.getElementById(lista[0]);
	if (listaCero===null) { 
		setFalse();
		addEventsPawns(elemento.dataset.pieceColor);
		addEvents_Knights(elemento.dataset.pieceColor);
		addEvents_Bishops(elemento.dataset.pieceColor);
		addEvents_Rooks(elemento.dataset.pieceColor);
		addEvents_Queens(elemento.dataset.pieceColor);
		addEvents_Kings(elemento.dataset.pieceColor);
		return;
	}

	if( listaCero.classList.contains("gray") ) {
		//console.log("Si hay gris");
		lista.forEach( (item,i) => {
			boundedHandlerMove_Knight[i] = handlerMove_Knight.bind(null,elemento.id,item,lista);
			let element = document.getElementById(item);
			element.addEventListener("click", boundedHandlerMove_Knight[i]);
		});
	} else {
		setFalse();
		addEventsPawns(elemento.dataset.pieceColor);
		addEvents_Knights(elemento.dataset.pieceColor);
		addEvents_Bishops(elemento.dataset.pieceColor);
		addEvents_Rooks(elemento.dataset.pieceColor);
		addEvents_Queens(elemento.dataset.pieceColor);
		addEvents_Kings(elemento.dataset.pieceColor);
		lista.forEach( (item,i) => {
			let element = document.getElementById(item);
			element.removeEventListener("click", boundedHandlerMove_Knight[i]);
		});
	}
}

let handlerMove_Knight = (pos1,pos2,lista) => {
	let div1 = document.getElementById(pos1);
	let div2 = document.getElementById(pos2);
	let areDiv1Div2Different = div1.dataset.pieceColor !== div2.dataset.pieceColor;
	let div1Color = div1.dataset.pieceColor;

	//Move Piece
	if(div2.dataset.isOccupied ==="false"){
	
		div1.innerHTML = "";
		div1.dataset.piece = "";
		div1.dataset.pieceColor = "";
		div1.dataset.isOccupied = "false";

		if (div1Color === "White") {
			div2.innerHTML = whiteKnight;
			div2.dataset.piece = "Knight";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
		} else {
			div2.innerHTML = blackKnight;
			div2.dataset.piece = "Knight";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";
		}
	//Capture Rival Piece 				
	} else if (div2.dataset.isOccupied ==="true" && areDiv1Div2Different) {
		
		div1.innerHTML = "";
		div1.dataset.piece = "";
		div1.dataset.pieceColor = "";
		div1.dataset.isOccupied = "false";

		let capturedPiece = div2.dataset.piece;
		switch (capturedPiece) {
		  case "Pawn": {
		  	let index = oPawns.findIndex( x => x.position===div2.id);
		    oPawns.splice(index, 1);
		    boundedClickHandler.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Knight": {
		    let index = oKnights.findIndex( x => x.position===div2.id);
		    oKnights.splice(index, 1);
		    boundedClickHandler_Knight.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Bishop": {
		  	let index = oBishops.findIndex( x => x.position===div2.id);
		    oBishops.splice(index, 1);
		    boundedClickHandler_Bishop.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Rook": {
		    let index = oRooks.findIndex( x => x.position===div2.id);
		    oRooks.splice(index, 1);
		    boundedClickHandler_Rook.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Queen": {
		    let index = oQueens.findIndex( x => x.position===div2.id);
		    oQueens.splice(index, 1);
		    boundedClickHandler_Queen.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "King": {
		    let index = oKings.findIndex( x => x.position===div2.id);
		    oKings.splice(index, 1);
		    boundedClickHandler_King.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  default: {
		    //console.log("Sin pieza capturada");
		    break;
			}
		}
		
		if (div1Color === "White") {
			div2.innerHTML = whiteKnight;
			div2.dataset.piece = "Knight";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
		} else if (div1Color === "Black") {
			div2.innerHTML = blackKnight;
			div2.dataset.piece = "Knight";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";
		}
	}

	lastMovedPiece.piece = div2.dataset.piece;
	lastMovedPiece.color = div2.dataset.pieceColor;
	lastMovedPiece.initialPosition = pos1;
	lastMovedPiece.finalPosition = pos2;

	//Remove gray events
	lista.forEach( el => document.getElementById(el).classList.remove("gray") );
	lista.forEach( (el,i) => {
		let element =document.getElementById(el);
		element.removeEventListener("click", boundedHandlerMove_Knight[i]);
	});

	//Update sign
	cambiarTurno();
	//Update position
	let k = oKnights.findIndex( x => x.position===pos1);
	oKnights[k].position = pos2;
	
	//Remove pos1 event
	div1.removeEventListener("click", boundedClickHandler_Knight[k]);
	
	//Update bounded function
	boundCH_Knight();
	//Update bishops/rooks/queens list in case the knight movement 'unlocks' a diagonal-column-row
	boundCH_Bishop();
	boundCH_Rook();
	boundCH_Queen();
	boundCH();
	//Update lists to be ready for the recalculation of kings valid moves 
	allPossibleMoves_W();
	allPossibleMoves_B();
	getSupportedBoxes();
	//Update kings valid moves
	boundCH_King();

	//Add enemy events
	if (div1Color === "White") {
		if ( allPossibleMovesW.includes(oKings[0].position) ) {
			oKings[0].check = true;
			boundCH_King();
			addEvents_Kings("Black");
		} else {
			addEventsPawns("Black");
			addEvents_Knights("Black");
			addEvents_Bishops("Black");
			addEvents_Rooks("Black");
			addEvents_Queens("Black");
			addEvents_Kings("Black");
		}

	} else if (div1Color === "Black") {
		if ( allPossibleMovesB.includes(oKings[1].position) ) {
			oKings[0].check = true;
			boundCH_King();
			addEvents_Kings("White");
		} else {
			addEventsPawns("White");
			addEvents_Knights("White");
			addEvents_Bishops("White");
			addEvents_Rooks("White");
			addEvents_Queens("White");
			addEvents_Kings("White");
		}
	}
}

function boundCH_Knight(){
	for (let i = 0; i < oKnights.length; i++) {
		let element = document.getElementById(oKnights[i].position);
		let lista = oKnights[i].computeTarget();
		boundedClickHandler_Knight[i] = clickHandler_Knight.bind(null,lista,element);
	}
}

boundCH_Knight();
addEvents_Knights("White");
//----------------------------------------Eventos-Alfil------------------------------------------
var boundedClickHandler_Bishop = [];
var boundedHandlerMove_Bishop = [];

function removeEvents_Bishops(position_Kn="All"){
	//Remove events except the indicated one
	for (let i = 0; i < oBishops.length; i++) {
		let element = document.getElementById(oBishops[i].position);
		if (oBishops[i].position!=position_Kn){
			element.removeEventListener("click", boundedClickHandler_Bishop[i]);
			//console.log("RemovidoAlfil1");	
		}
	}
	//Remove all Bishop Events
	if (position_Kn === "All") {
		for (let i = 0; i < oBishops.length; i++) {
			let element = document.getElementById(oBishops[i].position);
			element.removeEventListener("click", boundedClickHandler_Bishop[i]);
			//console.log("Removidos todos los alfiles");
		}
	}
}
function addEvents_Bishops(color_Kn){
	//Add events
	for (let i = 0; i < oBishops.length; i++) {
		let element = document.getElementById(oBishops[i].position);
		if (oBishops[i].color === color_Kn){
			element.addEventListener("click", boundedClickHandler_Bishop[i]);
			//console.log("Agregados Alfiles")
		}
	}
}

let clickHandler_Bishop = (lista,elemento) => {
	lista.forEach( el => document.getElementById(el).classList.toggle("gray") );
	removeOthers(elemento.id);
	removeEventsPawns();
	removeEvents_Knights();
	removeEvents_Bishops(elemento.id);
	removeEvents_Rooks();
	removeEvents_Queens();
	removeEvents_Kings();

	let listaCero = document.getElementById(lista[0]);
	if (listaCero===null) { 
		setFalse();
		addEventsPawns(elemento.dataset.pieceColor);
		addEvents_Knights(elemento.dataset.pieceColor);
		addEvents_Bishops(elemento.dataset.pieceColor);
		addEvents_Rooks(elemento.dataset.pieceColor);
		addEvents_Queens(elemento.dataset.pieceColor);
		addEvents_Kings(elemento.dataset.pieceColor);
		return;
	}

	if( listaCero.classList.contains("gray") ) {
		//console.log("Si hay gris");
		lista.forEach( (item,i) => {
			boundedHandlerMove_Bishop[i] = handlerMove_Bishop.bind(null,elemento.id,item,lista);
			let element = document.getElementById(item);
			element.addEventListener("click", boundedHandlerMove_Bishop[i]);
		});
	} else {
		setFalse();
		addEventsPawns(elemento.dataset.pieceColor);
		addEvents_Knights(elemento.dataset.pieceColor);
		addEvents_Bishops(elemento.dataset.pieceColor);
		addEvents_Rooks(elemento.dataset.pieceColor);
		addEvents_Queens(elemento.dataset.pieceColor);
		addEvents_Kings(elemento.dataset.pieceColor);
		lista.forEach( (item,i) => {
			let element = document.getElementById(item);
			element.removeEventListener("click", boundedHandlerMove_Bishop[i]);
		});
	}
}

let handlerMove_Bishop = (pos1,pos2,lista) => {
	let div1 = document.getElementById(pos1);
	let div2 = document.getElementById(pos2);
	let areDiv1Div2Different = div1.dataset.pieceColor !== div2.dataset.pieceColor;
	let div1Color = div1.dataset.pieceColor;

	//Move Piece
	if(div2.dataset.isOccupied ==="false"){
	
		div1.innerHTML = "";
		div1.dataset.piece = "";
		div1.dataset.pieceColor = "";
		div1.dataset.isOccupied = "false";

		if (div1Color === "White") {
			div2.innerHTML = whiteBishop;
			div2.dataset.piece = "Bishop";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
		} else {
			div2.innerHTML = blackBishop;
			div2.dataset.piece = "Bishop";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";
		}
	//Capture Rival Piece 				
	} else if (div2.dataset.isOccupied ==="true" && areDiv1Div2Different) {
		
		div1.innerHTML = "";
		div1.dataset.piece = "";
		div1.dataset.pieceColor = "";
		div1.dataset.isOccupied = "false";

		let capturedPiece = div2.dataset.piece;
		switch (capturedPiece) {
		  case "Pawn": {
		  	let index = oPawns.findIndex( x => x.position===div2.id);
		    oPawns.splice(index, 1);
		    boundedClickHandler.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Knight": {
		    let index = oKnights.findIndex( x => x.position===div2.id);
		    oKnights.splice(index, 1);
		    boundedClickHandler_Knight.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Bishop": {
		  	let index = oBishops.findIndex( x => x.position===div2.id);
		    oBishops.splice(index, 1);
		    boundedClickHandler_Bishop.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Rook": {
		    let index = oRooks.findIndex( x => x.position===div2.id);
		    oRooks.splice(index, 1);
		    boundedClickHandler_Rook.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Queen": {
		    let index = oQueens.findIndex( x => x.position===div2.id);
		    oQueens.splice(index, 1);
		    boundedClickHandler_Queen.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "King": {
		    let index = oKings.findIndex( x => x.position===div2.id);
		    oKings.splice(index, 1);
		    boundedClickHandler_King.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  default: {
		    //console.log("Sin pieza capturada");
		    break;
			}
		}
		
		if (div1Color === "White") {
			div2.innerHTML = whiteBishop;
			div2.dataset.piece = "Bishop";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
		} else if (div1Color === "Black") {
			div2.innerHTML = blackBishop;
			div2.dataset.piece = "Bishop";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";
		}
	}

	lastMovedPiece.piece = div2.dataset.piece;
	lastMovedPiece.color = div2.dataset.pieceColor;
	lastMovedPiece.initialPosition = pos1;
	lastMovedPiece.finalPosition = pos2;

	//Remove gray events
	lista.forEach( el => document.getElementById(el).classList.remove("gray") );
	lista.forEach( (el,i) => {
		let element =document.getElementById(el);
		element.removeEventListener("click", boundedHandlerMove_Bishop[i]);
	});

	//Update sign
	cambiarTurno();
	//Update position
	let k = oBishops.findIndex( x => x.position===pos1);
	oBishops[k].position = pos2;
	
	//Remove pos1 event
	div1.removeEventListener("click", boundedClickHandler_Bishop[k]);
	
	//Update bounded function
	boundCH_Bishop();
	//Update rooks/queens list in case the bishop movement 'unlocks' a diagonal-column-row
	boundCH_Rook();
	boundCH_Queen();
	boundCH();
	boundCH_Knight();
	//Update lists to be ready for the recalculation of kings valid moves
	allPossibleMoves_W();
	allPossibleMoves_B();
	getSupportedBoxes();
	//Update kings valid moves
	boundCH_King();

	//Add enemy events
	if (div1Color === "White") {
		if ( allPossibleMovesW.includes(oKings[0].position) ) {
			oKings[0].check = true;
			boundCH_King();
			addEvents_Kings("Black");
		} else {
			addEventsPawns("Black");
			addEvents_Knights("Black");
			addEvents_Bishops("Black");
			addEvents_Rooks("Black");
			addEvents_Queens("Black");
			addEvents_Kings("Black");
		}
	} else if (div1Color === "Black") {
		if ( allPossibleMovesB.includes(oKings[1].position) ) {
			oKings[1].check = true;
			boundCH_King();
			addEvents_Kings("White");
		} else {
			addEventsPawns("White");
			addEvents_Knights("White");
			addEvents_Bishops("White");
			addEvents_Rooks("White");
			addEvents_Queens("White");
			addEvents_Kings("White");
		}
	}
}

function boundCH_Bishop(){
	for (let i = 0; i < oBishops.length; i++) {
		let element = document.getElementById(oBishops[i].position);
		let lista = oBishops[i].computeTarget();
		boundedClickHandler_Bishop[i] = clickHandler_Bishop.bind(null,lista,element);
	}
}

boundCH_Bishop();
addEvents_Bishops("White");
//----------------------------------------Eventos-Torre------------------------------------------
var boundedClickHandler_Rook = [];
var boundedHandlerMove_Rook = [];

function removeEvents_Rooks(position_Kn="All"){
	//Remove events except the indicated one
	for (let i = 0; i < oRooks.length; i++) {
		let element = document.getElementById(oRooks[i].position);
		if (oRooks[i].position!=position_Kn){
			element.removeEventListener("click", boundedClickHandler_Rook[i]);
			//console.log("RemovidoTorre1");	
		}
	}
	//Remove all Rook Events
	if (position_Kn === "All") {
		for (let i = 0; i < oRooks.length; i++) {
			let element = document.getElementById(oRooks[i].position);
			element.removeEventListener("click", boundedClickHandler_Rook[i]);
			//console.log("Removidas todas las torres");
		}
	}
}
function addEvents_Rooks(color_Kn){
	//Add events
	for (let i = 0; i < oRooks.length; i++) {
		let element = document.getElementById(oRooks[i].position);
		if (oRooks[i].color === color_Kn){
			element.addEventListener("click", boundedClickHandler_Rook[i]);
			//console.log("Agregados Torres")
		}
	}
}
let clickHandler_Rook = (lista,elemento) => {
	lista.forEach( el => document.getElementById(el).classList.toggle("gray") );
	removeOthers(elemento.id);
	removeEventsPawns();
	removeEvents_Knights();
	removeEvents_Bishops();
	removeEvents_Rooks(elemento.id);
	removeEvents_Queens();
	removeEvents_Kings();

	let listaCero = document.getElementById(lista[0]);
	if (listaCero===null) { 
		setFalse();
		addEventsPawns(elemento.dataset.pieceColor);
		addEvents_Knights(elemento.dataset.pieceColor);
		addEvents_Bishops(elemento.dataset.pieceColor);
		addEvents_Rooks(elemento.dataset.pieceColor);
		addEvents_Queens(elemento.dataset.pieceColor);
		addEvents_Kings(elemento.dataset.pieceColor);
		return;
	}

	if( listaCero.classList.contains("gray") ) {
		//console.log("Si hay gris");
		lista.forEach( (item,i) => {
			boundedHandlerMove_Rook[i] = handlerMove_Rook.bind(null,elemento.id,item,lista);
			let element = document.getElementById(item);
			element.addEventListener("click", boundedHandlerMove_Rook[i]);
		});
	} else {
		setFalse();
		addEventsPawns(elemento.dataset.pieceColor);
		addEvents_Knights(elemento.dataset.pieceColor);
		addEvents_Bishops(elemento.dataset.pieceColor);
		addEvents_Rooks(elemento.dataset.pieceColor);
		addEvents_Queens(elemento.dataset.pieceColor);
		addEvents_Kings(elemento.dataset.pieceColor);
		lista.forEach( (item,i) => {
			let element = document.getElementById(item);
			element.removeEventListener("click", boundedHandlerMove_Rook[i]);
		});
	}
}

let handlerMove_Rook = (pos1,pos2,lista) => {
	let div1 = document.getElementById(pos1);
	let div2 = document.getElementById(pos2);
	let areDiv1Div2Different = div1.dataset.pieceColor !== div2.dataset.pieceColor;
	let div1Color = div1.dataset.pieceColor;

	//Move Piece
	if(div2.dataset.isOccupied ==="false"){
	
		div1.innerHTML = "";
		div1.dataset.piece = "";
		div1.dataset.pieceColor = "";
		div1.dataset.isOccupied = "false";

		if (div1Color === "White") {
			div2.innerHTML = whiteRook;
			div2.dataset.piece = "Rook";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
		} else {
			div2.innerHTML = blackRook;
			div2.dataset.piece = "Rook";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";
		}
	//Capture Rival Piece 				
	} else if (div2.dataset.isOccupied ==="true" && areDiv1Div2Different) {
		
		div1.innerHTML = "";
		div1.dataset.piece = "";
		div1.dataset.pieceColor = "";
		div1.dataset.isOccupied = "false";

		let capturedPiece = div2.dataset.piece;
		switch (capturedPiece) {
		  case "Pawn": {
		  	let index = oPawns.findIndex( x => x.position===div2.id);
		    oPawns.splice(index, 1);
		    boundedClickHandler.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Knight": {
		    let index = oKnights.findIndex( x => x.position===div2.id);
		    oKnights.splice(index, 1);
		    boundedClickHandler_Knight.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Bishop": {
		  	let index = oBishops.findIndex( x => x.position===div2.id);
		    oBishops.splice(index, 1);
		    boundedClickHandler_Bishop.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Rook": {
		    let index = oRooks.findIndex( x => x.position===div2.id);
		    oRooks.splice(index, 1);
		    boundedClickHandler_Rook.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Queen": {
		    let index = oQueens.findIndex( x => x.position===div2.id);
		    oQueens.splice(index, 1);
		    boundedClickHandler_Queen.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "King": {
		    let index = oKings.findIndex( x => x.position===div2.id);
		    oKings.splice(index, 1);
		    boundedClickHandler_King.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  default: {
		    //console.log("Sin pieza capturada");
		    break;
			}
		}
		
		if (div1Color === "White") {
			div2.innerHTML = whiteRook;
			div2.dataset.piece = "Rook";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
		} else if (div1Color === "Black") {
			div2.innerHTML = blackRook;
			div2.dataset.piece = "Rook";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";
		}
	}

	lastMovedPiece.piece = div2.dataset.piece;
	lastMovedPiece.color = div2.dataset.pieceColor;
	lastMovedPiece.initialPosition = pos1;
	lastMovedPiece.finalPosition = pos2;

	//Remove gray events
	lista.forEach( el => document.getElementById(el).classList.remove("gray") );
	lista.forEach( (el,i) => {
		let element =document.getElementById(el);
		element.removeEventListener("click", boundedHandlerMove_Rook[i]);
	});

	//Update sign
	cambiarTurno();
	//Update position
	let k = oRooks.findIndex( x => x.position===pos1);
	oRooks[k].position = pos2;
	
	//Remove pos1 event
	div1.removeEventListener("click", boundedClickHandler_Rook[k]);
	
	//Update bounded function
	boundCH_Rook();
	//Update bishops/queens list in case the rook movement 'unlocks' a diagonal-column-row
	boundCH_Bishop();
	boundCH_Queen();
	boundCH();
	boundCH_Knight();
	//Update lists to be ready for the recalculation of kings valid moves
	allPossibleMoves_W();
	allPossibleMoves_B();
	getSupportedBoxes();
	//Update kings valid moves
	boundCH_King();

	//Add enemy events
	if (div1Color === "White") {
		if ( allPossibleMovesW.includes(oKings[0].position) ) {
			oKings[0].check = true;
			boundCH_King();
			addEvents_Kings("Black");
		} else {
			addEventsPawns("Black");
			addEvents_Knights("Black");
			addEvents_Bishops("Black");
			addEvents_Rooks("Black");
			addEvents_Queens("Black");
			addEvents_Kings("Black");
		}
	} else if (div1Color === "Black") {
		if ( allPossibleMovesB.includes(oKings[1].position) ) {
			oKings[1].check = true;
			boundCH_King();
			addEvents_Kings("White");
		} else {
			addEventsPawns("White");
			addEvents_Knights("White");
			addEvents_Bishops("White");
			addEvents_Rooks("White");
			addEvents_Queens("White");
			addEvents_Kings("White");
		}
	}
}

function boundCH_Rook(){
	for (let i = 0; i < oRooks.length; i++) {
		let element = document.getElementById(oRooks[i].position);
		let lista = oRooks[i].computeTarget();
		boundedClickHandler_Rook[i] = clickHandler_Rook.bind(null,lista,element);
	}
}

boundCH_Rook();
addEvents_Rooks("White");
//----------------------------------------Eventos-Reina------------------------------------------
var boundedClickHandler_Queen = [];
var boundedHandlerMove_Queen = [];

function removeEvents_Queens(position_Kn="All"){
	//Remove events except the indicated one
	for (let i = 0; i < oQueens.length; i++) {
		let element = document.getElementById(oQueens[i].position);
		if (oQueens[i].position!=position_Kn){
			element.removeEventListener("click", boundedClickHandler_Queen[i]);
			//console.log("RemovidoReina1");	
		}
	}
	//Remove all Queen Events
	if (position_Kn === "All") {
		for (let i = 0; i < oQueens.length; i++) {
			let element = document.getElementById(oQueens[i].position);
			element.removeEventListener("click", boundedClickHandler_Queen[i]);
			//console.log("Removidas todas las reinas");
		}
	}
}
function addEvents_Queens(color_Kn){
	//Add events
	for (let i = 0; i < oQueens.length; i++) {
		let element = document.getElementById(oQueens[i].position);
		if (oQueens[i].color === color_Kn){
			element.addEventListener("click", boundedClickHandler_Queen[i]);
			//console.log("Agregada Reina")
		}
	}
}
let clickHandler_Queen = (lista,elemento) => {
	lista.forEach( el => document.getElementById(el).classList.toggle("gray") );
	removeOthers(elemento.id);
	removeEventsPawns();
	removeEvents_Knights();
	removeEvents_Bishops();
	removeEvents_Rooks();
	removeEvents_Queens(elemento.id);
	removeEvents_Kings();

	let listaCero = document.getElementById(lista[0]);
	if (listaCero===null) { 
		setFalse();
		addEventsPawns(elemento.dataset.pieceColor);
		addEvents_Knights(elemento.dataset.pieceColor);
		addEvents_Bishops(elemento.dataset.pieceColor);
		addEvents_Rooks(elemento.dataset.pieceColor);
		addEvents_Queens(elemento.dataset.pieceColor);
		addEvents_Kings(elemento.dataset.pieceColor);
		return;
	}

	if( listaCero.classList.contains("gray") ) {
		//console.log("Si hay gris");
		lista.forEach( (item,i) => {
			boundedHandlerMove_Queen[i] = handlerMove_Queen.bind(null,elemento.id,item,lista);
			let element = document.getElementById(item);
			element.addEventListener("click", boundedHandlerMove_Queen[i]);
		});
	} else {
		setFalse();
		addEventsPawns(elemento.dataset.pieceColor);
		addEvents_Knights(elemento.dataset.pieceColor);
		addEvents_Bishops(elemento.dataset.pieceColor);
		addEvents_Rooks(elemento.dataset.pieceColor);
		addEvents_Queens(elemento.dataset.pieceColor);
		addEvents_Kings(elemento.dataset.pieceColor);
		lista.forEach( (item,i) => {
			let element = document.getElementById(item);
			element.removeEventListener("click", boundedHandlerMove_Queen[i]);
		});
	}
}

let handlerMove_Queen = (pos1,pos2,lista) => {
	let div1 = document.getElementById(pos1);
	let div2 = document.getElementById(pos2);
	let areDiv1Div2Different = div1.dataset.pieceColor !== div2.dataset.pieceColor;
	let div1Color = div1.dataset.pieceColor;

	//Move Piece
	if(div2.dataset.isOccupied ==="false"){
	
		div1.innerHTML = "";
		div1.dataset.piece = "";
		div1.dataset.pieceColor = "";
		div1.dataset.isOccupied = "false";

		if (div1Color === "White") {
			div2.innerHTML = whiteQueen;
			div2.dataset.piece = "Queen";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
		} else {
			div2.innerHTML = blackQueen;
			div2.dataset.piece = "Queen";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";
		}
	//Capture Rival Piece 				
	} else if (div2.dataset.isOccupied ==="true" && areDiv1Div2Different) {
		
		div1.innerHTML = "";
		div1.dataset.piece = "";
		div1.dataset.pieceColor = "";
		div1.dataset.isOccupied = "false";

		let capturedPiece = div2.dataset.piece;
		switch (capturedPiece) {
		  case "Pawn": {
		  	let index = oPawns.findIndex( x => x.position===div2.id);
		    oPawns.splice(index, 1);
		    boundedClickHandler.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Knight": {
		    let index = oKnights.findIndex( x => x.position===div2.id);
		    oKnights.splice(index, 1);
		    boundedClickHandler_Knight.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Bishop": {
		  	let index = oBishops.findIndex( x => x.position===div2.id);
		    oBishops.splice(index, 1);
		    boundedClickHandler_Bishop.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Rook": {
		    let index = oRooks.findIndex( x => x.position===div2.id);
		    oRooks.splice(index, 1);
		    boundedClickHandler_Rook.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Queen": {
		    let index = oQueens.findIndex( x => x.position===div2.id);
		    oQueens.splice(index, 1);
		    boundedClickHandler_Queen.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "King": {
		    let index = oKings.findIndex( x => x.position===div2.id);
		    oKings.splice(index, 1);
		    boundedClickHandler_King.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  default: {
		    //console.log("Sin pieza capturada");
		    break;
			}
		}
		
		if (div1Color === "White") {
			div2.innerHTML = whiteQueen;
			div2.dataset.piece = "Queen";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
		} else if (div1Color === "Black") {
			div2.innerHTML = blackQueen;
			div2.dataset.piece = "Queen";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";
		}
	}

	lastMovedPiece.piece = div2.dataset.piece;
	lastMovedPiece.color = div2.dataset.pieceColor;
	lastMovedPiece.initialPosition = pos1;
	lastMovedPiece.finalPosition = pos2;

	//Remove gray events
	lista.forEach( el => document.getElementById(el).classList.remove("gray") );
	lista.forEach( (el,i) => {
		let element =document.getElementById(el);
		element.removeEventListener("click", boundedHandlerMove_Queen[i]);
	});

	//Update sign
	cambiarTurno();
	//Update position
	let k = oQueens.findIndex( x => x.position===pos1);
	oQueens[k].position = pos2;
	
	//Remove pos1 event
	div1.removeEventListener("click", boundedClickHandler_Queen[k]);
	
	//Update bounded function
	boundCH_Queen();
	//Update bishops/rooks list in case the queen movement 'unlocks' a diagonal-column-row
	boundCH_Bishop();
	boundCH_Rook();
	boundCH();
	boundCH_Knight();
	//Update lists to be ready for the recalculation of kings valid moves
	allPossibleMoves_W();
	allPossibleMoves_B();
	getSupportedBoxes();
	//Update kings valid moves
	boundCH_King();

	//Add enemy events
	if (div1Color === "White") {
		if ( allPossibleMovesW.includes(oKings[0].position) ) {
			oKings[0].check = true;
			boundCH_King();
			addEvents_Kings("Black");
		} else {
			addEventsPawns("Black");
			addEvents_Knights("Black");
			addEvents_Bishops("Black");
			addEvents_Rooks("Black");
			addEvents_Queens("Black");
			addEvents_Kings("Black");			
		}
	} else if (div1Color === "Black") {
		if ( allPossibleMovesB.includes(oKings[1].position) ) {
			oKings[1].check = true;
			boundCH_King();
			addEvents_Kings("White");
		} else {
			addEventsPawns("White");
			addEvents_Knights("White");
			addEvents_Bishops("White");
			addEvents_Rooks("White");
			addEvents_Queens("White");
			addEvents_Kings("White");
		}
	}
}

function boundCH_Queen(){
	for (let i = 0; i < oQueens.length; i++) {
		let element = document.getElementById(oQueens[i].position);
		let lista = oQueens[i].computeTarget();
		boundedClickHandler_Queen[i] = clickHandler_Queen.bind(null,lista,element);
	}
}

boundCH_Queen();
addEvents_Queens("White");
//----------------------------------------Eventos-Rey------------------------------------------
var boundedClickHandler_King = [];
var boundedHandlerMove_King = [];

function removeEvents_Kings(position_Kn="All"){
	//Remove events except the indicated one
	for (let i = 0; i < oKings.length; i++) {
		let element = document.getElementById(oKings[i].position);
		if (oKings[i].position!=position_Kn){
			element.removeEventListener("click", boundedClickHandler_King[i]);
			//console.log("RemovidoRey1");	
		}
	}
	//Remove all King Events
	if (position_Kn === "All") {
		for (let i = 0; i < oKings.length; i++) {
			let element = document.getElementById(oKings[i].position);
			element.removeEventListener("click", boundedClickHandler_King[i]);
			//console.log("Removidos todos los reyes");
		}
	}
}
function addEvents_Kings(color_Kn){
	//Add events
	for (let i = 0; i < oKings.length; i++) {
		let element = document.getElementById(oKings[i].position);
		if (oKings[i].color === color_Kn){
			element.addEventListener("click", boundedClickHandler_King[i]);
			//console.log("Agregado Rey")
		}
	}
}
let clickHandler_King = (lista,elemento) => {
	
	lista.forEach( el => document.getElementById(el).classList.toggle("gray") );
	removeOthers(elemento.id);
	removeEventsPawns();
	removeEvents_Knights();
	removeEvents_Bishops();
	removeEvents_Rooks();
	removeEvents_Queens();
	removeEvents_Kings(elemento.id);

	let listaCero = document.getElementById(lista[0]);
	if (listaCero===null) { 
		if (elemento.dataset.pieceColor ==="Black" && oKings[0].check===true ||
			elemento.dataset.pieceColor ==="White" && oKings[1].check===true) return;
		setFalse();
		addEventsPawns(elemento.dataset.pieceColor);
		addEvents_Knights(elemento.dataset.pieceColor);
		addEvents_Bishops(elemento.dataset.pieceColor);
		addEvents_Rooks(elemento.dataset.pieceColor);
		addEvents_Queens(elemento.dataset.pieceColor);
		addEvents_Kings(elemento.dataset.pieceColor);
		return;
	}

	if( listaCero.classList.contains("gray") ) {
		//console.log("Si hay gris");
		lista.forEach( (item,i) => {
			boundedHandlerMove_King[i] = handlerMove_King.bind(null,elemento.id,item,lista);
			let element = document.getElementById(item);
			element.addEventListener("click", boundedHandlerMove_King[i]);
		});
	} else {
		lista.forEach( (item,i) => {
			let element = document.getElementById(item);
			element.removeEventListener("click", boundedHandlerMove_King[i]);
		});
		addEvents_Kings(elemento.dataset.pieceColor);
		if (elemento.dataset.pieceColor ==="Black" && oKings[0]._check===true ||
			elemento.dataset.pieceColor ==="White" && oKings[1]._check===true) return;
		setFalse();
		addEventsPawns(elemento.dataset.pieceColor);
		addEvents_Knights(elemento.dataset.pieceColor);
		addEvents_Bishops(elemento.dataset.pieceColor);
		addEvents_Rooks(elemento.dataset.pieceColor);
		addEvents_Queens(elemento.dataset.pieceColor);
	}
}

let handlerMove_King = (pos1,pos2,lista) => {
	let div1 = document.getElementById(pos1);
	let div2 = document.getElementById(pos2);
	let areDiv1Div2Different = div1.dataset.pieceColor !== div2.dataset.pieceColor;
	let div1Color = div1.dataset.pieceColor;

	//Move Piece
	if(div2.dataset.isOccupied ==="false"){
	
		div1.innerHTML = "";
		div1.dataset.piece = "";
		div1.dataset.pieceColor = "";
		div1.dataset.isOccupied = "false";

		if (div1Color === "White") {
			div2.innerHTML = whiteKing;
			div2.dataset.piece = "King";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
		} else {
			div2.innerHTML = blackKing;
			div2.dataset.piece = "King";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";
		}
	//Capture Rival Piece 				
	} else if (div2.dataset.isOccupied ==="true" && areDiv1Div2Different) {
		
		div1.innerHTML = "";
		div1.dataset.piece = "";
		div1.dataset.pieceColor = "";
		div1.dataset.isOccupied = "false";

		let capturedPiece = div2.dataset.piece;
		switch (capturedPiece) {
		  case "Pawn": {
		  	let index = oPawns.findIndex( x => x.position===div2.id);
		    oPawns.splice(index, 1);
		    boundedClickHandler.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Knight": {
		    let index = oKnights.findIndex( x => x.position===div2.id);
		    oKnights.splice(index, 1);
		    boundedClickHandler_Knight.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Bishop": {
		  	let index = oBishops.findIndex( x => x.position===div2.id);
		    oBishops.splice(index, 1);
		    boundedClickHandler_Bishop.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Rook": {
		    let index = oRooks.findIndex( x => x.position===div2.id);
		    oRooks.splice(index, 1);
		    boundedClickHandler_Rook.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "Queen": {
		    let index = oQueens.findIndex( x => x.position===div2.id);
		    oQueens.splice(index, 1);
		    boundedClickHandler_Queen.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  case "King": {
		    let index = oKings.findIndex( x => x.position===div2.id);
		    oKings.splice(index, 1);
		    boundedClickHandler_King.splice(index, 1);
		    if (div1Color==="White") {
		    	let j = blackPieces.findIndex( x => x.position===div2.id);
		    	blackPieces.splice(j,1);
		    } else if(div1Color==="Black"){
		    	let j = whitePieces.findIndex( x => x.position===div2.id);
		    	whitePieces.splice(j,1);
		    }
		    break;
			}
		  default: {
		    //console.log("Sin pieza capturada");
		    break;
			}
		}
		
		if (div1Color === "White") {
			div2.innerHTML = whiteKing;
			div2.dataset.piece = "King";
			div2.dataset.pieceColor = "White";
			div2.dataset.isOccupied = "true";
		} else if (div1Color === "Black") {
			div2.innerHTML = blackKing;
			div2.dataset.piece = "King";
			div2.dataset.pieceColor = "Black";
			div2.dataset.isOccupied = "true";
		}
	}

	lastMovedPiece.piece = div2.dataset.piece;
	lastMovedPiece.color = div2.dataset.pieceColor;
	lastMovedPiece.initialPosition = pos1;
	lastMovedPiece.finalPosition = pos2;

	//Remove gray events
	lista.forEach( el => document.getElementById(el).classList.remove("gray") );
	lista.forEach( (el,i) => {
		let element =document.getElementById(el);
		element.removeEventListener("click", boundedHandlerMove_King[i]);
	});

	//Update sign
	cambiarTurno();
	//Update position
	let k = oKings.findIndex( x => x.position===pos1);
	oKings[k].position = pos2;
	//Update 'check' status
	oKings[k].check = false;
	//Remove pos1 event
	div1.removeEventListener("click", boundedClickHandler_King[k]);
	
	//Update lists to be ready for the recalculation of kings valid moves
	allPossibleMoves_W();
	allPossibleMoves_B();
	getSupportedBoxes();
	//Update bishops/rooks/queens list in case the King movement 'unlocks' a diagonal-column-row
	boundCH_Bishop();
	boundCH_Rook();
	boundCH_Queen();
	boundCH();
	boundCH_Knight();
	//Update bounded function
	boundCH_King();

	//Add enemy events
	if (div1Color === "White") {
		if ( allPossibleMovesW.includes(oKings[0].position) ) {
			oKings[0].check = true;
			boundCH_King();
			addEvents_Kings("Black");
		} else {
			addEventsPawns("Black");
			addEvents_Knights("Black");
			addEvents_Bishops("Black");
			addEvents_Rooks("Black");
			addEvents_Queens("Black");
			addEvents_Kings("Black");
		}
	} else if (div1Color === "Black") {
		if ( allPossibleMovesB.includes(oKings[1].position) ) {
			oKings[1].check = true;
			boundCH_King();
			addEvents_Kings("White");
		} else {
			addEventsPawns("White");
			addEvents_Knights("White");
			addEvents_Bishops("White");
			addEvents_Rooks("White");
			addEvents_Queens("White");
			addEvents_Kings("White");
		}
	}
}

function boundCH_King(){
	let element = document.getElementById(oKings[0].position);
	let lista = oKings[0].computeTarget(allPossibleMovesW,supportedBoxesW);
	boundedClickHandler_King[0] = clickHandler_King.bind(null,lista,element);

	let element2 = document.getElementById(oKings[1].position);
	let lista2 = oKings[1].computeTarget(allPossibleMovesB,supportedBoxesB);
	boundedClickHandler_King[1] = clickHandler_King.bind(null,lista2,element2);
}

boundCH_King();
addEvents_Kings("White");
//=======================================Modal Promocion===========================================
acceptButton.addEventListener('click',() => { closeModal(modal1) });
acceptButton2.addEventListener('click',() => { closeModal2(modal2) });

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  let type = document.querySelector('input[name="pieza"]:checked').value;
  _promote(type);
}

function closeModal2(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  let type = document.querySelector('input[name="pieza2"]:checked').value;
  _promote(type);
}
//-------------------------------------------------------------------------------------------------
async function pawnPromotion(color) {
	var piezaS1;
	if(color==="White") { 
		openModal(modal1)
	} else {
		openModal(modal2)
	}
	var promise = new Promise( (resolve) => { _promote = resolve} );
	await promise.then( (result) => { piezaS1=result} );
	return piezaS1;
}
//-------------------------------------------------------------------------------------------------
function getPiecesByColor(){
	oPawns.forEach( (pawn) => {
		if ( pawn.color === "White" ) whitePieces.push( pawn )
		else blackPieces.push( pawn )
	});
	oKnights.forEach( (knight) => {
		if ( knight.color === "White" ) whitePieces.push( knight )
		else blackPieces.push( knight )
	});
	oBishops.forEach( (bishop) => {
		if ( bishop.color === "White" ) whitePieces.push( bishop )
		else blackPieces.push( bishop )
	});
	oRooks.forEach( (rook) => {
		if ( rook.color === "White" ) whitePieces.push( rook )
		else blackPieces.push( rook )
	});
	oQueens.forEach( (queen) => {
		if ( queen.color === "White" ) whitePieces.push( queen )
		else blackPieces.push( queen )
	});
	oKings.forEach( (king) => {
		if ( king.color === "White" ) whitePieces.push( king )
		else blackPieces.push( king )
	});
}

function allPossibleMoves_W(){
	allPossibleMovesW = [];
	whitePieces.forEach( (item) => {
		if (item.type === "Pawn") {
			 allPossibleMovesW = allPossibleMovesW.concat( item.computeAttack() )
		} else if (item.type === "King"){
			allPossibleMovesW = allPossibleMovesW.concat( item.computeTarget(allPossibleMovesB,supportedBoxesB) )
		} else {
			allPossibleMovesW = allPossibleMovesW.concat( item.computeTarget() )
		}
	});
}

function allPossibleMoves_B(){
	allPossibleMovesB = [];
	blackPieces.forEach( (item) => {
		if (item.type === "Pawn"){
			allPossibleMovesB = allPossibleMovesB.concat( item.computeAttack() )
		} else if (item.type === "King"){
			allPossibleMovesB = allPossibleMovesB.concat( item.computeTarget(allPossibleMovesW,supportedBoxesW) )
		} else {
			allPossibleMovesB = allPossibleMovesB.concat( item.computeTarget() )
		}
	});
}
//-----------------------------Compute Supported Attack to the King--------------------------------
function getSupportedBoxes(){
	supportedBoxesB = [];
	oKings[1].sorroundings.forEach( (x) => {
	let xDiv = document.getElementById(x);
	if (xDiv.dataset.pieceColor === "Black") {
		if ( isBacked(x,"Black") ) supportedBoxesB.push(x)
	}
	});

	supportedBoxesW = [];
	oKings[0].sorroundings.forEach( (x) => {
	let xDiv = document.getElementById(x);
	if (xDiv.dataset.pieceColor === "White") {
		if ( isBacked(x,"White") ) supportedBoxesW.push(x)
	}
	});
}


function isBacked(id, color) {

	//BISHOPS AND QUEENS
	//Upper Left Diagonal
	let i = id[1];
	let j = columns.indexOf(id[0]) + 1;
	i++;
	j--;
	let next="" + columns[j-1] + i;
	let n=document.getElementById(next);
	while ( i<9 && j>0 && i>0 && j<9 ) {
		if (n.dataset.isOccupied === "false") {
			i++;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			continue;
		}
		if (n.dataset.pieceColor === color && (n.dataset.piece==="Bishop" || n.dataset.piece==="Queen")) {
			return true;
		}
		i++;
		j--;
		next="" + columns[j-1] + i;
		n=document.getElementById(next); 
	}

	//Upper Right Diagonal
	i = id[1];
	j = columns.indexOf(id[0]) + 1;
	i++;
	j++;
	next="" + columns[j-1] + i;
	n=document.getElementById(next);
	while ( i<9 && j>0 && i>0 && j<9) {
		if (n.dataset.isOccupied === "false") {
			i++;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			continue;
		}
		if (n.dataset.pieceColor===color && (n.dataset.piece==="Bishop" || n.dataset.piece==="Queen")) {
			return true;
		}
		i++;
		j++;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
	}

	//Lower Left Diagonal
	i = id[1];
	j = columns.indexOf(id[0]) + 1;
	i--;
	j--;
	next="" + columns[j-1] + i;
	n=document.getElementById(next);
	while ( i<9 && j>0 && i>0 && j<9 ) {
		if (n.dataset.isOccupied === "false") {
			i--;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			continue;
		}
		if (n.dataset.pieceColor===color && (n.dataset.piece==="Bishop" || n.dataset.piece==="Queen")) {
			return true;
		}
		i--;
		j--;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
	}

	//Lower Right Diagonal
	i = id[1];
	j = columns.indexOf(id[0]) + 1;
	i--;
	j++;
	next="" + columns[j-1] + i;
	n=document.getElementById(next);
	while ( i<9 && j>0 && i>0 && j<9 ) {
		if (n.dataset.isOccupied === "false") {
			i--;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			continue;
		}
		if (n.dataset.pieceColor===color && (n.dataset.piece==="Bishop" || n.dataset.piece==="Queen")) {
			return true;
		}
		i--;
		j++;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
	}

	//ROOKS AND QUEENS
	//Up
	i = id[1];
	j = columns.indexOf(id[0]) + 1;
	i++;
	next="" + columns[j-1] + i;
	n=document.getElementById(next);
	while ( i<9 && j>0 && i>0 && j<9 ) {
		if (n.dataset.isOccupied === "false") {
			i++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			continue;
		}
		if (n.dataset.pieceColor===color && (n.dataset.piece==="Rook" || n.dataset.piece==="Queen")) {
			return true;
		}
		i++;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
	}

	//Right
	i = id[1];
	j = columns.indexOf(id[0]) + 1;
	j++;
	next="" + columns[j-1] + i;
	n=document.getElementById(next);
	while ( i<9 && j>0 && i>0 && j<9 ) {
		if (n.dataset.isOccupied === "false") {
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			continue;
		}
		if (n.dataset.pieceColor===color && (n.dataset.piece==="Rook" || n.dataset.piece==="Queen")) {
			return true;
		}
		j++;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
	}

	//Down
	i = id[1];
	j = columns.indexOf(id[0]) + 1;
	i--;
	next="" + columns[j-1] + i;
	n=document.getElementById(next);
	while ( i<9 && j>0 && i>0 && j<9 ) {
		if (n.dataset.isOccupied === "false") {
			i--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			continue;
		}
		if (n.dataset.pieceColor===color && (n.dataset.piece==="Rook" || n.dataset.piece==="Queen")) {
			return true;
		}
		i--;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
	}

	//Left
	i = id[1];
	j = columns.indexOf(id[0]) + 1;
	j--;
	next="" + columns[j-1] + i;
	n=document.getElementById(next);
	while ( i<9 && j>0 && i>0 && j<9 ) {
		if (n.dataset.isOccupied === "false") {
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			continue;
		}
		if (n.dataset.pieceColor===color && (n.dataset.piece==="Rook" || n.dataset.piece==="Queen")) {
			return true;
		}
		j--;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
	}

	//KNIGHTS
	//Upper side
	i = id[1];
	j = columns.indexOf(id[0]) + 1;
	if (j-1 > 0 && j-1 < 9 && parseInt(i)+2 > 0 && parseInt(i)+2 < 9) { 
		let upper1 = "" + columns[j-2] + (parseInt(i) + 2);
		let u1 = document.getElementById(upper1);
		if(u1.dataset.pieceColor === color && u1.dataset.piece === "Knight"){
			return true;
		}
	}
	if (j+1 > 0 && j+1 < 9 && parseInt(i)+2 > 0 && parseInt(i)+2 < 9) { 
		let upper2 = "" + columns[j-0] + (parseInt(i) + 2);
		let u2 = document.getElementById(upper2);
		if(u2.dataset.pieceColor === color && u2.dataset.piece === "Knight"){
			return true;
		}
	}
	if (j-2 > 0 && j-2 < 9 && parseInt(i)+1 > 0 && parseInt(i)+1 < 9) { 
		let upper3 = "" + columns[j-3] + (parseInt(i) + 1);
		let u3 = document.getElementById(upper3);
		if(u3.dataset.pieceColor === color && u3.dataset.piece === "Knight"){
			return true;
		}
	}
	if (j+2 > 0 && j+2 < 9 && parseInt(i)+1 > 0 && parseInt(i)+1 < 9) { 
		let upper4 = "" + columns[j+1] + (parseInt(i) + 1);
		let u4 = document.getElementById(upper4);
		if (u4.dataset.pieceColor === color && u4.dataset.piece === "Knight") {
			return true;
		}
	}
	//Lower side
	if (j-1 > 0 && j-1 < 9 && parseInt(i)-2 > 0 && parseInt(i)-2 < 9) { 
		let lower1 =  "" + columns[j-2] + (parseInt(i) - 2);
		let l1 = document.getElementById(lower1);
		if (l1.dataset.pieceColor === color && l1.dataset.piece === "Knight") {
			return true;
		}
	}
	if (j+1 > 0 && j+1 < 9 && parseInt(i)-2 > 0 && parseInt(i)-2 < 9) { 
		let lower2 =  "" + columns[j-0] + (parseInt(i) - 2);
		let l2 = document.getElementById(lower2);
		if (l2.dataset.pieceColor === color && l2.dataset.piece === "Knight") {
			return true;
		}
	}
	if (j-2 > 0 && j-2 < 9 && parseInt(i)-1 > 0 && parseInt(i)-1 < 9) { 
		let lower3 =  "" + columns[j-3] + (parseInt(i) - 1);
		let l3 = document.getElementById(lower3);
		if (l3.dataset.pieceColor === color && l3.dataset.piece === "Knight") {
			return true;
		}
	}
	if (j+2 > 0 && j+2 < 9 && parseInt(i)-1 > 0 && parseInt(i)-1 < 9) { 
		let lower4 =  "" + columns[j+1] + (parseInt(i) - 1);
		let l4 = document.getElementById(lower4);
		if (l4.dataset.pieceColor === color && l4.dataset.piece === "Knight") {
			return true;
		}
	}

	//PAWNS
	i = id[1];
	j = columns.indexOf(id[0]) + 1;
	if(color == "Black" && j > 0 && j < 9 && i > 0 && i < 9){	
		if (j !== 1 ){
			let diagonal1="" + columns[j-2] + (parseInt(i) + 1);
			let d1=document.getElementById(diagonal1);
			if (d1.dataset.pieceColor === color && d1.dataset.piece === "Pawn") return true;
		}
		if (j !== 8 ){
			let diagonal2="" + columns[j] + (parseInt(i) + 1);
			let d2=document.getElementById(diagonal2);
			if (d2.dataset.pieceColor === color && d2.dataset.piece === "Pawn") return true;		
		}
	} else if(color == "White" && j > 0 && j < 9 && i > 0 && i < 9) {
		if (j !== 1 ){
			let diagonal1="" + columns[j-2] + (parseInt(i) - 1);
			let d1=document.getElementById(diagonal1);
			if (d1.dataset.pieceColor === color && d1.dataset.piece === "Pawn") return true;					
		}
		if (j !== 8 ){
			let diagonal2="" + columns[j] + (parseInt(i) - 1);
			let d2=document.getElementById(diagonal2);
			if (d2.dataset.pieceColor === color && d2.dataset.piece === "Pawn") return true;
		}	
	}

	//KING
	//Up-Left
	i = id[1];
	j = columns.indexOf(id[0]) + 1;
	let upLeft = "" + columns[j-2] + (parseInt(i) + 1);
	let uL = document.getElementById(upLeft);
	if (j-1 > 0 && j-1 < 9 && parseInt(i)+1 > 0 && parseInt(i)+1 < 9) {
		if(uL.dataset.pieceColor === color && uL.dataset.piece === "King") return true;
	}
		
	//Up
	let up = "" + columns[j-1] + (parseInt(i) + 1);
	let u = document.getElementById(up);
	if (j > 0 && j < 9 && parseInt(i)+1 > 0 && parseInt(i)+1 < 9) {
		if(u.dataset.pieceColor === color && u.dataset.piece === "King" ) return true;
	}
	//Up-Right
	let upRight = "" + columns[j] + (parseInt(i) + 1);
	let uR = document.getElementById(upRight);
	if (j+1 > 0 && j+1 < 9 && parseInt(i)+1 > 0 && parseInt(i)+1 < 9) {
		if(uR.dataset.pieceColor === color && uR.dataset.piece === "King") return true;
		
	}

	//Left
	let left = "" + columns[j-2] + (parseInt(i));
	let l = document.getElementById(left);
	if (j-1 > 0 && j-1 < 9 && parseInt(i) > 0 && parseInt(i) < 9) {
		if(l.dataset.pieceColor === color && l.dataset.piece === "King") return true;
	}

	//Right
	let right = "" + columns[j] + (parseInt(i));
	let r = document.getElementById(right);
	if (j+1 > 0 && j+1 < 9 && parseInt(i) > 0 && parseInt(i) < 9) {
		if(r.dataset.pieceColor === color && r.dataset.piece === "King") return true;
	}

	//Down-Left
	let downLeft = "" + columns[j-2] + (parseInt(i) - 1);
	let dL = document.getElementById(downLeft);
	if (j-1 > 0 && j-1 < 9 && parseInt(i)-1 > 0 && parseInt(i)-1 < 9) {		
		if(dL.dataset.pieceColor === color && dL.dataset.piece === "King") return true;
	}

	//Down
	let down = "" + columns[j-1] + (parseInt(i) - 1);
	let d = document.getElementById(down);
	if (j > 0 && j < 9 && parseInt(i)-1 > 0 && parseInt(i)-1 < 9) {
		if(d.dataset.pieceColor === color && d.dataset.piece === "King") return true;
	}

	//Down-Right
	let downRight = "" + columns[j] + (parseInt(i) - 1);
	let dR = document.getElementById(downRight);
	if (j+1 > 0 && j+1 < 9 && parseInt(i)-1 > 0 && parseInt(i)-1 < 9) { 
		if(dR.dataset.pieceColor === color && dR.dataset.piece === "King") return true;
	}

	return false;
}
