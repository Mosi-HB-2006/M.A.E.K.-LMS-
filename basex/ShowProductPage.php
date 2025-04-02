<?php
    if (!isset($_GET['id']) || !isset($_GET['name']) || !isset($_GET['price'])) {
        throw new Exception("Missing data to generate the page.");
    }

    // htmlspecialchars() is to prevent malicious code
    $id = htmlspecialchars($_GET['id']);
    $name = htmlspecialchars($_GET['name']);
    $price = htmlspecialchars($_GET['price']);

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
    $proc->setParameter('', 'name', $name);
    $proc->setParameter('', 'price', $price);

    // Transform the XML into HTML
    $html = $proc->transformToXML($xml);

    echo "<script>console.log('ID: $id, Name: $name, Price: $price');</script>";
    // Display the HTML
    echo $html;
?>
