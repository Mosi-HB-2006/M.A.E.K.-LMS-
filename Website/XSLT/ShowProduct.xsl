<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <html lang="en" class="popUpWindow">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Modify Product</title>
            <link rel="stylesheet" type="text/css" href="../CSS/CSS_Universal.css"/>
            <script type="text/javascript" src="../JavaScript/JavaScriptModifyProduct.js"></script>
        </head>
        <body>
            <form id="modifyProductForm" onsubmit="return submitForm(event)">
                <div class="parent">
                    <xsl:for-each select="maek/products/product[@id=$productId]">
                        <div class="div1">
                            <label>ID: </label><label id="lid">
                                <xsl:value-of select="@id"/>
                            </label>
                        </div>
                        <div class="div2">
                            <label for="lname">Name</label>
                            <input type="text" id="fname" name="fname" value="{name}" required="required"/>
                        </div>
                        <div class="div4">
                            <label for="lprice">Price</label>
                            <input type="text" id="fprice" name="fprice" value="{price}" required="required"/>
                        </div>
                        <div class="div7">
                            <button type="submit" id="buttonModifyClient" style="font-size:3vw"><b>Submit</b></button>
                        </div>
                    </xsl:for-each>
                </div>
            </form>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
