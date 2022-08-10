import { getId } from './utils/utils';
import renderApp from './components/app/app';
import { VIEW_NAME } from './constants';
import createCar from './utils/createCar';
import paginate from './utils/paginate';
import generateCars from './utils/generateCars';
import './index.scss';
import deleteCar from './utils/deleteCar';
import sorts from './utils/sorts';
const root = document.querySelector('#root');
root.innerHTML = renderApp();

const garageViewEl = document.querySelector('.garage-view') as HTMLElement;
const winnersViewEl = document.querySelector('.winners-view') as HTMLElement;

const createCarNameInput = document.querySelector('#create-car-name') as HTMLInputElement;
const createCarColorInput = document.querySelector('#create-car-color') as HTMLInputElement;

const updateCarNameInput = document.querySelector('#update-car-name') as HTMLInputElement;
const updateCarColorInput = document.querySelector('#update-car-color') as HTMLInputElement;
const updateSubmit = document.querySelector('#submit-update-car') as HTMLInputElement;

const garagePaginationPrevBtn = document.querySelector('#garage-pagination-prev') as HTMLButtonElement;
const garagePaginationNextBtn = document.querySelector('#garage-pagination-next') as HTMLButtonElement;
const garageCurrentPageEl = document.querySelector('#garage-current-page-num') as HTMLElement;

const winnersPaginationPrevBtn = document.querySelector('#winners-pagination-prev') as HTMLButtonElement;
const winnersPaginationNextBtn = document.querySelector('#winners-pagination-next') as HTMLButtonElement;
const winnersCurrentPageEl = document.querySelector('#winners-current-page-num') as HTMLElement;

const carsEl = document.querySelector('#cars') as HTMLElement;
const winnersEl = document.querySelector('#winners') as HTMLElement;

const handlerOnClick = async (event: MouseEvent) => {
    const { id } = event.target as HTMLElement;
        
};


document.addEventListener('click', handlerOnClick);
