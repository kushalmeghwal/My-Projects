let display = document.getElementById("display");
let flag=0;
function appendToDisplay(value) {
    if(flag==1){
        clearDisplay();
        flag=0;
    } 
    if (value === "e") {
        display.value += "e^"; // Display as e^ to indicate exponent
    } else if (value === "cgpa") {
        display.value = "cgpa "; // Set display to indicate CGPA calculation
    } else if (value === "mod") {
        display.value += " mod "; // Format mod calculation
    } else if (value === "^") {
        display.value += " ^ "; // Format power calculation
    } else {
        display.value += value;
    }
  
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        let expression = display.value;
        
        // CGPA Calculation: Converts percentage to grade
        if (expression.includes("cgpa")) {
            let percentage = parseFloat(expression.split("cgpa ")[1]); // Extract number after 'cgpa'
            display.value = calculateCGPA(percentage);
            speak(display.value);
            flag=1;
            return;
        }

        // Modulo Calculation: a mod b -> a % b
        if (expression.includes("mod")) {
            let parts = expression.split(" mod ");
            
            if (parts.length === 2) {
                let a = parseFloat(parts[0]);
                let b = parseFloat(parts[1]);
                display.value = a % b; // Compute modulo
                speak(display.value);
                flag=1;
                return;
            }
        }

        // Power Calculation: x ^ y -> Math.pow(x, y)
        if (expression.includes("^")) {
            let parts = expression.split(" ^ ");
            if (parts.length === 2) {
                let x = parseFloat(parts[0]);
                let y = parseFloat(parts[1]);
                display.value = Math.pow(x, y); // Compute power
                flag=1;
                return;
            }
        }

        // Handling Special Functions
        expression = expression.replace(/log\(?([0-9.]+)\)?/g, "Math.log10($1)");
        expression = expression.replace(/ln\(?([0-9.]+)\)?/g, "Math.log($1)");
        expression = expression.replace(/√([0-9.]+)/g, "Math.sqrt($1)");
        expression = expression.replace(/([0-9]+)!/g, "factorial($1)");
        expression = expression.replace(/e\^([0-9.]+)/g, "Math.pow(Math.E,$1)"); // e^x handling

        // Convert percentage (%) to division (/100)
        expression = expression.replace(/([0-9.]+)%/g, "($1/100)");

        // Evaluate the processed expression
        display.value = eval(expression);
        flag=1;
        
    } catch {
        display.value = "Error";
    }
}

// Factorial function
function factorial(n) {
    if (n < 0) return "Error"; // Factorial is not defined for negative numbers
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// CGPA Calculation: Converts percentage to grade
function calculateCGPA(percentage) {
    if (percentage > 85 && percentage <= 100) return "A";
    if (percentage > 75 && percentage <= 85) return "B";
    if (percentage > 65 && percentage <= 75) return "C";
    if (percentage > 55 && percentage <= 65) return "D";
    if (percentage >= 40 && percentage <= 55) return "E";
    if (percentage < 40) return "F";
    return "Invalid %"; // Handle invalid inputs
}
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}