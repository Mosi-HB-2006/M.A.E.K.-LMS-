<?php
require_once("BDConexion.php");

// Set proper JSON header
header('Content-Type: application/json');

try {
  // New BaseX session
  $session = new Session();
  $session->execute("open Maek");

  // Files paths
  $xmlFilePath = $_SERVER['DOCUMENT_ROOT'] . "/M.A.E.K.-LMS-/Website/XML/MAEK_LMS.xml";
  $xslFilePath = $_SERVER['DOCUMENT_ROOT'] . "/M.A.E.K.-LMS-/Website/XSLT/MAEK_LMS.xsl";
  $htmlFilePath = $_SERVER['DOCUMENT_ROOT'] . "/M.A.E.K.-LMS-/Website/HTML/AddUserXSLT.html";

  // Export to an XML file
  $exportQuery = $session->query("db:export('Maek', '$xmlFilePath', map {'method': 'xml', 'indent': 'yes'})");
  $exportResult = $exportQuery->execute();
  $exportQuery->close();

  // Close BaseX session
  $session->close();

  // Verify if the xml is generated correctly
  if (!file_exists($xmlFilePath)) {
    throw new Exception("Error: The XML file is not generated in $xmlFilePath");
  }

  // Make the XSLT transformation
  $xml = new DOMDocument();
  if (!$xml->load($xmlFilePath)) {
    throw new Exception("Error loading the XML on $xmlFilePath");
  }

  $xsl = new DOMDocument();
  if (!$xsl->load($xslFilePath)) {
    throw new Exception("Error loading the XSLT on $xslFilePath");
  }

  // Create XSLT processor
  $processor = new XSLTProcessor();
  $processor->importStylesheet($xsl);

  // Transform to HTML
  $htmlOutput = $processor->transformToXML($xml);
  if ($htmlOutput === false) {
    throw new Exception("Error al transformar el XML con XSLT");
  }

  // Save the output in to the HTML
  if (file_put_contents($htmlFilePath, $htmlOutput) === false) {
    throw new Exception("Error al escribir el archivo HTML en $htmlFilePath");
  }

  // Return data in JSON format
  echo json_encode([
    'success' => true,
    'message' => 'Exportación y transformación XSLT completadas con éxito'
  ]);
} catch (Exception $e) {
  // If there is an error, return it in JSON format
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'error' => $e->getMessage()
  ]);
}
