import './styles.css';
import { validateFull } from './js/cardValidator';
import { detectPaymentSystem } from './js/paymentSystem';

import visaImg from './img/visa.png';
import mastercardImg from './img/mastercard.png';
import amexImg from './img/amex.png';
import discoverImg from './img/discover.png';
import jcbImg from './img/jcb.png';
import dinersImg from './img/diners.png';
import mirImg from './img/mir.png';

const cards = [
  { system: 'visa', img: visaImg },
  { system: 'mastercard', img: mastercardImg },
  { system: 'amex', img: amexImg },
  { system: 'discover', img: discoverImg },
  { system: 'jcb', img: jcbImg },
  { system: 'diners', img: dinersImg },
  { system: 'mir', img: mirImg },
];

const cardInput = document.getElementById('cardNumber');
const validateBtn = document.getElementById('validateBtn');
const resultDiv = document.getElementById('result');
const cardsContainer = document.querySelector('.cards-icons');

function renderIcons() {
  cardsContainer.innerHTML = '';
  cards.forEach(card => {
    const img = document.createElement('img');
    img.src = card.img;
    img.alt = card.system;
    img.dataset.system = card.system;
    img.classList.add('card-icon');
    cardsContainer.appendChild(img);
  });
}

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

renderIcons();
validateBtn.addEventListener('click', onValidate);
cardInput.addEventListener('input', (e) => {
  updateCardIcons(e.target.value);
  resultDiv.textContent = '';
  resultDiv.className = 'result';
});