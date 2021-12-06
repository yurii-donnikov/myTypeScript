let calculateSumElementsDubleArray = function(): Function {
  let cache: {[key: string]: number} = {};
  return function findSumDubleArrayRecurcion(array: number[][], callback: Function, index?: number, index2?: number, result?: number): number | null {
    if (!arguments[0] || arguments[1]) {
      return null;
    }
    if (cache[array + String(callback)]) {
      return cache[array + String(callback)];
    }
    index = index || 0;
    index2 = index2 || 0;
    result = result || 0;
    if (index < array.length) {
      if (index2 < array[index].length) {
        if (callback(index, index2)) {
          result += array[index][index2];
        }
        return findSumDubleArrayRecurcion(array, callback, index, ++index2, result);
      }
      index2 = 0;
      return findSumDubleArrayRecurcion(array, callback, ++index, index2, result);
    }
    return cache[array + String(callback)] = result;
  }
}

let calculateAmountElementsDubleArray = function(): Function {
  let cache: {[key: string]: {[key: string]: number}} = {};
  return function findNumbersDubleArrayRecurcion(array: number[][], callback: Function, count?: number, countTwo?: number, result?: {
    [key: string]: number
  }): {[key: string]: number} {
    if (cache[array + String(callback)]) {
      return cache[array + String(callback)];
    }
    count = count || 0;
    countTwo = countTwo || 0;
    result = result || {};
    if (count < array.length) {
      if (countTwo < array[count].length) {
        if (callback(count, countTwo)) {
          if (result[array[count][countTwo]]) {
            result[array[count][countTwo]]++;
          } else {
            result[array[count][countTwo]] = 1;
          }
        }
        return findNumbersDubleArrayRecurcion(array, callback, count, ++countTwo, result);
      }
      countTwo = 0;
      return findNumbersDubleArrayRecurcion(array, callback, ++count, countTwo, result);
    }
    return cache[array + String(callback)] = result;
  }
}