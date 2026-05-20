import './styles.css';
import { validateFull, detectPaymentSystem } from './js/cardValidator';

const cardInput = document.getElementById('cardNumber');
const validateBtn = document.getElementById('validateBtn');
const resultDiv = document.getElementById('result');

function updateCardIcons(cardNumber) {
  const system = detectPaymentSystem(cardNumber.replace(/\s+/g, ''));
  document.querySelectorAll('.card-icon').forEach(icon => {
    if (icon.dataset.system === system) {
      icon.classList.add('active');
    } else {
      icon.classList.remove('active');
    }
  });
}

function onValidate() {
  const rawNumber = cardInput.value;
  const isValid = validateFull(rawNumber);
  if (isValid) {
    resultDiv.textContent = '✅ Карта действительна';
    resultDiv.className = 'result valid';
  } else {
    resultDiv.textContent = '❌ Неверный номер карты';
    resultDiv.className = 'result invalid';
  }
  updateCardIcons(rawNumber);
}

validateBtn.addEventListener('click', onValidate);
cardInput.addEventListener('input', (e) => {
  updateCardIcons(e.target.value);
  resultDiv.textContent = '';
  resultDiv.className = 'result';
});