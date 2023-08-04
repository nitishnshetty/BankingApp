const NotFound = require("./error/NotFound")
const UnAuthorized = require("./error/UnAuthorized")
const Validation = require("./error/Validation")
const Bank = require("./Bank")
const Account = require("./Account")
const PassBook = require("./Passbook")

class User {
    static ID = 0
    static allUser = []
    static allBanks = []
    constructor(firstName, lastName, phoneNumber, isAdmin) {
        this.ID = User.ID++
        this.isAdmin = isAdmin
        this.firstName = firstName
        this.lastName = lastName
        this.phoneNumber = phoneNumber
        this.accounts = []
    }

    //ADMIN=========================================================================
    static newAdmin(firstName, lastName, phoneNumber) {
        try {
            if (typeof firstName != "string" || typeof lastName != "string" || typeof phoneNumber != "number") {
                throw new Validation("Validation input is wrong")
            }
            return new User(firstName, lastName, phoneNumber, true)

        } catch (error) {
            return error
        }
    }
    //USER================================================================================
    newUser(firstName, lastName, phoneNumber) {
        try {
            if (typeof firstName != "string" || typeof lastName != "string" || typeof phoneNumber != "number") {
                throw new Validation("Validation input is wrong")
            }
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an Admin")
            }
            let userObj = new User(firstName, lastName, phoneNumber, false)
            User.allUser.push(userObj)
            return userObj
        } catch (error) {
            return error
        }
    }

    findUser(userID) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorized("you are not admin")
            }
            if (typeof userID != "number") {
                throw new Validation("user ID invalid input")
            }
            for (let index = 0; index < User.allUser.length; index++) {
                if (userID == User.allUser[index].ID) {
                    return [index]
                }
            }
            throw new NotFound("user ID not found")
        } catch (error) {
            throw error
        }

    }

    getAllUsers() {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an Admin")
            } return User.allUser
        } catch (error) {
            return error
        }
    }
    getUserByID(userID) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an Admin")
            }
            let indexOfUser = this.findUser(userID)
            if (typeof userID != "number") {
                throw new Validation("user input is invalid")
            }
            return User.allUser[indexOfUser]
        } catch (error) {
            return error
        }
    }

    updateUser(userID, parameter, newValue) {
        try {
            if (typeof userID != "number") {
                throw new Validation("Invalid validation(userID) Input")
            }
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an Admin")
            }
            let indexOfUser = this.findUser(userID)
            switch (parameter) {
                case "firstName":
                    if (typeof newValue !== "string") {
                        throw new Validation("first name input is invalid")
                    }
                    User.allUser[indexOfUser].firstName = newValue
                    return User.allUser[indexOfUser]

                case "lastName":
                    if (typeof newValue !== "string") {
                        throw new Validation("lastName input is invalid")
                    }
                    User.allUser[indexOfUser].lastName = newValue
                    return User.allUser[indexOfUser]
                case "phoneNumber":
                    if (typeof newValue !== "string") {
                        throw new Validation("phoneNumber input is invalid")

                    }
                    User.allUser[indexOfUser].phoneNumber = newValue
                    return User.allUser[indexOfUser]
                default: throw new Validation("invalid parameter input")
            }
        } catch (error) {
            return error
        }
    }

    deleteUser(userID) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an admin")
            }
            if (typeof userID != "number") {
                throw new Validation("Invalid validation(userID) Input")
            }
            let indexOfUser = User.findUser(userID)
            User.allUser.splice(indexOfUser, 1)
        } catch (error) {
            return error
        }
    }

    //BANK==================================================================================

    newBank(bankName) {
        try {
            if (typeof bankName != "string") {
                throw new Validation("bankName input is wrong")
            }
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an Admin")
            }

            let bankObj = new Bank(bankName)
            User.allBanks.push(bankObj)
            //  console.log(this.banks)
            return User.AllBanks
        } catch (error) {
            return error
        }

    }

    findBank(bankID) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an Admin")
            }
            for (let index = 0; index < User.allBanks.length; index++) {
                if (bankID === User.allBanks[index].ID) {
                    return index

                }
            } throw new NotFound("No bank found from BankID")
        } catch (error) {

        }
    }

    getAllBanks() {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an Admin")
            }
            return User.allBanks
        } catch (error) {
            return error
        }
    }

    getBankByID(bankID) {
        try {
            if (typeof bankID != "number") { throw new Validation("bankID has invalid input") }
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an Admin")
            }
            let indexOfBanks = this.findBank(bankID)
            return User.allBanks[indexOfBanks]
        } catch (error) {
            return error
        }
    }

    updateBank(bankID, newValue) {
        try {
            if (typeof bankID != "number") {
                throw new Validation("bankID has invalid input")
            }
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an Admin")
            }
            let indexOfBanks = this.findBank(bankID)
            if (typeof newValue !== "string") {
                throw new Validation("newValue has invalid input")
            }
            User.allBanks[indexOfBanks].bankName = newValue
            return User.allBanks[indexOfBanks]
        } catch (error) {
            return error
        }
    }

    deleteBank(bankID) {
        try {
            if (typeof bankID != "number") { throw new Validation("BankID has invalid input") }
            let indexOfBanks = this.findBank(bankID)
            User.allBanks.splice(indexOfBanks, 1)
        } catch (error) {
            return error
        }
    }

    //ACCOUNT==============================================================================

    newAccount(bankID,balance) {
        try {
            if (typeof balance != "number") {
                throw new Validation("balance input is wrong")
            }
            let accountObj = new Account(balance)
            let indexOfBank = this.findBank(bankID)
            User.allBanks[indexOfBank].accountsInBank.push(newAccount)
            this.accounts.push(accountObj)
            return this.accounts
        } catch (error) {
            return error
        }



    }

    findAccount(accountID) {
        try {
            for (let index = 0; index < this.accounts.length; index++) {
                if (accountID === this.accounts[index].ID) {
                    return index

                }
            } throw new NotFound("No account found from BankID")
        } catch (error) {

        }
    }

    findAccountByID(accountID) {
        try {
            if (typeof accountID != "number") {
                throw new Validation("accountID not valid")
            }
            for (let index = 0; index < this.accounts.length; index++) {
                if (accountID == this.accounts[index].getAccountId()) {
                    return index
                }
            }
            throw new NotFound("accountID not Found")
        } catch (error) {
            throw error
        }
    }

    getAllAccounts() {
        return this.accounts
    }

    getAccountByBank(bankID) {
        try {
            if (!this.isAdmin) {
                throw new UnAuthorized("User is not an Admin")
            }
            if (typeof bankID != "number") {
                throw new Validation("userID is valid")
            }
            let indexOfBanks = this.findBank(bankID)
            return User.allBanks[indexOfBanks]
        } catch (error) {
            return error
        }
    }

    getAccountByID(accountID) {
        try {
            if (typeof accountID != "number") { throw new Validation("accountID has invalid input") }
            let indexOfAccounts = this.findAccount(accountID)
            return this.accounts[indexOfAccounts]
        } catch (error) {
            return error
        }
    }

    deleteAccount(accountID) {
        try {
            if (typeof accountID != "number") { throw new Validation("accountID has invalid input") }
            let indexOfAccounts = this.findAccount(accountID)
            this.accounts.splice(indexOfAccounts, 1)
        } catch (error) {
            return error
        }
    }

    deposit(accountID, amount) {
        try {
            if(this.isAdmin){
                throw new UnAuthorized("User is invalid")
            }
            if (typeof accountID != "number") {
                throw new Validation("accountID not valid")
            }
            let indexOfAccounts = this.findAccount(accountID)
            this.accounts[indexOfAccounts].deposit(amount)
            return this.accounts
        }
        catch (error) {
            return error
        }
    }

    withdraw(accountID, amount) {
        try {
            if (typeof accountID != "number") {
                throw new Validation("accountID not valid")
            }
            let indexOfAccounts = this.findAccount(accountID)
            this.accounts[indexOfAccounts].withdraw(amount)
            return this.accounts
        }
        catch (error) {
            return error
        }
    }

    // findRecipientAccount() {

    // }

    // findSenderAccount(){

    // }




    //PASSBOOK==============================================================================

    getPassBook(accountID) {
        try {
            if (this.isAdmin) {
                throw new UnAuthorized("User is not an valid user")
            }
            if (typeof accountID != "number") {
                throw new Validation("AccountID is Invalid")
            }
            let indexOfPassBooks = this.findAccount(accountID)
            return this.accounts[indexOfPassBooks].getPassBook()
        }
        catch (error) {
            return error
        }
    }



}


let a = User.newAdmin("Nitish", "Shetty", 8451802505)
let user1 = a.newUser("messi", "lionel", 1010101010)
let user2 = a.newUser("Ronaldo", "Christiano", 1010101010)

a.newBank("HDFC")
a.newBank("IDFC")
a.newBank("ICICI")
// console.log(getAllBanks);
// console.log(User.banks)
// a.deleteBank(1)
user1.newAccount(0,46473)
user1.newAccount(1,9000)
user1.newAccount(2,10000)
user1.deposit(0, -900000)
user1.withdraw(1, 1000000)
// user1.deleteAccount(1)
console.log(user1.getAllAccounts());
// console.log(a)
// console.log(User.allUser);
console.log(User.allBanks);