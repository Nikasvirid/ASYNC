class GaragePage {
    private page: HTMLDivElement = document.createElement("div");
    private wrapperControlPanel = document.createElement("div");
    private wrapperForTitlePage = document.createElement("div");
    private wrapperForTitleGarage = document.createElement("div");
    private wrapperForBoxesCar = document.createElement("div");
    private wrapperForButtonsPagination = document.createElement("div");
    renderPage(data: CarType[], minCar: number, maxCar: number) {
      this.page.append(
        this.addControlPanel(),
        this.addTitleGarage(data.length),
        this.addTitlePage(),
        this.addBoxesForCar(data, minCar, maxCar),
        this.addWrapperButtonPagination(data.length)
      );
      return this.page;
    }
    addControlPanel() {
      this.wrapperControlPanel.innerHTML = "";
      this.wrapperControlPanel.style.paddingBottom = "25px";
      this.wrapperControlPanel.append(
        new ControlPanel().addControlFieldCreate(),
        new ControlPanel().addControlFieldUpdate(),
        new ControlPanel().addControlButtons()
      );
      return this.wrapperControlPanel;
    }
    addTitleGarage(сount: number) {
      this.wrapperForTitleGarage.innerHTML = "";
      this.wrapperForTitleGarage.append(new TitlePageGarage().addTitleGarage(сount));
      return this.wrapperForTitleGarage;
    }
    addTitlePage() {
      this.wrapperForTitlePage.innerHTML = "";
      this.wrapperForTitlePage.append(new TitlePageGarage().addTitlePage());
      return this.wrapperForTitlePage;
    }
    addBoxesForCar(data: CarType[], minCar: number, maxCar: number) {
      this.wrapperForBoxesCar.innerHTML = "";
      this.wrapperForBoxesCar.classList.add("wrapper-car");
      data.slice(minCar, maxCar).forEach((item: CarType) => this.wrapperForBoxesCar.append(new Car().addCar(item)));
      return this.wrapperForBoxesCar;
    }
    addWrapperButtonPagination(count: number) {
      this.wrapperForButtonsPagination.innerHTML = "";
      this.wrapperForButtonsPagination.style.paddingTop = "10px";
      this.wrapperForButtonsPagination.classList.add("wrapper-pagination");
      this.wrapperForButtonsPagination.append(
        new ButtonPagination().addButtonPrev(),
        new ButtonPagination().addButtonNext(count)
      );
      return this.wrapperForButtonsPagination;
    }
  }
  
  export default GaragePage;
