import Node from "./node";

export default class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  append(value) {
    if (this.head === null) {
      this.head = new Node(value);
    } else {
      let lastNode = this.head;
      while (lastNode.nextNode !== null) {
        lastNode = lastNode.nextNode;
      }
      lastNode.nextNode = new Node(value);
    }
  }

  prepend(value) {
    this.head = new Node(value, this.head);
  }

  getSize() {
    let size = 0;
    let lastNode = this.head;
    while (lastNode !== null) {
      size++;
      lastNode = lastNode.nextNode;
    }
    return size;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let lastNode = this.head;
    while (lastNode.nextNode !== null) {
      lastNode = lastNode.nextNode;
    }
    return lastNode;
  }

  at(index) {
    let searchedNode = this.head;
    for (let i = 0; i < index; i++) {
      searchedNode = searchedNode.nextNode;
      if (searchedNode === null) {
        console.log("No node found at this index");
        return;
      }
    }
    return searchedNode;
  }

  pop() {
    if (this.head !== null) {
      let secToLastNode = this.head;
      if (secToLastNode.nextNode === null) {
        this.head = null;
      } else {
        while (secToLastNode.nextNode.nextNode !== null) {
          secToLastNode = secToLastNode.nextNode;
        }
        secToLastNode.nextNode = null;
      }
    }
  }

  contains(value) {
    let nodeSearch = this.head;
    while (nodeSearch !== null) {
      if (nodeSearch.value.includes(value)) {
        return true;
      } else {
        nodeSearch = nodeSearch.nextNode;
      }
    }
    return false;
  }

  find(value) {
    let nodeSearch = this.head;
    let index = 0;
    while (nodeSearch !== null) {
      if (nodeSearch.value.includes(value)) {
        return index;
      } else {
        nodeSearch = nodeSearch.nextNode;
        index++;
      }
    }
    return null;
  }

  toString() {
    let node = this.head;
    let printList = "";
    while (node !== null) {
      printList += `( ${node.value} ) -> `;
      node = node.nextNode;
    }
    printList += "null";
    console.log(printList);
  }

  insertAt(value, index) {
    if (index === 0) {
      this.head = new Node(value, this.head);
    } else {
      let node = this.head;
      for (let i = 0; i < index - 1; i++) {
        node = node.nextNode;
      }
      node.nextNode = new Node(value, node.nextNode);
    }
  }

  removeAt(index) {
    if (this.head !== null) {
      if (index === 0) {
        this.head = this.head.nextNode;
      } else {
        let node = this.head;
        for (let i = 0; i < index - 1; i++) {
          node = node.nextNode;
          if (node === null || node.nextNode === null) {
            console.log("No node found at this index");
            return;
          }
        }
        node.nextNode = node.nextNode.nextNode;
      }
    } else {
      console.log("No node found at this index");
    }
  }
}
