import { detectPaymentSystem } from './paymentSystem';

export function luhnCheck(cardNumber) {
  let sum = 0;
  let double = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
}

export function validateFull(cardNumber) {
  const cleaned = cardNumber.replace(/\s+/g, '');
  if (!/^\d+$/.test(cleaned)) return false;
  if (!luhnCheck(cleaned)) return false;
  const system = detectPaymentSystem(cleaned);
  return system !== 'unknown';
}