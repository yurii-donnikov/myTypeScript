let findSumWord = function(): Function {
  let cache: {[key: string]: {[key: string]: number}} = {};
  return function findCountWordRecurcion(offer: string, result?: {
    [key: string]: number
  }, count?: number, arrayOffer?: string[]): {[key: string]: number} {
    count = count || 0;
    result = result || {};
    arrayOffer = arrayOffer || ('' + offer).split(' ');
    if (cache[offer]) {
      return cache[offer];
    }
    if (!arguments[0]) {
      throw new Error();
    }
    if (count < arrayOffer.length) {
      if (result[arrayOffer[count]]) {
        result[arrayOffer[count]]++;
      } else {
        result[arrayOffer[count]] = 1;
      }
      return findCountWordRecurcion(offer, result, ++count, arrayOffer);
    }
    return cache[offer] = result;
  }
}
