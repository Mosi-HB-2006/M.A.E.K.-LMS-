<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- XSLT storage the received data from php into the parameters -->
    <xsl:param name="id" />

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
                <xsl:for-each select="maek/products/product[@id='123A']">
                    <p><strong>ID:</strong> <xsl:value-of select="@id" /></p>
                    <p><strong>Name:</strong> <xsl:value-of select="name" /></p>
                    <p><strong>Price:</strong> <xsl:value-of select="price" /></p>
                </xsl:for-each>
            </div>
            <button class="" onclick="window.location.href='../Website/HTML/PopUpModifyProduct.html'">
                Modify
            </button>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>