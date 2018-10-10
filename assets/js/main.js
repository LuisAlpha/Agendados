document.addEventListener('DOMContentLoaded',function(event) {
	var paneles = document.querySelector('.campanias');
	GetNamesCamps().then(response => {
		GetNumRows().then((text)=>{
			text.campanias.forEach(function(elemento,index){
				contenedor = document.createElement('div');//div para nombre de campaña
				notificacion = document.createElement('div');//div para contador
				
				contenedor.classList.add('campania'); 			//agregar classes a los divs
				notificacion.classList.add('notify'); 			//agregar classes a los divs
				notificacion.innerHTML =	text.total[index]; 	//agregando el valor(solo texto) al div
				contenedor.innerHTML = response[elemento];		//agregando el valor(solo texto) al div
				contenedor.appendChild(notificacion);			//agregando hijo al contenedor
				contenedor.dataset.folios = text.folios[index]; // agregando dataset.folios
				contenedor.addEventListener("click",recuperaAgendados,false); // agregar add event listener 
				paneles.appendChild(contenedor); // append child al div principal
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
	fetch('assets/php/GetDataCalls.php?folios='+folios).then((request)=> {
		return request.text()})
	.then(text => {
		contenedor.innerHTML = text;
	})
	.catch(error=> console.warn(error));
}
function DetallesRegistro(event){
	modal 	= document.querySelector('.modal');
	modal.style.display  = 'block';
	idregistro = event.dataset.idregistro;
	modal_content = document.querySelector('.modal-content');
	fetch('assets/php/GetInfoAdicional.php?idregistro='+idregistro)
	.then(request =>{return request.text();})
	.then(text =>{
		modal_content.innerHTML = text;
	})
	.catch(error =>{console.log(error)});
}
function TomarRegistro(event){ 
	let ventanaNueva;
	let sstelefono = event.dataset.telefono;
	let id_camp = event.dataset.campania;
	let extension = '0';
	let URL = "http://172.30.27.40:8080/sialcom/system/formularioencuesta/indexgenerado_respaldo.php?Btelefono="+sstelefono+"&id_camp="+id_camp+"&extension="+extension;
	if(sstelefono != null) {
		if(ventanaNueva != undefined && (sstelefono != "undefined" && sstelefono != "")){
			if(ventanaNueva.closed == true){
				ventanaNueva = window.open(URL,'testName','width=710,height=615,scrollbars=yes,resizable=yes');
				ventanaNueva.focus();
			}
		}else{
			if(!ventanaNueva  && ventanaNueva == undefined &&(sstelefono != "undefined" && sstelefono != "")){
				ventanaNueva = window.open(URL,'testName','width=710,height=615,scrollbars=yes,resizable=yes');
				ventanaNueva.focus();
			}
		} 
	}
}

function controlador_llamadas(element){
	agente = element.dataset.agente;
	telefono = element.dataset.telefono;
	if (element.innerHTML == 'Llamar') {
		element.innerHTML = 'Marcando';
		enlazar_llamada( telefono, agente ).then(request => {
			if (request.msg_error !='') {
				element.dataset.canal = request.canal;
				element.innerHTML = 'Colgar';
			}
			element.innerHTML = 'Llamar';
			alert(request.msg_error);
		});
	}else if(element.innerHTML == 'Colgar' && element.dataset.canal != 'undefined'){
		colgar_llamada(element.dataset.canal);
		element.innerHTML = 'Llamar';
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

function CloseModal(event){
	event.style.display  = 'none';
}