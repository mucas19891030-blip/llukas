class User {
    constructor(fullName, email) {
        this.fullName = fullName; // Nome completo do usuário
        this.email = email; // Email único do usuário
        this.account = new Account(this); // Cada usuário possui uma conta associada
    }
}