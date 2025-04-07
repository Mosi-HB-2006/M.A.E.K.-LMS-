import module namespace db = "http://basex.org/modules/db";
declare variable $id external := "0";
declare variable $name external := "0";
declare variable $price external := "0";

let $doc := db:get("Maek", "MAEK_LMS.xml")

return (
  replace value of node $doc//product[@id=$id]/name with $name,
  replace value of node $doc//product[@id=$id]/price with $price
)