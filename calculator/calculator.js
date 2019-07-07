class Calculator {
  constructor(id) {
    this.firstNumber = "";
    this.secondNumber = "";
    this.result = "";
    this.operation = "";
    this.buttons = null;
    this.inputEl = null;
    this.operatorsEl = null;
    this.equalsEl = null;
    this.deleteEL = null;
    this.plusMinusEL = null;
    this.el = document.querySelector("#" + id);
  }
  render() {
    if (this.el.innerHTML == "") {
      this.el.innerHTML = `<input type="text" placeholder="Введите число" name="" id="enterText" class="inputText">
      <div class="btnWrap">
          <div class="btnBlock">
              <button id="delete" class="deleteValue">C</button>
              <button id="divide" class="operators" name="/">/</button>
          </div>
          <div class="btnBlock">
              <button class="number" id="number7" name="7">7</button>
              <button class="number" id="number8" name="8">8</button>
              <button class="number" id="number9" name="9">9</button>
              <button id="mult" class="operators" name="*">*</button>
          </div>
          <div class="btnBlock">
              <button class="number" id="number4" name="4">4</button>
              <button class="number" id="number5" name="5">5</button>
              <button class="number" id="number6" name="6">6</button>
              <button id="minus" class="operators" name="-">-</button>
          </div>
          <div class="btnBlock">
              <button class="number" id="number1" name="1">1</button>
              <button class="number" id="number2" name="2">2</button>
              <button class="number" id="number3" name="3">3</button>
              <button id="plus" class="operators" name="+">+</button>
          </div>
          <div class="btnBlock">
              <button id="" class="plusMinus">+-</button>
              <button class="number" id="number0" name="0">0</button>
              <button class="number" name=".">.</button>
              <button id="equals" class="result">=</button>
          </div>
      </div>
  </div>`;
    }
    this.start();
  }
  start() {
    this.buttons = this.el.querySelectorAll(".number");
    this.operatorsEl = this.el.querySelectorAll(".operators");
    this.inputEl = this.el.querySelector(".inputText");
    this.equalsEl = this.el.querySelector(".result");
    this.deleteEL = this.el.querySelector(".deleteValue");
    this.plusMinusEL = this.el.querySelector(".plusMinus");

    this.buttons.forEach(elem => {
      elem.addEventListener("click", this.numberButtonClickListener.bind(this));
    });
    this.operatorsEl.forEach(elem => {
      elem.addEventListener(
        "click",
        this.operationButtonClickListener.bind(this)
      );
    });
    this.equalsEl.addEventListener(
      "click",
      this.resultButtonClickListener.bind(this)
    );
    this.deleteEL.addEventListener(
      "click",
      this.deleteButtonClickListener.bind(this)
    );
    this.plusMinusEL.addEventListener("click", this.changeSign.bind(this));
  }

  numberButtonClickListener(e) {
    this.inputEl.value += e.currentTarget.name;
  }
  operationButtonClickListener(e) {
    this.operation = e.currentTarget.name;
    this.firstNumber = +this.inputEl.value;
    this.inputEl.value = "";
  }
  resultButtonClickListener() {
    this.secondNumber = +this.inputEl.value;
    if (!this.result) {
      if (this.operation === "+") {
        this.result = +this.firstNumber + this.secondNumber;
      } else if (this.operation === "-") {
        this.result = +this.firstNumber - this.secondNumber;
      } else if (this.operation === "*") {
        this.result = +this.firstNumber * this.secondNumber;
      } else if (this.operation === "/") {
        this.result = +this.firstNumber / this.secondNumber;
      }
      this.inputEl.value = +this.result;
    }
  }
  deleteButtonClickListener() {
    this.inputEl.value = "";
    this.secondNumber = "";
    this.firstNumber = "";
    this.result = "";
  }
  changeSign() {
    if (this.inputEl.value !== "") this.inputEl.value *= -1;
  }
}
