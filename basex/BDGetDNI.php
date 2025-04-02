<?php
require_once("BDConexion.php");

// Must return JSON
header("Content-Type: application/json");

try {
    $pathXq = "GetDni.xq";

    if (!file_exists($pathXq)) {
        throw new Exception("The XQuery file not exists: " . $pathXq);
    }

    $file = fopen($pathXq, "r");
    $xq = fread($file, filesize($pathXq));
    fclose($file);

    // New BaseX session
    $session = new Session();
    $session->execute("open Maek");

    // Prepare the XQuery query
    $query = $session->query($xq);

    // Execute the XQuery and obtain the results
    $dnis = $query->execute();

    // Transform to array
    $result = array_values(array_filter(explode("\r\n", $dnis)));

    // Close query and session
    $query->close();
    $session->close();

    // Return data in JSON format
    if (!empty($result)) {
        echo json_encode(["success" => true, "data" => $result, "message" => "Data collected correctly"]);
    } else {
        echo json_encode(["success" => false, "message" => "No clients found"]);
    }
} catch (Exception $e) {
    // If there is an error, return it in JSON format
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
