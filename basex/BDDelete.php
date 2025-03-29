<?php //Obtener los clientes para el select
//Falta crear un xq que tenga la consulta
require_once("BDConexion.php");

header("Content-Type: application/json"); // Se devuelve una respuesta JSON

try {
    $session = new Session();

    // Realizar la consulta XQuery
    $query = $session->query("
        for $cliente in maek/clients/client
        return data($cliente/@dni)
    ");

    // Ejecutar la consulta y obtener los resultados
    $resultados = [];
    while ($query->more()) {
        $resultados[] = $query->next();
    }

    // Cerrar la consulta y la sesión
    $query->close();
    $session->close();

    // Devolver los datos en formato JSON
    echo json_encode(["success" => true, "data" => $resultados]);

} catch (Exception $e) {
    // Si hay un error, devolverlo en formato JSON
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>