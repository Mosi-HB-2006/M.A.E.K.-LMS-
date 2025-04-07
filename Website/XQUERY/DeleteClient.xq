import module namespace db = "http://basex.org/modules/db";
declare variable $dni external := "0";

let $doc := db:get("Maek", "MAEK_LMS.xml")

for $client in $doc//clients/client[@dni=$dni]
return delete node $client