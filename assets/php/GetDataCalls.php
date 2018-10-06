<?php 
session_start();
include 'conexion.php';
$folios = $_REQUEST['folios'];

$SqlGetContactData		=	"
SELECT IdRegistro,Contacto,Campania,Fecha_Agendado,Hora_Agendado,''as tiempo,telefono,IdLastCall from EsquemaGeneral.baseclientegeneral where IdLastCall in({$folios});
";
$ResultGetContac = mysql_query($SqlGetContactData,	$conexion40);


?>
<table>
	<thead>
		<th>Contacto</th>
		<th>llamar</th>
		<th>Mas Informacion</th>	
		<th>Abrir Liga</th>	
		<th>Fecha</th>
		<th>Hora</th>
		<th>Tiempo Faltante</th>	
		<th>Telefono</th>	
	</thead>
	<tbody>
		
		<?php 
		while ($ArrayContac = mysql_fetch_array($ResultGetContac)) {
			?>
			<tr>
				<td><?php echo $ArrayContac['Contacto']; ?></td>
				<td><button data-telefono ="<?php echo $ArrayContac['telefono']; ?>" data-agente ="<?php echo $_SESSION['idEmpleado'] ?>" onClick="enlazarllamada(this)">Llamar</button></td>
				<td><button data-lastCall ="<?php echo $ArrayContac['IdLastCall'] ?>" onClick="DetallesRegistro(this)">Detalles</button></td>
				<td><button data-idRegistro="<?php echo $ArrayContac['IdRegistro'];?>" onClick="TomarRegistro(this)">Liga</button></td>
				<td><?php echo $ArrayContac['Fecha_Agendado']; ?></td>
				<td><?php echo $ArrayContac['Hora_Agendado']; ?></td>
				<td><?php echo $ArrayContac['tiempo']; ?></td>
				<td><?php echo $ArrayContac['telefono']; ?></td>
			</tr>
			<?php 
		}
		mysql_close($conexion40);
		?>
	</tbody>
</table>