export function detectPaymentSystem(cardNumber) {
  const cleaned = cardNumber.replace(/\s+/g, '');
  const first1 = cleaned.substring(0, 1);
  const first2 = cleaned.substring(0, 2);
  const first3 = cleaned.substring(0, 3);
  const first4 = cleaned.substring(0, 4);
  const first6 = cleaned.substring(0, 6);

  if (first1 === '4') return 'visa';

  if ((first2 >= '51' && first2 <= '55')
      || (first4 >= '2221' && first4 <= '2720')) {
    return 'mastercard';
  }

  if (first2 === '34' || first2 === '37') return 'amex';

  if (first4 === '6011'
      || (first2 >= '64' && first2 <= '65')
      || (first6 >= '622126' && first6 <= '622925')) {
    return 'discover';
  }

  if (first4 >= '3528' && first4 <= '3589') return 'jcb';

  if ((first3 >= '300' && first3 <= '305')
      || first2 === '36' || first2 === '38' || first2 === '39') {
    return 'diners';
  }

  if (first4 >= '2200' && first4 <= '2204') return 'mir';

  return 'unknown';
}
