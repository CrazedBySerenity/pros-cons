const minTextInput = 1;

let currentAction = 0;
let currentExplainer = "";
let summaryIsEmpty = true;
let confirmationTextActive = false;

const setNameText = "What's the subject?";
const addIncomeText = "Add a pro";
const addExpenseText = "Add a con";
const showSummaryText = "Decision summary:";

const textInput = document.getElementById("form-text");
// const textLabel = document.getElementById("form-text-label");
// const numbersInput = document.getElementById("form-numbers");
// const numbersLabel = document.getElementById("form-numbers-label")
const buttonInput = document.getElementById("form-btn");
const summary = document.getElementById("summary");
const explainer = document.getElementById("explanation-text");
const incomeButton = document.getElementById("income-btn");
const expensesButton = document.getElementById("expenses-btn");
const summaryButton = document.getElementById("summary-btn");

const displayStyle = "inline-block";
const errorColor = "darkred";

//0 = input name
//1 = add income
//2 = add expenses
//3 = show all expenses and income

const summaryElements = {
    income: [],
    expenses: [],
}

const account = {
    holderName: "",
    //Placeholder values to test the summary display without having to enter new incomes/expenses every time, the total expenses+incomes are also updated with the values already added
    expenses: [],

    income: [],

    addExpenses(description) {
        let newExpense = {description: description};
        this.expenses.push(newExpense);
    },

    addIncome(description) {
        let newIncome = {description: description};
        this.income.push(newIncome);
    },

    setName(newName){
        this.holderName = newName;
    },

    showSummary(){

        // document.getElementById("total-balance").textContent = this.totalIncome - this.totalExpenses;

        //A check to make sure the arrays are not empty
        if(this.expenses.length < 1 && this.income.length < 1 && summaryIsEmpty == true){
            explainer.style.color = errorColor;
            return("You haven't added any pros or cons yet");
        }

        //Checking to see if the expenses array is empty, if not then create the elements to the display it's information
        if(this.expenses.length < 1){
            console.log("No cons added");
        }
        
        //To-do: Add a check for if the correct element already exists before creating a new one

        else{

            for(i = 0; i < this.expenses.length; i++){
                let container = document.getElementById("expenses-container");
    
                let newCard = document.createElement("div");
                newCard.setAttribute("class", "summary__card summary__card--expenses");
                container.appendChild(newCard);
    
                let descText = document.createElement("p");
                descText.setAttribute("class", "amount__text");
                descText.textContent = this.expenses[i].description;
                newCard.appendChild(descText);
    
                // let amountText = document.createElement("p");
                // amountText.setAttribute("class", "amount__text");
                // amountText.textContent = this.expenses[i].amount;
                // newCard.appendChild(amountText);
    
                summaryElements.expenses.push(newCard);
            }
    
            //Quick solution to avoid creating duplicate elements for now, the array is emptied and the elements created are not destroyed
            this.expenses.length = 0;
        }


        //Same check as for expenses
        if(this.income.length < 1){
            console.log("No pros added");
        }

        else {

            for(i = 0; i < this.income.length; i++){
                let container = document.getElementById("income-container");
    
                let newCard = document.createElement("div");
                newCard.setAttribute("class", "summary__card summary__card--income");
                container.appendChild(newCard);
    
                let descText = document.createElement("p");
                descText.setAttribute("class", "amount__text");
                descText.textContent = this.income[i].description;
                newCard.appendChild(descText);
    
                // let amountText = document.createElement("p");
                // amountText.setAttribute("class", "amount__text");
                // amountText.textContent = this.income[i].amount;
                // newCard.appendChild(amountText);
    
                summaryElements.income.push(newCard);
            }
    
            //Same as for expenses
            this.income.length = 0;
        }
        summaryIsEmpty = false;
        return(false);
    },
}

