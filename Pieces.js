//-------------------------------------------Classes-----------------------------------------------
const colors = ["White","Black"]; 
const directions = ["positive","negative"]
const columns = ["A","B","C","D","E","F","G","H"];
//---------------------------------------------Peon------------------------------------------------
export class Pawn{
	constructor (_position,_isColorWhite) {
		this.movesHistory = []
		this.position = _position;
		this.col = _position[0];
		this.colN = columns.indexOf(_position[0]) + 1;
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
		this.type = "Pawn";
	}

	get col()  {	return this._col;	}
	get colN() { 	return this._colN;	}
	get row()  {	return this._row;	}
	get position() { return this._position;	}

	set col(newCol)	  {	this._col = newCol;	  }
	set colN(newColN) {	this._colN = newColN; }
	set row(newRow)   {	this._row = newRow;	  }
	set position(newPos) {	
		this._position = newPos;
		this._col = newPos[0];	
		this._colN = columns.indexOf(newPos[0]) + 1;
		this._row = newPos[1];

		this.movesHistory.push(newPos);
		this.hasBeenMoved = true;	
	}


	computeTarget(oPawns,lastMovedPiece) {
		if(this.color == "White" && this.colN > 0 && this.colN < 9 && this.row > 0 && this.row < 9){
			let computedTiles = [];
			if (parseInt(this.row) === 8) {
				return computedTiles;
			}
			let next="" + columns[this.colN-1] + (parseInt(this.row) + 1);
			let next2="" + columns[this.colN-1] + (parseInt(this.row) + 2);
			let n=document.getElementById(next);
			let n2=document.getElementById(next2);
			
			if(n.dataset.isOccupied === "false"){
				computedTiles.push(next);
			}
			if(this.hasBeenMoved == false && n.dataset.isOccupied === "false" && n2.dataset.isOccupied === "false"){
				computedTiles.push(next2);
			}
			
			if (this.colN !== 1 ){
				let diagonal1="" + columns[this.colN-2] + (parseInt(this.row) + 1);
				let d1=document.getElementById(diagonal1);
				if (d1.dataset.isOccupied === "true" && d1.dataset.pieceColor==="Black"){
					computedTiles.push(diagonal1);
				}
			}
			if (this.colN !== 8 ){
				let diagonal2="" + columns[this.colN] + (parseInt(this.row) + 1);
				let d2=document.getElementById(diagonal2);
				if (d2.dataset.isOccupied === "true" && d2.dataset.pieceColor==="Black" && this.colN!==8){	
					computedTiles.push(diagonal2);
				}
			}
			//Captura al paso
			//Izquerda
			if (parseInt(this.row) === 5 && this.colN !== 1 ){
				let diagonalLeft="" + columns[this.colN-2] + (parseInt(this.row) + 1);
				let dL=document.getElementById(diagonalLeft);
				let left="" + columns[this.colN-2] + (parseInt(this.row));
				let l=document.getElementById(left);
		 		if (l.dataset.piece === "Pawn" && l.dataset.pieceColor==="Black"){
		 			let n = oPawns.findIndex( x => x.position===left);
		 			let origin = "" + columns[this.colN-2] + (parseInt(this.row)+2);
		 			if (oPawns[n].movesHistory[0]===origin && 
		 				oPawns[n].movesHistory[1]===left && 
		 				lastMovedPiece.piece==="Pawn" &&
		 				lastMovedPiece.color==="Black" &&
		 				lastMovedPiece.initialPosition===origin) {
		 				computedTiles.push( diagonalLeft );
		 			}
				}
			}
			//Derecha
			if (parseInt(this.row) === 5 && this.colN !== 8 ){
				let diagonalRight="" + columns[this.colN] + (parseInt(this.row) + 1);
				let dR=document.getElementById(diagonalRight);
				let right="" + columns[this.colN] + (parseInt(this.row));
				let r=document.getElementById(right);
		 		if (r.dataset.piece === "Pawn" && r.dataset.pieceColor==="Black"){
		 			let n = oPawns.findIndex( x => x.position===right);
		 			let origin = "" + columns[this.colN] + (parseInt(this.row)+2);
		 			if (oPawns[n].movesHistory[0]===origin && 
		 				oPawns[n].movesHistory[1]===right && 
		 				lastMovedPiece.piece==="Pawn" &&
		 				lastMovedPiece.color==="Black" &&
		 				lastMovedPiece.initialPosition===origin) {
		 				computedTiles.push( diagonalRight );
		 			}
				}
			}
			return computedTiles;

		} else {
			if(this.color == "Black" && this.colN > 0 && this.colN < 9 && this.row > 0 && this.row < 9){
				let computedTiles = [];
				if (parseInt(this.row) === 1) {
					return computedTiles;
				}
				let next="" + columns[this.colN-1] + (parseInt(this.row) - 1);
				let next2="" + columns[this.colN-1] + (parseInt(this.row) - 2);
				let n=document.getElementById(next);
				let n2=document.getElementById(next2);
				
				if(n.dataset.isOccupied === "false"){
					computedTiles.push(next);
				}
				if(this.hasBeenMoved == false && n.dataset.isOccupied === "false" && n2.dataset.isOccupied === "false"){
					computedTiles.push(next2);
				}
				
				if (this.colN !== 1 ){
					let diagonal1="" + columns[this.colN-2] + (parseInt(this.row) - 1);
					let d1=document.getElementById(diagonal1);
					if (d1.dataset.isOccupied === "true" && d1.dataset.pieceColor==="White"){
						computedTiles.push(diagonal1);
					}
				}
				if (this.colN !== 8 ){
					let diagonal2="" + columns[this.colN] + (parseInt(this.row) - 1);
					let d2=document.getElementById(diagonal2);
					if (d2.dataset.isOccupied === "true" && d2.dataset.pieceColor==="White" && this.colN!==8){	
						computedTiles.push(diagonal2);
					}
				}
				//Captura al paso
				//Izquerda
				if (parseInt(this.row) === 4 && this.colN !== 1 ){
					let diagonalLeft="" + columns[this.colN-2] + (parseInt(this.row) - 1);
					let dL=document.getElementById(diagonalLeft);
					let left="" + columns[this.colN-2] + (parseInt(this.row));
					let l=document.getElementById(left);
			 		if (l.dataset.piece === "Pawn" && l.dataset.pieceColor==="White"){
			 			let n = oPawns.findIndex( x => x.position===left);
			 			let origin = "" + columns[this.colN-2] + (parseInt(this.row)-2);
			 			if (oPawns[n].movesHistory[0]===origin && 
			 				oPawns[n].movesHistory[1]===left && 
		 					lastMovedPiece.piece==="Pawn" &&
		 					lastMovedPiece.color==="White" &&
		 					lastMovedPiece.initialPosition===origin) {
			 				computedTiles.push( diagonalLeft );
			 			}
					}
				}
				//Derecha
				if (parseInt(this.row) === 4 && this.colN !== 8 ){
					let diagonalRight="" + columns[this.colN] + (parseInt(this.row) - 1);
					let dR=document.getElementById(diagonalRight);
					let right="" + columns[this.colN] + (parseInt(this.row));
					let r=document.getElementById(right);
			 		if (r.dataset.piece === "Pawn" && r.dataset.pieceColor==="White"){
			 			let n = oPawns.findIndex( x => x.position===right);
			 			let origin = "" + columns[this.colN] + (parseInt(this.row)-2);
			 			if (oPawns[n].movesHistory[0]===origin && 
			 				oPawns[n].movesHistory[1]===right && 
		 					lastMovedPiece.piece==="Pawn" &&
		 					lastMovedPiece.color==="White" &&
		 					lastMovedPiece.initialPosition===origin) {
			 				computedTiles.push( diagonalRight );
			 			}
					}
				}
				return computedTiles;
			}
		}
	}

