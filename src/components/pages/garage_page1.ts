import renderCars from '../animationCars/cars';
import renderCarsControllers from '../controller/carControllers';
import renderCreateCarComponent from '../animationCars/createCar';
import renderGaragePagination from '../animationCars/garagePagination';
import renderUpdateCarComponent from '../animationCars/updateCar';
import { VIEW_NAME } from '../../constants';
import store from '../../store';
const renderGarageView = () => `
<div class='garage-view'>
  ${renderCreateCarComponent()}
  ${renderUpdateCarComponent()}
  ${renderCarsControllers()}
  <h2>${VIEW_NAME.garage} (${store.allCarsCount})</h2>
  <h3 id='garage-current-page-num'>Page#${store.garageCurrentPageNum}</h3>
  <div id='cars'>${renderCars()}</div>
  ${renderGaragePagination()}
  <div class='popup hide'></div>
</div>`;

export default renderGarageView;