import { createCar as createCarApi } from '../api/carsApi';

const createCar = (event: MouseEvent, nameInput: HTMLInputElement, colorInput: HTMLInputElement) => {
    event.preventDefault();
    if (!nameInput.value) {
        // eslint-disable-next-line no-alert
        alert('create car name!');
        return;
    }
    createCarApi(nameInput.value, colorInput.value);
    document.location.reload();
};

export default createCar;