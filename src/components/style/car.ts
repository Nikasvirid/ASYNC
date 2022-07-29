import { CarType } from "../app/types/car";


class Car {
    private wrapper = document.createElement("div");
    private wrapperForButtons = document.createElement("div");
    private wrapperForFlag = document.createElement("div");
    private buttonSelect = document.createElement("button");
    private buttonRemove = document.createElement("button");
    private nameCar = document.createElement("span");
    private wrapperForCar = document.createElement("div");
    private overlayForCar = document.createElement("div");
    private wrapperForImageCar = document.createElement("div");
    private startCarButton = document.createElement("button");
    private stopCarButton = document.createElement("button");
    private trackForCar = document.createElement("hr");
    addCar(item: CarType) {
      this.trackForCar.style.marginTop = "0";
      this.wrapper.append(this.addWrapperForButtons(item), this.addWrapperForCar(item), this.trackForCar);
      return this.wrapper;
    }
    addWrapperForButtons(item: CarType) {
      this.buttonSelect.classList.add(`select-${item.id}`);
      this.buttonSelect.textContent = "Select";
      this.buttonRemove.classList.add(`remove-${item.id}`);
      this.buttonRemove.textContent = "Remove";
      this.nameCar.style.color = "#fff";
      this.nameCar.style.marginLeft = "10px";
      this.nameCar.textContent = item.name;
      this.wrapperForButtons.append(this.buttonSelect, this.buttonRemove, this.nameCar);
      return this.wrapperForButtons;
    }
    addWrapperForCar(item: CarType) {
      this.wrapper.classList.add(`car-${item.id}`);
      this.startCarButton.textContent = "A";
      this.startCarButton.classList.add(`started-${item.id}`);
      this.stopCarButton.textContent = "B";
      this.stopCarButton.setAttribute("disabled", "");
      this.stopCarButton.classList.add(`stopped-${item.id}`);
      this.wrapperForCar.classList.add("flex-car");
      this.overlayForCar.classList.add("overlay-car");
      this.wrapperForImageCar.insertAdjacentHTML("beforeend", new ImageCar().createCarTemplate(item.color));
      this.wrapperForFlag.classList.add("flag");
      this.wrapperForFlag.insertAdjacentHTML("beforeend", new ImageCar().createFinishFlag());
      this.wrapperForImageCar.style.position = "relative";
      this.wrapperForImageCar.style.left = "0%";
      this.wrapperForImageCar.append(this.overlayForCar);
      this.wrapperForImageCar.classList.add(`wrapper-image`, `wrapper-image-${item.id}`);
      this.wrapperForCar.style.position = "relative";
      this.wrapperForCar.append(this.startCarButton, this.stopCarButton, this.wrapperForImageCar, this.wrapperForFlag);
      return this.wrapperForCar;
    }
  }
  export default Car;