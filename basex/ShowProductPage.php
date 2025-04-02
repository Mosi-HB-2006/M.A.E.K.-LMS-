<?php
    if (!isset($_GET['id'])) {
        throw new Exception("Missing data to generate the page.");
    }

    // htmlspecialchars() is to prevent malicious code
    $id = htmlspecialchars($_GET['id']);

    // Path to the XML and XSLT files
    $xmlFile = "../Website/XML/MAEK_LMS.xml";
    $xsltFile = "../Website/XSLT/ShowProduct.xsl"; // XSLT file to transform XML into HTML

    // Create the DOM document for the XML and XSLT
    $xml = new DOMDocument();
    $xml->load($xmlFile);
    $xsl = new DOMDocument();
    $xsl->load($xsltFile);

    // Set up the XSLT processor
    $proc = new XSLTProcessor();
    $proc->importStylesheet($xsl);

    // Pass parameters to the XSLT
    // First argument is the namespace, 
    // second is the parameter name in the XSLT, 
    // third is the value in the PHP
    $proc->setParameter('', 'id', $id);

    // Transform the XML into HTML
    $html = $proc->transformToXML($xml);

    // Display the HTML
    echo $html;
?>
