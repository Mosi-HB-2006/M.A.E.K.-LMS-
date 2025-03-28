import module namespace db = "http://basex.org/modules/db";
declare variable $dni external := "0";
declare variable $name external := "0";
declare variable $gender external := "0";
declare variable $phone external := "0";
declare variable $image external := "0";
declare variable $vip external := "0";

let $doc := db:get("Maek", "MAEK_LMS.xml")  (: Obtener el documento MAEK_LMS.xml desde la base de datos :)
let $newClient :=
  <client dni="{$dni}" image="{$image}">
    <name>{$name}</name>
    {if ($vip = "VIP") then <vip/> else ()}
    {element { $gender } {()}}
    <phone>{$phone}</phone>
  </client>

(: Insertar el nuevo cliente dentro del nodo <clients> del documento MAEK_LMS.xml :)
return insert node $newClient into $doc//clients