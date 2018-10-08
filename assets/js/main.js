document.addEventListener('DOMContentLoaded',function(event) {
	var paneles = document.querySelector('.campanias');
	GetNamesCamps().then(response => {
		GetNumRows().then((text)=>{
			cont =0;
			text.campanias.forEach(function(elemento,index){
				contenedor = document.createElement('div');//div para nombre de campaña
				
				notificacion = document.createElement('div');//div para contador
				
				contenedor.classList.add('campania');
				notificacion.classList.add('notify');
				notificacion.innerHTML =	text.total[index];
				contenedor.innerHTML = response[elemento];
				contenedor.appendChild(notificacion);
				contenedor.dataset.folios = text.folios[index];
				contenedor.addEventListener("click",recuperaAgendados,false);
				paneles.appendChild(contenedor);
				//console.log(response[elemento]	+	' '	+	text.folios[index]+ ' ' + text.total[index]);
			});
		});
	});
});

function GetNumRows(event){
	return fetch('assets/php/GetNumRows.php')
	.then((request)=> request.json())
	.then((text) => {	return text; })
	.catch(error => console.warn(error));
}
function GetNamesCamps(event){
	return fetch('assets/php/GetNameCamps.php')
	.then((request) => request.json() )
	.then((text)=>{
		return text;
	})
	.catch(error => console.warn(error));
}
function recuperaAgendados(event){
	var	contenedor = document.querySelector('.registros');
	var folios = this.dataset.folios;
	fetch('assets/php/GetDataCalls.php?folios='+folios).then((request)=> {return request.text()}).then(text => {contenedor.innerHTML = text;}).catch(error=> console.warn(error));
}
function DetallesRegistro(event){
	console.log(event);
}
function TomarRegistro(event){
	console.log(event);
} 

function controlador_llamadas(element){
	agente = element.dataset.agente;
	telefono = element.dataset.telefono;
	if (element.innerHTML == 'Llamar') {
		element.innerHTML = 'Marcando';
		enlazar_llamada( telefono, agente ).then(request => {
			element.dataset.canal = request.canal;
			element.innerHTML = 'Colgar';
		});
	}else if(element.innerHTML == 'Colgar' && element.dataset.canal != 'undefined'){
		colgar_llamada(element.dataset.canal);
		element.innerHTML == 'Llamar';
	}else{

	}
}

function enlazar_llamada(telefono,agente){
	return fetch("http://172.30.27.4/marcaciones_externas/re.php?telefono=" + telefono + "&agente="+agente)
	.then((request)=>{
		return  request.json();
	}).catch(error => console.log('error  : ' + error));
}

function colgar_llamada(canal){
	console.log("Colgando canal :" + canal);
	fetch("http://172.30.27.4/marcaciones_externas/co.php?canal=" + canal).then(request => {return request.text();}).then(text => console.log(text)).catch(error =>{console.log(error)});
}