	//Possible attacks to the king
	computeAttack(){
		if(this.color == "White" && this.colN > 0 && this.colN < 9 && this.row > 0 && this.row < 9){
			let computedTiles = [];
			if (parseInt(this.row) === 8) {
				return computedTiles;
			}
			
			if (this.colN !== 1 ){
				let diagonal1="" + columns[this.colN-2] + (parseInt(this.row) + 1);
				let d1=document.getElementById(diagonal1);
				computedTiles.push(diagonal1);
			}
			if (this.colN !== 8 ){
				let diagonal2="" + columns[this.colN] + (parseInt(this.row) + 1);
				let d2=document.getElementById(diagonal2);
				computedTiles.push(diagonal2);				
			}
			return computedTiles;

		} else {
			if(this.color == "Black" && this.colN > 0 && this.colN < 9 && this.row > 0 && this.row < 9){
				let computedTiles = [];
				if (parseInt(this.row) === 1) {
					return computedTiles;
				}
				
				if (this.colN !== 1 ){
					let diagonal1="" + columns[this.colN-2] + (parseInt(this.row) - 1);
					let d1=document.getElementById(diagonal1);
					computedTiles.push(diagonal1);					
				}
				if (this.colN !== 8 ){
					let diagonal2="" + columns[this.colN] + (parseInt(this.row) - 1);
					let d2=document.getElementById(diagonal2);
					computedTiles.push(diagonal2);
				}
				
				return computedTiles;
			}
		}
	}

 }

//--------------------------------------------Torre------------------------------------------------
export class Rook{
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
		this.type = "Rook";
	}

	get col()  {	return this._col;	}
	get colN() { 	return this._colN;	}
	get row()  {	return this._row;	}
	get position() { return this._position;	}

	set col(newCol)	  {	this._col = newCol;	  }
	set colN(newColN) {	this._colN = newColN; }
	set row(newRow)   {	this._row = newRow;	  }
	set position(newPos) {	
		this._position = newPos;
		this._col = newPos[0];	
		this._colN = columns.indexOf(newPos[0]) + 1;
		this._row = newPos[1];
		
		this.hasBeenMoved = true;
	}

	computeTarget(){
		let validMoves = [];

		//Up
		let i = this.row;
		let j = this.colN;
		i++;
		while (i<9) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else {
				break;
			}
			i++;
		}

		//Right
		i = this.row;
		j = this.colN;
		j++;
		while (j<9) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else {
				break;
			}
			j++;
		}

		//Down
		i = this.row; 
		j = this.colN;
		i--;
		while (i>0) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else{
				break;
			}
			i--;
		}

		//Left
		i = this.row;
		j = this.colN;
		j--;
		while (j>0) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else {
				break;
			}
			j--;
		}

		return validMoves;
	}
}
//--------------------------------------------Caballo----------------------------------------------
export class Knight{
	constructor (_position,_isColorWhite) {
		this.position = _position;
		this.col = _position[0];
		this.colN = columns.indexOf(_position[0]) + 1;
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
		this.type = "Knight";
	}

	get col()  {	return this._col;	}
	get colN() { 	return this._colN;	}
	get row()  {	return this._row;	}
	get position() { return this._position;	}

	set col(newCol)	  {	this._col = newCol;	  }
	set colN(newColN) {	this._colN = newColN; }
	set row(newRow)   {	this._row = newRow;	  }
	set position(newPos) {	
		this._position = newPos;
		this._col = newPos[0];	
		this._colN = columns.indexOf(newPos[0]) + 1;
		this._row = newPos[1];
	}


