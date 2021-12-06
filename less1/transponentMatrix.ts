let transponentMatrix = function(): Function {
  let cache: {[key: string]: number[][]} = {};
  return function transponentMatrixRecursion(matrix: number[][], index?: number, index2?: number, result?: number[][]): number[][] | null {
    if (!arguments[0]) {
      return null;
    }
    if (cache[String(matrix)]) {
      return cache[String(matrix)];
    }
    result = result || [];
    index = index || 0;
    index2 = index2 || 0;
    if (index < matrix[0].length) {
      if (typeof result[index] == 'undefined') {
        result[index] = [];
      }
      if (index2 < matrix.length) {
        result[index][index2] = matrix[index2][index];
        return transponentMatrixRecursion(matrix, index, ++index2, result);
      }
      index2 = 0;
      return transponentMatrixRecursion(matrix, ++index, index2, result);
    }
    return cache[String(matrix)] = result;
  }
}