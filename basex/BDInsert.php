<?php
require_once("BDConexion.php");

header("Content-Type: application/json"); // Se debe devolver JSON

try {
    $rutaXq = "prueba.xq";

    if (!file_exists($rutaXq)) {
        throw new Exception("El archivo XQuery no existe: " . $rutaXq);
    }

    $fichero = fopen($rutaXq, "r");
    $xq = fread($fichero, filesize($rutaXq));
    fclose($fichero);

    // Iniciar la sesión con BaseX
    $session = new Session();
    $session->execute("open Maek");

    // Preparar la consulta XQuery
    $query = $session->query($xq);
    $query->bind('$dni', $_GET["dni"] ?? "0");
    $query->bind('$name', $_GET["name"] ?? "0");
    $query->bind('$gender', $_GET["gender"] ?? "0");
    $query->bind('$phone', $_GET["phone"] ?? "0");
    $query->bind('$image', $_GET["image"] ?? "0");
    $query->bind('$vip', $_GET["vip"] ?? "0");

    // Ejecutar el XQuery
    $result = $query->execute();

    // Cerrar query y sesión
    $query->close();
    $session->close();

    // Llamar a BDExport.php para exportar datos
    include 'BDExport.php';

    // Respuesta exitosa en JSON
    echo json_encode(["success" => true, "message" => "Datos insertados correctamente"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
