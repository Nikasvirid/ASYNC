import RequestGarage from "../requests/garage/requestGarage";
import RequestMotor from "../requests/motors/requestMotor";
import { CarType } from "../app/types/car";
import CarAnimation from "../animationCars/carAnimation";
import GenerationCar from "../generation/generationCars";
import Car from "../style/car";
const MIN_NUMBER_CAR = 0;
const MAX_NUMBER_CAR = 7;
const START_COUNT = 1;
const MIN_COUNT_FOR_DISABLED = 2;

class ControllerPage1 {
  private inputName: HTMLInputElement = document.querySelector(".name-create")!;
  private buttonRace: HTMLInputElement = document.querySelector(".race")!;
  private buttonReset: HTMLInputElement = document.querySelector(".reset")!;
  private inputNameCreate: HTMLInputElement = document.querySelector(".name-create")!;
  private inputNameUpdate: HTMLInputElement = document.querySelector(".name-update")!;
  private inputColorCreate: HTMLInputElement = document.querySelector(".color-create")!;
  private inputColorUpdate: HTMLInputElement = document.querySelector(".color-update")!;
  private buttonCreate: HTMLElement = document.querySelector(".create")!;
  private buttonUpdate: HTMLElement = document.querySelector(".update")!;
  private buttonGenerate: HTMLElement = document.querySelector(".generate")!;
  private wrapperCar: HTMLElement = document.querySelector(".wrapper-car")!;
  private wrapperForPage: HTMLElement = document.querySelector(".wrapper-for-page")!;
  private wrapperButtonPagination: HTMLElement = document.querySelector(".wrapper-pagination")!;
  private wrapperCars = document.querySelector(".wrapper-car")!;
  private buttonPrev = document.querySelector(".prev")!;
  private buttonNext = document.querySelector(".next")!;
  private spanNumberPage = document.querySelector(".span-number-page")!;
  // private count = START_COUNT;
  // private minCar = MIN_NUMBER_CAR;
  // private maxCar = MAX_NUMBER_CAR;
  private count = localStorage.getItem("countPage")
    ? JSON.parse(localStorage.getItem("countPage") || "1")
    : START_COUNT;
  private minCar = localStorage.getItem("minCar") ? JSON.parse(localStorage.getItem("minCar") || "0") : MIN_NUMBER_CAR;
  private maxCar = localStorage.getItem("maxCar") ? JSON.parse(localStorage.getItem("maxCar") || "7") : MAX_NUMBER_CAR;
  requestGarage: RequestGarage;
  requestEngine: RequestMotor;
  constructor(data: CarType[]) {
    this.requestEngine = new RequestMotor();
    this.requestGarage = new RequestGarage();
    this.addEventListenerForButtonCreate();
    this.addEventListenerForWrapperCar();
    this.addEventListenerForButtonGenerate();
    this.addEventListenerForButtonsPagination(data);
    // this.addEventListenerForButtonRace(data, this.minCar, this.maxCar);
    this.addEventListenerForInputNameCreate();
    this.addEventListenerForInputColorCreate();
    this.buttonRace.addEventListener("click", () => {
      const minCar = localStorage.getItem("minCar") ? JSON.parse(localStorage.getItem("minCar") || "0") : "0";
      const maxCar = localStorage.getItem("maxCar") ? JSON.parse(localStorage.getItem("maxCar") || "7") : "7";
      localStorage.setItem("idCar", "0");
      data.slice(+minCar, +maxCar).forEach((item: CarType) => {
        new RequestMotor().startEngine(item.id.toString());
        const buttonStart = document.querySelector(`.started-${item.id}`);
        const buttonStop = document.querySelector(`.stopped-${item.id}`);
        buttonStart?.setAttribute("disabled", "");
        buttonStop?.removeAttribute("disabled");
      });
      this.addEventListenerForButtonReset(data, +minCar, +maxCar);
    });
  }
  addEventListenerForInputColorCreate() {
    this.inputColorCreate.addEventListener("change", () => {
      localStorage.setItem("inputColorCreate", JSON.stringify(this.inputColorCreate.value));
    });
  }
  addEventListenerForInputNameCreate() {
    this.inputName.addEventListener("blur", () => {
      localStorage.setItem("inputNameCreate", JSON.stringify(this.inputName.value));
    });
  }
  // addEventListenerForButtonRace(data: CarType[], minCar: number, maxCar: number) {
  // }
  addEventListenerForButtonReset(data: CarType[], minCar: number, maxCar: number) {
    this.buttonReset.addEventListener("click", () => {
      localStorage.setItem("idCar", "0");
      if (document.querySelector(".message") !== null) {
        document.querySelector(".message")!.remove();
      }
      data.slice(minCar, maxCar).forEach((item: CarType) => {
        new CarAnimation().returnToStartPosition(item.id.toString());
        const buttonStart = document.querySelector(`.started-${item.id}`);
        const buttonStop = document.querySelector(`.stopped-${item.id}`);
        buttonStart?.removeAttribute("disabled");
        buttonStop?.setAttribute("disabled", "");
      });
    });
  }
  addEventListenerForButtonGenerate() {
    this.buttonGenerate.addEventListener("click", () => {
      const arrayOneHundredCars = new GenerationCar().getOneHundredCars();
      arrayOneHundredCars.forEach((item) => {
        this.wrapperForPage.remove();
        this.requestGarage.createCar(item.name, item.color);
      });
    });
  }
  addEventListenerForButtonCreate() {
    this.buttonCreate.addEventListener("click", () => {
      this.wrapperForPage.remove();
      this.requestGarage.createCar(this.inputNameCreate.value, this.inputColorCreate.value);
    });
  }
  addEventListenerForButtonUpdate(id: string) {
    this.inputNameUpdate.removeAttribute("disabled");
    this.buttonUpdate.addEventListener("click", () => {
      this.requestGarage.updateCar(id, this.inputNameUpdate.value, this.inputColorUpdate.value);
    });
  }
  addEventListenerForWrapperCar() {
    this.wrapperCar.addEventListener("click", (event) => {
      const arrayNameButton = (<HTMLElement>event.target).className.match(/[a-z]/gi) as Array<string>;
      const arrayId = (<HTMLElement>event.target).className.match(/\d/gi) as Array<string>;
      if (arrayId !== null && arrayNameButton !== null) {
        const nameButton = arrayNameButton.join("");
        let idCar = "";
        if (arrayId.length === 1) {
          idCar = arrayId[0];
        } else if (arrayId.length === 2) {
          idCar = arrayId[0] + arrayId[1];
        } else if (arrayId.length === 3) {
          idCar = arrayId[0] + arrayId[1] + arrayId[2];
        }
        if (nameButton === "select") {
          this.addEventListenerForButtonUpdate(idCar);
        } else if (nameButton === "remove") {
          this.wrapperForPage.remove();
          this.requestGarage.deleteCar(idCar);
        } else if (nameButton === "started") {
          this.addDisabledAttributeForButtonStart(idCar);
          this.removeDisabledAttributeForButtonStop(idCar);
          this.requestEngine.startEngine(idCar);
        } else if (nameButton === "stopped") {
          this.addDisabledAttributeForButtonStop(idCar);
          this.removeDisabledAttributeForButtonStart(idCar);
          new CarAnimation().returnToStartPosition(idCar);
        }
      }
    });
  }
  addEventListenerForButtonsPagination(data: CarType[]) {
    this.wrapperButtonPagination.addEventListener("click", (event) => {
      const isButtonPrev = (<HTMLElement>event.target).classList.contains("prev");
      const isButtonNext = (<HTMLElement>event.target).classList.contains("next");
      if (isButtonPrev) {
        if (document.querySelector(".message") !== null) {
          document.querySelector(".message")!.remove();
        }
        this.minCar = +this.minCar - MAX_NUMBER_CAR;
        this.maxCar = +this.maxCar - MAX_NUMBER_CAR;
        this.count = +this.count - START_COUNT;
        if (this.count < MIN_COUNT_FOR_DISABLED) {
          this.buttonPrev.setAttribute("disabled", "");
        }
        if (Math.ceil(data.length / MAX_NUMBER_CAR) > +this.count) {
          this.buttonNext.removeAttribute("disabled");
        }
        this.spanNumberPage.innerHTML = this.count.toString();
        localStorage.setItem("countPage", JSON.stringify(this.count.toString()));
        this.wrapperCars.innerHTML = "";
        data
          .slice(+this.minCar, +this.maxCar)
          .forEach((item: CarType) => this.wrapperCars.append(new Car().addCar(item)));
        // this.addEventListenerForButtonRace(data, +this.minCar, +this.maxCar);
        localStorage.setItem("minCar", JSON.stringify(+this.minCar));
        localStorage.setItem("maxCar", JSON.stringify(+this.maxCar));
      } else if (isButtonNext) {
        if (document.querySelector(".message") !== null) {
          document.querySelector(".message")!.remove();
        }
        this.minCar = +this.minCar + MAX_NUMBER_CAR;
        this.maxCar = +this.maxCar + MAX_NUMBER_CAR;
        this.count = +this.count + START_COUNT;
        if (+this.count > START_COUNT) {
          this.buttonPrev.removeAttribute("disabled");
        }
        if (Math.ceil(data.length / MAX_NUMBER_CAR) === +this.count) {
          this.buttonNext.setAttribute("disabled", "");
        }
        this.spanNumberPage.innerHTML = this.count.toString();
        localStorage.setItem("countPage", JSON.stringify(this.count.toString()));
        this.wrapperCars.innerHTML = "";
        data
          .slice(+this.minCar, +this.maxCar)
          .forEach((item: CarType) => this.wrapperCars.append(new Car().addCar(item)));
        // this.addEventListenerForButtonRace(data, +this.minCar, +this.maxCar);
        localStorage.setItem("minCar", JSON.stringify(+this.minCar));
        localStorage.setItem("maxCar", JSON.stringify(+this.maxCar));
      }
    });
  }
  addDisabledAttributeForButtonStart(id: string) {
    const button = document.querySelector(`.started-${id}`)!;
    button.setAttribute("disabled", "");
  }
  addDisabledAttributeForButtonStop(id: string) {
    const button = document.querySelector(`.stopped-${id}`)!;
    button.setAttribute("disabled", "");
  }
  removeDisabledAttributeForButtonStart(id: string) {
    const button = document.querySelector(`.started-${id}`)!;
    button.removeAttribute("disabled");
  }
  removeDisabledAttributeForButtonStop(id: string) {
    const button = document.querySelector(`.stopped-${id}`)!;
    button.removeAttribute("disabled");
  }
}
export default ControllerPage1;