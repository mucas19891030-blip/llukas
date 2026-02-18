/**
 * Página de Histórico de Transações - Lógica JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('searchForm');
    const balanceSection = document.getElementById('balanceSection');
    const transactionsSection = document.getElementById('transactionsSection');
    const transactionsList = document.getElementById('transactionsList');
    const noTransactionsMessage = document.getElementById('noTransactionsMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();

        if (!email) {
            showNotification('Digite um email para buscar', 'error');
            return;
        }

        // Busca a conta do usuário
        const account = App.getAccount(email);

        if (account) {
            // Exibe o saldo
            document.getElementById('balanceValue').textContent = account.balance.toFixed(2);
            balanceSection.style.display = 'block';

            // Coleta todas as transações
            const transactions = [];
            let id = 1;

            // Adiciona depósitos
            account.deposits.forEach(deposit => {
                transactions.push({
                    id: `deposit-${id++}`,
                    type: 'deposit',
                    description: 'Depósito realizado',
                    amount: deposit.value,
                    date: formatDate(deposit.createdAt),
                    icon: '💰',
                    color: 'positive'
                });
            });

            // Adiciona transferências
            account.transfers.forEach(transfer => {
                const isReceiver = transfer.receiver === account.owner;
                transactions.push({
                    id: `transfer-${id++}`,
                    type: 'transfer',
                    description: isReceiver 
                        ? `Transferência recebida de ${transfer.sender}` 
                        : `Transferência enviada para ${transfer.receiver}`,
                    amount: isReceiver ? transfer.value : -transfer.value,
                    date: formatDate(transfer.createdAt),
                    icon: '→',
                    color: isReceiver ? 'positive' : 'negative'
                });
            });

            // Adiciona empréstimos
            account.loans.forEach(loan => {
                transactions.push({
                    id: `loan-${id++}`,
                    type: 'loan',
                    description: `Empréstimo de ${loan.installments.length} parcelas`,
                    amount: loan.value,
                    date: formatDate(loan.createdAt),
                    icon: '🏦',
                    color: 'positive'
                });
            });

            // Ordena por data (mais recentes primeiro)
            transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Exibe as transações
            if (transactions.length > 0) {
                transactionsList.innerHTML = '';
                
                transactions.forEach(transaction => {
                    const transactionDiv = document.createElement('div');
                    transactionDiv.className = 'transaction-item';
                    
                    const amountClass = transaction.color === 'positive' ? 'positive' : 'negative';
                    const amountSign = transaction.color === 'positive' ? '+' : '';
                    
                    transactionDiv.innerHTML = `
                        <div class="transaction-left">
                            <div class="transaction-icon" style="background-color: ${transaction.color === 'positive' ? '#dcfce7' : '#fee2e2'}; color: ${transaction.color === 'positive' ? '#10b981' : '#ef4444'};">
                                ${transaction.icon}
                            </div>
                            <div class="transaction-details">
                                <h4>${transaction.description}</h4>
                                <p>${transaction.date}</p>
                            </div>
                        </div>
                        <div class="transaction-amount ${amountClass}">
                            ${amountSign} R$ ${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                    `;
                    
                    transactionsList.appendChild(transactionDiv);
                });

                transactionsSection.style.display = 'block';
                noTransactionsMessage.style.display = 'none';
            } else {
                transactionsSection.style.display = 'none';
                noTransactionsMessage.style.display = 'block';
            }

            showNotification('Transações carregadas', 'success');
        } else {
            showNotification('Usuário não encontrado', 'error');
            balanceSection.style.display = 'none';
            transactionsSection.style.display = 'none';
            noTransactionsMessage.style.display = 'none';
        }
    });
});
