let monogrammaMemoiz = function(): Function {
  let cache: {
    [key: string]: boolean
  } = {};
  return function monogrammaRecursion(wordOne: string, wordTwo: string, count1?: number, count2?: number, arrayWordOne?: string[], arrayWordTwo?: string[]): boolean {
    if (typeof cache[wordOne + wordTwo] != 'undefined') {
      return cache[wordOne + wordTwo];
    }
    count1 = count1 || 0;
    count2 = count2 || 0;
    arrayWordOne = arrayWordOne || ('' + wordOne).split('');
    arrayWordTwo = arrayWordTwo || ('' + wordTwo).split('');
    if (arrayWordOne.length != arrayWordTwo.length) {
      return cache[wordOne + wordTwo] = false;
    }
    if (arrayWordOne.toString() == arrayWordTwo.toString()) {
      return cache[wordOne + wordTwo] = true;
    } else {
      if (arrayWordOne[count1] == arrayWordTwo[count2] || count2 > arrayWordOne.length - 1) {
        if (count1 > arrayWordOne.length - 1) {
          return false;
        }
        let deleteElem = arrayWordTwo.splice(count2, 1);
        arrayWordTwo.push(deleteElem[0]);
        count2 = 0;
        return monogrammaRecursion(wordOne, wordTwo, ++count1, count2, arrayWordOne, arrayWordTwo);
      } else {
        if (count1 > arrayWordOne.length - 1 || count2 > arrayWordOne.length - 1) {
          return false;
        }
        return monogrammaRecursion(wordOne, wordTwo, count1, ++count2, arrayWordOne, arrayWordTwo);
      }
    }
  }
}