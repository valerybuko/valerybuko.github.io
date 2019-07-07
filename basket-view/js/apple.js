class Apple {
  constructor(name, isWinter) {
    this.name = name;
    this.isWinter = isWinter;
    this.isDirty = true;
    this.isRotten = false;
    this.rottedCallback = null;
    setTimeout(this.rotting.bind(this), 5000);
  }
  rotting() {
    this.isRotten = true;
    if (!!this.rottedCallback) {
      this.rottedCallback();
    }
  }
}
