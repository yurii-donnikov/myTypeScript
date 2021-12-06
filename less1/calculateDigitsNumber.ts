let calculateDigitsNumber = function(): Function {
  let cache: {
    [key: string]: {
      [key: string]: number
    }
  } = {};
  return function calculateDigitsNumberRecursion(numeric: number, result?: {
    [key: string]: number
  }, count?: number, arrayNumber?: string[]): object | null {
    if (typeof arguments[0] == 'undefined') {
      return null;
    }
    if (cache[numeric]) {
      return cache[numeric];
    }
    count = count || 0;
    result = result || {};
    arrayNumber = arrayNumber || ('' + numeric).split('');
    if (count < arrayNumber.length) {
      if (result[arrayNumber[count]]) {
        result[arrayNumber[count]]++;
      } else {
        result[arrayNumber[count]] = 1;
      }
      return calculateDigitsNumberRecursion(numeric, result, ++count, arrayNumber);
    }
    return cache[numeric] = result;
  }
}