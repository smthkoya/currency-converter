const API_URL = "https://api.currencyapi.com/v3/latest?apikey=";
const API_KEY = "cur_live_tlYwRzYf5eSoMZFt6K0YpgqpB8OLVvbX7VXfZWbD";
const inputSelect = document.getElementById("input-select");
const outputSelect = document.getElementById("output-select");
const amountInput = document.getElementById("amount-input");
const exchangeRateDisplay = document.querySelector(".exchange-rate span");
const convertBtn = document.getElementById("convert-btn");
const amountOutput = document.getElementById("amount-output");
const inputImg = document.getElementById("input-img");
const outputImg = document.getElementById("output-img");

const getCurrencyDataAsync = async function () {
  try {
    const response = await fetch(`${API_URL}${API_KEY}`);
    const currencyData = await response.json();
    return currencyData.data;
  } catch (error) {
    alert("An error occurred while fetching the currency data.");
    console.error(error);
  }
};
const convertCurrency = async function () {
  const values = await getCurrencyDataAsync();
  const fromCurrency = inputSelect.value;
  const toCurrency = outputSelect.value;

  const fromValue = values[fromCurrency].value;
  const toValue = values[toCurrency].value;
  amountInput.addEventListener("input", (e) => {
    const amount = parseFloat(e.target.value);
    const convertedAmount = ((amount / fromValue) * toValue).toFixed(2);
    amountOutput.value = convertedAmount;
    return amountInput.value;
  });

  // if (isNaN(amount)) {
  //   alert("Please enter a valid amount.");
  //   return;
  // }

  exchangeRateDisplay.innerText = `1 ${fromCurrency} = ${(
    toValue / fromValue
  ).toFixed(4)} ${toCurrency}`;
};
const imageChanger = function () {
  const inputImageStr = inputSelect.value.slice(0, 2);
  const outputImageStr = outputSelect.value.slice(0, 2);
  inputImg.src = `https://flagsapi.com/${inputImageStr}/flat/64.png`;
  outputImg.src = `https://flagsapi.com/${outputImageStr}/flat/64.png`;
};
const swapCurrencies = function () {
  const swapping = inputSelect.value;
  inputSelect.value = outputSelect.value;
  outputSelect.value = swapping;

  convertCurrency();
  imageChanger();
};
const selectOption = async function () {
  const data = await getCurrencyDataAsync();
  const currencyCodes = Object.keys(data);
  currencyCodes.forEach((code) => {
    inputSelect.innerHTML += `<option value="${code}">${code}</option>`;
    outputSelect.innerHTML += `<option value="${code}">${code}</option>`;
  });
  inputSelect.value = "SGD";
  outputSelect.value = "USD";
  convertCurrency();
  imageChanger();
};
selectOption();
inputSelect.addEventListener("change", imageChanger);
outputSelect.addEventListener("change", imageChanger);

convertBtn.addEventListener("click", swapCurrencies);
