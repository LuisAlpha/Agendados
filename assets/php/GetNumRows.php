<?php 
session_start();
include('conexion.php');
header('Content-type:application/json;charset=utf-8');
$SqlGetRows ="
SELECT  
campania,
COUNT(*)as total,
GROUP_concat(IdLastCall)as Folios
from EsquemaGeneral.baseclientegeneral 
where 
Agente ='".$_SESSION['idEmpleado']."'
and IdLastCall is not null
and datediff(Fecha_Agendado,curdate()) BETWEEN -7 and  7 
GROUP by Campania;
";

try {
	$ResultGetRows = mysql_query($SqlGetRows,$conexion40);	
	$campanias = array();
	$total = array();
	$folios = array();

	while ($ArrayGetRows = mysql_fetch_array($ResultGetRows)) {
		array_push($campanias, $ArrayGetRows['campania']);
		array_push($total, $ArrayGetRows['total']);
		array_push($folios, $ArrayGetRows['Folios']);
	}
	$return['campanias'] = $campanias;
	$return['total'] = $total;
	$return['folios'] = $folios;
} catch (Exception $e) {
	$return['Error']='Error :'.$e.' En la consulta :'.$SqlGetRows;
}
mysql_close($conexion40);
echo json_encode($return);
?>