<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- XSLT storage the received data from php into the parameters -->
    <xsl:param name="id" />
    <xsl:param name="name" />
    <xsl:param name="price" />

    <xsl:template match="/">
        <html>
        <head>
            <title>Selected Product</title>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="stylesheet" type="text/css" href="../CSS/CSS_Universal.css"/>
        </head>
        <body>
            <div class=""> 
                <p><strong>ID:</strong> <xsl:value-of select="maek/products/product[@id=$id]" /></p>
                <p><strong>Name:</strong> <xsl:value-of select="maek/products/product[name=$name]" /></p>
                <p><strong>Price:</strong> <xsl:value-of select="maek/products/product[@price=$price]" /></p>
            </div>
            <button class="" onclick="window.location.href='../Website/HTML/PopUpModifyProduct.html'">
                Modify
            </button>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>