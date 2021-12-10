let calculateFibonachi = function():Function {
  let cache: number[] = [];
  return function calculateFibonachiRecurcion(numeric: number, result?: number[], count?: number): number {
    if (typeof arguments[0] === 'undefined') {
      throw new Error();
    }
    if (cache[numeric]) {
      return cache[numeric];
    }
    if(cache.length){
      cache[cache.length] = cache[cache.length - 2] + cache[cache.length - 1];
      return calculateFibonachiRecurcion(numeric, result, count);
    } else {
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
}
