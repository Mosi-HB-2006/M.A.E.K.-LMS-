<?php
    if (!isset($_GET['id']) || !isset($_GET['name']) || !isset($_GET['price'])) {
        throw new Exception("Faltan datos para generar la página.");
    }
?>