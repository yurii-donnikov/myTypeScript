interface Function {
  myBind<T> (obj: object, ...arg: Array<T> ): Function;
  myCall<T> (obj: object, ...arg: Array<T> ): T;
}

Function.prototype.myBind = function<T> (obj: object, ...arg: Array<T> ): Function {
  let copyObject: Record<string | number | symbol, Function> = Object.create(obj);
  copyObject['func'] = this as Function;
  return function<T> (...arg2: Array<T> ): T {
    return copyObject['func'](...arg, ...arg2);
  }
}

Function.prototype.myCall = function<T> (obj: object, ...arg: Array<T> ): T {
  let copyObj: Record< string | number | symbol, Function > = Object.create(obj);
  copyObj['func'] = this as Function;
  return copyObj['func'](...arg);
}

interface Array<T> {
  myForEach(calcForEach: Function): void;
  myMap<T> (calcForEach: Function): Array<T>;
  myFilter<T>(funcFilter: Function): Array<T>;
  myReduce(callback: Function, startElement: number): number;
}

Array.prototype.myForEach = function (calcForEach: Function): void {
  for (let i: number = 0; i < this.length; i++) {
    calcForEach(this[i], i, this);
  }
}

Array.prototype.myMap = function<T> (callback: Function): Array<T>{
  let newArray: Array<T> = [];
  for (let i = 0; i < this.length; i++) {
    newArray.push(callback(this[i], i, this));
  }
  return newArray;
}

Array.prototype.myFilter = function<T> (funcFilter: Function): Array<T> {
  let newArray: Array<T> = [];
  for (let i = 0; i < this.length; i++) {
    if (funcFilter(this[i], i, this)) {
      newArray.push(this[i]);
    }
  }
  return newArray;
}

Array.prototype.myReduce = function(callback: Function, startElement: number): number {
  let result: number;
  if (!startElement) {
    result = 0;
  } else {
    result = startElement;
  }
  for (let i = 0; i < this.length; i++) {
    result = callback(result, this[i]);
  }
  return result;
}