	computeTarget(){
			let validMoves = [];
			//Upper side
			if (this.colN-1 > 0 && this.colN-1 < 9 && parseInt(this.row)+2 > 0 && parseInt(this.row)+2 < 9) { 
				let upper1 = "" + columns[this.colN-2] + (parseInt(this.row) + 2);
				let u1 = document.getElementById(upper1);
				if(u1.dataset.isOccupied === "false" || u1.dataset.pieceColor === this.enemyColor){
					validMoves.push ( upper1 );
				}
			}
			if (this.colN+1 > 0 && this.colN+1 < 9 && parseInt(this.row)+2 > 0 && parseInt(this.row)+2 < 9) { 
				let upper2 = "" + columns[this.colN-0] + (parseInt(this.row) + 2);
				let u2 = document.getElementById(upper2);
				if(u2.dataset.isOccupied === "false" || u2.dataset.pieceColor === this.enemyColor){
					validMoves.push ( upper2 );
				}
			}
			if (this.colN-2 > 0 && this.colN-2 < 9 && parseInt(this.row)+1 > 0 && parseInt(this.row)+1 < 9) { 
				let upper3 = "" + columns[this.colN-3] + (parseInt(this.row) + 1);
				let u3 = document.getElementById(upper3);
				if(u3.dataset.isOccupied === "false" || u3.dataset.pieceColor === this.enemyColor){
					validMoves.push ( upper3 );
				}
			}
			if (this.colN+2 > 0 && this.colN+2 < 9 && parseInt(this.row)+1 > 0 && parseInt(this.row)+1 < 9) {
				let upper4 = "" + columns[this.colN+1] + (parseInt(this.row) + 1);
				let u4 = document.getElementById(upper4);
				if (u4.dataset.isOccupied === "false" || u4.dataset.pieceColor === this.enemyColor) {
					validMoves.push ( upper4 );
				}
			}
			//Lower side
			if (this.colN-1 > 0 && this.colN-1 < 9 && parseInt(this.row)-2 > 0 && parseInt(this.row)-2 < 9) { 
				let lower1 =  "" + columns[this.colN-2] + (parseInt(this.row) - 2);
				let l1 = document.getElementById(lower1);
				if (l1.dataset.isOccupied === "false" || l1.dataset.pieceColor=== this.enemyColor) {
					validMoves.push ( lower1 );
				}
			}
			if (this.colN+1 > 0 && this.colN+1 < 9 && parseInt(this.row)-2 > 0 && parseInt(this.row)-2 < 9) { 
				let lower2 =  "" + columns[this.colN-0] + (parseInt(this.row) - 2);
				let l2 = document.getElementById(lower2);
				if (l2.dataset.isOccupied === "false" || l2.dataset.pieceColor=== this.enemyColor) {
					validMoves.push ( lower2 );
				}
			}
			if (this.colN-2 > 0 && this.colN-2 < 9 && parseInt(this.row)-1 > 0 && parseInt(this.row)-1 < 9) { 
				let lower3 =  "" + columns[this.colN-3] + (parseInt(this.row) - 1);
				let l3 = document.getElementById(lower3);
				if (l3.dataset.isOccupied === "false" || l3.dataset.pieceColor=== this.enemyColor) {
					validMoves.push ( lower3 );
				}
			}
			if (this.colN+2 > 0 && this.colN+2 < 9 && parseInt(this.row)-1 > 0 && parseInt(this.row)-1 < 9) {
				let lower4 =  "" + columns[this.colN+1] + (parseInt(this.row) - 1);
				let l4 = document.getElementById(lower4);
				if (l4.dataset.isOccupied === "false" || l4.dataset.pieceColor=== this.enemyColor) {
					validMoves.push( lower4 );
				}
			}
			return validMoves;
	}
}
//---------------------------------------------Alfil-----------------------------------------------
export class Bishop{

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
		this.type = "Bishop";
	}

	get col()  {	return this._col;	}
	get colN() { 	return this._colN;	}
	get row()  {	return this._row;	}
	get position() { return this._position;	}

	set col(newCol)	  {	this._col = newCol;	  }
	set colN(newColN) {	this._colN = newColN; }
	set row(newRow)   {	this._row = newRow;	  }
	set position(newPos) {	
		this._position = newPos;
		this._col = newPos[0];	
		this._colN = columns.indexOf(newPos[0]) + 1;
		this._row = newPos[1];
	}


	computeTarget(){
		let validMoves = [];

		//Upper Left Diagonal
		let i = this.row;
		let j = this.colN;
		i++;
		j--;
		while (i<9 && j>0) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else {
				break;
			}
			i++;
			j--;
		}

		//Upper Right Diagonal
		i = this.row;
		j = this.colN;
		i++;
		j++;
		while (i<9 && j<9) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else {
				break;
			}
			i++;
			j++;
		}

		//Lower Left Diagonal
		i = this.row; 
		j = this.colN;
		i--;
		j--;
		while (i>0 && j>0) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else{
				break;
			}
			i--;
			j--;
		}

		//Lower Right Diagonal
		i = this.row;
		j = this.colN;
		i--;
		j++;
		while (i>0 && j<9) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else {
				break;
			}
			i--;
			j++;
		}

		return validMoves;
	}

}
//---------------------------------------------Reina-----------------------------------------------
export class Queen{
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
		this.type = "Queen";
	}

	get col()  {	return this._col;	}
	get colN() { 	return this._colN;	}
	get row()  {	return this._row;	}
	get position() { return this._position;	}

	set col(newCol)	  {	this._col = newCol;	  }
	set colN(newColN) {	this._colN = newColN; }
	set row(newRow)   {	this._row = newRow;	  }
	set position(newPos) {	
		this._position = newPos;
		this._col = newPos[0];	
		this._colN = columns.indexOf(newPos[0]) + 1;
		this._row = newPos[1];
	}

	computeTarget(){
		let validMoves = [];

		//Upper Left Diagonal
		let i = this.row;
		let j = this.colN;
		i++;
		j--;
		while (i<9 && j>0) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else {
				break;
			}
			i++;
			j--;
		}

		//Upper Right Diagonal
		i = this.row;
		j = this.colN;
		i++;
		j++;
		while (i<9 && j<9) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else {
				break;
			}
			i++;
			j++;
		}

		//Lower Left Diagonal
		i = this.row; 
		j = this.colN;
		i--;
		j--;
		while (i>0 && j>0) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else{
				break;
			}
			i--;
			j--;
		}

		//Lower Right Diagonal
		i = this.row;
		j = this.colN;
		i--;
		j++;
		while (i>0 && j<9) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else {
				break;
			}
			i--;
			j++;
		}



		//Up
		i = this.row;
		j = this.colN;
		i++;
		while (i<9) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else {
				break;
			}
			i++;
		}

		//Right
		i = this.row;
		j = this.colN;
		j++;
		while (j<9) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else {
				break;
			}
			j++;
		}

		//Down
		i = this.row; 
		j = this.colN;
		i--;
		while (i>0 && j>0) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else{
				break;
			}
			i--;
		}

		//Left
		i = this.row;
		j = this.colN;
		j--;
		while (j>0) {
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			if (n.dataset.isOccupied === "false" || n.dataset.pieceColor === this.enemyColor) {
				validMoves.push( next );
				if(n.dataset.isOccupied === "true"){
					break;
				}
			} else {
				break;
			}
			j--;
		}

		return validMoves;
	}
}
//----------------------------------------------Rey------------------------------------------------
export class King{
	constructor (_position,_isColorWhite) {
		this.position = _position;
		this.col = _position[0];
		this.row = _position[1];
		if(_isColorWhite){
			this.color = colors[0];
			this.enemyColor = colors[1];
			this.direction = directions[0];
			this.sorroundings = ['D2','E2','F2','D1','F1'];
		} else {
			this.color = colors[1];
			this.enemyColor = colors[0];
			this.direction = directions[1];
			this.sorroundings = ['D7','E7','F7','D8','F8'];
		}
		this.hasBeenMoved = false;
		this.type = "King";
		this.attackedSquares = [];
		this.check = false;
		this.mate = false;   
	}

	get col()  {	return this._col;	}
	get colN() { 	return this._colN;	}
	get row()  {	return this._row;	}
	get position() { return this._position;	}

	set col(newCol)	  {	this._col = newCol;	  }
	set colN(newColN) {	this._colN = newColN; }
	set row(newRow)   {	this._row = newRow;	  }
	set position(newPos) {	
		this._position = newPos;
		this._col = newPos[0];	
		this._colN = columns.indexOf(newPos[0]) + 1;
		this._row = newPos[1];
		this.hasBeenMoved = true;

		//Update sorroundings
		this.sorroundings = [];
		let upLeft = "" + columns[this.colN-2] + (parseInt(this.row) + 1);
		if (this.colN-1 > 0 && this.colN-1 < 9 && parseInt(this.row)+1 > 0 && parseInt(this.row)+1 < 9)
			this.sorroundings.push(upLeft);
		let up = "" + columns[this.colN-1] + (parseInt(this.row) + 1);
		if (this.colN > 0 && this.colN < 9 && parseInt(this.row)+1 > 0 && parseInt(this.row)+1 < 9)
			this.sorroundings.push(up);
		let upRight = "" + columns[this.colN] + (parseInt(this.row) + 1);
		if (this.colN+1 > 0 && this.colN+1 < 9 && parseInt(this.row)+1 > 0 && parseInt(this.row)+1 < 9)
			this.sorroundings.push(upRight);

		let left = "" + columns[this.colN-2] + (parseInt(this.row));
		if (this.colN-1 > 0 && this.colN-1 < 9 && parseInt(this.row) > 0 && parseInt(this.row) < 9)
			this.sorroundings.push(left);
		let right = "" + columns[this.colN] + (parseInt(this.row));
		if (this.colN+1 > 0 && this.colN+1 < 9 && parseInt(this.row) > 0 && parseInt(this.row) < 9)
			this.sorroundings.push(right);
		
		let downLeft = "" + columns[this.colN-2] + (parseInt(this.row) - 1);
		if (this.colN-1 > 0 && this.colN-1 < 9 && parseInt(this.row)-1 > 0 && parseInt(this.row)-1 < 9)
			this.sorroundings.push(downLeft);
		let down = "" + columns[this.colN-1] + (parseInt(this.row) - 1);
		if (this.colN > 0 && this.colN < 9 && parseInt(this.row)-1 > 0 && parseInt(this.row)-1 < 9)
			this.sorroundings.push(down);
		let downRight = "" + columns[this.colN] + (parseInt(this.row) - 1);
		if (this.colN+1 > 0 && this.colN+1 < 9 &&	parseInt(this.row)-1 > 0 &&	parseInt(this.row)-1 < 9)
			this.sorroundings.push(downRight);
	}
	set check(newCheck) {
		this._check = newCheck;
	}
	set mate(newMate) {
		this._mate = newMate;
	}

