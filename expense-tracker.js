console.log("Hello");

const minTextInput = 3;

let currentAction = 0;

const setNameText = "Set a name";
const addIncomeText = "Add an income";
const addExpenseText = "Add an expense";
const showSummaryText = "Here is your summary:";

const textInput = document.getElementById("form-text");
const numbersInput = document.getElementById("form-numbers");

//0 = input name
//1 = add income
//2 = add expenses
//3 = show all expenses

const account = {
    holderName: "",
    expenses: [],
    totalExpenses: 0,
    income: [],
    totalIncome: 0,

    addExpenses(description, amount) {
        let newExpense = {description: description, amount: amount};
        this.expenses.push(newExpense);
    },

    addIncome(description, amount) {
        let newIncome = {description: description, amount: amount};
        this.income.push(newIncome);
    },

    setName(newName){
        this.holderName = newName;
    },

    showSummary(){
        this.expenses.foreach(element => console.log(`type: ${element.description} amount: ${element.amount}€`));
        this.income.foreach(element => console.log(`type: ${element.description} amount: ${element.amount}€`));
    },
}

//Start by setting the default action to set name
menu(0);

function menu(newAction){
    currentAction = newAction;
    let explanationText;

    if(account.holderName != ""){
        document.getElementById("welcome-text").textContent = " " + account.holderName;
    }

    else {
        document.getElementById("welcome-text").textContent = " dear customer";
    }

    switch(currentAction){
        case 0:
            explanationText = setNameText;
            document.getElementById("welcome-text").textContent = " dear customer";
            break;
        case 1:
            explanationText = addIncomeText;
            break;
        case 2:
            explanationText = addExpenseText;
            break;
        case 3:
            explanationText = showSummaryText;
            showSummary();
            break;
    }
    document.getElementById("explanation-text").textContent = explanationText;
}

function submitInput() {
    numbers = numbersInput.value;
    text = textInput.value;

    //Add more validation checks 
    if(text != null && numbers != null){
        if(text.length < minTextInput) {
            console.log("Invalid input");
            return;
        }
    
        else    {  
            //main logic here

            switch(currentAction){
                case 0:
                    account.setName(text);
                    document.getElementById("welcome-text").textContent = " " + account.holderName;
                    document.getElementById("button-container").style.visibility = "visible";
                    break;
                case 1:
                    account.addIncome(text, numbers);
                    break;
                case 2:
                    account.addExpenses(text, numbers);
                    break;
                case 3:
                    account.expenses.forEach(element => console.log(element.description + " " + element.amount));
                    break;
            }

        }
    }

    let form = document.getElementById("form");
    form.reset();
}

