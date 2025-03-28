<?php
require_once("BDConexion.php");

try {
    $rutaXq = "prueba.xq";
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

    // Cerrar la consulta
    $query->close();

    // Exportar a un archivo XML
    $exportQuery = $session->query("db:export('Maek', 'C:/xampp/htdocs/M.A.E.K.-LMS-/Website/XML/MAEK_LMS.xml', map {'method': 'xml', 'indent': 'yes'})");
    $exportResult = $exportQuery->execute();
    $exportQuery->close();

    // Cerrar la sesión
    $session->close();

    // Limpiar salida previa y enviar encabezado XML
    ob_clean();
    header("Content-Type: text/xml; charset=UTF-8");

    // Imprimir el resultado de la primera consulta
    echo trim($result);
} catch (Exception $e) {
    ob_clean();
    header("Content-Type: text/plain");
    echo "Error: " . $e->getMessage();
}
