class CarAnimation {
    animationCar(id: string, rapidity: number, distance: number) {
      const time = Math.floor(distance / rapidity/700);
      if (document.querySelector(`.wrapper-image-${id}`) !== null) {
        const wrapperCar: HTMLElement = document.querySelector(`.wrapper-image-${id}`)!;
        // console.log(document.documentElement.clientWidth);
        // if (document.documentElement.clientWidth > 1300) {
        //   wrapperCar.style.left = "90%";
        // }
        // if (document.documentElement.clientWidth < 1300) {
        //   wrapperCar.style.left = "85%";
        // }
        // if (document.documentElement.clientWidth < 780) {
        //   wrapperCar.style.left = "80%";
        // }
        // if (document.documentElement.clientWidth < 600) {
        //   wrapperCar.style.left = "75%";
        // }
        // wrapperCar.style.transition = `${time}s ease`;
        wrapperCar.style.left = "90%";
        wrapperCar.style.transition = `${time}s ease`;
      }
    }
    stopAnimationCar(id: string) {
      if (document.querySelector(`.wrapper-image-${id}`) !== null) {
        const wrapperCar: HTMLElement = document.querySelector(`.wrapper-image-${id}`)!;
        wrapperCar.classList.remove("animate-car");
        wrapperCar.style.left = `${wrapperCar.getBoundingClientRect().left - 40}px`;
      }
    }
    returnToStartPosition(id: string) {
      if (document.querySelector(`.wrapper-image-${id}`) !== null) {
        const wrapperCar: HTMLElement = document.querySelector(`.wrapper-image-${id}`)!;
        wrapperCar.style.left = "0";
      }
    }
  }
  export default CarAnimation;