<?php

require_once("BDConexion.php");

header("Content-Type: application/json");

try {
    $rutaXq = "DeleteClient.xq";

    if (!file_exists($rutaXq)) {
        throw new Exception("El archivo XQuery no existe: " . $rutaXq);
    }

    $fichero = fopen($rutaXq, "r");
    $xq = fread($fichero, filesize($rutaXq));
    fclose($fichero);

    $session = new Session();
    $session->execute("open Maek");

    $query = $session->query($xq);
    $query->bind('$dni', $_GET["dni"] ?? "0");

    $resultados = $query->execute();

    $query->close();
    $session->close();

    include 'BDExport.php';

    echo json_encode(["success" => true, "message" => "Cliente eliminado correctamente"]);
    
}   catch (Exception $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>