	computeTarget(enemyPossibleMoves, enemySupportedBoxes){
		let validMoves = [];
		let backedBoxes = [];
		if (enemySupportedBoxes===undefined) {
			backedBoxes = [];
		} else {
			backedBoxes = [...enemySupportedBoxes];
		}
		//console.log(backedBoxes)

		let invalidMoves = [];
		if (this._check) {
			let attackA = this.computeDiagonals();
			let attackB = this.computeRowCols();
			invalidMoves = attackA.extraBoxes.concat(attackB.extraBoxes);
		}

		//Up-Left
		var upLeft = "" + columns[this.colN-2] + (parseInt(this.row) + 1);
		if (this.colN-1 > 0 && 
			this.colN-1 < 9 && 
			parseInt(this.row)+1 > 0 && 
			parseInt(this.row)+1 < 9 && 
			!enemyPossibleMoves.includes(upLeft) &&
			!invalidMoves.includes(upLeft)		 &&
			!backedBoxes.includes(upLeft)) { 
			let uL = document.getElementById(upLeft);
			if(uL.dataset.isOccupied === "false" || uL.dataset.pieceColor === this.enemyColor){
				validMoves.push ( upLeft );
			}
		}

		
		//Up
		var up = "" + columns[this.colN-1] + (parseInt(this.row) + 1);
		if (this.colN > 0 && 
			this.colN < 9 && 
			parseInt(this.row)+1 > 0 && 
			parseInt(this.row)+1 < 9 &&
			!enemyPossibleMoves.includes(up) &&
			!invalidMoves.includes(up)		&&
			!backedBoxes.includes(up)) {
			let u = document.getElementById(up);
			if(u.dataset.isOccupied === "false" || u.dataset.pieceColor === this.enemyColor){
				validMoves.push ( up );
			}
		}
		//Up-Right
		var upRight = "" + columns[this.colN] + (parseInt(this.row) + 1);
		if (this.colN+1 > 0 && 
			this.colN+1 < 9 && 
			parseInt(this.row)+1 > 0 && 
			parseInt(this.row)+1 < 9 &&
			!enemyPossibleMoves.includes(upRight) &&
			!invalidMoves.includes(upRight)		  &&
			!backedBoxes.includes(upRight)) {
			let uR = document.getElementById(upRight);
			if(uR.dataset.isOccupied === "false" || uR.dataset.pieceColor === this.enemyColor){
				validMoves.push ( upRight );
			}
		}


		//Left
		var left = "" + columns[this.colN-2] + (parseInt(this.row));
		if (this.colN-1 > 0 && 
			this.colN-1 < 9 && 
			parseInt(this.row) > 0 && 
			parseInt(this.row) < 9 &&
			!enemyPossibleMoves.includes(left) &&
			!invalidMoves.includes(left)	   &&
			!backedBoxes.includes(left)) { 
			let l = document.getElementById(left);
			if(l.dataset.isOccupied === "false" || l.dataset.pieceColor === this.enemyColor){
				validMoves.push ( left );
			}
		}
		//Right
		var right = "" + columns[this.colN] + (parseInt(this.row));
		if (this.colN+1 > 0 && 
			this.colN+1 < 9 && 
			parseInt(this.row) > 0 && 
			parseInt(this.row) < 9 &&
			!enemyPossibleMoves.includes(right) &&
			!invalidMoves.includes(right)		&&
			!backedBoxes.includes(right)) {
			let r = document.getElementById(right);
			if(r.dataset.isOccupied === "false" || r.dataset.pieceColor === this.enemyColor){
				validMoves.push ( right );
			}
		}


		//Down-Left
		var downLeft = "" + columns[this.colN-2] + (parseInt(this.row) - 1);
		if (this.colN-1 > 0 && 
			this.colN-1 < 9 && 
			parseInt(this.row)-1 > 0 && 
			parseInt(this.row)-1 < 9 &&
			!enemyPossibleMoves.includes(downLeft) &&
			!invalidMoves.includes(downLeft)	   &&
			!backedBoxes.includes(downLeft)) { 
			let dL = document.getElementById(downLeft);
			if(dL.dataset.isOccupied === "false" || dL.dataset.pieceColor === this.enemyColor){
				validMoves.push ( downLeft );
			}
		}
		//Down
		var down = "" + columns[this.colN-1] + (parseInt(this.row) - 1);
		if (this.colN > 0 && 
			this.colN < 9 && 
			parseInt(this.row)-1 > 0 && 
			parseInt(this.row)-1 < 9 &&
			!enemyPossibleMoves.includes(down) &&
			!invalidMoves.includes(down)	   &&
			!backedBoxes.includes(down)) {
			let d = document.getElementById(down);
			if(d.dataset.isOccupied === "false" || d.dataset.pieceColor === this.enemyColor){
				validMoves.push ( down );
			}
		}
		//Down-Right
		var downRight = "" + columns[this.colN] + (parseInt(this.row) - 1);
		if (this.colN+1 > 0 && 
			this.colN+1 < 9 && 
			parseInt(this.row)-1 > 0 && 
			parseInt(this.row)-1 < 9 &&
			!enemyPossibleMoves.includes(downRight) &&
			!invalidMoves.includes(downRight)	    &&
			!backedBoxes.includes(downRight)) { 
			let dR = document.getElementById(downRight);
			if(dR.dataset.isOccupied === "false" || dR.dataset.pieceColor === this.enemyColor){
				validMoves.push ( downRight );
			}
		}
		//Castling Queenside
		var flagQS;
		if (this.color==="White") flagQS = this.isQueenSide("White");
		else if (this.color==="Black") flagQS = this.isQueenSide("Black");
		var castlingQS = "" + columns[this.colN-3] + (parseInt(this.row));
		if ( flagQS ) validMoves.push( castlingQS );
		
		//Castling Kingside
		var flagKS;
		if (this.color==="White") flagKS = this.isKingSide("White");
		else if (this.color==="Black") flagKS = this.isKingSide("Black");
		var castlingKS = "" + columns[this.colN+1] + (parseInt(this.row));
		if ( flagKS ) validMoves.push( castlingKS );

		return validMoves;
	}

