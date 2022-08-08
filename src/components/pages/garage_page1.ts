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