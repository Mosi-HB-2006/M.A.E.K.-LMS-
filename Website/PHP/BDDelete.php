<?php
require_once("BDConexion.php");

// Must return JSON
header("Content-Type: application/json");

try {
  $pathXq = "../XQUERY/DeleteClient.xq";

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
  $query->bind('$dni', $_GET["dni"] ?? "0");

  // Execute the XQuery
  $result = $query->execute();

  // Close query and session
  $query->close();
  $session->close();

  // Call BDExport.php for export data
  include 'BDExport.php';

  // Return data in JSON format
  echo json_encode(["success" => true, "message" => "Client deleted correctly"]);
} catch (Exception $e) {
  // If there is an error, return it in JSON format
  echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
