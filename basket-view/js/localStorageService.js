class LocalStorageService {
  localStorageSave(apples, pears, oranges, callback) {
    let appleValue = JSON.stringify(apples);
    let pearValue = JSON.stringify(pears);
    let orangeValue = JSON.stringify(oranges);
    localStorage.setItem("Apples", appleValue);
    localStorage.setItem("Pears", pearValue);
    localStorage.setItem("Oranges", orangeValue);
    callback("use ok");
  }

  getLocalStorageData(callback) {
    let appleValue = JSON.parse(localStorage.getItem("Apples"));
    let pearValue = JSON.parse(localStorage.getItem("Pears"));
    let orangeValue = JSON.parse(localStorage.getItem("Oranges"));
    if (appleValue != null || pearValue != null || orangeValue != null) {
      callback(appleValue, pearValue, orangeValue);
    }
  }

  clearDataLocalStorage() {
    localStorage.clear();
  }
}
