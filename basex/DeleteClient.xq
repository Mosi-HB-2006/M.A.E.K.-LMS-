import module namespace db = "http://basex.org/modules/db";
declare variable $dni external := "0";

let $doc := db:get("Maek", "MAEK_LMS.xml")

for $cliente in $doc/maek/clients/client[@dni=$dni]
return delete node $cliente