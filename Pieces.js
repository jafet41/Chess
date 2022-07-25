//-------------------------------------------Classes-----------------------------------------------
const colors = ["white","black"]; 
const directions = ["positive","negative"]
const columns = ["A","B","C","D","E","F","G","H"];
//--------------------Peon-----------------------
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
		this.movesHistory.push(_position);
		this.hasBeenMoved = false;
	}

	get col() {	return this._col;	}
	get row() {	return this._row;	}
	set col(newCol) {	this._col = newCol;	}
	set row(newRow) {	this._row = newRow;	}


	computeTarget(){
		if(this.color == "white" && this.colN > 0 && this.colN < 9 && this.row > 0 && this.row < 9){
			let computedTiles = [];
			let next="" + columns[this.colN-1] + (parseInt(this.row) + 1);
			let next2="" + columns[this.colN-1] + (parseInt(this.row) + 2);
			let n=document.getElementById(next);
			let n2=document.getElementById(next2);
			
			if(n.dataset.isOccupied !== undefined){
				computedTiles.push(next);
			}
			if(this.hasBeenMoved == false && n.dataset.isOccupied !== undefined && n2.dataset.isOccupied !== undefined){
				computedTiles.push(next2);
			}
			
			if (this.colN !== 1 ){
				let diagonal1="" + columns[this.colN-2] + (parseInt(this.row) + 1);
				let d1=document.getElementById(diagonal1);
				if (d1.dataset.isOccupied && d1.dataset.pieceColor==="Black"){
					computedTiles.push(diagonal1);
				}
			}
			if (this.colN !== 8 ){
				let diagonal2="" + columns[this.colN] + (parseInt(this.row) + 1);
				let d2=document.getElementById(diagonal2);
				if (d2.dataset.isOccupied && d2.dataset.pieceColor==="Black" && this.colN!==8){	
					computedTiles.push(diagonal2);
				}
			}
			return computedTiles;

		} else {
			if(this.color == "black" && this.colN > 0 && this.colN < 9 && this.row > 0 && this.row < 9){
				let computedTiles = [];
				let next="" + columns[this.colN-1] + (parseInt(this.row) - 1);
				let next2="" + columns[this.colN-1] + (parseInt(this.row) - 2);
				let n=document.getElementById(next);
				let n2=document.getElementById(next2);
				
				if(n.dataset.isOccupied !== undefined){
					computedTiles.push(next);
				}
				if(this.hasBeenMoved == false && n.dataset.isOccupied !== undefined && n2.dataset.isOccupied !== undefined){
					computedTiles.push(next2);
				}
				
				if (this.colN !== 1 ){
					let diagonal1="" + columns[this.colN-2] + (parseInt(this.row) - 1);
					let d1=document.getElementById(diagonal1);
					if (d1.dataset.isOccupied && d1.dataset.pieceColor==="White"){
						computedTiles.push(diagonal1);
					}
				}
				if (this.colN !== 8 ){
					let diagonal2="" + columns[this.colN] + (parseInt(this.row) - 1);
					let d2=document.getElementById(diagonal2);
					if (d2.dataset.isOccupied && d2.dataset.pieceColor==="White" && this.colN!==8){	
						computedTiles.push(diagonal2);
					}
				}
				return computedTiles;
			}
		}
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
}
//------------------Caballo----------------------
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

	get col() {	return this._col;	}
	get row() {	return this._row;	}
	set col(newCol) {	this._col = newCol;	}
	set row(newRow) {	this._row = newRow;	}

	computeTarget(){
			let computedTiles = [];
			let validMoves = [];
			//Upper side
			if (this.colN-1 > 0 && this.colN-1 < 9 && parseInt(this.row)+2 > 0 && parseInt(this.row)+2 < 9) { 
				let upper1 = "" + columns[this.colN-2] + (parseInt(this.row) + 2);
				validMoves.push ( upper1 );
			}
			if (this.colN+1 > 0 && this.colN+1 < 9 && parseInt(this.row)+2 > 0 && parseInt(this.row)+2 < 9) { 
				let upper2 = "" + columns[this.colN-0] + (parseInt(this.row) + 2);
				validMoves.push ( upper2 );
			}
			if (this.colN-2 > 0 && this.colN-2 < 9 && parseInt(this.row)+1 > 0 && parseInt(this.row)+1 < 9) { 
				let upper3 = "" + columns[this.colN-3] + (parseInt(this.row) + 1);
				validMoves.push ( upper3 );
			}
			if (this.colN+2 > 0 && this.colN+2 < 9 && parseInt(this.row)+1 > 0 && parseInt(this.row)+1 < 9) {
				let upper4 = "" + columns[this.colN+1] + (parseInt(this.row) + 1);
				validMoves.push ( upper4 );
			}
			//Lower side
			if (this.colN-1 > 0 && this.colN-1 < 9 && parseInt(this.row)-2 > 0 && parseInt(this.row)-2 < 9) { 
				let lower1 =  "" + columns[this.colN-2] + (parseInt(this.row) - 2);
				validMoves.push( lower1 );
			}
			if (this.colN+1 > 0 && this.colN+1 < 9 && parseInt(this.row)-2 > 0 && parseInt(this.row)-2 < 9) { 
				let lower2 =  "" + columns[this.colN-0] + (parseInt(this.row) - 2);
				validMoves.push( lower2 );
			}
			if (this.colN-2 > 0 && this.colN-2 < 9 && parseInt(this.row)-1 > 0 && parseInt(this.row)-1 < 9) { 
				let lower3 =  "" + columns[this.colN-3] + (parseInt(this.row) - 1);
				validMoves.push( lower3 );
			}
			if (this.colN+2 > 0 && this.colN+2 < 9 && parseInt(this.row)-1 > 0 && parseInt(this.row)-1 < 9) {
				let lower4 =  "" + columns[this.colN+1] + (parseInt(this.row) - 1);				
				validMoves.push( lower4 );
			}

			console.log(validMoves);
			return validMoves;
	}
}
//-------------------Alfil-----------------------
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
}
//-------------------Reina-----------------------
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
}
//--------------------Rey------------------------
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
}