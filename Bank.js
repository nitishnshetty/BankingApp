class Bank{
    static ID=0
    constructor(bankName){
        this.ID=Bank.ID++
        this.bankName=bankName
    }

    
}

module.exports = Bank