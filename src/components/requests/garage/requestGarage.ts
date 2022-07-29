class RequestGarage {
    async createCar(name: string, color: string) {
      await fetch("http://127.0.0.1:3000/garage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, color: color }),
      }).then(() => this.getCars());
    }
    async updateCar(id: string, name: string, color: string) {
      await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, color: color }),
      }).then(() => this.getCars());
    }
    async deleteCar(id: string) {
      await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: "DELETE",
      })
        .then(() => this.getCars())
        .then(() => new RequestChampions().deleteWinner(id));
    }
    async getCars() {
      await fetch("http://127.0.0.1:3000/garage")
        .then((resp) => resp.json())
        .then((data: CarType[]) => {
          document.body.innerHTML = "";
          new Navigation().renderPage(data);
          new ControlGaragePage(data);
        });
    }
  }
  export default RequestGarage;