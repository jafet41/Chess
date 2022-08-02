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


	computeTarget(oPawns,lastMovedPiece){
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
			console.log(computedTiles);
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
				console.log(computedTiles);
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
		} else {
			this.color = colors[1];
			this.enemyColor = colors[0];
			this.direction = directions[1];
		}
		this.hasBeenMoved = false;
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

		//Up-Left
		if (this.colN-1 > 0 && this.colN-1 < 9 && parseInt(this.row)+1 > 0 && parseInt(this.row)+1 < 9) { 
			let upLeft = "" + columns[this.colN-2] + (parseInt(this.row) + 1);
			let uL = document.getElementById(upLeft);
			if(uL.dataset.isOccupied === "false" || uL.dataset.pieceColor === this.enemyColor){
				validMoves.push ( upLeft );
			}
		}
		//Up
		if (this.colN > 0 && this.colN < 9 && parseInt(this.row)+1 > 0 && parseInt(this.row)+1 < 9) { 
			let up = "" + columns[this.colN-1] + (parseInt(this.row) + 1);
			let u = document.getElementById(up);
			if(u.dataset.isOccupied === "false" || u.dataset.pieceColor === this.enemyColor){
				validMoves.push ( up );
			}
		}
		//Up-Right
		if (this.colN+1 > 0 && this.colN+1 < 9 && parseInt(this.row)+1 > 0 && parseInt(this.row)+1 < 9) { 
			let upRight = "" + columns[this.colN] + (parseInt(this.row) + 1);
			let uR = document.getElementById(upRight);
			if(uR.dataset.isOccupied === "false" || uR.dataset.pieceColor === this.enemyColor){
				validMoves.push ( upRight );
			}
		}


		//Left
		if (this.colN-1 > 0 && this.colN-1 < 9 && parseInt(this.row) > 0 && parseInt(this.row) < 9) { 
			let left = "" + columns[this.colN-2] + (parseInt(this.row));
			let l = document.getElementById(left);
			if(l.dataset.isOccupied === "false" || l.dataset.pieceColor === this.enemyColor){
				validMoves.push ( left );
			}
		}
		//Right
		if (this.colN+1 > 0 && this.colN+1 < 9 && parseInt(this.row) > 0 && parseInt(this.row) < 9) { 
			let right = "" + columns[this.colN] + (parseInt(this.row));
			let r = document.getElementById(right);
			if(r.dataset.isOccupied === "false" || r.dataset.pieceColor === this.enemyColor){
				validMoves.push ( right );
			}
		}


		//Down-Left
		if (this.colN-1 > 0 && this.colN-1 < 9 && parseInt(this.row)-1 > 0 && parseInt(this.row)-1 < 9) { 
			let downLeft = "" + columns[this.colN-2] + (parseInt(this.row) - 1);
			let dL = document.getElementById(downLeft);
			if(dL.dataset.isOccupied === "false" || dL.dataset.pieceColor === this.enemyColor){
				validMoves.push ( downLeft );
			}
		}
		//Down
		if (this.colN > 0 && this.colN < 9 && parseInt(this.row)-1 > 0 && parseInt(this.row)-1 < 9) { 
			let down = "" + columns[this.colN-1] + (parseInt(this.row) - 1);
			let d = document.getElementById(down);
			if(d.dataset.isOccupied === "false" || d.dataset.pieceColor === this.enemyColor){
				validMoves.push ( down );
			}
		}
		//Down-Right
		if (this.colN+1 > 0 && this.colN+1 < 9 && parseInt(this.row)-1 > 0 && parseInt(this.row)-1 < 9) { 
			let downRight = "" + columns[this.colN] + (parseInt(this.row) - 1);
			let dR = document.getElementById(downRight);
			if(dR.dataset.isOccupied === "false" || dR.dataset.pieceColor === this.enemyColor){
				validMoves.push ( downRight );
			}
		}
		return validMoves;
	}
}