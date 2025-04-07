import module namespace db = "http://basex.org/modules/db";

let $doc := db:get("Maek", "MAEK_LMS.xml")

for $client in $doc/maek/clients/client
  return data($client/@dni)