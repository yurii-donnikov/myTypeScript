class NodeBinary<T> {
  value: T | null;
  left: NodeBinary<T> | null;
  right: NodeBinary<T> | null;
    constructor() {
        this.value = null;
        this.left = null;
        this.right = null;
    }
  insert(value: T, node: NodeBinary<T> ): boolean {
    node = node || this;
    if(arguments[0]){
      if (!node.value) {
        node.value = value;
        return true;
      }
      if (value > node.value) {
        if (!node.right) {
          node.right = new NodeBinary();
        }
        return this.insert(value, node.right);
      }
      if (node.value > value) {
        if (!node.left) {
          node.left = new NodeBinary();
        }
        return this.insert(value, node.left);
      } 
    }
      return false
  }
  search(value: T, node?: NodeBinary<T>): T | null {
    node = node || this;
    if(arguments[0]){
      if(node.value === value){
        return node.value;
      }
      if(node.value && node.value > value) {
        if(!node.left) {
          return null;
        }
        return this.search(value, node.left);
      }
      if(node.value && node.value < value) {
        if(!node.right) {
          return null;
        }
        return this.search(value, node.right);
      }
    }
    return null
  }

  findMin(node: NodeBinary<T>, parentNode: NodeBinary<T>): NodeBinary<T>{
    if(!node.right){
      if(node.left){
        parentNode.right = node.left;
      } else {
        parentNode.right = null;
      }
      return node;
    }
    return this.findMin(node.right, node);
  }

  remove(value: T, node?: NodeBinary<T>): void {
    node = node || this;
    if(this.search(value) || arguments[0]){
      if(node.value === value){
        if(!node.left && !node.right){
          node.value = null;
          return;
        }
        if(!node.left && node.right){
          node.value = node.right.value;
          node.left = node.right.left;
          node.right = node.right.right;
          return;
        }
        if(node.left && !node.left.right){
          node.value = node.left.value;
          node.left = node.left.left;
          return;
        }
        if(node.left && node.left.right){
          node.value = (this.findMin(node.left.right, node.left)).value;
        }
      } else {
        if(node.value && node.value < value) {
          if(node.right){
            return this.remove(value, node.right);
          }
        }
        if(node.value && node.value > value) {
          if(node.left){
            return this.remove(value, node.left);
          }
        }
      }
    }
    return;
  }
}
