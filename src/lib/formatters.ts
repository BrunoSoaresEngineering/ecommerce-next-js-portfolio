const CURRENCY_FORMATTER = new Intl.NumberFormat('pt-PT', {
  currency: 'EUR',
  style: 'currency',
  minimumFractionDigits: 0,
});

function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

const NUMBER_FORMATTER = new Intl.NumberFormat('pt-PT');

function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

const DATE_FORMATTER = new Intl.DateTimeFormat('pt', { dateStyle: 'medium' });

function formatDateMedium(date: Date) {
  return DATE_FORMATTER.format(date);
}

export {
  formatCurrency,
  formatNumber,
  formatDateMedium,
};
