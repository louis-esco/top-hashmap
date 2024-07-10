import LinkedList from "./linkedList.js";

export default class HashMap {
  constructor() {
    this.hashTable = new Array(16);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.hashTable.length;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || index >= this.hashTable.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (this.hashTable[index] === undefined) {
      this.hashTable[index] = new LinkedList();
      this.hashTable[index].append(key, value);
    } else if (this.hashTable[index].contains(key)) {
      let collIndex = this.hashTable[index].find(key);
      this.hashTable[index].removeAt(collIndex);
      this.hashTable[index].insertAt(key, value, collIndex);
    } else {
      this.hashTable[index].append(key, value);
    }
    this.checkBucketsSize();
  }

  checkBucketsSize() {
    let capacity = this.hashTable.length;
    let loadFactor = 0.75;

    if (this.length() > capacity * loadFactor) {
      const entries = this.entries();
      this.hashTable = new Array(capacity * 2);
      for (const entry of entries) {
        this.set(entry[0], entry[1]);
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    if (
      this.hashTable[index] === undefined ||
      this.hashTable[index].contains(key) === false
    ) {
      return null;
    } else {
      const listIndex = this.hashTable[index].find(key);
      return this.hashTable[index].at(listIndex).value;
    }
  }

  has(key) {
    const index = this.hash(key);
    if (
      this.hashTable[index] === undefined ||
      this.hashTable[index].contains(key) === false
    ) {
      return false;
    } else {
      return true;
    }
  }

  remove(key) {
    const index = this.hash(key);
    if (
      this.hashTable[index] === undefined ||
      this.hashTable[index].contains(key) === false
    ) {
      return false;
    } else {
      let listIndex = this.hashTable[index].find(key);
      this.hashTable[index].removeAt(listIndex);
      return true;
    }
  }

  length() {
    let mapLength = 0;
    for (const bucket of this.hashTable) {
      if (bucket !== undefined) {
        const bucketLength = bucket.getSize();
        mapLength += bucketLength;
      }
    }
    return mapLength;
  }

  clear() {
    this.hashTable = new Array(16);
  }

  keys() {
    let keysArr = [];
    for (const bucket of this.hashTable) {
      if (bucket !== undefined) {
        const listArr = bucket.toArray("key");
        keysArr = [...keysArr, ...listArr];
      }
    }
    return keysArr;
  }

  values() {
    let valuesArr = [];
    for (const bucket of this.hashTable) {
      if (bucket !== undefined) {
        const listArr = bucket.toArray("value");
        valuesArr = [...valuesArr, ...listArr];
      }
    }
    return valuesArr;
  }

  entries() {
    let entriesArr = [];
    for (const bucket of this.hashTable) {
      if (bucket !== undefined) {
        const listArr = bucket.toPairedArray("value");
        entriesArr = [...entriesArr, ...listArr];
      }
    }
    return entriesArr;
  }
}
