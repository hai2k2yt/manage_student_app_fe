import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}

export function formatNumber(number) {
  if(!number) return 0;
  let numStr = number.toString();

  let decimalIndex = numStr.indexOf('.');

  if (decimalIndex === -1) {
    decimalIndex = numStr.length;
  }

  for (let i = decimalIndex - 3; i > 0; i -= 3) {
    numStr = numStr.slice(0, i) + ',' + numStr.slice(i);
  }

  return numStr;
}
