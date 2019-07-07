class Basket {
  constructor(dal) {
    this._apples = [];
    this._pears = [];
    this._oranges = [];
    this.count = 0;
    this._dal = dal;
  }
  addProduct(product) {
    if (product instanceof Apple) {
      this._apples.push(product);
    } else if (product instanceof Pear) {
      this._pears.push(product);
    } else if (product instanceof Orange) {
      this._oranges.push(product);
    }
  }
  getAllFruit() {
    this._dal.getLocalStorageData((appleValue, pearValue, orangeValue) => {
      this._apples = appleValue;
      this._pears = pearValue;
      this._oranges = orangeValue;
    });
  }

  clear() {
    this._apples = [];
    this._pears = [];
    this._oranges = [];
    this._dal.clearDataLocalStorage();
  }
  washAllFruits() {
    this._apples.forEach(elem => {
      elem.isDirty = false;
    });
    this._pears.forEach(elem => {
      elem.isDirty = false;
    });
    this._oranges.forEach(elem => {
      elem.isDirty = false;
    });
  }
  winterApplesCount() {
    this._apples.forEach(elem => {
      if (elem.isWinter === true) {
        this.count++;
      }
    });
    alert(this.count);
  }
  alertWhenAppleRotten() {
    alert("kabzda yabloku");
  }
  saveBasketLocalStorage(callback) {
    this._dal.localStorageSave(
      this._apples,
      this._pears,
      this._oranges,
      callback
    );
  }
}
