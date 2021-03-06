interface Array<T> {
  sortSelection(callback: Function): void;
  sortBubble(callback: Function): void;
}

interface ISort {
  giveIndex: () => number;
}

Array.prototype.sortSelection = function(callback: Function): void {
  let array: ISort[] = this;
  for (let i: number = 0; i < array.length; i++) {
    let resultElement: ISort = array[i];
    let index: number = 0;
    for (let j: number = i + 1; j < array.length; j++) {
      if (callback(resultElement.giveIndex(), array[j].giveIndex())) {
        resultElement = array[j];
        index = j;
      }
    }
    if (index !== 0) {
      let temp: ISort = array[i];
      array[i] = resultElement;
      array[index] = temp;
    }
  }
}

Array.prototype.sortBubble = function(callback: Function): void {
  let array: ISort[] = this;
  for (let i: number = array.length - 1; i > 0; i--) {
    for (let j: number = 0; j < i; j++) {
      if (callback(array[j].giveIndex(), array[j + 1].giveIndex())) {
        let copyElement: ISort = array[j];
        array[j] = array[j + 1];
        array[j + 1] = copyElement;
      }
    }
  }
}
