<?php //Obtener los clientes para el select
//Falta crear un xq que tenga la consulta

// Mostrar errores en el navegador (para depuración)
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once("BDConexion.php");

header("Content-Type: application/json"); // Se devuelve una respuesta JSON

try {
    $session = new Session();

    // Realizar la consulta XQuery
    $query = $session->query("
        for $cliente in doc(MAEK_LMS.xml)/maek/clients/client
        return data($cliente/@dni)
    ");

    // Ejecutar la consulta y obtener los resultados
    $resultados = [];
    while ($query->more()) {
        $resultados[] = $query->next();
    }

    $query->close();
    $session->close();

    // Devolver los datos en formato JSON
    if (count($resultados) > 0) {
        echo json_encode(["success" => true, "data" => $resultados, "message" => "Datos recogidos correctamente"]);
    } else {
        echo json_encode(["success" => false, "message" => "No se encontraron clientes"]);
    }

} catch (Exception $e) {
    // Si hay un error, devolverlo en formato JSON
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>