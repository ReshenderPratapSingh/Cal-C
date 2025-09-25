const display = document.querySelector('#display-area');
calculationLogic = "";

const buttonPressed = document.querySelectorAll('.calc')

buttonPressed.forEach((value) => {
    value.addEventListener('click', ()=> {
        if(value.textContent.trim() === "C") {
            calculationLogic = "";
            display.innerHTML = `<span>${calculationLogic}</span>`;
        }
        else if(value.textContent.trim() === "=") {
            const parsedExpression = parseExpression(calculationLogic);
            separateNumbersAndOperators(parsedExpression);
        }
        else if(value.textContent.trim() === "+/-") {
            if (calculationLogic) {
                const tokens = parseExpression(calculationLogic);
                if (tokens.length === 1) {
                    if (tokens[0].startsWith("-")) {
                        calculationLogic = tokens[0].substring(1);
                    } else {
                        calculationLogic = "-" + tokens[0];
                    }
                } else if (tokens.length >= 3) {
                    const lastOperatorIndex = tokens.length - 2;
                    let lastOperator = tokens[lastOperatorIndex];
                    if (lastOperator === "-") {
                        tokens[lastOperatorIndex] = "+";
                    } else if (lastOperator === "+") {
                        tokens[lastOperatorIndex] = "-";
                    }
                    calculationLogic = tokens.join('');
                }
                display.innerHTML = `<span>${calculationLogic}</span>`;
            }
        }
        else if(value.textContent.trim() === "%") {
            if (calculationLogic) {
                const tokens = parseExpression(calculationLogic);
                if (tokens.length === 1) {
                    const number = parseFloat(tokens[0]);
                    calculationLogic = (number / 100).toString();
                } else if (tokens.length >= 3) {
                    const lastToken = tokens[tokens.length - 1];
                    const number = parseFloat(lastToken);
                    const percentageValue = (number / 100).toString();
                    tokens[tokens.length - 1] = percentageValue;
                    calculationLogic = tokens.join('');
                }
                display.innerHTML = `<span>${calculationLogic}</span>`;
            }
        }
        else {
            calculationLogic += value.textContent.trim();
            display.innerHTML = `<span>${calculationLogic}</span>`;
        }
    })
});
function parseExpression(calculationLogic) {
    const tokens = calculationLogic.split(/([+\-×÷])/);
    return tokens;
}
function separateNumbersAndOperators(tokens) {
    const numbers = [];
    const operators = [];
    tokens.forEach((tokens, index) => {
        if(index % 2 === 0) {
            numbers.push(parseFloat(tokens));
        } else {
            operators.push(tokens);
        }
    });
    calculation(numbers, operators);
}
function calculation(numbers, operators) {
    let nums = [...numbers];
    let ops = [...operators];
    handleMultiplicationAndDivision(nums, ops);
    handleAdditionAndSubtraction(nums, ops);
    const result = nums[0];
    const displayResult = parseFloat(result.toFixed(10)); 
        calculationLogic = result.toString();
    display.innerHTML = `<span>${calculationLogic}</span>`;
}
function handleMultiplicationAndDivision(nums, ops) {
    let i = 0;
    while (i < ops.length) {
        if(ops[i] === "×" || ops[i] === "÷") {
            let result;
            if(ops[i] === "÷") {
                if(nums[i+1] === 0) {
                    alert("Error: Division by zero");
                    return;
                }
                result = nums[i] / nums[i+1];
            } else {
                result = nums[i] * nums[i+1];
            }
            nums.splice(i, 2, result);
            ops.splice(i, 1);
        } else {
            i++;
        }
    }
}
function handleAdditionAndSubtraction(nums, ops) {
    let i = 0;
    while(i < ops.length) {
        if(ops[i] === "+" || ops[i] === "-") {
            let result;
            if(ops[i] === "+") {
                result = nums[i] + nums[i+1];
            } else {
                result = nums[i] - nums[i+1];
            }
            nums.splice(i, 2, result);
            ops.splice(i, 1);
        } else {
            i++;
        }
    }
}