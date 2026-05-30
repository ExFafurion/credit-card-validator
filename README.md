# Credit Card Validator

[![Build and Deploy to GitHub Pages](https://github.com/ExFafurion/credit-card-validator/actions/workflows/ci.yml/badge.svg)](https://github.com/ExFafurion/credit-card-validator/actions/workflows/ci.yml)

**GitHub Pages**: https://ExFafurion.github.io/credit-card-validator/

## Описание

Виджет для проверки валидности номера банковской карты.  
- Определяет платёжную систему (Visa, Mastercard, American Express, Discover, JCB, Diners Club, Мир) по первым цифрам.
- Проверяет номер по алгоритму Луна.
- Выводит результат валидации и подсвечивает иконку соответствующей системы.

## Технологии

- JavaScript (ES6+), модульная структура
- Webpack, Babel
- Yarn (менеджер пакетов)
- ESLint (Airbnb стиль)
- Jest (unit-тесты)
- GitHub Actions (CI/CD)

## Запуск локально

```bash
yarn install
yarn start
