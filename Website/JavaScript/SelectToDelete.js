window.onload = function () {
    const selectElement = document.getElementById("selectUser");

    console.log("Iniciando la solicitud fetch...");

    fetch("http://localhost/M.A.E.K.-LMS-/basex/BDDelete.php") // Llamamos al archivo PHP
        .then(response => {
            console.log("Respuesta recibida, verificando si es JSON...");
            return response.json();  // Convertimos la respuesta en JSON
        })
        .then(data => {
            // Verificamos si la respuesta tiene errores
            console.log("Datos obtenidos:", data);
            
            if (data.error) {
                console.error("Error al obtener los datos:", data.error);
                return;
            }

            // Verificamos si los datos contienen elementos válidos
            if (data && Array.isArray(data) && data.length > 0) {
                console.log("Datos válidos recibidos:", data);

                // Borrar el select para poner los nuevos datos
                selectElement.innerHTML = "";

                // Recorrer los datos y añadir opciones al select
                data.forEach(cliente => {
                    console.log("Agregando cliente:", cliente);  // Ver los datos de cada cliente
                    let opcion = document.createElement("option");
                    opcion.value = cliente; 
                    opcion.textContent = cliente; 
                    selectElement.appendChild(opcion);
                });

                console.log("Opciones añadidas correctamente al select.");
            } else {
                console.error("No se encontraron clientes válidos en los datos.");
                selectElement.innerHTML = "<option>No hay clientes disponibles.</option>";
            }
        })
        .catch(error => {
            console.error("Error en fetch:", error);
        });
};
