const MIN_NUMBER_CAR = 0;
const MAX_NUMBER_CAR = 10;
const START_COUNT = 1;
const MIN_COUNT_FOR_DISABLED = 2;

class ControllerPage2 {
  private buttonPrev = document.querySelector(".prev-winners")!;
  private wrapperButtons = document.querySelector(".buttons-win-pagination")!;
  private bodyTable = document.querySelector(".body-table")!;
  private spanCountPage = document.querySelector(".span-number-winners")!;
  private count = localStorage.getItem("countPageWin")
    ? JSON.parse(localStorage.getItem("countPageWin") || "1")
    : START_COUNT;
  constructor() {
    this.addEventListenerForWrapperButtons();
  }
  addEventListenerForWrapperButtons() {
    this.wrapperButtons.addEventListener("click", (event) => {
      const isButtonPrev = (<HTMLElement>event.target).classList.contains("prev-winners");
      const isButtonNext = (<HTMLElement>event.target).classList.contains("next-winners");
      if (isButtonPrev) {
        this.count = +this.count - START_COUNT;
        this.spanCountPage.innerHTML = this.count;
        fetch(`http://127.0.0.1:3000/winners?_page=${this.count}&_limit=10&_sort=ASC&_order=time`, {
          method: "GET",
        })
          .then((resp) => resp.json())
          .then((winners: ChampionType[]) => {
            this.bodyTable.innerHTML = "";
            winners.forEach((item: ChampionType) => this.bodyTable.append(new RowTableWinners().addRowTable(item)));
          });
        if (this.count < MIN_COUNT_FOR_DISABLED) {
          this.buttonPrev.setAttribute("disabled", "");
        }
      } else if (isButtonNext) {
        this.count = +this.count + START_COUNT;
        this.spanCountPage.innerHTML = this.count;
        fetch(`http://127.0.0.1:3000/winners?_page=${this.count}&_limit=10&_sort=ASC&_order=time`, {
          method: "GET",
        })
          .then((resp) => resp.json())
          .then((winners: ChampioType[]) => {
            this.bodyTable.innerHTML = "";
            winners.forEach((item: ChampionType) => this.bodyTable.append(new RowTableWinners().addRowTable(item)));
          });
        if (+this.count > START_COUNT) {
          this.buttonPrev.removeAttribute("disabled");
        }
      }
    });
  }
}
export default ControllerPage2;