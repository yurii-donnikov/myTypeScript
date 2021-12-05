interface Function {
  myBind < T > (obj: object, ...arg: Array < T > ): Function;
  myCall < T > (obj: object, ...arg: Array < T > ): T;
}

Function.prototype.myBind = function < T > (obj: object, ...arg: Array < T > ): Function {
  let copyObject: Record < string | number | symbol, any > = Object.create(obj);
  copyObject['func'] = this as Function;
  return function < T > (...arg2: Array < T > ): T {
    return copyObject['func'](...arg, ...arg2);
  }
}

Function.prototype.myCall = function < T > (obj: object, ...arg: Array < T > ): T {
  let copyObj: Record < string | number | symbol, any > = Object.create(obj);
  copyObj['func'] = this as Function;
  return copyObj['func'](...arg);
}

interface Array < T > {
  myForEach < K > (calcForEach: T): void;
  myMap < K > (calcForEach: T): any[];
  myFilter<K>(funcFilter: T): Array<K>;
  myReduce<K>(callback: T, startElement: number): number;
}

Array.prototype.myForEach = function < K > (calcForEach: Function): void {
  for (let i: number = 0; i < this.length; i++) {
    calcForEach(this[i], i, this);
  }
}

Array.prototype.myMap = function < K > (callback: Function): any[] {
  let resultArray: any[] = [];
  for (let i = 0; i < this.length; i++) {
    resultArray.push(callback(this[i], i, this));
  }
  return resultArray;
}

Array.prototype.myFilter = function < K > (funcFilter: Function): Array < K > {
  let resultArray: Array < K > = [];
  for (let i = 0; i < this.length; i++) {
    if (funcFilter(this[i], i, this) === true) {
      resultArray.push(this[i]);
    }
  }
  return resultArray;
}

Array.prototype.myReduce = function(callback: Function, startElement: number): number {
  let result: number;
  if (startElement === undefined || startElement === 0) {
    result = 0;
  } else result = startElement;
  for (let i = 0; i < this.length; i++) {
    result = callback(result, this[i]);
  }
  return result;
}