let AvergeNumber = function(): Function {
  let cache: {
    [key: string]: number
  } = {};
  return function AvergeNumberRecurion(array: number[], callback: Function, result ? : number, count ? : number, amountElem ? : number): number {
    if (cache[array + String(callback)]) {
      return cache[array + String(callback)];
    }
    count = count || 0;
    result = result || 0;
    amountElem = amountElem || 0;
    if (count < array.length) {
      if (callback(count)) {
        result += array[count];
        return AvergeNumberRecurion(array, callback, result, ++count, ++amountElem);
      }
      return AvergeNumberRecurion(array, callback, result, ++count, amountElem);
    }
    return cache[array + String(callback)] = (result / amountElem);
  }
}

let AvergeNumberDobleArray = function(): Function {
  let cache: {
    [key: string]: number
  } = {};
  return function AvergeNumberDobleArrayRecursion(array: number[][], callback: Function, index ? : number, index2 ? : number, result ? : number, amountElem ? : number): number {
    if (cache[array + String(callback)]) {
      return cache[array + String(callback)];
    }
    index = index || 0;
    index2 = index2 || 0;
    result = result || 0;
    amountElem = amountElem || 0;
    if (index < array.length) {
      if (index2 < array[index].length) {
        if (callback(index, index2)) {
          result += array[index][index2];
          amountElem++;
        }
        return AvergeNumberDobleArrayRecursion(array, callback, index, ++index2, result, amountElem);
      }
      index2 = 0;
      return AvergeNumberDobleArrayRecursion(array, callback, ++index, index2, result, amountElem);
    }
    return cache[array + String(callback)] = result / amountElem;
  }
}