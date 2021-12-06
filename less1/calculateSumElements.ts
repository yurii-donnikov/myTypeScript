let calculateSumElements = function(): Function {
  let cache: {[key: string]: number} = {};
  return function calculateSumElementsRecursion(array: number[], callback: Function, count?: number, result?: number): number | null {
    if (!arguments[0] || !arguments[1]) {
      return null;
    }
    if (cache[array + String(callback)]) {
      return cache[array + String(callback)];
    }
    count = count || 0;
    result = result || 0;
    if (count < array.length) {
      if (callback(array, count)) {
        result += array[count];
        return calculateSumElementsRecursion(array, callback, ++count, result);
      }
      return calculateSumElementsRecursion(array, callback, ++count, result);
    }
    return cache[array + String(callback)] = result;
  }
}