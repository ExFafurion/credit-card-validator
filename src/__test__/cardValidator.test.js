import { luhnCheck, validateFull } from '../js/cardValidator';
import { detectPaymentSystem } from '../js/paymentSystem';

describe('Luhn algorithm', () => {
  test('valid Visa number', () => {
    expect(luhnCheck('4111111111111111')).toBe(true);
  });
  test('invalid number', () => {
    expect(luhnCheck('4111111111111112')).toBe(false);
  });
  test('Mastercard valid', () => {
    expect(luhnCheck('5555555555554444')).toBe(true);
  });
});

describe('Payment system detection', () => {
  test('Visa', () => {
    expect(detectPaymentSystem('4111111111111111')).toBe('visa');
  });
  test('Mastercard (51-55)', () => {
    expect(detectPaymentSystem('5555555555554444')).toBe('mastercard');
  });
  test('Mastercard (2221-2720)', () => {
    expect(detectPaymentSystem('2221003605223489')).toBe('mastercard');
    expect(detectPaymentSystem('2720991143456114')).toBe('mastercard');
  });
  test('American Express', () => {
    expect(detectPaymentSystem('378282246310005')).toBe('amex');
  });
  test('Discover', () => {
    expect(detectPaymentSystem('6011111111111117')).toBe('discover');
  });
  test('JCB', () => {
    expect(detectPaymentSystem('3530111333300000')).toBe('jcb');
  });
  test('Diners Club', () => {
    expect(detectPaymentSystem('30569309025904')).toBe('diners');
    expect(detectPaymentSystem('38520000023237')).toBe('diners');
  });
  test('Mir', () => {
    expect(detectPaymentSystem('2201382000000013')).toBe('mir');
  });
});

describe('Full validation', () => {
  test('valid card', () => {
    expect(validateFull('4111 1111 1111 1111')).toBe(true);
  });
  test('invalid checksum', () => {
    expect(validateFull('4111111111111112')).toBe(false);
  });
  test('letters not allowed', () => {
    expect(validateFull('4111a11111111111')).toBe(false);
  });
});