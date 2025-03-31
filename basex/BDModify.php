<?php
require_once("BDConexion.php");

header("Content-Type: application/json");

try {
    $rutaXq = "ModificarProducto.xq";

    if (!file_exists($rutaXq)) {
        throw new Exception("El archivo XQuery no existe: " . $rutaXq);
    }

    $fichero = fopen($rutaXq, "r");
    $xq = fread($fichero, filesize($rutaXq));
    fclose($fichero);

    $session = new Session();
    $session->execute("open Maek");

    $query = $session->query($xq);
    $query->bind('$id', $_GET["id"] ?? "0");
    $query->bind('$name', $_GET["name"] ?? "0");
    $query->bind('$price', $_GET["price"] ?? "0");
    
    $result = $query->execute();

    $query->close();
    $session->close();

    include 'BDExport.php';

    echo json_encode(["success" => true, "message" => "Datos modificados correctamente"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}