let calculateAmountElements = function(): Function {
  let cache: {
    [key: string]: number
  } = {};
  return function calculateAmountElementsRecursion(array: number[], callback: Function, count ? : number, result ? : number): number {
    if (cache[array + String(callback)]) {
      return cache[array + String(callback)];
    }
    count = count || 0;
    result = result || 0;
    if (count < array.length - 1) {
      if (callback(array, count)) {
        result++;
        return calculateAmountElementsRecursion(array, callback, ++count, result);
      }
      return calculateAmountElementsRecursion(array, callback, ++count, result);
    } else {
      if (callback(array, count)) {
        return cache[array + String(callback)] = ++result;
      }
      return cache[array + String(callback)] = result;
    }
  }
}