	computeDiagonals(){
		let attackedBoxes = [];
		let extraBoxes = [];
		let attackingPieces = [];
		let temp = [];

		let tempDiagBoxesPin = [];
		let pinnedPieces = [];
		let tempPinned = {};
		let pinnedCount = 0;


		//Upper Left Diagonal
		let i = this.row;
		let j = this.colN;
		i++;
		j--;
		let next="" + columns[j-1] + i;
		let n=document.getElementById(next);
		while ( i<9 && j>0 && i>0 && j<9 ) {
			if (n.dataset.isOccupied === "false") {
				tempDiagBoxesPin.push( next );
				temp.push( next );
				i++;
				j--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
				continue;
			}
			if (n.dataset.pieceColor===this.enemyColor && (n.dataset.piece==="Bishop" || n.dataset.piece==="Queen")) {
				//Code for the pinned pieces
				if (pinnedCount === 1) {
					tempPinned.attacker = n.dataset.piece;
					tempPinned.attackerID = n.id;
					tempPinned.attackedBoxesPin = tempDiagBoxesPin;
					pinnedPieces.push(tempPinned);
					break;
				}
				//Code for check attacks
				temp.push( next );
				attackedBoxes = attackedBoxes.concat( temp );
				if (this.colN+1 > 0 && this.colN+1 < 9 && parseInt(this.row)-1 > 0 && parseInt(this.row)-1 < 9){
					let extraBox="" + columns[this.colN] + (parseInt(this.row) - 1);
					extraBoxes.push( extraBox );
				}
				let a = {};
				a.piece = n.dataset.piece;
				a.id = n.id;
				attackingPieces.push( a );
				break;
			} else if (n.dataset.pieceColor===this.color && n.dataset.piece!=="King") {
				tempPinned.piece = n.dataset.piece;
				tempPinned.id = n.id;
				pinnedCount++;
			}
			i++;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
		}
		temp=[];

		tempDiagBoxesPin = [];
		tempPinned = {};
		pinnedCount = 0;
		//Upper Right Diagonal
		i = this.row;
		j = this.colN;
		i++;
		j++;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
		while ( i<9 && j>0 && i>0 && j<9) {
			if (n.dataset.isOccupied === "false") {
				tempDiagBoxesPin.push( next );
				temp.push( next );
				i++;
				j++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
				continue;
			}
			if (n.dataset.pieceColor===this.enemyColor && (n.dataset.piece==="Bishop" || n.dataset.piece==="Queen")) {
				//Code for the pinned pieces
				if (pinnedCount === 1) {
					tempPinned.attacker = n.dataset.piece;
					tempPinned.attackerID = n.id;
					tempPinned.attackedBoxesPin = tempDiagBoxesPin;
					pinnedPieces.push(tempPinned);
					break;
				}
				//Code for check attacks
				temp.push( next );
				attackedBoxes = attackedBoxes.concat( temp );
				if (this.colN-1 > 0 && this.colN-1 < 9 && parseInt(this.row)-1 > 0 && parseInt(this.row)-1 < 9){
					let extraBox="" + columns[this.colN-2] + (parseInt(this.row) - 1);
					extraBoxes.push( extraBox );
				}
				let a = {};
				a.piece = n.dataset.piece;
				a.id = n.id;
				attackingPieces.push( a );
				break;
			} else if (n.dataset.pieceColor===this.color && n.dataset.piece!=="King") {
				tempPinned.piece = n.dataset.piece;
				tempPinned.id = n.id;
				pinnedCount++;
			}
			i++;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
		}
		temp=[];

		tempDiagBoxesPin = [];
		tempPinned = {};
		pinnedCount = 0;
		//Lower Left Diagonal
		i = this.row; 
		j = this.colN;
		i--;
		j--;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
		while ( i<9 && j>0 && i>0 && j<9 ) {
			if (n.dataset.isOccupied === "false") {
				tempDiagBoxesPin.push( next );
				temp.push( next );
				i--;
				j--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
				continue;
			}
			if (n.dataset.pieceColor===this.enemyColor && (n.dataset.piece==="Bishop" || n.dataset.piece==="Queen")) {
				//Code for the pinned pieces
				if (pinnedCount === 1) {
					tempPinned.attacker = n.dataset.piece;
					tempPinned.attackerID = n.id;
					tempPinned.attackedBoxesPin = tempDiagBoxesPin;
					pinnedPieces.push(tempPinned);
					break;
				}
				//Code for check attacks
				temp.push( next );
				attackedBoxes = attackedBoxes.concat( temp );
				if (this.colN+1 > 0 && this.colN+1 < 9 && parseInt(this.row)+1 > 0 && parseInt(this.row)+1 < 9){
					let extraBox="" + columns[this.colN] + (parseInt(this.row) + 1);
					extraBoxes.push( extraBox );
				}
				let a = {};
				a.piece = n.dataset.piece;
				a.id = n.id;
				attackingPieces.push( a );
				break;
			} else if (n.dataset.pieceColor===this.color && n.dataset.piece!=="King") {
				tempPinned.piece = n.dataset.piece;
				tempPinned.id = n.id;
				pinnedCount++;
			}
			i--;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
		}
		temp=[];

		tempDiagBoxesPin = [];
		tempPinned = {};
		pinnedCount = 0;
		//Lower Right Diagonal
		i = this.row;
		j = this.colN;
		i--;
		j++;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
		while ( i<9 && j>0 && i>0 && j<9 ) {
			if (n.dataset.isOccupied === "false") {
				tempDiagBoxesPin.push( next );
				temp.push( next );
				i--;
				j++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
				continue;
			}
			if (n.dataset.pieceColor===this.enemyColor && (n.dataset.piece==="Bishop" || n.dataset.piece==="Queen")) {
				//Code for the pinned pieces
				if (pinnedCount === 1) {
					tempPinned.attacker = n.dataset.piece;
					tempPinned.attackerID = n.id;
					tempPinned.attackedBoxesPin = tempDiagBoxesPin;
					pinnedPieces.push(tempPinned);
					break;
				}
				//Code for check attacks
				temp.push( next );
				attackedBoxes = attackedBoxes.concat( temp );
				if (this.colN-1 > 0 && this.colN-1 < 9 && parseInt(this.row)+1 > 0 && parseInt(this.row)+1 < 9){
					let extraBox="" + columns[this.colN-2] + (parseInt(this.row) + 1);
					extraBoxes.push( extraBox );
				}
				let a = {};
				a.piece = n.dataset.piece;
				a.id = n.id;
				attackingPieces.push( a );
				break;
			} else if (n.dataset.pieceColor===this.color && n.dataset.piece!=="King") {
				tempPinned.piece = n.dataset.piece;
				tempPinned.id = n.id;
				pinnedCount++;
			}
			i--;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
		}

		//return all as an object
		let attackResult = {};
		attackResult.boxes = attackedBoxes;
		attackResult.extraBoxes = extraBoxes;
		attackResult.pieces = attackingPieces;
		attackResult.pinnedPieces = pinnedPieces;

		return attackResult;
	}

