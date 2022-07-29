import { CarType } from "../app/types/car";

class MessageChampion {
  private wrapperMessage = document.createElement("div");
  private titleMessage = document.createElement("h3");
  addWrapperMessage(id: string, time: number) {
    fetch(`http://127.0.0.1:3000/garage/${id}`)
      .then((resp) => resp.json())
      .then((data: CarType) => {
        this.titleMessage.innerText = `${data.name} went first(${time}s)`;
        this.wrapperMessage.append(this.titleMessage);
        this.wrapperMessage.classList.add("message");
      });
    return this.wrapperMessage;
  }
}
export default MessageChampion;
 
