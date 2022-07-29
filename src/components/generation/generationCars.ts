const MAX_LENGTH_COLOR = 6;

class GenerationCar {
  model: string[];
  name: string[];
  constructor() {
    this.model = [
      "Acura",
      "Audi",
      "BMW",
      "Citroen",
      "Honda",
      "Kia",
      "Tesla",
      "Mersedes",
      "Nissan",
      "Opel",
      "Toyota",
      "Zhiguli",
      "Moskvich",
      "Volvo",
    ];
    this.name = [
      "MDX",
      "A6",
      "X5M",
      "C4",
      "Accord",
      "Stinger",
      "Model S",
      "S600",
      "Patrol",
      "Zafira",
      "Camry",
      "9",
      "2335",
      "XC90",
    ];
  }
  getRandomName() {
    const nameCar =
      this.model[Math.floor(Math.random() * this.model.length)] +
      " " +
      this.name[Math.floor(Math.random() * this.name.length)];
    return nameCar;
  }
  getRandomColor() {
    let color = "#";
    const lettersForColor = "0123456789ABCDEF";
    for (let i = 0; i < MAX_LENGTH_COLOR; i++) {
      color += lettersForColor[Math.floor(Math.random() * lettersForColor.length)];
    }
    return color;
  }
  getOneHundredCars() {
    const arrayOneHundredCars: RequestCar[] = [];
    let car: RequestCar = {
      name: "",
      color: "",
    };
    for (let i = 0; i < 100; i++) {
      car = { name: this.getRandomName(), color: this.getRandomColor() };
      arrayOneHundredCars.push(car);
    }
    return arrayOneHundredCars;
  }
}
export default GenerationCar;