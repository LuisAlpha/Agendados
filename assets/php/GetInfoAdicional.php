<?php 
include 'conexion.php';
$SqlGetData = "select valor_campo,fecha_carga from EsquemaGeneral.info_adicional where fk_cliente ='{$_REQUEST['idregistro']}' and nombre_campo ='comentario_llamada';";
$ResultGetData = mysql_query($SqlGetData, $conexion40);
if (mysql_num_rows($ResultGetData)< 1) {	
	?>
	<h1>No se pudo recuperar mas informacion del Registro.</h1>
	<?php
}else{
	?>
	<table>
		<thead>
			<td>Fecha</td>
			<td>Comentario</td>
			<tbody>
				<?php
				while ($ArrayGetData = mysql_fetch_array($ResultGetData)) {
					?>
					<tr>
						<td><?php echo $ArrayGetData['fecha_carga']; ?></td>
						<td><?php echo $ArrayGetData['valor_campo']; ?></td>
					</tr>
					<?php
				}
				?>
			</tbody>
		</thead>
	</table>
	<?php
}
mysql_close($conexion40);
?>