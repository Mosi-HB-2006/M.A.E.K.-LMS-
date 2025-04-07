<?php
if (!isset($_GET['id'])) {
  throw new Exception("Missing data to generate the page.");
}

// Get ID from URL safely
$productId = htmlspecialchars($_GET['id']);

$xml = new DOMDocument();
$xml->load("../XML/MAEK_LMS.xml");

$xsl = new DOMDocument();
$xsl->load("../XSLT/ShowProduct.xsl");

$htmlFilePath = $_SERVER['DOCUMENT_ROOT'] . "/M.A.E.K.-LMS-/Website/HTML/ModifyXSLT.html";

$proc = new XSLTProcessor();
$proc->importStylesheet($xsl);
// Set dynamic parameter
$proc->setParameter('', 'productId', $productId);

$htmlOutput = $proc->transformToXML($xml);
if ($htmlOutput === false) {
  throw new Exception("Error transforming the XML with XSLT");
}

// Save the output in to the HTML
if (file_put_contents($htmlFilePath, $htmlOutput) === false) {
  throw new Exception("Error writing the HTML file on $htmlFilePath");
}

header("Location: /M.A.E.K.-LMS-/Website/HTML/ModifyXSLT.html");
exit();
