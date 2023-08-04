const Contact = require("../Contacts/Contact")
const NotFound = require("./error/NotFound")
const UnAuthorized = require("./error/UnAuthorized")
const Validation = require("./error/Validation")

class Account {
    static ID = 0
    constructor(balance) {
        this.ID = Account.ID++
        this.balance = balance
        this.passbook = []
    }

    
    // newAccount(balance){
    //     if(typeof balance != "number"){ throw new Validation("Balance input is invalid")}
    //     let balaceObj = new Account(balance)
        
    // }

    getAccountId(){
        return this.ID
    }

    getBalance(){
        return this.balance
    }

    deposit(amount) {
        try {
            if (typeof amount != "number" || amount < 0) {
                throw new Validation("amount is Invalid")
            }
            this.balance = this.balance + amount
            let passBookObj = new PassBook(new Date(), "Credited", amount, this.balance)
            this.passBook.push(passBookObj)
            return this.balance
        } catch (error) {
            throw error
        }
    }

    withdraw(amount) {
        try {
            if (typeof amount !== "number" || amount <= 0 || amount > this.balance) {
                throw new Validation("Invalid amount");
            }
            this.balance = this.balance - amount
            let passBookObj = new PassBook(new Date(), "Debited", amount, this.balance)
            this.passBook.push(passBookObj)
            return this.balance
        } catch (error) {
            throw error
        }
    }

    getPassBook() {
        return this.passBook
    }
}

module.exports = Account