function menu(newAction){
    currentAction = newAction;
    let explanationText;

    //Hide all elements by default, so that they can later be displayed as needed
    textInput.style.display = "none";
    // numbersInput.style.display = "none";
    // textLabel.style.display = "none";
    // numbersLabel.style.display = "none";
    buttonInput.style.display = "none";
    summary.style.display = "none";
    explainer.style.color = "black";

    incomeButton.disabled = false;
    expensesButton.disabled = false;
    summaryButton.disabled = false;
    incomeButton.style.pointerEvents = "auto";
    expensesButton.style.pointerEvents = "auto";
    summaryButton.style.pointerEvents = "auto";

    if(account.holderName != ""){
        document.getElementById("welcome-text").textContent = " " + account.holderName;
    }

    else {
        document.getElementById("welcome-text").textContent = "Pros and Cons";
    }

    switch(currentAction){
        case 0:
            explanationText = setNameText;
            document.getElementById("welcome-text").textContent = "Pros and cons";
            textInput.style.display = displayStyle;
            buttonInput.style.display = displayStyle;
            break;
        case 1:
            explanationText = addIncomeText;
            textInput.style.display = displayStyle;
            // numbersInput.style.display = displayStyle;
            buttonInput.style.display = displayStyle;
            // textLabel.style.display = displayStyle;
            // numbersLabel.style.display = displayStyle;
            //Disable button when the menu is active
            incomeButton.style.pointerEvents = "none";
            incomeButton.disabled = true;
            break;
        case 2:
            explanationText = addExpenseText;
            textInput.style.display = displayStyle;
            // numbersInput.style.display = displayStyle;
            buttonInput.style.display = displayStyle;
            // textLabel.style.display = displayStyle;
            // numbersLabel.style.display = displayStyle;
            //Disable button when the menu is active
            expensesButton.style.pointerEvents = "none";
            expensesButton.disabled = true;
            break;
        case 3:
            explanationText = account.showSummary();
            if(!explanationText) explanationText = showSummaryText;
            summary.style.display = "flex";
            //Disable button when the menu is active
            summaryButton.style.pointerEvents = "none";
            summaryButton.disabled = true;
            break;
    }
    currentExplainer = explanationText;
    explainer.textContent = explanationText;
}

function submitInput() {
    // numbers = numbersInput.value;
    text = textInput.value;
 
    //Validation check to make sure the input exists
    if(text != null/* && numbers != null*/){

        //Validation checks for:
        //The text input being shorter than the minimum allowed amount of characters
        //The text field being missing
        //The numbers field being missing (while required)
        //The numberS field not being a number (while required)
        //
        //If the input is invalid an error message is output into the console, the user is notified and the function does not execute any further code

        // if(numbers < 1 && currentAction != 0){
        //     explainer.textContent = currentExplainer + ", your transaction amount cannot be less than zero";
        //     explainer.style.color = errorColor;
        //     console.log("Invalid input");
        //     return;
        // }

        if(!text/* || !numbers && currentAction != 0*/) {
            explainer.textContent = currentExplainer + "\r\nYou cannot submit an empty input";
            explainer.style.color = errorColor;
            console.log("Invalid input");
            return;
        }

        else if(text.length < minTextInput || !text/* || !numbers && currentAction != 0*/) {
            
            console.log("Invalid input");
            return;
        }


        else    {  

            switch(currentAction){
                case 0:
                    account.setName(text);
                    document.getElementById("welcome-text").textContent = " " + account.holderName;
                    document.getElementById("button-container").style.display = "grid";
                    textInput.style.display = "none";
                    // numbersInput.style.display = "none";
                    buttonInput.style.display = "none";
                    summary.style.display = "none";
                    explainer.textContent = "Pick an option using the buttons";
                    explainer.style.color = "black";
                    break;
                case 1:
                    account.addIncome(text);
                    // account.totalIncome += parseInt(numbers);
                    showTransactionConfirmation();
                    setTimeout(showTransactionConfirmation, 1000);
                    break;
                case 2:
                    account.addExpenses(text);
                    // account.totalExpenses += parseInt(numbers);
                    showTransactionConfirmation();
                    setTimeout(showTransactionConfirmation, 1000);
                    break;
                case 3:
                    // account.expenses.forEach(element => console.log(element.description + " " + element.amount));
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

function showTransactionConfirmation(){
    confirmationText = document.getElementById("confirmation-text");

    if(confirmationTextActive){
        confirmationText.classList.remove("form__confirm__text--show");
    }

    if(!confirmationTextActive){
        confirmationText.classList.add("form__confirm__text--show");
    }

    confirmationTextActive = !confirmationTextActive;
}

//Start by setting the default action to set name
menu(0);