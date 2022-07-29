import ControllerPage1 from "../controller/controllerPage1";
import { CarType } from "./types/car";
import Navigation from "../controller/navigation";
class App {
    constructor() {
      this.runApp();
      localStorage.setItem("idCar", "0");
    }
    runApp() {
      fetch("http://127.0.0.1:3000/garage")
        .then((resp) => resp.json())
        .then((data: CarType[]) => {
          new Navigation().renderPage(data);
          new ControllerPage1(data);
        });
    }
  }
  export default App;