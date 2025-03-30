import module namespace db = "http://basex.org/modules/db";
declare variable $dni external := "0";
declare variable $name external := "0";
declare variable $gender external := "0";
declare variable $phone external := "0";
declare variable $image external := "0";
declare variable $vip external := "0";

let $doc := db:get("Maek", "MAEK_LMS.xml")
let $newClient :=
  <client dni="{$dni}" image="{$image}">
    <name>{$name}</name>
    {if ($vip) then <vip/> else ()}
    {element { $gender } {()}}
    <phone>{$phone}</phone>
  </client>

(: Insertar el nuevo cliente dentro de clients del documento MAEK_LMS.xml :)
return insert node $newClient into $doc//clients
