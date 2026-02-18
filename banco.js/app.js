class App {
    static #users = [];

    static get users() {
        return App.#users
    }

     static findUserByEmail(email) {
        return App.users.find(user => user.email === email);
    }

    static createUser(fullName, email) {
        const userExists = App.findUserByEmail(email);
        if (!userExists) {
            const newUser = new User(fullName, email);
            App.users.push(newUser);
            return newUser;
        }
        return null;
    }

    static deposit(email, value) {
        const user = App.findUserByEmail(email);
        if (user) {
            const newDeposit = new Deposit(value);
            user.account.addDeposit(newDeposit);
        }
    }

    static transfer(fromEmail, toEmail, value) {
        const sender = App.findUserByEmail(fromEmail);
        const receiver = App.findUserByEmail(toEmail);
        
        if (sender && receiver) {
            const newTransfer = new Transfer(sender, receiver, value);
            sender.account.addTransfer(newTransfer);
            receiver.account.addTransfer(newTransfer);
        }
    }

    static loan(email, value, installmentsCount) {
        const user = App.findUserByEmail(email);
        if (user) {
            const newLoan = new Loan(value, installmentsCount);
            user.account.addLoan(newLoan);
        }
    }

    static changeLoanFee(percentage) {
        Loan.interestRate = percentage;
    }
}