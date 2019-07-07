let dal = new LocalStorageService();
let basket = new Basket(dal);
let newBasket = new BasketView("container", basket);
newBasket.render();
