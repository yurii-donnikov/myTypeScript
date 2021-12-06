let calculateFibonachi = function(): Function {
  let cache: number[] = [];
  return function calculateFibonachiRecurcion(numeric: number, result?: number[], count?: number): number | null {
    if (cache[numeric]) {
      return cache[numeric];
    }
    if (typeof arguments[0] === 'undefined') {
      return null;
    }
    result = result || [0, 1];
    count = count || 0;
    let start = result[result.length - 2];
    let stop = result[result.length - 1];
    let sum = start + stop;
    if (count < numeric - 1) {
      result.push(sum);
      return calculateFibonachiRecurcion(numeric, result, ++count);
    }
    cache = result;
    return cache[numeric];
  }
}