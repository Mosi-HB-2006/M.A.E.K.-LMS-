<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="html" />

  <xsl:template match="maek">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" type="text/css" href="../CSS/CSS_Universal.css" />
        <script type="text/javascript" src="../JavaScript/JavaScriptPrincipal.js"></script>
        <title>Add User</title>
      </head>
      <body>
        <div class="contenedor">

          <!--Header-->

          <header>

            <!--Dropdown-->

            <div class="fl">
              <div class="flDrop"> ☰ <div class="flDropCont">
                  <a href="CPU.html">CPU</a>
                </div>
                            <div
                  class="flDropCont">
                  <a href="Motherboard.html">Motherboard</a>
                </div>
                            <div
                  class="flDropCont">
                  <a href="GraphicsCard.html">Graphics Card</a>
                </div>
                            <div
                  class="flDropCont">
                  <a href="Principal.html">Back</a>
                </div>
              </div>
              <div>
                <a href="https://www.whitepages.com" target="_blank">Contacts</a>
              </div>
            </div>

            <!--Title
                        Banner-->

            <div id="titleAddUser">
              <h1>Add A User!</h1>
            </div>
          </header>

          <!--First
                    Article-->

          <article class="article1AddUser" id="articalAddUser">
            <h2>Clients</h2>
            <table border="1px">
              <tr>
                <th>Dni</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Phone Number</th>
                <th>Image</th>
                <th>VIP</th>
              </tr>

              <xsl:for-each select="clients/client">
                <xsl:sort select="@dni" order="ascending" />
                <tr>
                  <td>
                    <xsl:value-of select="@dni" />
                  </td>
                  <td>
                    <xsl:value-of select="name" />
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="male"> Male </xsl:when>
                      <xsl:otherwise> Female </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td>
                    <xsl:value-of select="phone" />
                  </td>
                  <td>
                    <img width="60px" src="{@image}" alt="{@image}"></img>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="vip"> ✔ </xsl:when>
                      <xsl:otherwise>
                        <b>X</b>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </table>
          </article>

          <!--First
                    Side Image-->

          <aside class="aside1AddUser">
            <button type="button" id="buttonAddUser" style="font-size:3vw">
              <b>Add User</b>
            </button>
            <button type="button" id="buttonDeleteUser" style="font-size:3vw">
              <b>Delete User</b>
            </button>
          </aside>

          <article class="article2AddUser" id="ArticalProducts">
            <h2>Products</h2>
            <table border="1px">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
              <xsl:for-each select="products/product">
                <tr>
                  <td class="idSquare">
                    <xsl:value-of select="@id" />
                  </td>
                  <td>
                    <xsl:value-of select="name" />
                  </td>
                  <td>
                    <xsl:value-of select="price" />
                  </td>
                </tr>
              </xsl:for-each>
            </table>
          </article>

          <!--Footer-->

          <footer>
            <div class="footerFl">
              <div class="information">
                <h1>Information</h1>
                <ul>
                  <a href="#ArticalCPU">
                    <li>CPU</li>
                  </a>
                  <a href="#ArticalMotherboard">
                    <li>Motherboard</li>
                  </a>
                  <a href="#ArticalGPU">
                    <li>Graphics Card</li>
                  </a>
                </ul>
              </div>
              <div class="newsletter">
                <p>
                  Sign up for our newsletter!
                </p>
                <form>
                  <input type="email" id="email" value="email@email.com" />
                </form>
              </div>
              <div class="faqs">
                <a href="https://www.google.com" target="_blank">FAQs</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>