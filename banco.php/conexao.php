<?php
$servidor = "localhost";
$usuario = "root";
$senha = ""; // No XAMPP a senha padrão é vazia
$banco = "banco"; // Nome do seu banco de dados

// Cria a conexão
$conn = new mysqli($servidor, $usuario, $senha, $banco);

// Verifica se houve erro na conexão
if ($conn->connect_error) {
    // Retorna o erro como JSON para não quebrar o JavaScript
    die(json_encode(["status" => "error", "message" => "Falha na conexao com o banco de dados."]));
}
?>
