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

    // Cerrar query
    $query->close();

    // Exportar a un archivo XML
    $exportQuery = $session->query("db:export('Maek', 'C:/xampp/htdocs/M.A.E.K.-LMS-/Website/XML/MAEK_LMS.xml', map {'method': 'xml', 'indent': 'yes'})");
    $exportResult = $exportQuery->execute();
    $exportQuery->close();

    // Store XQuery result in a temporary XML file
    $xmlFile = '../Website/XML/MAEK_LMS.xml';

    // Load the XQuery result XML
    $xml = new DOMDocument();
    $xml->load($xmlFile);

    // Load XSLT stylesheet
    $xsl = new DOMDocument();
    $xsl->load('../Website/XSLT/MAEK_LMS.xsl');

    // Create XSLT processor
    $processor = new XSLTProcessor();
    $processor->importStylesheet($xsl);

    // Transform to HTML
    $htmlOutput = $processor->transformToXML($xml);

    // Define the output path for HTML file
    $htmlFilePath = '../Website/HTML/AddUserXSLT.html';

    // Write the HTML output to file
    file_put_contents($htmlFilePath, $htmlOutput);

    // Close session
    $session->close();

    // Output HTML (optional - remove if you don't want to display in browser)
    header('Content-Type: text/html; charset=utf-8');
    echo $htmlOutput;
} catch (Exception $e) {
    ob_clean();
    header("Content-Type: text/plain");
    echo "Error: " . $e->getMessage();
}
