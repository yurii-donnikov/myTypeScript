interface InterfaceNode<T> {
  value: T | null;
  left: InterfaceNode<T> | null;
  right: InterfaceNode<T> | null;
}

class BinaryNode<T> {
  value: T | null;
  left: InterfaceNode<T> | null;
  right: InterfaceNode<T> | null;

  constructor() {
    this.value = null;
    this.right = null;
    this.left = null;
  }
    
  insert(value: T, node: InterfaceNode<T> ): BinaryNode<T> | void | boolean {
    node = node || this;
    if (!node.value) {
      node.value = value;
      return true;
    }
    if (value > node.value) {
      if (node.right === null) {
        node.right = new BinaryNode();
      }
      return this.insert(value, node.right);
    }
    if (node.value > value) {
      if (node.left === null) {
        node.left = new BinaryNode();
      }
      return this.insert(value, node.left);
    }
  }
  search(value: T, node?: InterfaceNode<T> ): null | void | T {
    node = node || this;
    if (arguments[0] === undefined) {
      return null;
    }
    if (node.value === value) {
      return node.value;
    }
    if (node.value && node.value > value) {
      if (node.left === null) {
        return null;
      }
      return this.search(value, node.left);
    }
    if (node.value && node.value < value) {
      if (node.right === null) {
        return null;
      }
      return this.search(value, node.right);
    }
      return null;
  }
  remove(value: T, node?: InterfaceNode<T> , linkParent?: InterfaceNode<T> , flag?: boolean): null | void | T {
    if (arguments[0] === undefined) {
      return null;
    }
    if (!this.search(value)) {
      return null;
    }
    node = node || this;
    linkParent = linkParent || this;
    flag = flag || false;
    if (flag) {
      if (node.right !== null) {
        return this.remove(value, node.right, node, flag);
      } else {
        linkParent.right = null;
        return node.value;
      }
    }
    if (node.value === value) {
      if (node.left === null && node.right === null) {
        if (linkParent.left && linkParent.left.value === node.value) {
          linkParent.left = null;
        } else {
          linkParent.right = null;
        }
      }
      if (node.left === null && node.right) {
        node.value = node.right.value;
        node.right = node.right.right;
      }
      if (node.left && node.right === null) {
        node.value = node.left.value;
        node.left = node.left.left;
      }
      if (node.left && node.right) {
        if (node.left.right) {
          flag = true;
          Object.defineProperty(node, 'value', {
            enumerable: false,
            writable: false,
            configurable: false,
            value: this.remove(value, node.left, node, flag)
          })
          flag = false;
        } else {
          node.value = node.left.value;
          node.left = node.left.left;
        }
      }
    } else {
      if (node.value && node.value < value) {
        if (node.right !== null) {
          return this.remove(value, node.right, node, flag);
        }
      }
      if (node.value && node.value > value) {
        if (node.left !== null) {
          return this.remove(value, node.left, node, flag);
        }
      }
    }
  }
}