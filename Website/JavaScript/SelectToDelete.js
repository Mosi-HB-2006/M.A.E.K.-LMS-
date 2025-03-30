window.onload = function () {
    const selectElement = document.getElementById("selectClients");

    fetch("BDDelete.php") // Llamamos al archivo PHP
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error al obtener los datos:", data.error);
                return;
            }

            // Borrar el select para poner los nuevos datos
            selectElement.innerHTML = "";

            // Recorrer los datos y añadir opciones al select
            data.forEach(cliente => {  
                let opcion = document.createElement("option");
                opcion.value = cliente; 
                opcion.textContent = cliente; 
                selectElement.appendChild(opcion);
            });            
        })
        .catch(error => console.error("Error en fetch:", error));
};
