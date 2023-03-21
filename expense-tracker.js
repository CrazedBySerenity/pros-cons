console.log("Hello");

const minTextInput = 3;

let currentAction = 0;

const setNameText = "Set a name";
const addIncomeText = "Add an income";
const addExpenseText = "Add an expense";
const showSummaryText = "Here is your summary:";

const textInput = document.getElementById("form-text");
const numbersInput = document.getElementById("form-numbers");
const buttonInput = document.getElementById("form-btn");

const displayStyle = "inline-block";

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

        //Replace console output with the creation of new elements that display the description and amount
        for(i = 0; i < this.expenses.length; i++){
            console.log(`type: ${this.expenses[i].description} amount: ${this.expenses[i].amount}€`);
        }
        
        for(i = 0; i < this.income.length; i++){
            console.log(`type: ${this.income[i].description} amount: ${this.income[i].amount}€`);
        }
    },
}

//Start by setting the default action to set name
menu(0);

function menu(newAction){
    currentAction = newAction;
    let explanationText;

    textInput.style.display = "none";
    numbersInput.style.display = "none";
    buttonInput.style.display = "none";

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
            textInput.style.display = displayStyle;
            buttonInput.style.display = displayStyle;
            break;
        case 1:
            explanationText = addIncomeText;
            textInput.style.display = displayStyle;
            numbersInput.style.display = displayStyle;
            buttonInput.style.display = displayStyle;
            break;
        case 2:
            explanationText = addExpenseText;
            textInput.style.display = displayStyle;
            numbersInput.style.display = displayStyle;
            buttonInput.style.display = displayStyle;
            break;
        case 3:
            explanationText = showSummaryText;
            account.showSummary();
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

            switch(currentAction){
                case 0:
                    account.setName(text);
                    document.getElementById("welcome-text").textContent = " " + account.holderName;
                    document.getElementById("button-container").style.visibility = "visible";
                    break;
                case 1:
                    account.addIncome(text, numbers);
                    account.totalIncome += parseInt(numbers);
                    break;
                case 2:
                    account.addExpenses(text, numbers);
                    account.totalExpenses += parseInt(numbers);
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

