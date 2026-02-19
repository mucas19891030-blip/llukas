<?php
/**
 * CLASSE: Usuario
 * Gerencia as operações de usuário no Banco de Dados MySQL.
 */
class Usuario {
    private $conn;
    private $tabela = "usuario"; // Nome da sua tabela no banco

    // Atributos da classe
    public $id;
    public $nome;
    public $email;
    public $saldo;

    // O construtor recebe a conexão ativa do banco
    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Método para gerar um ID aleatório de 11 dígitos
     */
    private function gerarIdAleatorio() {
        $novoId = "";
        for ($i = 0; $i < 11; $i++) {
            $novoId .= rand(0, 9);
        }
        return $novoId;
    }

    /**
     * Método para criar uma nova conta (Cadastro)
     */
    public function criar() {
        // Verifica se o e-mail já existe
        $queryBusca = "SELECT email FROM " . $this->tabela . " WHERE email = ?";
        $stmtBusca = $this->conn->prepare($queryBusca);
        $stmtBusca->bind_param("s", $this->email);
        $stmtBusca->execute();
        $resultado = $stmtBusca->get_result();

        if ($resultado->num_rows > 0) {
            return ["status" => "error", "message" => "Este e-mail já está cadastrado."];
        }

        // Define valores iniciais
        $this->id = $this->gerarIdAleatorio();
        $this->saldo = 0.00;

        // Insere no banco
        $queryInsert = "INSERT INTO " . $this->tabela . " (id, nome, email, saldo) VALUES (?, ?, ?, ?)";
        $stmtInsert = $this->conn->prepare($queryInsert);
        $stmtInsert->bind_param("sssd", $this->id, $this->nome, $this->email, $this->saldo);

        if ($stmtInsert->execute()) {
            return ["status" => "success", "message" => "Conta criada!", "id" => $this->id];
        }
        return ["status" => "error", "message" => "Erro ao salvar no banco."];
    }

    /**
     * Método para buscar um usuário pelo e-mail (Login)
     * ESTE MÉTODO DEVE ESTAR DENTRO DA CLASSE (ANTES DA ÚLTIMA CHAVE)
     */
    public function buscarPorEmail($email) {
        $query = "SELECT * FROM " . $this->tabela . " WHERE email = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($user = $resultado->fetch_assoc()) {
            return [
                "status" => "success", 
                "nome" => $user['nome'], 
                "email" => $user['email']
            ];
        }
        return ["status" => "error", "message" => "Usuário não encontrado."];
    }
} // <-- ESTA CHAVE FECHA A CLASSE USUARIO (MUITO IMPORTANTE!)
?>
