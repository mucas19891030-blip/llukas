<?php
// 1. Desativa a exibição de erros HTML que quebram o JSON
ini_set('display_errors', 0); 
header("Content-Type: application/json; charset=UTF-8");

try {
    include_once 'conexao.php';
    include_once 'Usuario.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $usuario = new Usuario($conn);

        // Verifica se os dados chegaram via POST
        $nome = isset($_POST['nome']) ? $_POST['nome'] : null;
        $email = isset($_POST['email']) ? $_POST['email'] : null;

        if ($nome && $email) {
            $usuario->nome = $nome;
            $usuario->email = $email;
            $resultado = $usuario->criar();
            echo json_encode($resultado);
        } else {
            echo json_encode(["status" => "error", "message" => "Dados incompletos."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Metodo nao permitido."]);
    }
} catch (Exception $e) {
    // Se houver qualquer erro de PHP, retorna como JSON
    echo json_encode(["status" => "error", "message" => "Erro no servidor: " . $e->getMessage()]);
}
exit();
?>
