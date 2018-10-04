<?php 
header('Content-type:application/json;charset=utf-8');
include('conexion.php');
$SqlGetNameCamps = "
SELECT nombre,id 
from
audios_listado.campanias;
";
try {
	$ResulGetName = mysql_query($SqlGetNameCamps,$conexion40);
	$nombre = array();
	$id = array();
	while ($ArrayResultName = mysql_fetch_array($ResulGetName)) {
		$nombre[$ArrayResultName['id']]= $ArrayResultName['nombre'];
	}
	$return = $nombre;
} catch (Exception $e) {
	$return['error'] = 'Error: '.$e.'En la consulta:'.$SqlGetNameCamps;	
}
mysql_close($conexion40);
echo json_encode($return);
?>