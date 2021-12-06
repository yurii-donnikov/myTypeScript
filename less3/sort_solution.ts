interface Array<T> {
  sortSelection(callback: T): void;
  sortBubble(callback: T): void;
}

Array.prototype.sortSelection = function(callback: Function): void {
  let array: number[] | string[] = this;
  for (let i: number = 0; i < array.length; i++) {
    let resultElement: number | string = array[i];
    let index: number = 0;
    for (let j: number = i + 1; j < array.length; j++) {
      if (callback(resultElement, array[j])) {
        resultElement = array[j];
        index = j;
      }
    }
    if (index) {
      let temp: number | string = array[i];
      array[i] = resultElement;
      array[index] = temp;
    }
  }
}

Array.prototype.sortBubble = function(callback: Function): void {
  let array: number[] | string[] = this;
  for (let i: number = array.length - 1; i > 0; i--) {
    for (let j: number = 0; j < i; j++) {
      if (callback(array[j], array[j + 1])) {
        let copyElement: number | string = array[j];
        array[j] = array[j + 1];
        array[j + 1] = copyElement;
      }
    }
  }
}