	computeRowCols(){
		let attackedBoxes = [];
		let extraBoxes = [];
		let attackingPieces = [];
		let temp = [];

		let tempRCBoxesPin = [];
		let pinnedPieces = [];
		let tempPinned = {};
		let pinnedCount = 0;

		//Up
		let i = this.row;
		let j = this.colN;
		i++;
		let next="" + columns[j-1] + i;
		let n=document.getElementById(next);
		while ( i<9 && j>0 && i>0 && j<9 ) {
			if (n.dataset.isOccupied === "false") {
				tempRCBoxesPin.push( next );
				temp.push( next );
				i++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
				continue;
			}
			if (n.dataset.pieceColor===this.enemyColor && (n.dataset.piece==="Rook" || n.dataset.piece==="Queen")) {
				//Code for the pinned pieces
				if (pinnedCount === 1) {
					tempPinned.attacker = n.dataset.piece;
					tempPinned.attackerID = n.id;
					tempPinned.attackedBoxesPin = tempRCBoxesPin;
					pinnedPieces.push(tempPinned);
					break;
				}
				//Code for check attacks
				temp.push( next );
				attackedBoxes = attackedBoxes.concat(temp);
				if (this.colN > 0 && this.colN < 9 && parseInt(this.row)-1 > 0 && parseInt(this.row)-1 < 9){
					let extraBox="" + columns[this.colN-1] + (parseInt(this.row) - 1);
					extraBoxes.push( extraBox );
				}
				let a = {};
				a.piece = n.dataset.piece;
				a.id = n.id;
				attackingPieces.push( a );
				break;
			} else if (n.dataset.pieceColor===this.color && n.dataset.piece!=="King") {
				tempPinned.piece = n.dataset.piece;
				tempPinned.id = n.id;
				pinnedCount++;
			}
			i++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
		}
		temp = [];

		tempRCBoxesPin = [];
		tempPinned = {};
		pinnedCount = 0;

		//Right
		i = this.row;
		j = this.colN;
		j++;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
		while ( i<9 && j>0 && i>0 && j<9 ) {
			if (n.dataset.isOccupied === "false") {
				tempRCBoxesPin.push( next );
				temp.push( next );
				j++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
				continue;
			}
			if (n.dataset.pieceColor===this.enemyColor && (n.dataset.piece==="Rook" || n.dataset.piece==="Queen")) {
				//Code for the pinned pieces
				if (pinnedCount === 1) {
					tempPinned.attacker = n.dataset.piece;
					tempPinned.attackerID = n.id;
					tempPinned.attackedBoxesPin = tempRCBoxesPin;
					pinnedPieces.push(tempPinned);
					break;
				}
				//Code for check attacks
				temp.push( next );
				attackedBoxes = attackedBoxes.concat(temp);
				if (this.colN-1 > 0 && this.colN-1 < 9 && parseInt(this.row) > 0 && parseInt(this.row) < 9){
					let extraBox="" + columns[this.colN-2] + this.row;
					extraBoxes.push( extraBox );
				}
				let a = {};
				a.piece = n.dataset.piece;
				a.id = n.id;
				attackingPieces.push( a );
				break;
			} else if (n.dataset.pieceColor===this.color && n.dataset.piece!=="King") {
				tempPinned.piece = n.dataset.piece;
				tempPinned.id = n.id;
				pinnedCount++;
			}
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
		}
		temp = [];

		tempRCBoxesPin = [];
		tempPinned = {};
		pinnedCount = 0;

		//Down
		i = this.row; 
		j = this.colN;
		i--;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
		while ( i<9 && j>0 && i>0 && j<9 ) {
			if (n.dataset.isOccupied === "false") {
				tempRCBoxesPin.push( next );
				temp.push( next );
				i--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
				continue;
			}
			if (n.dataset.pieceColor===this.enemyColor && (n.dataset.piece==="Rook" || n.dataset.piece==="Queen")) {
				//Code for the pinned pieces
				if (pinnedCount === 1) {
					tempPinned.attacker = n.dataset.piece;
					tempPinned.attackerID = n.id;
					tempPinned.attackedBoxesPin = tempRCBoxesPin;
					pinnedPieces.push(tempPinned);
					break;
				}
				//Code for check attacks
				temp.push( next );
				attackedBoxes = attackedBoxes.concat(temp);
				if (this.colN > 0 && this.colN < 9 && parseInt(this.row)+1 > 0 && parseInt(this.row)+1 < 9){
					let extraBox="" + columns[this.colN-1] + (parseInt(this.row) + 1);
					extraBoxes.push( extraBox );
				} 
				let a = {};
				a.piece = n.dataset.piece;
				a.id = n.id;
				attackingPieces.push( a );
				break;
			} else if (n.dataset.pieceColor===this.color && n.dataset.piece!=="King") {
				tempPinned.piece = n.dataset.piece;
				tempPinned.id = n.id;
				pinnedCount++;
			}
			i--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
		}
		temp = [];

		tempRCBoxesPin = [];
		tempPinned = {};
		pinnedCount = 0;

		//Left
		i = this.row;
		j = this.colN;
		j--;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
		while ( i<9 && j>0 && i>0 && j<9 ) {
			if (n.dataset.isOccupied === "false") {
				tempRCBoxesPin.push( next );
				temp.push( next );
				j--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
				continue;
			}
			if (n.dataset.pieceColor===this.enemyColor && (n.dataset.piece==="Rook" || n.dataset.piece==="Queen")) {
				//Code for the pinned pieces
				if (pinnedCount === 1) {
					tempPinned.attacker = n.dataset.piece;
					tempPinned.attackerID = n.id;
					tempPinned.attackedBoxesPin = tempRCBoxesPin;
					pinnedPieces.push(tempPinned);
					break;
				}
				//Code for check attacks
				temp.push( next );
				attackedBoxes = attackedBoxes.concat(temp);
				if (this.colN+1 > 0 && this.colN+1 < 9 && parseInt(this.row) > 0 && parseInt(this.row) < 9){
					let extraBox="" + columns[this.colN] + this.row;
					extraBoxes.push( extraBox );
				}
				let a = {};
				a.piece = n.dataset.piece;
				a.id = n.id;
				attackingPieces.push( a );
				break;
			} else if (n.dataset.pieceColor===this.color && n.dataset.piece!=="King") {
				tempPinned.piece = n.dataset.piece;
				tempPinned.id = n.id;
				pinnedCount++;
			}
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
		}

		//return all as an object
		let attackResult = {};
		attackResult.boxes = attackedBoxes;
		attackResult.extraBoxes = extraBoxes;
		attackResult.pieces = attackingPieces; 
		attackResult.pinnedPieces = pinnedPieces;

		return attackResult;
	}

