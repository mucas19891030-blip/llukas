class Deposit {
    constructor(value) {
        this.value = value;
        this.createDat = new Date;
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
 * LÓGICA DA PÁGINA DE DEPÓSITO
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('depositForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const value = parseFloat(document.getElementById('value').value);

        if (!email || !value) {
            showNotification('Preencha todos os campos', 'error');
            return;
        }

        if (value <= 0) {
            showNotification('O valor deve ser maior que zero', 'error');
            return;
        }

        const success = App.deposit(email, value);

        if (success) {
            showNotification(`Depósito de ${formatCurrency(value)} realizado com sucesso!`, 'success');
            
            form.reset();
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showNotification('Usuário não encontrado', 'error');
        }
    });
});
