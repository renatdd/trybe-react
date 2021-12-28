export const CURRENCIES_URL = 'https://economia.awesomeapi.com.br/json/all';

export const PAYMENT_METHODS = [
  'Dinheiro',
  'Cartão de crédito',
  'Cartão de débito',
];

export const EXPENSES_TAGS = [
  'Alimentação',
  'Lazer',
  'Trabalho',
  'Transporte',
  'Saúde',
];

const fetchDataFrom = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchCurrencies = async () => {
  const data = await fetchDataFrom(CURRENCIES_URL);
  delete data.USDT;
  return data;
};
