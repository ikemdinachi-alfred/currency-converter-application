const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const conversionResult = document.getElementById('conversionResult');
const convertButton = document.getElementById('convertButton');

const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            fromCurrencySelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toCurrencySelect.appendChild(option2);
        });
    });

convertButton.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency] / data.rates[fromCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            conversionResult.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        });
});
