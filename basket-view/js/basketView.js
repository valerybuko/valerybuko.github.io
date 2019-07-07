class BasketView {
  constructor(id, basket) {
    this.basket = basket;
    this.el = document.querySelector("#" + id);
    this.wrapperBasketEl = null;
    this.selectAllFruitsBasketEl = null;
    this.btnAddFruitEl = null;
    this.deleteBtn = null;
    this.allApplesEl = null;
    this.allPearsEl = null;
    this.allOrangesEl = null;
    this.propertesFruitsEl = null;
    this.firstPropertyFruit = null;
    this.selectFruit = null;
  }
  render() {
    if (this.el.innerHTML === "") {
      this.el.innerHTML = `
      <span class="name-project">Fruit Basket</span>
      <div class="wrapper-panel">
        <div class="wrapper-info-about-fruit">
          <div class="wrapper-info-select">
            <span>select fruit</span>
            <select id="selectAllFruitsBasket" class="select-all-fruits">
              <option value="apple">apple</option>
              <option value="pear">pear</option>
              <option value="orange">orange</option>
            </select> 
          </div>              
          <div class="wrapper-properties-fruits">
            <div class="first-propert-fruit">
              <span>fruit name: </span><br>
              <input type ="text" class="input-name-fruit">
            </div>
            <div class="second-property-fruit">
              <span>is winter </span><br>
              <input type="checkbox" class="input-apple-checkbox">
            </div>
          </div> 
        </div>    
        <div class="buttons-save-and-delete-fruits">
          <button id="btnAddFruit" class="btnAdd btnSave btn btn-outline-success">save</button>
          <button id="clearFruits" class="btn-delete-all-fruits btn btn-outline-danger">clear</button>
        </div>
      </div>      
    <div class="wrapper-basket"></div>`;

      this.findingElementsToDoList();
      this.assigningEventsToElements();
      this.allFruits();
      this.renderBasket();
    }
  }
  findingElementsToDoList() {
    this.wrapperBasketEl = this.el.querySelector(".wrapper-basket");
    this.selectAllFruitsBasketEl = this.el.querySelector(
      "#selectAllFruitsBasket"
    );
    this.btnAddFruitEl = this.el.querySelector("#btnAddFruit");
    this.deleteBtn = this.el.querySelector("#clearFruits");
    this.propertesFruitsEl = this.el.querySelector(".second-property-fruit");
    this.firstPropertyFruit = this.el.querySelector(".input-name-fruit");
    this.selectFruit = this.el.querySelector("#selectAllFruitsBasket");
  }
  assigningEventsToElements() {
    this.wrapperBasketEl.innerHTML = `Basket is empty`;
    this.deleteBtn.addEventListener("click", this.clearAllFruits.bind(this));
    this.selectAllFruitsBasketEl.addEventListener(
      "click",
      this.addNewMetods.bind(this)
    );
    this.btnAddFruitEl.addEventListener(
      "click",
      this.createNewFruit.bind(this)
    );
    this.btnAddFruitEl.addEventListener(
      "click",
      this.notificationSaveLocalStorage.bind(this)
    );
  }

  renderBasket() {
    this.wrapperBasketEl.innerHTML = `
    <div class="wrappers">
      <span>apples:</span>
      <div class="wrapper-all-apples"></div>
    </div>
    <div class="wrappers">
      <span>pears:</span>
      <div class="wrapper-all-pears"></div>
    </div>
    <div class="wrappers">
      <span>oranges:</span>
      <div class="wrapper-all-oranges"></div> 
    </div>`;
    this.allApplesEl = this.el.querySelector(".wrapper-all-apples");
    this.allPearsEl = this.el.querySelector(".wrapper-all-pears");
    this.allOrangesEl = this.el.querySelector(".wrapper-all-oranges");
    this.allApplesEl.innerHTML = "";
    this.allPearsEl.innerHTML = "";
    this.allOrangesEl.innerHTML = "";
    let apples = this.basket._apples;
    let pears = this.basket._pears;
    let oranges = this.basket._oranges;
    if (apples != null) {
      apples.forEach(elem => {
        this.allApplesEl.innerHTML +=
          `<ul> 
            <li>
             name: ${elem.name}
            </li> ` +
          `<li>
              is winter: ${elem.isWinter}
            </li> 
          </ul>`;
      });
    }
    if (pears != null) {
      pears.forEach(elem => {
        this.allPearsEl.innerHTML +=
          `<ul>
            <li> 
            name: ${elem.name} 
            </li>` +
          ` <li>
              type: ${elem.type}
            </li> 
          </ul>`;
      });
    }
    if (oranges != null) {
      oranges.forEach(elem => {
        this.allOrangesEl.innerHTML +=
          `<ul> 
            <li>
            name: ${elem.name}
            </li> ` +
          ` <li>
            country: ${elem.country}
            </li> 
          </ul>`;
      });
    }
  }
  addNewMetods() {
    if (this.selectFruit.value === "apple") {
      this.propertesFruitsEl.innerHTML = `<span>is winter </span><br>
      <input type="checkbox" class="input-apple-checkbox">`;
    } else if (this.selectFruit.value === "pear") {
      this.propertesFruitsEl.innerHTML = `<span>pear type: </span><br>
       <input type="text" class="input-pear-text">`;
    } else if (this.selectFruit.value === "orange") {
      this.propertesFruitsEl.innerHTML = `<span>country of origin: </span><br>
       <input type="text" class="input-orange-text">`;
    }
  }
  createNewFruit() {
    if (this.selectFruit.value === "apple") {
      let isWinterValue = this.el.querySelector(".input-apple-checkbox");
      let apple = new Apple(
        this.firstPropertyFruit.value,
        isWinterValue.checked
      );
      this.basket.addProduct(apple);
      this.renderBasket();
    } else if (this.selectFruit.value === "pear") {
      let typeValue = this.el.querySelector(".input-pear-text");
      let pear = new Pear(this.firstPropertyFruit.value, typeValue.value);
      this.basket.addProduct(pear);
      typeValue.value = "";
      this.renderBasket();
    } else if (this.selectFruit.value === "orange") {
      let countryValue = this.el.querySelector(".input-orange-text");
      let orange = new Orange(
        this.firstPropertyFruit.value,
        countryValue.value
      );
      this.basket.addProduct(orange);
      countryValue.value = "";
      this.renderBasket();
    }
    this.firstPropertyFruit.value = "";
  }
  notificationSaveLocalStorage() {
    this.basket.saveBasketLocalStorage(title => {
      console.log(title);
    });
  }
  allFruits() {
    this.basket.getAllFruit();
  }
  clearAllFruits() {
    this.basket.clear();
    this.renderBasket();
  }
}
