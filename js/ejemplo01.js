/*
	turnos 0, 1 , 0 , 1
*/
var x;
var turno = 1;

function Inicio(){
	//inicializar Tablero
	x=[];
	for(var i=0; i< 3;i++){
		x[i]=[];
		for(var j=0;j<3;j++)
			x[i][j]=0;
	}
	//mutacion
	muta();	
}
function hasWinner(){
	var winner = 0; //0 no hay ganador
	if(x[0][0]==x[1][1] && x[0][0]==x[2][2] && x[0][0]!=0)
		return x[0][0];
	else if(x[0][2]==x[1][1] && x[0][2]==x[2][0] && x[0][2]!=0)
		return x[0][2];
	else {
		//columnas
		for(var i=0; i<3; i++){
			if(x[0][i]==x[1][i] && x[0][i]==x[2][i] && x[0][i]!=0)
				return x[0][i];
		}

		//filas
		for(var i=0; i<3; i++){
			if(x[i][0]==x[i][1] && x[i][1]==x[i][2] && x[i][0]!=0)
				return x[i][0];
		}
	}
	return winner;
}

function evaluar(me){
	//console.log(me);
	//console.log(me.id);
	var id=me.id;
	console.log(id);
	console.log(me.innerHTML);
	console.log(me.classList);

	//parseo de id a int y verificar si ya esta seleccionado
	var pos = id.split(",");
	if(x[parseInt(pos[0])][parseInt(pos[1])]!=0){
		alert("Posicion ya seleccionada");
		return;
	}
	x[parseInt(pos[0])][parseInt(pos[1])]=2;





	me.classList.remove('btn-outline-dark');
/*
	switch(turno) {
		//computadora
		case 0: 
			me.innerHTML = "<i class='fa fa-check-circle fa-4x' aria-hidden='true'></i>";			
			me.classList.add('btn-outline-success');
			break;
		case 1:
			me.innerHTML = "<i class='fa fa-cog fa-4x' aria-hidden='true'></i>";			
			me.classList.add('btn-outline-danger');

			break;
	}*/
	me.innerHTML = "<i class='fa fa-cog fa-4x' aria-hidden='true'></i>";			
	me.classList.add('btn-outline-danger');
	me.classList.add('disabled');
	var gan = hasWinner();
	switch(gan){
		case 1:
			alert("ganador es Computadora!");
			break;
		case 2:
			alert("ganador es Jugador");
			break;
		default:
			if(muta()!=-1)
				turno++;
			else{
				alert("Empate no hay ganador");
			}
	}
}




//Movimientos de Computadora ----------------------------------------


function muta(){
	var r = 8,bestX,bestY;
	var copiX =[];
	var cont = 0;
	var FinEmpate = true;
	//copia de la matriz global 
	for(var i=0; i< 3;i++){
		copiX [i]=[];
		for(var j = 0 ; j<3; j++){
			copiX[i][j]=x[i][j];
			if(x[i][j]==0)
				FinEmpate=false;
		}
	}
	//caso de empate 
	if(FinEmpate)
		return -1;
	//busqueda de la mejor opcion
	for(var i=0; i < 200 ; i++ ){
		var px=parseInt(Math.random() * (3 - 0) + 0);
		var py=parseInt(Math.random() * (3 - 0) + 0);
		if(x[px][py]==0){
			copiX[px][py]=1;
			cont=FunEvauluacion(copiX,px,py);
			cont=cont+FunEvauluacion2(copiX,px,py);
			if(r > cont){
				bestY=py;
				bestX=px;
				r=cont;
			}
			copiX[px][py]=0;
		}
	}
	//seleccion de mejor opcion y cambiarlo en la interfaz
	x[bestX][bestY]=1;
	document.getElementById(bestX+","+bestY).classList.remove('btn-outline-dark');
	document.getElementById(bestX+","+bestY).innerHTML = "<i class='fa fa-check-circle fa-4x' aria-hidden='true'></i>";			
	document.getElementById(bestX+","+bestY).classList.add('btn-outline-success');
	var gan = hasWinner();
	switch(gan){
		case 1:
			alert("ganador es Computadora!");
			break;
		case 2:
			alert("ganador es Jugador");
			break;
	}
}

function FunEvauluacion(copiX,px,py){
	var cont = 0;
	if( !((px==0 || px==2) && (py==0 || py==2)) && turno<2)
		cont=cont+4;
	//verificacion por columnas y por filas
	for(var j=0;j<3;j++){
		if(copiX[px][j]==2)
			cont++;
		if(copiX[j][py]==2)
			cont++;
	}
	//caso donde se ignora las diagonales
	if((px==0 && py==1) || (px==1 && py==0) || (px==1 && py==2) || (px==2 && py==1))
		return cont;
	//verificacion de diagonales
	for(var j=0;j<3;j++){
		if(px+j < 3 && py+j < 3)
			if(copiX[px+j][py+j]==2)
				cont++;
		if(px-j > 0 && py-j > 0)
			if(copiX[px-j][py-j]==2)
				cont++;
	}
	return cont;
}


function FunEvauluacion2(copiX,px,py){
	var cont = 0;
	//verificacion por columnas y por filas
	for(var j=0;j<3;j++){
		if(copiX[px][j]!=1)
			cont++;
		else
			cont--;
		if(copiX[j][py]!=1)
			cont++;
		else
			cont--;
	}
	//caso donde se ignora las diagonales
	if((px==0 && py==1) || (px==1 && py==0) || (px==1 && py==2) || (px==2 && py==1))
		return cont;
	//verificacion de diagonales
	for(var j=0;j<3;j++){
		if(px+j < 3 && py+j < 3)
			if(copiX[px+j][py+j]!=1)
				cont++;
			else
				cont--;
		if(px-j > 0 && py-j > 0)
			if(copiX[px-j][py-j]!=1)
				cont++;
			else
				cont--;
	}
	return cont;
}