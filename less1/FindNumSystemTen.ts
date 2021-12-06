let FindNumSystemTen = function(): Function {
  let cache: {[key: string]: number} = {};
  return function FindNumSystemTenRecursion(numSystemTwo: number, count?: number, arrayNum?: string[], result?: number): number | null {
    if (cache[numSystemTwo]) {
      return cache[numSystemTwo];
    }
    if (typeof arguments[0] === 'undefined') {
      return null;
    }
    result = result || 0;
    arrayNum = arrayNum || ('' + numSystemTwo).split('').reverse();
    count = count || 0;
    if (count < arrayNum.length) {
      result += Number(arrayNum[count]) * (Math.pow(2, count));
      return FindNumSystemTenRecursion(numSystemTwo, ++count, arrayNum, result);
    }
    return cache[numSystemTwo] = result;
  }
}
let findNumSystemTwo = function(): Function {
  let cache: { [key: string]: number } = {};
  return function findNumSystemTwoRecursion(numeric: number, result?: string, numberCopy?: number): number | null {
    numberCopy = numberCopy || numeric;
    if (cache[numeric]) {
      return cache[numeric];
    }
    let sum: number;
    result = result || '';
    if (typeof arguments[0] === 'undefined') {
      return null;
    }
    if ((sum = numberCopy / 2) >= 1) {
      if (sum % 2 == parseInt(String(sum % 2))) {
        result += '0';
        return findNumSystemTwoRecursion(numeric, result, parseInt(String(sum)));
      } else {
        result += '1';
        return findNumSystemTwoRecursion(numeric, result, parseInt(String(sum)));
      }
    }
    result += '1';
    return cache[numeric] = Number(result.split('').reverse().join(''));
  }
}