	computeKnMoves(){
		let attackedBoxes = [];
		//let extraBoxes = [];
		let attackingPieces = [];

		//Upper Side
		let i = this.row;
		let j = this.colN;
		i= i+1;
		j= j-2;
		let next="" + columns[j-1] + i;
		let n=document.getElementById(next);
		if ( i<9 && j>0 && i>0 && j<9 && n.dataset.pieceColor===this.enemyColor && n.dataset.piece==="Knight") {
			attackedBoxes.push( next );
			let a = {};
			a.piece = n.dataset.piece;
			a.id = n.id;
			attackingPieces.push( a );
		}

		i = this.row;
		j = this.colN;
		i= i+2;
		j= j-1;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
		if ( i<9 && j>0 && i>0 && j<9 && n.dataset.pieceColor===this.enemyColor && n.dataset.piece==="Knight") {
			attackedBoxes.push( next );
			let a = {};
			a.piece = n.dataset.piece;
			a.id = n.id;
			attackingPieces.push( a );
		}

		i = this.row;
		j = this.colN;
		i= i+2;
		j= j+1;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
		if ( i<9 && j>0 && i>0 && j<9 && n.dataset.pieceColor===this.enemyColor && n.dataset.piece==="Knight") {
			attackedBoxes.push( next );
			let a = {};
			a.piece = n.dataset.piece;
			a.id = n.id;
			attackingPieces.push( a );
		}

		i = this.row;
		j = this.colN;
		i= i+1;
		j= j+2;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
		if ( i<9 && j>0 && i>0 && j<9 && n.dataset.pieceColor===this.enemyColor && n.dataset.piece==="Knight") {
			attackedBoxes.push( next );
			let a = {};
			a.piece = n.dataset.piece;
			a.id = n.id;
			attackingPieces.push( a );
		}
		
		//Lower side
		i = this.row;
		j = this.colN;
		i= i-1;
		j= j+2;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
		if ( i<9 && j>0 && i>0 && j<9 && n.dataset.pieceColor===this.enemyColor && n.dataset.piece==="Knight") {
			attackedBoxes.push( next );
			let a = {};
			a.piece = n.dataset.piece;
			a.id = n.id;
			attackingPieces.push( a );
		}

		i = this.row;
		j = this.colN;
		i= i-2;
		j= j+1;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
		if ( i<9 && j>0 && i>0 && j<9 && n.dataset.pieceColor===this.enemyColor && n.dataset.piece==="Knight") {
			attackedBoxes.push(next);
			let a = {};
			a.piece = n.dataset.piece;
			a.id = n.id;
			attackingPieces.push( a );
		}

		i = this.row;
		j = this.colN;
		i= i-2;
		j= j-1;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
		if ( i<9 && j>0 && i>0 && j<9 && n.dataset.pieceColor===this.enemyColor && n.dataset.piece==="Knight") {
			attackedBoxes.push(next);
			let a = {};
			a.piece = n.dataset.piece;
			a.id = n.id;
			attackingPieces.push( a );
		}
		
		i = this.row;
		j = this.colN;
		i= i-1;
		j= j-2;
		next="" + columns[j-1] + i;
		n=document.getElementById(next);
		if ( i<9 && j>0 && i>0 && j<9 && n.dataset.pieceColor===this.enemyColor && n.dataset.piece==="Knight") {
			attackedBoxes.push(next);
			let a = {};
			a.piece = n.dataset.piece;
			a.id = n.id;
			attackingPieces.push( a );
		}


		//return all 3 arrays as an object
		let attackResult = {};
		attackResult.boxes = attackedBoxes;
		//attackResult.extraBoxes = extraBoxes;
		attackResult.pieces = attackingPieces; 

		return attackResult;
	}

