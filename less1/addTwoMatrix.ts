let addTwoMatrix = function(): Function {
  let cache: {
    [key: string]: number[][]
  } = {};
  return function addTwoMatrixRecurcion(matrix: number[][], matrix2: number[][], index?: number, index2?: number, result?: number[][]): number[][] {
    if (cache[matrix + String(matrix2)]) {
      return cache[matrix + String(matrix2)];
    }
    result = result || [];
    index = index || 0;
    index2 = index2 || 0;
    if (index < matrix.length) {
      if (!result[index]) {
        result[index] = [];
      }
      if (index2 < matrix[0].length) {
        result[index][index2] = matrix[index][index2] + matrix2[index][index2];
        return addTwoMatrixRecurcion(matrix, matrix2, index, ++index2, result);
      }
      index2 = 0;
      return addTwoMatrixRecurcion(matrix, matrix2, ++index, index2, result);
    }
    return cache[matrix + String(matrix2)] = result;
  }
}