<?php
require_once("BDConexion.php");

// Set proper JSON header
header('Content-Type: application/json');

try {
  // Iniciar la sesión con BaseX
  $session = new Session();
  $session->execute("open Maek");

  // Ruta absoluta del XML
  $xmlFilePath = $_SERVER['DOCUMENT_ROOT'] . "/M.A.E.K.-LMS-/Website/XML/MAEK_LMS.xml";
  $xslFilePath = $_SERVER['DOCUMENT_ROOT'] . "/M.A.E.K.-LMS-/Website/XSLT/MAEK_LMS.xsl";
  $htmlFilePath = $_SERVER['DOCUMENT_ROOT'] . "/M.A.E.K.-LMS-/Website/HTML/AddUserXSLT.html";

  // Exportar a un archivo XML
  $exportQuery = $session->query("db:export('Maek', '$xmlFilePath', map {'method': 'xml', 'indent': 'yes'})");
  $exportResult = $exportQuery->execute();
  $exportQuery->close();

  // Cerrar sesión BaseX
  $session->close();

  // Verificar si el XML se creó correctamente
  if (!file_exists($xmlFilePath)) {
    throw new Exception("Error: El archivo XML no se creó en $xmlFilePath");
  }

  // Realizar la transformación XSLT
  $xml = new DOMDocument();
  if (!$xml->load($xmlFilePath)) {
    throw new Exception("Error al cargar el XML en $xmlFilePath");
  }

  $xsl = new DOMDocument();
  if (!$xsl->load($xslFilePath)) {
    throw new Exception("Error al cargar el XSLT en $xslFilePath");
  }

  // Crear procesador de XSLT
  $processor = new XSLTProcessor();
  $processor->importStylesheet($xsl);

  // Transformar a HTML
  $htmlOutput = $processor->transformToXML($xml);
  if ($htmlOutput === false) {
    throw new Exception("Error al transformar el XML con XSLT");
  }

  // Guardar la salida en el archivo HTML
  if (file_put_contents($htmlFilePath, $htmlOutput) === false) {
    throw new Exception("Error al escribir el archivo HTML en $htmlFilePath");
  }

  echo json_encode([
    'success' => true,
    'message' => 'Exportación y transformación XSLT completadas con éxito'
  ]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'error' => $e->getMessage()
  ]);
}
