/**
 * CLASSE: User (Frontend)
 * Representa o usuário e suas ações dentro do navegador.
 */
class User {
    constructor(nome, email, id = null, saldo = 0) {
        this.nome = nome;
        this.email = email;
        this.id = id;
        this.saldo = saldo;
    }

    /**
     * MÉTODO: salvarNoBanco
     * Envia os dados da instância atual para o servidor PHP.
     */
    async salvarNoBanco() {
    // 1. Prepara os dados para o envio
    const dadosParaEnviar = new FormData();
    dadosParaEnviar.append('nome', this.nome);
    dadosParaEnviar.append('email', this.email);

    try {
        // 2. Faz a chamada para o PHP (Verifique se o caminho está correto!)
        const resposta = await fetch('../banco.php/create_account.php', {
            method: 'POST',
            body: dadosParaEnviar
        });

        // --- ADICIONE ESTA VERIFICAÇÃO AQUI (Linha 25 aproximadamente) ---
        if (!resposta.ok) {
            // Se o servidor retornar erro 405, 404 ou 500, ele cai aqui
            throw new Error(`Erro no servidor: ${resposta.status} ${resposta.statusText}`);
        }

        // 3. Tenta converter para JSON apenas se a resposta for OK
        const resultadoJson = await resposta.json();
        
        if (resultadoJson.status === 'success') {
            this.id = resultadoJson.id;
            return { sucesso: true, mensagem: resultadoJson.message };
        } else {
            return { sucesso: false, mensagem: resultadoJson.message };
        }

    } catch (erro) {
        // Se cair aqui, o erro de JSON ou de Conexão será detalhado no console
        console.error("Erro detalhado na comunicação:", erro);
        return { sucesso: false, mensagem: "Erro ao conectar com o servidor PHP. Verifique se o XAMPP está rodando." };
    }
}
}