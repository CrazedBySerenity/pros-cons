const minTextInput = 1;

let currentAction = 0;
let currentExplainer = "";

const setNameText = "Please set a name for your account";
const addIncomeText = "Add an income";
const addExpenseText = "Add an expense";
const showSummaryText = "Here is your summary:";

const textInput = document.getElementById("form-text");
const numbersInput = document.getElementById("form-numbers");
const buttonInput = document.getElementById("form-btn");
const summary = document.getElementById("summary");
const explainer = document.getElementById("explanation-text");

const displayStyle = "inline-block";

//0 = input name
//1 = add income
//2 = add expenses
//3 = show all expenses

const summaryElements = {
    income: [],
    expenses: [],
}

const account = {
    holderName: "",
    expenses: [
        {description: "gas", amount: 100},
        {description: "food", amount: 243},
        {description: "dog", amount: 339},
    ],
    totalExpenses: 732,
    income: [
        {description: "job", amount: 1000},
        {description: "gift", amount: 52},
    ],
    totalIncome: 1052,

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
        //Add a check for if the arrays are empty

        document.getElementById("total-balance").textContent = this.totalIncome - this.totalExpenses;
        
        //Add a check for if the correct element already exists before creating a new one
        for(i = 0; i < this.expenses.length; i++){
            console.log(`type: ${this.expenses[i].description} amount: ${this.expenses[i].amount}€`);
            
            let container = document.getElementById("expenses-container");

            let newCard = document.createElement("div");
            newCard.setAttribute("class", "summary__card");
            container.appendChild(newCard);

            let descText = document.createElement("p");
            descText.setAttribute("class", "amount__text");
            descText.textContent = this.expenses[i].description;
            newCard.appendChild(descText);

            let amountText = document.createElement("p");
            amountText.setAttribute("class", "amount__text");
            amountText.textContent = this.expenses[i].amount;
            newCard.appendChild(amountText);

            summaryElements.expenses.push(newCard);
        }

        //Quick solution to avoid creating duplicate elements for now
        this.expenses.length = 0;
        
        for(i = 0; i < this.income.length; i++){
            console.log(`type: ${this.income[i].description} amount: ${this.income[i].amount}€`);

            let container = document.getElementById("income-container");

            let newCard = document.createElement("div");
            newCard.setAttribute("class", "summary__card");
            container.appendChild(newCard);

            let descText = document.createElement("p");
            descText.setAttribute("class", "amount__text");
            descText.textContent = this.income[i].description;
            newCard.appendChild(descText);

            let amountText = document.createElement("p");
            amountText.setAttribute("class", "amount__text");
            amountText.textContent = this.income[i].amount;
            newCard.appendChild(amountText);

            summaryElements.income.push(newCard);
        }

        //Quick solution to avoid creating duplicate elements for now
        this.income.length = 0;
    },
}

function menu(newAction){
    currentAction = newAction;
    let explanationText;

    textInput.style.display = "none";
    numbersInput.style.display = "none";
    buttonInput.style.display = "none";
    summary.style.display = "none";

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
            summary.style.display = "flex";
            break;
    }
    currentExplainer = explanationText;
    explainer.textContent = explanationText;
}

function submitInput() {
    numbers = numbersInput.value;
    text = textInput.value;
 
    //Validation check to make sure the input exists
    if(text != null && numbers != null){

        //Validation checks for:
        //The text input being shorter than the minimum allowed amount of characters
        //The text field being missing
        //The numbers field being missing (while required)
        //The numberS field not being a number (while required)

        if(!text || !numbers && currentAction != 0) {
            explainer.textContent = currentExplainer + ", you cannot submit an empty input";
            return;
        }

        else if(text.length < minTextInput || !text || !numbers && currentAction != 0) {
            
            //Add a real error message
            //Make the error message contextual to the real error
            //Outputting debug into the console and preventing any further code in the function from being run
            console.log("Invalid input");
            return;
        }

        else    {  

            switch(currentAction){
                case 0:
                    account.setName(text);
                    document.getElementById("welcome-text").textContent = " " + account.holderName;
                    document.getElementById("button-container").style.visibility = "visible";
                    textInput.style.display = "none";
                    numbersInput.style.display = "none";
                    buttonInput.style.display = "none";
                    summary.style.display = "none";
                    explainer.textContent = "Pick an option using the buttons";
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

    if(currentAction != 0){
        menu(currentAction);
    }
}

//Start by setting the default action to set name
menu(0);