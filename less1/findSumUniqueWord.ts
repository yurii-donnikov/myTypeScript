let findSumUniqueWord = function(): Function {
  let cache: {[key: string]: number} = {};
  return function findSumUniqueWordRecursion(offer: string, word: string, count?: number, result?: number): number | null {
    count = count || 0;
    result = result || 0;
    let arrayOffer: string[] = offer.split(' ');
    if (!arguments[1]) {
      return null;
    }
    if (cache[offer + word]) {
      return cache[offer + word];
    }
    if (count < arrayOffer.length) {
      if (arrayOffer[count] === word) {
        result++;
        return findSumUniqueWordRecursion(offer, word, ++count, result);
      }
      return findSumUniqueWordRecursion(offer, word, ++count, result);
    }
    return cache[offer + word] = result;
  }
}