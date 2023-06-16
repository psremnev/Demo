/**
 * @class Collection/Collection
 * @description
 *  Класс для работы с коллекцией записей в списке
 *  Чтобы отследить изменения в списке нужно подписаться на событие методом subscribeCollectionChange
 *  Передав туда callback, в ответ вернется id, который надо передать при отписке в метод unsubscribeCollectionChange
 * @param items {object[] - []}
 * @param idProperty {string - id}
 * @public
 */

export class Collection {
  private items = [];
  private idProperty = 'id';
  private collectionChangeCallbacks = {};
  private callbackId = 0;

  constructor(items?, idProperty?) {
    this.idProperty = idProperty;
    this.items = items;
  }

  private findElement(element): [object, number] {
    for (let i = 0; i < this.items.length; i++) {
      let current = this.items[i];
      if (current[this.idProperty] === element[this.idProperty]) {
        return [current, i];
      }
    }
  }

  private collectionChange() {
    for (let key in this.collectionChangeCallbacks) {
      let callback = this.collectionChangeCallbacks[key];
      callback && callback(this.items);
    }
  }

  add(element, position) {
    const newItems = this.items.slice();
    newItems.splice(position, 0, element);
    this.items = newItems;
    this.collectionChange();
  }

  update(element, position?) {
    if (position) {
      this.items[position] = element;
    } else {
      let [foundElement, _] = this.findElement(element);
      foundElement = element;
    }
    this.items = this.items.slice();
    this.collectionChange();
  }

  delete(element, position) {
    if (position) {
      this.items.splice(position, 1);
    } else {
      const [_, foundPosition] = this.findElement(element);
      this.items.splice(foundPosition, 1);
    }
    this.items = this.items.slice();
    this.collectionChange();
  }

  setItems(newItems) {
    this.items = newItems;
    this.collectionChange();
  }

  getItems(): object[] {
    return this.items;
  }

  size(): number {
    return this.items.length;
  }

  subscribeCollectionChange(callback: Function): number {
    const id = this.callbackId++;
    this.collectionChangeCallbacks[id] = callback;
    return id;
  }

  unsubscribeCollectionChange(callbackId: string) {
    delete this.collectionChangeCallbacks[callbackId];
  }
}
