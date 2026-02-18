class Loan {
    static #interestRate = 1.05; 

    constructor(value, installmentsCount) {
        this.value = value;
        this.createdAt = new Date();
        this.installments = [];
        
        const totalToPay = value * Loan.#interestRate;
        const installmentValue = totalToPay / installmentsCount;
        
        for (let i = 1; i <= installmentsCount; i++) {
            this.installments.push(new Installment(installmentValue, i));
        }
    }

    static get interestRate() {
        return Loan.#interestRate;
    }

    static set interestRate(percentage) {
        Loan.#interestRate = 1 + (percentage / 100);
    }
}

/**
 * ============================================
 * FUNÇÕES UTILITÁRIAS
 * ============================================
 */

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

/**
 * ============================================
 * LÓGICA DA PÁGINA DE EMPRÉSTIMO
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loanForm');
    const valueInput = document.getElementById('value');
    const installmentsInput = document.getElementById('installments');
    const interestRateSpan = document.getElementById('interestRate');
    const totalValueSpan = document.getElementById('totalValue');
    const installmentValueSpan = document.getElementById('installmentValue');

    function updateCalculation() {
        const value = parseFloat(valueInput.value) || 0;
        const installments = parseInt(installmentsInput.value) || 1;
        const interestRate = App.getInterestRate();

        interestRateSpan.textContent = interestRate.toFixed(1);

        if (value > 0) {
            const total = value * (1 + interestRate / 100);
            const installmentValue = total / installments;

            totalValueSpan.textContent = total.toFixed(2);
            installmentValueSpan.textContent = installmentValue.toFixed(2);
        } else {
            totalValueSpan.textContent = '0.00';
            installmentValueSpan.textContent = '0.00';
        }
    }

    valueInput.addEventListener('input', updateCalculation);
    installmentsInput.addEventListener('input', updateCalculation);

    updateCalculation();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const value = parseFloat(valueInput.value);
        const installments = parseInt(installmentsInput.value);

        if (!email || !value) {
            showNotification('Preencha todos os campos', 'error');
            return;
        }

        if (value <= 0) {
            showNotification('O valor deve ser maior que zero', 'error');
            return;
        }

        if (installments < 1) {
            showNotification('O número de parcelas deve ser pelo menos 1', 'error');
            return;
        }

        const loan = App.loan(email, value, installments);

        if (loan) {
            const interestRate = App.getInterestRate();
            const total = value * (1 + interestRate / 100);
            const installmentValue = total / installments;

            showNotification(
                `Empréstimo de ${formatCurrency(value)} aprovado! Total a pagar: ${formatCurrency(total)}`,
                'success'
            );
            
            form.reset();
            updateCalculation();
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showNotification('Usuário não encontrado', 'error');
        }
    });
});
