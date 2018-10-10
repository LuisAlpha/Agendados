<?php 
session_start();
if(isset($_SESSION['idEmpleado'])){
}else{
	header('location: ../');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="assets/css/main.css">
	<script src="assets/js/main.js"></script>
	<title>Agendados</title>
</head>
<body>
	

	<!-- The Modal -->
	<div id="myModal" class="modal" onclick="CloseModal(this)" scroll='no'>
		<!-- Modal content -->
		<div class="modal-content">
			<span class="close">&times;</span>
		</div>
	</div>
	<div class="wrapper">
		<div class="header">Header</div>
		<div class="campanias"></div>
		<div class="registros">
			<h2>Selecciona Una Campaña para revisar tus Agendados por favor.</h1>
			</div>
			
		</div>
	</body>
	</html>