	isQueenSide(color){
		let a1 = document.getElementById("A1");
		let a8 = document.getElementById("A8");
		if (color==="White") {
			if (this._check || this.hasBeenMoved===true) return false;
			if (a1.dataset.hasBeenMoved!=="false") return false;

			let b1=document.getElementById("B1");
			let c1=document.getElementById("C1");
			let d1=document.getElementById("D1");

			if (b1.dataset.isOccupied === "true" ||
				c1.dataset.isOccupied === "true" ||
				d1.dataset.isOccupied === "true") {
				return false;
			}

			//C1 menace checkup
			//Up
			let i = 1;
			let j = 3;
			i++;
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="Black" &&
					(n.dataset.piece==="Rook" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="White") break;
				i++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Upper Left Diagonal
			i = 1;
			j = 3;
			i++;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="Black" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="White") break;
				i++;
				j--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Upper Right Diagonal
			i = 1;
			j = 3;
			i++;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="Black" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="White") break;
				i++;
				j++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Knight moves
			i = 1;
			j = 3;
			i = i+1;
			j = j-2;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 1;
			j = 3;
			i = i+2;
			j = j-1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 1;
			j = 3;
			i = i+2;
			j = j+1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 1;
			j = 3;
			i = i+1;
			j = j+2;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Knight") {
				return false;
			}
			//Pawn & King moves
			i = 1;
			j = 3;
			i++;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			//Also check for king in B2 
			if (n.dataset.pieceColor==="Black" && (n.dataset.piece==="Pawn"||n.dataset.piece==="King"))	return false;
			i = 1;
			j = 3;
			i++;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Pawn")	return false;


			//D1 menace checkup
			//Up
			i = 1;
			j = 4;
			i++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="Black" &&
					(n.dataset.piece==="Rook" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="White") break;
				i++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Upper Left Diagonal
			i = 1;
			j = 4;
			i++;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="Black" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="White") break;
				i++;
				j--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Upper Right Diagonal
			i = 1;
			j = 4;
			i++;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="Black" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="White") break;
				i++;
				j++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Knight moves
			i = 1;
			j = 4;
			i = i+1;
			j = j-2;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 1;
			j = 4;
			i = i+2;
			j = j-1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 1;
			j = 4;
			i = i+2;
			j = j+1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 1;
			j = 4;
			i = i+1;
			j = j+2;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Knight") {
				return false;
			}
			//Pawn moves
			i = 1;
			j = 4;
			i++;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			//Also check for King in C2 
			if (n.dataset.pieceColor==="Black" && (n.dataset.piece==="Pawn"||n.dataset.piece==="King"))	return false;
			i = 1;
			j = 4;
			i++;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Pawn")	return false;

			//If passed all proofs return true for a possible castling QS
			return true;

		} else if (color==="Black"){
			if (this._check || this.hasBeenMoved===true) return false;
			if (a8.dataset.hasBeenMoved!=="false") return false;

			let b8=document.getElementById("B8");
			let c8=document.getElementById("C8");
			let d8=document.getElementById("D8");

			if (b8.dataset.isOccupied==="true" || 
				c8.dataset.isOccupied==="true" || 
				d8.dataset.isOccupied==="true") {
				return false;
			}

			//C8 menace checkup
			//Down
			let i = 8;
			let j = 3;
			i--;
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="White" &&
					(n.dataset.piece==="Rook" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="Black") break;
				i--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Lower Left Diagonal
			i = 8;
			j = 3;
			i--;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="White" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="Black") break;
				i--;
				j--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Lower Right Diagonal
			i = 8;
			j = 3;
			i--;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="White" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="Black") break;
				i--;
				j++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Knight moves
			i = 8;
			j = 3;
			i = i-1;
			j = j-2;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 8;
			j = 3;
			i = i-2;
			j = j-1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 8;
			j = 3;
			i = i-2;
			j = j+1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 8;
			j = 3;
			i = i-1;
			j = j+2;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Knight") {
				return false;
			}
			//Pawn & King moves
			i = 8;
			j = 3;
			i--;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			//Also check for king in B7
			if (n.dataset.pieceColor==="White" && (n.dataset.piece==="Pawn"||n.dataset.piece==="King"))	return false;
			i = 8;
			j = 3;
			i--;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Pawn")	return false;

			//D8 menace checkup
			//Down
			i = 8;
			j = 4;
			i--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="White" &&
					(n.dataset.piece==="Rook" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="Black") break;
				i--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Lower Left Diagonal
			i = 8;
			j = 4;
			i--;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="White" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="Black") break;
				i--;
				j--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Lower Right Diagonal
			i = 8;
			j = 4;
			i--;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="White" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="Black") break;
				i--;
				j++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Knight moves
			i = 8;
			j = 4;
			i = i-1;
			j = j-2;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 8;
			j = 4;
			i = i-2;
			j = j-1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 8;
			j = 4;
			i = i-2;
			j = j+1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 8;
			j = 4;
			i = i-1;
			j = j+2;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Knight") {
				return false;
			}
			//Pawn & King moves
			i = 8;
			j = 4;
			i--;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			//Also chek for king in C7
			if (n.dataset.pieceColor==="White" && (n.dataset.piece==="Pawn"||n.dataset.piece==="King"))	return false;
			i = 8;
			j = 4;
			i--;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Pawn")	return false;
			//If passed all proofs return true for a possible castling QS
			return true;
		}
	}

	isKingSide(color){
		let h1 = document.getElementById("H1");
		let h8 = document.getElementById("H8");
		if (color==="White") {
			if (this._check || this.hasBeenMoved===true) return false;
			if (h1.dataset.hasBeenMoved!=="false") return false;

			let f1=document.getElementById("F1");
			let g1=document.getElementById("G1");

			if (f1.dataset.isOccupied === "true" ||
				g1.dataset.isOccupied === "true" ) {
				return false;
			}

			//F1 menace checkup
			//Up
			let i = 1;
			let j = 6;
			i++;
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="Black" &&
					(n.dataset.piece==="Rook" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="White") break;
				i++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Upper Left Diagonal
			i = 1;
			j = 6;
			i++;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="Black" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="White") break;
				i++;
				j--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Upper Right Diagonal
			i = 1;
			j = 6;
			i++;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="Black" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="White") break;
				i++;
				j++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Knight moves
			i = 1;
			j = 6;
			i = i+1;
			j = j-2;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 1;
			j = 6;
			i = i+2;
			j = j-1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 1;
			j = 6;
			i = i+2;
			j = j+1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 1;
			j = 6;
			i = i+1;
			j = j+2;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Knight") {
				return false;
			}
			//Pawn & king moves
			i = 1;
			j = 6;
			i++;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next); 
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Pawn")	return false;
			i = 1;
			j = 6;
			i++;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			//Also check for king in G2 
			if (n.dataset.pieceColor==="Black" && (n.dataset.piece==="Pawn" || n.dataset.piece==="King")) return false;
			

			//G1 menace checkup
			//Up
			i = 1;
			j = 7;
			i++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="Black" &&
					(n.dataset.piece==="Rook" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="White") break;
				i++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Upper Left Diagonal
			i = 1;
			j = 7;
			i++;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="Black" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="White") break;
				i++;
				j--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Upper Right Diagonal
			i = 1;
			j = 7;
			i++;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="Black" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="White") break;
				i++;
				j++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Knight moves
			i = 1;
			j = 7;
			i = i+1;
			j = j-2;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 1;
			j = 7;
			i = i+2;
			j = j-1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 1;
			j = 7;
			i = i+2;
			j = j+1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Knight") {
				return false;
			}
			//Pawn moves
			i = 1;
			j = 7;
			i++;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="Black" && n.dataset.piece==="Pawn")	return false;
			i = 1;
			j = 7;
			i++;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			//Also check for king in H2
			if (n.dataset.pieceColor==="Black" && (n.dataset.piece==="Pawn"||n.dataset.piece==="King")) return false;

			//If passed all proofs return true for a possible castling QS
			return true;

		} else if (color==="Black"){
			if (this._check || this.hasBeenMoved===true) return false;
			if (h8.dataset.hasBeenMoved!=="false") return false;

			let f8=document.getElementById("F8");
			let g8=document.getElementById("G8");


			if (f8.dataset.isOccupied==="true" || 
				g8.dataset.isOccupied==="true" ) {
				return false;
			}

			//F8 menace checkup
			//Down
			let i = 8;
			let j = 6;
			i--;
			let next="" + columns[j-1] + i;
			let n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="White" &&
					(n.dataset.piece==="Rook" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="Black") break;
				i--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Lower Left Diagonal
			i = 8;
			j = 6;
			i--;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="White" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="Black") break;
				i--;
				j--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Lower Right Diagonal
			i = 8;
			j = 6;
			i--;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="White" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="Black") break;
				i--;
				j++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Knight moves
			i = 8;
			j = 6;
			i = i-1;
			j = j-2;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 8;
			j = 6;
			i = i-2;
			j = j-1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 8;
			j = 6;
			i = i-2;
			j = j+1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 8;
			j = 6;
			i = i-1;
			j = j+2;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Knight") {
				return false;
			}
			//Pawn & King moves
			i = 8;
			j = 6;
			i--;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Pawn")	return false;
			i = 8;
			j = 6;
			i--;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			//Also chek for a king in G7
			if (n.dataset.pieceColor==="White" && (n.dataset.piece==="Pawn"||n.dataset.piece==="King"))	return false;

			//G8 menace checkup
			//Down
			i = 8;
			j = 7;
			i--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="White" &&
					(n.dataset.piece==="Rook" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="Black") break;
				i--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Lower Left Diagonal
			i = 8;
			j = 7;
			i--;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9 ) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="White" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="Black") break;
				i--;
				j--;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Lower Right Diagonal
			i = 8;
			j = 7;
			i--;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			while ( i<9 && j>0 && i>0 && j<9) {
				if ( n.dataset.isOccupied==="true" && n.dataset.pieceColor==="White" &&
					(n.dataset.piece==="Bishop" || n.dataset.piece==="Queen") ) {
					return false; 
				} else if (n.dataset.pieceColor==="Black") break;
				i--;
				j++;
				next="" + columns[j-1] + i;
				n=document.getElementById(next);
			}
			//Knight moves
			i = 8;
			j = 7;
			i = i-1;
			j = j-2;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 8;
			j = 7;
			i = i-2;
			j = j-1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Knight") {
				return false;
			}
			i = 8;
			j = 7;
			i = i-2;
			j = j+1;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Knight") {
				return false;
			}
			//Pawn & king moves
			i = 8;
			j = 7;
			i--;
			j--;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			if (n.dataset.pieceColor==="White" && n.dataset.piece==="Pawn")	return false;
			i = 8;
			j = 7;
			i--;
			j++;
			next="" + columns[j-1] + i;
			n=document.getElementById(next);
			//Also check for a king in H7
			if (n.dataset.pieceColor==="White" && (n.dataset.piece==="Pawn"||n.dataset.piece==="King"))	return false;
			//If passed all proofs return true for a possible castling QS
			return true;
		}
	}
}