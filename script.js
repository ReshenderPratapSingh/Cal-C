const display = document.querySelector('#display-area');
calculationLogic = "";

const buttonPressed = document.querySelectorAll('.calc')
buttonPressed.forEach((value) => {
    value.addEventListener('click', ()=> {
        calculationLogic += value.textContent.trim();
        display.innerHTML = `<span>${calculationLogic}</span>`;
    })
});