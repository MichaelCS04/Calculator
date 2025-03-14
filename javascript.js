document.addEventListener("keydown", function(event) {
    let display = document.getElementById("display");
    let key = event.key;
    let currentValue = display.value;
    // Prevent 0 from being the first digit
    if (key === "0") {
        // If the input is empty or the last character is an operator, prevent input
        if (currentValue.length === 0 || /[+\-*/(]$/.test(currentValue)) {
            event.preventDefault();
            return;
        }
    }

    // Prevent a number from starting with 0 after an operator
    if (/^[1-9]$/.test(key) && /[+\-*/(]\s*0$/.test(currentValue)) {
        display.value = currentValue.slice(0, -1) + key; // Replace leading 0 with the new number
        event.preventDefault();
        return;
    }

    // Allow only numbers, operators, and valid keys
    if (/^[0-9+\-*/().]$/.test(key)) {
        display.value += key;
    } 
    // Allow Enter to calculate result
    else if (key === "Enter") {
        event.preventDefault();
        calculateResult();
    } 
    // Allow Backspace to delete last character
    else if (key === "Backspace") {
        display.value = currentValue.slice(0, -1);
    } 
    // Prevent other keys (like letters) from affecting the input
    else {
        event.preventDefault();
    }
});
// Function to safely calculate result
function calculateResult() {
    let display = document.getElementById("display");

    // Prevent empty evaluation
    if (display.value.trim() === '') return;

    try {
        display.value = new Function("return " + display.value)(); // Safe eval alternative
    } catch {
        display.value = "Error";
    }
}

function clearDisplay(){
    document.getElementById("display").value='';
}
function changeSign(){
    let display = document.getElementById("display");
    let value = display.value;

    // Regular expression to match the last number in the expression
    let match = value.match(/-?\d+(\.\d+)?$/); 

    if (match) {
        let lastNumber = match[0]; 
        let flippedNumber = lastNumber.startsWith("-") ? lastNumber.slice(1) : "-" + lastNumber;

        // Replace the last number with its negated version
        display.value = value.slice(0, -lastNumber.length) + flippedNumber;
    }
}
function percentage(){
    let num = document.getElementById("display").value
    num = num * 0.01
    document.getElementById("display").value= num
}
function handleEnter(event) {
    if (event.key === 'Enter') {
        try {
            document.getElementById('display').value = eval(document.getElementById('display').value);
        } catch {
            document.getElementById('display').value = "Error";
        }
    }
}
function triggerEnter() {
    handleEnter({ key: 'Enter' });
}