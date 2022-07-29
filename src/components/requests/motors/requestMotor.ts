class RequestMotor {
    async startEngine(id: string) {
      await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
        method: "PATCH",
      })
        .then((resp) => resp.json())
        .then((data: MotorCar) => {
          new CarAnimation().animationCar(id, data.rapidity, data.distance);
          this.switchCarEngine(id, data.rapidity, data.distance);
        });
    }
    async switchCarEngine(id: string, rapidity: number, distance: number) {
      await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`, {
        method: "PATCH",
      }).then((resp) => {
        if (resp.status === 500) {
          new CarAnimation().stopAnimationCar(id);
        } else {
          let idCar = localStorage.getItem("idCar") ? JSON.parse(localStorage.getItem("idCar") || "") : 0;
          if (idCar === 0) {
            document.body.append(new MessageWinner().addWrapperMessage(id, Math.floor(distance /rapidity / 1000)));
            new RequestChampions().getWinner(+id, Math.floor(distance / rapidity / 1000));
          }
          idCar++;
          localStorage.setItem("idCar", JSON.stringify(idCar));
          // if (document.querySelectorAll(".message")[0] !== undefined) {
          //   document.querySelectorAll(".message")[0].classList.add("message-visible");
          // }
        }
      });
    }
  }
  export default RequestMotor;