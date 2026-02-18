<?php
$servidor = "localhost";
$usuario = "root";
$senha = "";
$banco = "banco"; 

$conn = new mysqli($servidor, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Erro");
}

?>