console.log("Hello");

const UIaddIncome = {
    explanationText: "Please type in the income amount you'd like to add",

}

const account = {
    holderName: "",
    expenses: [],
    totalExpenses: 0,
    income: [],
    totalIncome: 0,

    addExpenses(description, value) {
        let newExpense = {description: description, value: value};
        this.expenses.push(newExpense);
    }
}

function menu(){

}

function submitInput() {
    numbers = document.getElementById("form-numbers").value;
    text = document.getElementById("form-text").value;

    //Add more validation checks 
    if(text !== null && numbers != null){
        if(text.length < 3) {
            console.log("Invalid input");
        }
    
        else    {  
            account.addExpenses(text, numbers);

            account.expenses.forEach(element => console.log(element.description + " " + element.value));
        }
    }

    let form = document.getElementById("form");
    form.reset();
}

