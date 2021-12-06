let deleteValueString = function(): Function {
  let cache: {
    [key: string]: number[][]
  } = {};
  return function deleteValueStringRecursion(matrix: number[][], value: number, index?: number, index2?: number, copyMatrix?: number[][]): number[][] | null {
    copyMatrix = copyMatrix || matrix;
    if (cache[String(copyMatrix)]) {
      return cache[String(matrix)];
    }
    if (typeof arguments[1] === 'undefined') {
      return null;
    }
    cache[0] = matrix;
    index = index || 0;
    index2 = index2 || 0;
    if (matrix.length === 0) {
      return matrix;
    }
    if (index < matrix.length) {
      if (index2 < matrix[index].length) {
        if (matrix[index][index2] == value) {
          matrix.splice(index, 1);
          if (index != 0) {
            --index;
          }
          return deleteValueStringRecursion(matrix, value, index, index2, copyMatrix);
        }
        return deleteValueStringRecursion(matrix, value, index, ++index2, copyMatrix);
      }
      index2 = 0;
      return deleteValueStringRecursion(matrix, value, ++index, index2, copyMatrix);
    }
    return cache[String(copyMatrix)] = matrix;
  }
}