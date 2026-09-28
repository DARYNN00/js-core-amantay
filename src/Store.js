export class Store {
  #items = [];

  constructor(initialItems = []) {
    this.#items = [...initialItems];
  }

  add(item) {
    this.#items.push(item);
  }

  remove(predicate) {
    const index = this.#items.findIndex(predicate);
    if (index !== -1) {
      return this.#items.splice(index, 1)[0];
    }
    return null;
  }

  find(predicate) {
    return this.#items.find(predicate) || null;
  }

  total() {
    return this.#items.length;
  }

  get items() {
    return [...this.#items];
  }

  static createEmpty() {
    return new Store();
  }
}

export class SortedStore extends Store {
  add(item) {
    super.add(item);
  }
}