let sumMinToMax = function(): Function {
  let cache: {[key: string]: number} = {};
  return function sumMinToMaxRecurcion(array: number[], callback: Function, minElem?: number, maxElem?: number, index?: number, index2?: number): number {
    if (cache[array + String(callback)]) {
      return cache[array + String(callback)];
    }
    minElem = minElem || array[0];
    maxElem = maxElem || array[0];
    index = index || 0;
    index2 = index2 || 1;
    if (index < array.length) {
      if (array[index] < minElem && callback(index)) {
        minElem = array[index];
      }
      if (array[index] > maxElem && callback(index)) {
        maxElem = array[index];
      }
      return sumMinToMaxRecurcion(array, callback, minElem, maxElem, ++index);
    }
    if (index2 <= maxElem) {
      minElem = minElem + index2;
      return sumMinToMaxRecurcion(array, callback, minElem, maxElem, index, ++index2);
    }
    minElem--;
    return cache[array + String(callback)] = minElem;
  }
}
