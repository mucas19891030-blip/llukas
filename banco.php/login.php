<?php
/**
 * SCRIPT: login.php
 * Verifica se o e-mail existe na tabela 'usuario' e retorna o resultado.
 */
header("Content-Type: application/json; charset=UTF-8");
include_once 'conexao.php';
include_once 'Usuario.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = new Usuario($conn);
    $email = $_POST['email'];

    // Chama o método da classe para buscar o usuário
    $resultado = $usuario->buscarPorEmail($email);
    echo json_encode($resultado);
} else {
    echo json_encode(["status" => "error", "message" => "Acesso negado."]);
}
?>