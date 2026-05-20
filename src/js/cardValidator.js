// Алгоритм Луна
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
  return (sum % 10) === 0;
}

export function detectPaymentSystem(cardNumber) {
  const first = cardNumber.substring(0, 1);
  const first2 = cardNumber.substring(0, 2);
  const first3 = cardNumber.substring(0, 3);
  const first4 = cardNumber.substring(0, 4);

  if (/^4/.test(first)) return 'visa';
  if (/^5[1-5]/.test(first2)) return 'mastercard';
  if (/^3[47]/.test(first2)) return 'amex';
  if (/^3(?:0[0-5]|[68][0-9])/.test(first2) || /^30[0-5]/.test(first3)) return 'diners';
  if (/^22/.test(first2) || /^27/.test(first2) || /^30[0-5]/.test(first3) || /^50/.test(first2)) return 'mir';
  if (/^6(?:011|5[0-9]{2})/.test(first4) || /^2(?:2[0-9]{2}|[3-6][0-9]{2}|7[0-1][0-9]|720)/.test(first4)) return 'discover';
  if (/^35(?:2[8-9]|[3-8][0-9])/.test(first4)) return 'jcb';
  return 'unknown';
}

export function validateFull(cardNumber) {
  const cleaned = cardNumber.replace(/\s+/g, '');
  if (!/^\d+$/.test(cleaned)) return false;
  if (!luhnCheck(cleaned)) return false;
  const system = detectPaymentSystem(cleaned);
  return system !== 'unknown';
}