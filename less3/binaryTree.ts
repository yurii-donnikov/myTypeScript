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
  remove(value: T, node?: NodeBinary<T>, linkParent?: NodeBinary<T>, flag?: boolean):T | void {
    if(!this.search(value)){
      return;
    }
    node = node || this;
    linkParent = linkParent || this;
    flag = flag || false;
    if(flag) {
      if (node.right) {  //!== null
      return this.remove(value, node.right, node, flag);
      } else {
        linkParent.right = null;
        if(node.value){
          return node.value;
        }
      }
    }
    if(node.value === value) {
      if (!node.left && !node.right){
        if(linkParent.left && linkParent.left.value === node.value){
          linkParent.left = null;
        } else{
          linkParent.right = null;
        }
      }
      if(!node.left && node.right){
        node.value = node.right.value;
        node.right = node.right.right;
      }
      if(node.left && !node.right){
        node.value = node.left.value;
        node.left = node.left.left;
      }
      if(node.left && node.right) {
        if(node.left.right) {
          flag = true;
          if(node.value){
          Object.defineProperty(node, 'value', {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.remove(value, node.left, node, flag)
          });
          }
          flag = false;
      } else {
        node.value = node.left.value;
        node.left = node.left.left;
        }
      }
    } else {
      if(node.value && node.value < value) {
        if(node.right){
          return this.remove(value, node.right, node, flag);
        }
      }
      if(node.value && node.value > value) {
        if(node.left){
        return this.remove(value, node.left, node, flag);
        }
      }
    }
  }
}
