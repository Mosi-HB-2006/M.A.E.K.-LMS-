<?php
require_once("BDConexion.php");

// Must return JSON
header("Content-Type: application/json");

try {
  $pathXq = "../XQUERY/InsertClient.xq";

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
  $query->bind('$name', $_GET["name"] ?? "0");
  $query->bind('$gender', $_GET["gender"] ?? "0");
  $query->bind('$phone', $_GET["phone"] ?? "0");
  $query->bind('$image', $_GET["image"] ?? "0");
  $query->bind('$vip', $_GET["vip"] ?? "0");

  // Execute the XQuery
  $result = $query->execute();

  // Close query and session
  $query->close();
  $session->close();

  // Call BDExport.php for export data
  include 'BDExport.php';

  // Return data in JSON format
  echo json_encode(["success" => true, "message" => "Data modified correctly"]);
} catch (Exception $e) {
  // If there is an error, return it in JSON format
  echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
