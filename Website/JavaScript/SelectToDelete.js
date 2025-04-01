window.onload = function () {
    const selectElement = document.getElementById("selectUser"); // Este es el ID del select en el HTML

    console.log("Iniciando la solicitud fetch..."); 

    fetch("http://localhost/M.A.E.K.-LMS-/basex/BDGetDNI.php") // Llamamos al archivo PHP
        .then(response => {
            console.log("Respuesta recibida, verificando si es JSON...");
            return response.json();  // Convertimos la respuesta a JSON
        })
        .then(data => {
            // Verificamos si la respuesta tiene errores
            console.log("Datos obtenidos:", data);
            
            if (data.error) {
                console.error("Error al obtener los datos:", data.error);
                return;
            }

            // Es importante acceder a data.data
            // Ya que data es todo el objeto JSON y data.data es el array que queremos
            // Comprobar que sea un array nos evita del error de intentar recorrer algo que no es un array
            if (data.success && Array.isArray(data.data) && data.data.length > 0) {
                console.log("Datos válidos recibidos:", data.data);

                // Borrar el select para poner los nuevos datos, incluso el mensaje predeterminado
                selectElement.innerHTML = "";

                // Recorrer los datos y añadir opciones al select
                data.data.forEach(cliente => {
                    console.log("Agregando cliente:", cliente);  // Mostrar los datos de cada cliente
                    let opcion = document.createElement("option");
                    opcion.value = cliente; 
                    opcion.textContent = cliente; 
                    selectElement.appendChild(opcion); 
                    // appendChild añade un hijo en este caso una opción al select
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

// Funcion para el boton Cancelar
function exit() {
    window.close();
};

function deleteUser() {

    const dni = document.getElementById("selectUser").value; // Obtener el DNI seleccionado
    console.log("DNI seleccionado:", dni); // Mostrar el DNI seleccionado en la consola

    if (dni === "") {
        alert("Por favor, selecciona un cliente para eliminar.");
        return;
    }

    if (confirm("¿Are you sure you want to delete the client with DNI " + dni + "?")) {
        fetch("http://localhost/M.A.E.K.-LMS-/basex/BDDelete.php?dni=${dni}")
            .then(response => response.text())
            .then(data => {
                console.log("Respuesta del servidor:", data);
                alert("Cliente eliminado correctamente.");
                window.close();
            })
            .catch(error => {
                console.error("Error al eliminar el cliente:", error);
                alert("Error al eliminar el cliente. Por favor, inténtalo de nuevo.");
            });
    }
};