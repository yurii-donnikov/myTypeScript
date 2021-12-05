let deleteValueString = function(): Function {
  let cache: {
    [key: string]: number[][]
  } = {};
  return function deleteValueStringRecursion(matrix: number[][], value: number, index ? : number, index2 ? : number, copyMatrix ? : number[][]): number[][] {
    copyMatrix = copyMatrix || matrix;
    if (cache[String(copyMatrix)]) {
      console.log(cache)
      return cache[String(matrix)];
    }
    cache[0] = matrix;
    index = index || 0;
    index2 = index2 || 0;
    if (matrix.length == 0) {
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