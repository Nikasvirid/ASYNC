import ChampionPage from "../pages/champions_page2";
import ControllerPage1 from "./controllerPage1";
import ControllerPage2 from "./controllerPage2";

class Navigation {
    private winnersButton: HTMLButtonElement = document.createElement("button");
    private garageButton: HTMLButtonElement = document.createElement("button");
    private wrapperForButtons: HTMLDivElement = document.createElement("div");
    private wrapperForPage: HTMLDivElement = document.createElement("div");
  
    renderPage(data: CarType[]) {
      this.wrapperForPage.classList.add("wrapper-for-page");
      this.addButtons();
      this.addGaragePage(data);
      this.addListenersToGarageButton();
      this.addListenersToWinnersButton();
    }
    addButtons() {
      this.garageButton.classList.add("button");
      this.winnersButton.classList.add("button");
      this.garageButton.style.marginRight = "10px";
      this.garageButton.textContent = "Garage";
      this.winnersButton.textContent = "Winners";
      this.wrapperForButtons.style.paddingBottom = "50px";
      this.wrapperForButtons.append(this.garageButton, this.winnersButton);
      document.body.prepend(this.wrapperForButtons);
    }
    addGaragePage(data: CarType[]) {
      const minCar = localStorage.getItem("minCar") ? JSON.parse(localStorage.getItem("minCar") || "0") : "0";
      const maxCar = localStorage.getItem("maxCar") ? JSON.parse(localStorage.getItem("maxCar") || "7") : "7";
      this.wrapperForPage.classList.add("wrapper-for-page");
      document.body.style.paddingLeft = "10px";
      this.wrapperForPage.append(new GaragePage().renderPage(data, +minCar, +maxCar));
      document.body.append(this.wrapperForPage);
    }
    addListenersToGarageButton() {
      const minCar = localStorage.getItem("minCar") ? JSON.parse(localStorage.getItem("minCar") || "0") : "0";
      const maxCar = localStorage.getItem("maxCar") ? JSON.parse(localStorage.getItem("maxCar") || "7") : "7";
      this.garageButton.addEventListener("click", () => {
        fetch("http://127.0.0.1:3000/garage")
          .then((resp) => resp.json())
          .then((data) => {
            this.wrapperForPage.lastChild?.remove();
            this.wrapperForPage.append(new GaragePage().renderPage(data, +minCar, +maxCar));
            new ControllerPage1(data);
          });
      });
    }
    addListenersToWinnersButton() {
      const minCar = localStorage.getItem("minCarWin") ? JSON.parse(localStorage.getItem("minCarWin") || "") : 0;
      const maxCar = localStorage.getItem("maxCarWin") ? JSON.parse(localStorage.getItem("maxCarWin") || "") : 10;
      this.winnersButton.addEventListener("click", () => {
        if (document.querySelector(".message") !== null) {
          document.querySelector(".message")!.remove();
        }
        fetch(`http://127.0.0.1:3000/winners?_page=1&_limit=10&_sort=ASC&_order=time`, {
          method: "GET",
        })
          .then((resp) => resp.json())
          .then((data: ChampionType[]) => {
            this.wrapperForPage.lastChild?.remove();
            this.wrapperForPage.append(new ChampionPage().renderPage(data, minCar, maxCar));
            new ControllerPage2();
          });
      });
    }
  }
  export default Navigation;