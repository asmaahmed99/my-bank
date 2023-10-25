import { faker } from "@faker-js/faker";
import chalk from "chalk";
import inquirer from "inquirer"; 

 // customer class 
 class customer{
    firstName : string;
    lastName : string ;
    gender : string;
    age : number ;
    mobNumber : number;
    accNumber : number ;

    constructor(fName:string,lName:string, gender:string, age:number, mob:number, acc:number){
        this.firstName = fName;
        this.lastName = lName;
        this.gender = gender;
        this.age = age;
        this.accNumber = acc ;
        this.mobNumber = mob;
    }
}
// interface  BankAccount: 
interface BankAccount {
    accNumber : number, 
    balance : number,
}
// class Bank :
 class Bank {
    customer : customer[]= [];
    account : BankAccount[]= [];

    addCustomer(obj:customer){
        this.customer.push(obj);
    }

    addAcountNumber(obj:BankAccount){
        this.account.push(obj);
    }
   transcation(accobj: BankAccount){
     let NewAccounts = this.account.filter(acc=> acc.accNumber !==accobj.accNumber);
     this.account =[...NewAccounts,accobj];
   }
}

let myBank = new Bank();

// Customer Creat:
for(let i : number =1 ; i<=3; i++){
 let fName = faker.person.firstName('male')
 let lName = faker.person.lastName()
 let num =  parseInt(faker. phone.number("3##########"));
 const cus = new customer(fName,lName,'male', 25*i,num,1000+i);
 myBank.addCustomer(cus);
 myBank.addAcountNumber({accNumber: cus.accNumber,balance:100*i})
}

// Bank Functionality:
async function bankService(bank:Bank) {
    let service = await inquirer.prompt({
        type : "list",
        name :"select",
        message :"Please select the service",
        choices : ["View Balance","Cash Withdraw","Cash Deposite"],   
    });
    // View Balance :
    if(service.select == "View Balance"){
        let res = await inquirer.prompt({
            type :"input",
            name : "num",
            message :" Enter your Account Number",
        });
        let account = myBank.account.find((acc)=>acc.accNumber == res.num)
        if(!account){
            console.log(chalk.red.bold("Invalid Account Number"));
        }
        if(account){
            let name = myBank.customer.find(
                (item)=>item.accNumber== account?.accNumber
            );
           console.log(`Dear${chalk.green.italic(name?.firstName)} ${chalk.green.italic(name?.lastName)} your Account Balance is ${chalk.bold.blueBright("$",account.balance)}`);
        }
    }
    // Cash Withdraw :
    if(service.select == "Cash Withdraw"){
        let res = await inquirer.prompt({
            type :"input",
            name : "num",
            message :" Enter your Account Number",
        });
        let account = myBank.account.find((acc)=>acc.accNumber == res.num)
        if(!account){
            console.log(chalk.red.bold("Invalid Account Number"));
        }
        if(account){
            let ans =await inquirer.prompt({
                type :"number",
                name: "rupees",
                message : "Please Enter your Amount.",
            });
            let newBalance = account.balance - ans.rupees;
            // transcation method call:
            bank.transcation({accNumber : account.accNumber,balance : newBalance});
            console.log(newBalance);
        }
    }
    // Cash Deposite :
        if(service.select == "Cash Deposite"){
            let res = await inquirer.prompt({
                type :"input",
                name : "num",
                message :" Enter your Account Number",
            });
            let account = myBank.account.find((acc)=>acc.accNumber == res.num)
            if(!account){
                console.log(chalk.red.bold("Invalid Account Number"));
            }
    if(account){
        let ans =await inquirer.prompt({
            type :"number",
            name: "rupees",
            message : "Please Enter your Amount.",
        });
        let newBalance = account.balance +ans.rupees;
        // transcation method call:
        bank.transcation({accNumber :account.accNumber,balance : newBalance});
        console.log(newBalance);
    }   
}
}
bankService(myBank)


