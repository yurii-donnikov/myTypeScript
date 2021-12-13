interface INode {
  giveIndex: () => number;
}

class NodeBinary {
  value: INode | null;
  left: NodeBinary | null;
  right: NodeBinary | null;

  constructor() {
    this.value = null;
    this.left = null;
    this.right = null;
  }

  insert(value: INode, node?: NodeBinary ): boolean {
    node = node || this;
    if(arguments[0]){
      if (!node.value) {
        node.value = value;
        return true;
      }
      if (value.giveIndex() > node.value.giveIndex()) {
        if (!node.right) {
          node.right = new NodeBinary();
        }
        return this.insert(value, node.right);
      }
      if (node.value.giveIndex() > value.giveIndex()) {
        if (!node.left) {
          node.left = new NodeBinary();
        }
        return this.insert(value, node.left);
      } 
    }
    throw new Error('не передан обязательный параметр');
  }
  
  search(value: INode, node?: NodeBinary): INode | null {
    node = node || this;
    if(arguments[0]){
      if(node.value && node.value.giveIndex() === value.giveIndex()){
        return node.value;
      }
      if(node.value && node.value.giveIndex() > value.giveIndex()) {
        if(!node.left) {
          return null;
        }
        return this.search(value, node.left);
      }
      if(node.value && node.value.giveIndex() < value.giveIndex()) {
        if(!node.right) {
          return null;
        }
        return this.search(value, node.right);
      }
    }
    throw new Error('не передан обязательный параметр');
  }

  findMin(node: NodeBinary, parentNode: NodeBinary): NodeBinary{
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

  remove(value: INode, node?: NodeBinary): void {
    node = node || this;
    if(this.search(value)){
      if(node.value && node.value.giveIndex() === value.giveIndex()){
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
        if(node.value && node.value.giveIndex() < value.giveIndex()) {
          if(node.right){
            return this.remove(value, node.right);
          }
        }
        if(node.value && node.value.giveIndex() > value.giveIndex()) {
          if(node.left){
            return this.remove(value, node.left);
          }
        }
      }
    }
  }
}
