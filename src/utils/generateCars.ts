import { createCar } from '../api/carsApi';
import {
    CAR_BRANDS,
    CAR_MODELS,
    COUNT_OF_SYMBOLS_IN_HEX,
    RANDOM_CARS_COUNT,
    TOTAL_NUMBER_OF_COLORS,
} from '../constants';
import { getRandom } from '../utils/utils'

const getRandomCarName = () => {
    const brand = CAR_BRANDS[getRandom(CAR_BRANDS.length)];
    const model = CAR_MODELS[getRandom(CAR_MODELS.length)];
    return `${brand} ${model}`;
};

const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * TOTAL_NUMBER_OF_COLORS)
        .toString(16)
        .padStart(COUNT_OF_SYMBOLS_IN_HEX, '0'); 
    return `#${randomColor}`;
};

const generateCars = async () => {
    const promises = new Array(RANDOM_CARS_COUNT)
        .fill(0)
        
        .map((_item) => createCar(getRandomCarName(), getRandomColor()));

    await (Promise as any).allSettled(promises);

    document.location.reload();
};

export default generateCars;