import { ChampionType } from "../../app/types/champion";

class RequestChampions {
    async getWinner(id: number, time: number) {
      await fetch(`http://127.0.0.1:3000/winners/${id}`).then((resp) => {
        if (resp.status === 404) {
          this.createWinner(id, time);
        } else if (resp.status === 200) {
          this.getWinnerForUpdate(id, time);
        }
      });
    }
    async getWinnerForUpdate(id: number, time: number) {
      await fetch(`http://127.0.0.1:3000/winners/${id}`)
        .then((resp) => resp.json())
        .then((data: ChampionType) => {
          const wins = data.wins + 1;
          if (data.time > time) {
            this.updateWinner(id, wins, time);
          } else if (data.time < time) {
            this.updateWinner(id, wins, data.time);
          }
        });
    }
    async updateWinner(id: number, wins: number, time: number) {
      await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wins: wins, time: time }),
      });
    }
    async createWinner(id: number, time: number) {
      const wins = 1;
      await fetch("http://127.0.0.1:3000/winners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, wins: wins, time: time }),
      });
    }
    async deleteWinner(id: string) {
      await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: "DELETE",
      });
    }
  }
  export default RequestChampions;
   