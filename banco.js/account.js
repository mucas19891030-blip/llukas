class Account {
    #balance;

    constructor(user) {
        this.owner = user;
        this.#balance = 0;
        this.deposits = [];
        this.loans = [];
        this.transfers = [];
    }

    get balance() {
        return this.#balance;
    }

    addDeposit(deposit) {
        this.#balance += deposit.value;
        this.deposits.push(deposit);
    }

    addLoan(loan) {
        this.#balance += loan.value;
        this.loans.push(loan);
    }

    addTransfer(transfer) {
        if (transfer.receiver === this.owner) {
            this.#balance += transfer.value;
        } else if (transfer.sender === this.owner) {
            this.#balance -= transfer.value;
        }
        this.transfers.push(transfer);
    }
}