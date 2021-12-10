let calculateFactorial = function(): Function {
  let cache: number[] = [];
  return function calculateFactorialRecursion(num: number, count?: number, result?: number[]): number {
    if (cache[num]) {
      return cache[num];
    }
    result = result || [1, 1];
    count = count || 2;
    if (typeof result[num] === 'undefined') {
      result.push((result[result.length - 1]) * count);
      return calculateFactorialRecursion(num, ++count, result);
    }
    cache = result;
    return cache[num];
  }
}
