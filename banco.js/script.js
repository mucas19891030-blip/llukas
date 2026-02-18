console.log("Iniciando Testes do Banco");

//1. Criar usuário
App.createUser("Alice Silva", "alice@gmail.com");
App.createUser("Bob Souza", "bob@gmail.com");
console.log("Usuários criados:", App.users.length);// Deve exibir 2

//2. Testar Depósito
App.deposit("alice@gmail.com", 1000);
const alice = App.findUserByEmail("alice@gmail.com");
console.log("Saldo Alice (Depósito 1000):", alice.account.balance); // 1000

// 3. Testar Empréstimo
App.loan("alice@gmail.com", 500, 5);
console.log("Saldo Alice (Empréstimo 500):", alice.account.balance); // 1500
console.log("Parcelas criadas:", alice.account.loans[0].installments.length); // 5

// 4. Testar Transferência
App.transfer("alice@gmail.com", "bob@gmail.com", 300);
const bob = App.findUserByEmail("bob@gmail.com");
console.log("Saldo Alice (Após transferir 300):", alice.account.balance); // 1200
console.log("Saldo Bob (Após receber 300):", bob.account.balance); // 300

// 5. Testar Alteração de Taxa de Juros
App.changeLoanFee(10); // 10%
console.log("Nova taxa de juros (1.10):", Loan.interestRate); // 1.1

console.log("Testes Finalizados com Sucesso");

